import { enums, eventFields } from './schema.mjs'

// Pure measurement logic: no storage, DOM, network or personal data.
export function createRegistry(entries) {
  const map = new Map([['/', { key: 'home', type: 'home', path: '/' }]])
  for (const entry of entries) map.set(entry.path, { ...entry, key: entry.path.slice(1) })
  const resources = new Map()
  for (const entry of entries) for (const url of entry.destinations || []) {
    if (['project', 'community', 'video'].includes(entry.type)) resources.set(url, map.get(entry.path))
  }
  return {
    resource: (url) => resources.get(url),
    keys: new Set(['unknown', ...[...map.values()].map((p) => p.key)]),
    page(path) {
      try {
        path = decodeURI(path).normalize('NFC').replace(/\/$/, '') || '/'
      } catch {
        return { key: 'unknown', type: 'unknown', path: '/unknown' }
      }
      return map.get(path) || { key: 'unknown', type: 'unknown', path: '/unknown' }
    },
  }
}
export class Navigation {
  constructor(registry) {
    this.registry = registry
    this.current = null
    this.pending = null
  }
  select(path, placement, now, sameTab) {
    this.pending = sameTab
      ? { target: this.registry.page(path), source: this.current, placement, now }
      : null
  }
  arrive(path, now) {
    const target = this.registry.page(path)
    const p = this.pending
    this.pending = null
    this.current = target
    if (
      !p ||
      !p.source ||
      p.target.key !== target.key ||
      p.source.key === target.key ||
      target.key === 'unknown' ||
      p.source.key === 'unknown' ||
      now <= p.now ||
      now - p.now > 30000
    )
      return null
    const transition =
      p.source.type === 'tag_results' &&
      ['article', 'project', 'video', 'community'].includes(target.type)
        ? 'tag_to_content'
        : p.source.type === 'article' && target.type === 'article'
          ? 'article_continuation'
          : p.source.type === 'article' && target.type === 'home'
            ? 'article_to_home'
            : null
    return transition
      ? { source_key: p.source.key, target_key: target.key, placement: p.placement, transition }
      : null
  }
}
const automatic = new Set(['$pageview', '$pageleave', '$web_vitals', '$rageclick'])
const sdkStrings = new Set([
  'distinct_id',
  '$session_id',
  '$window_id',
  '$pageview_id',
  '$prev_pageview_id',
  '$lib',
  '$lib_version',
  '$browser',
  '$browser_version',
  '$os',
  '$device_type',
])
const sdkNumbers = new Set([
  '$viewport_height',
  '$viewport_width',
  '$screen_height',
  '$screen_width',
  '$prev_pageview_duration',
  '$prev_pageview_max_content_percentage',
  '$prev_pageview_last_content_percentage',
  '$prev_pageview_max_scroll_percentage',
  '$prev_pageview_last_scroll_percentage',
  '$prev_pageview_max_scroll',
  '$prev_pageview_last_scroll',
  '$prev_pageview_max_content',
  '$prev_pageview_last_content',
])
export function sanitizeEvent(event, registry) {
  if (!event || (!automatic.has(event.event) && !eventFields[event.event])) return null
  const input = event.properties || {}
  const out = { schema_version: 1 }
  for (const [key, value] of Object.entries(input)) {
    if (sdkStrings.has(key) && typeof value === 'string') {
      const valid = ['distinct_id', '$session_id', '$window_id', '$pageview_id', '$prev_pageview_id'].includes(key)
        ? /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value)
        : key === '$lib' ? value === 'web'
        : ['$lib_version', '$browser_version'].includes(key) ? /^\d+(\.\d+){0,3}$/.test(value)
        : key === '$device_type' ? ['Desktop', 'Mobile', 'Tablet'].includes(value)
        : key === '$os' ? ['Windows', 'Mac OS X', 'Linux', 'Android', 'iOS', 'Chrome OS'].includes(value)
        : ['Chrome', 'Firefox', 'Safari', 'Microsoft Edge', 'Mobile Safari', 'Chrome iOS', 'Samsung Internet', 'Opera'].includes(value)
      if (valid) out[key] = value
    }
    if (sdkNumbers.has(key) && typeof value === 'number' && Number.isFinite(value) && value >= 0)
      out[key] = value
    if (
      ['$pathname', '$prev_pageview_pathname', '$session_entry_pathname'].includes(key) &&
      typeof value === 'string'
    )
      out[key] = registry.page(value).path
    if (
      ['$current_url', '$prev_pageview_url', '$session_entry_url'].includes(key) &&
      typeof value === 'string'
    ) {
      try {
        out[key] = 'https://www.baruchiro.com' + registry.page(new URL(value).pathname).path
      } catch {
        /* omit malformed URL */
      }
    }
    // Only bounded scalar vitals; never nested attribution, selectors or URLs.
    if (
      event.event === '$web_vitals' &&
      /^\$web_vitals_(CLS|FCP|INP|LCP|TTFB)_value$/.test(key) &&
      typeof value === 'number' &&
      Number.isFinite(value)
    )
      out[key] = value
  }
  for (const key of ['page_key', 'page_type', 'view_id', ...(eventFields[event.event] || [])]) {
    const value = input[key]
    if (['page_key', 'source_key', 'target_key', 'tag_key'].includes(key))
      out[key] = registry.keys.has(value) ? value : 'unknown'
    else if (key === 'page_type' && enums.target_type.includes(value)) out[key] = value
    else if (key === 'view_id' && typeof value === 'string' && /^[a-f0-9-]{36}$/.test(value))
      out[key] = value
    else if (enums[key]?.includes(value)) out[key] = value
  }
  // IP geolocation disabled at init; no person properties or DOM chain allowed.
  out.$process_person_profile = false
  const clean = { event: event.event, properties: out }
  if (typeof event.uuid === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(event.uuid)) clean.uuid = event.uuid
  if (event.timestamp instanceof Date && Number.isFinite(event.timestamp.getTime())) clean.timestamp = event.timestamp
  else if (typeof event.timestamp === 'string' && /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(event.timestamp) && Number.isFinite(Date.parse(event.timestamp))) clean.timestamp = event.timestamp
  return clean
}

export class ActiveClock {
  constructor(now) {
    this.last = now
    this.activity = now
    this.total = 0
    this.sent = new Set()
  }
  tick(now, eligible) {
    const gap = now - this.last
    // Timer gaps >2.5s are unknown (sleep/throttling), never backfilled.
    if (eligible && gap >= 0 && gap <= 2500) {
      this.total += Math.max(0, Math.min(now, this.activity + 60000) - this.last)
    }
    this.last = now
    return [30, 60].filter((n) => {
      if (this.total < n * 1000 || this.sent.has(n)) return false
      this.sent.add(n)
      return true
    })
  }
  interact(now) {
    this.activity = now
  }
}
