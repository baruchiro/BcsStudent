import { ActiveClock, createRegistry, Navigation, sanitizeEvent } from './core.mjs'
import { placements } from './schema.mjs'

// One document owner. Route notification is separate from React effect lifetimes,
// so StrictMode remounts cannot register duplicate listeners or restart a view.
export function startMeasurement(win, entries, sdk) {
  if (win.__siteMeasurement) return win.__siteMeasurement
  const registry = createRegistry(entries)
  const navigation = new Navigation(registry)
  let view,
    session,
    clock,
    lastPath,
    suspended = false
  let seen = new Set(),
    surfaces = new Set(),
    serviceStart = null,
    serviceSeen = false
  const doc = win.document
  let observedMarker
  const markerObserver = new win.IntersectionObserver((entries) => {
    if (entries.some((entry) => !entry.isIntersecting)) serviceStart = null
  })
  const eligible = () => !suspended && doc.visibilityState === 'visible' && doc.hasFocus()
  const now = () => win.performance.now()
  const enabled = () => !!sdk.get_session_id?.() && !sdk.has_opted_out_capturing?.()
  function emit(event, properties = {}) {
    if (!enabled() || !view) return
    const clean = sanitizeEvent(
      {
        event,
        properties: {
          schema_version: 1,
          page_key: view.key,
          page_type: view.type,
          view_id: view.id,
          ...properties,
        },
      },
      registry
    )
    if (clean) sdk.capture(clean.event, clean.properties)
  }
  function route(path) {
    if (!enabled()) return // No queue of pre-consent interactions.
    const sid = sdk.get_session_id()
    if (path === lastPath && sid === session) return
    const changedSession = session !== sid
    if (changedSession) {
      seen = new Set()
      navigation.pending = null
      navigation.current = null
    }
    const previous = navigation.arrive(path, now())
    session = sid
    lastPath = path
    view = { ...registry.page(path), id: win.crypto.randomUUID() }
    clock = new ActiveClock(now())
    surfaces = new Set()
    serviceSeen = false
    serviceStart = null
    sdk.capture('$pageview', {
      $pathname: view.path,
      $current_url: 'https://www.baruchiro.com' + view.path,
      page_key: view.key,
      page_type: view.type,
      view_id: view.id,
      schema_version: 1,
    })
    emit('measurement_view', { collection_state: 'enabled' })
    if (previous) emit('navigation_confirmed', previous)
  }
  function placement(a) {
    const explicit = a.closest('[data-measure-placement]')?.getAttribute('data-measure-placement')
    if (placements.includes(explicit)) return explicit
    if (a.closest('header')) return 'header'
    if (a.closest('footer')) return 'footer'
    return view?.type === 'article' ? 'article_body' : 'unknown'
  }
  function classify(a) {
    let url
    try {
      url = new URL(a.href, win.location.href)
    } catch {
      return null
    }
    const place = placement(a)
    const channel =
      url.protocol === 'mailto:'
        ? 'email'
        : url.protocol === 'tel:'
          ? 'phone'
          : ['wa.me', 'api.whatsapp.com'].includes(url.hostname)
            ? 'whatsapp'
            : null
    if (channel) return { kind: 'contact', channel, placement: place }
    if (url.origin === win.location.origin) {
      const target = registry.page(url.pathname)
      if (target.type === 'tag_results')
        return { kind: 'tag', tag_key: target.key, placement: place, target }
      if (target.key !== 'unknown') return { kind: 'navigation', target, placement: place }
    }
    const resource = registry.resource(url.href)
    if (resource) return { kind: 'resource', resource_type: resource.type, placement: place, target: resource, external: true }
    const declared = a.closest('[data-measure-resource]')?.getAttribute('data-measure-resource')
    if (['code', 'project', 'community', 'download', 'video'].includes(declared))
      return { kind: 'resource', resource_type: declared, placement: place }
    if (place === 'article_body' && url.hostname === 'github.com' && url.pathname.split('/').filter(Boolean).length >= 2)
      return { kind: 'resource', resource_type: 'code', placement: place }
    if (url.origin === win.location.origin && url.pathname.startsWith('/static/files/'))
      return { kind: 'resource', resource_type: 'download', placement: place }
    return null
  }
  function selected(event) {
    const a = event.target?.closest?.('a[href]')
    if (!a || !enabled() || !view) return
    const item = classify(a)
    if (!item) {
      navigation.pending = null
      return
    }
    const sameTab =
      event.button === 0 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      !event.altKey &&
      !item.external &&
      (!a.target || a.target === '_self') &&
      !a.hasAttribute('download')
    if (item.kind === 'tag') {
      // Shared ephemeral dedupe record, bounded by published tags and current SDK
      // session only. Storage failures fall back to this tab; reports DISTINCT
      // session/tag/placement regardless, never count raw events as sessions.
      const key = item.tag_key + ':' + item.placement
      let store = { session, keys: [] }
      try {
        const saved = JSON.parse(win.localStorage.getItem('site-tag-selections-v1'))
        if (saved?.session === session && Array.isArray(saved.keys)) store = saved
      } catch {
        /* storage denied */
      }
      if (!seen.has(key) && !store.keys.includes(key)) {
        emit('tag_selected', item)
        seen.add(key)
        store.keys.push(key)
        try {
          win.localStorage.setItem('site-tag-selections-v1', JSON.stringify(store))
        } catch {
          /* per-tab fallback */
        }
      }
    }
    if (item.resource_type) emit('resource_selected', item)
    if (item.target) {
      emit('navigation_selected', {
        placement: item.placement,
        target_key: item.target.key,
        target_type: item.target.type,
        navigation_context: sameTab ? 'same_tab' : 'new_context',
      })
      navigation.select(item.target.path, item.placement, now(), sameTab)
    } else {
      navigation.pending = null
      if (item.kind === 'contact') emit('contact_intent', item)

    }
  }
  const visible = (el) => {
    const r = el.getBoundingClientRect()
    const style = win.getComputedStyle(el)
    return (
      r.width > 0 &&
      r.height > 0 &&
      r.bottom > 0 &&
      r.top < win.innerHeight &&
      r.right > 0 &&
      r.left < win.innerWidth &&
      style.visibility !== 'hidden' &&
      style.display !== 'none'
    )
  }
  function sample() {
    if (!enabled()) {
      navigation.pending = null
      serviceStart = null
      if (clock) clock.tick(now(), false)
      return
    }
    if (session !== sdk.get_session_id() || !view) route(win.location.pathname)
    if (!view) return
    const time = now()
    const milestones = clock.tick(time, eligible())
    if (view.type === 'home')
      for (const milestone of milestones) emit('active_engagement_milestone', { milestone })
    const marker = doc.querySelector('[data-measure-service]')
    if (marker !== observedMarker) {
      markerObserver.disconnect()
      observedMarker = marker
      serviceStart = null
      if (marker) markerObserver.observe(marker)
    }
    // Sampled continuous exposure. Any hidden/blur/timer gap resets this dwell.
    if (view.type === 'home' && eligible() && marker && visible(marker)) {
      if (serviceStart === null) serviceStart = time
      if (!serviceSeen && time - serviceStart >= 2000) {
        emit('service_section_reached', { section_key: 'services' })
        serviceSeen = true
      }
    } else serviceStart = null
    if (eligible())
      for (const a of doc.querySelectorAll('a[href]')) {
        if (!visible(a)) continue
        const item = classify(a)
        if (!item) continue
        const props = {
          placement: item.placement,
          ...(item.tag_key ? { tag_key: item.tag_key } : {}),
          ...(item.target ? { target_key: item.target.key } : {}),
          ...(item.resource_type ? { resource_type: item.resource_type } : {}),
        }
        const key = JSON.stringify(props)
        if (!surfaces.has(key)) {
          emit('surface_exposed', props)
          surfaces.add(key)
        }
      }
  }
  let lastSample = now()
  const timer = win.setInterval(() => {
    const time = now()
    if (time - lastSample > 2500) serviceStart = null
    lastSample = time
    sample()
  }, 250)
  const activity = () => {
    if (clock && eligible() && enabled()) {
      const time = now()
      for (const milestone of clock.tick(time, true)) {
        if (view?.type === 'home') emit('active_engagement_milestone', { milestone })
      }
      clock.interact(time)
    }
    const marker = doc.querySelector('[data-measure-service]')
    if (!eligible() || !marker || !visible(marker)) serviceStart = null
  }
  const pause = () => {
    if (clock) clock.tick(now(), false)
    serviceStart = null
  }
  for (const type of ['pointerdown', 'touchstart', 'scroll', 'keydown'])
    win.addEventListener(type, activity, { passive: true })
  doc.addEventListener('click', selected, true)
  doc.addEventListener('auxclick', selected, true)
  doc.addEventListener('visibilitychange', pause)
  win.addEventListener('blur', pause)
  win.addEventListener('focus', pause)
  win.addEventListener('pagehide', () => {
    suspended = true
    navigation.pending = null
    pause()
  })
  win.addEventListener('pageshow', () => {
    suspended = false
    pause()
  })
  const runner = { route, emit, sample, registry, timer }
  win.__siteMeasurement = runner
  return runner
}
