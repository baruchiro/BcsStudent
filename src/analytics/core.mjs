const SITE = 'https://www.baruchiro.com'
const events = {
  contact_intent: { channel: ['email', 'phone', 'whatsapp'] },
  booking_widget_ready: { placement: ['home_booking'] },
  booking_intent: { placement: ['home_booking'] },
}
// Only these browser-side SDK fields may leave the page.
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
const sdkIds = ['distinct_id', '$session_id', '$window_id', '$pageview_id', '$prev_pageview_id']
const sdkNumbers = [
  '$prev_pageview_duration',
  '$prev_pageview_max_scroll_percentage',
  '$prev_pageview_last_scroll_percentage',
  '$prev_pageview_max_content_percentage',
  '$prev_pageview_last_content_percentage',
]

// Path only: no query string, no hash.
const canonical = (value) => {
  try {
    return SITE + new URL(value, SITE).pathname
  } catch {
    return undefined
  }
}

// Privacy guard run by posthog-js before any event is sent. Everything not
// listed here is dropped.
export function sanitizeEvent(event) {
  if (!event) return null
  const input = event.properties || {}
  const out = { $process_person_profile: false }
  if (event.event === '$pageview' || event.event === '$pageleave') {
    for (const key of sdkIds) if (uuid.test(input[key])) out[key] = input[key]
    for (const key of sdkNumbers)
      if (Number.isFinite(input[key]) && input[key] >= 0) out[key] = input[key]
    for (const key of ['$current_url', '$prev_pageview_url']) {
      const url = canonical(input[key])
      if (url && typeof input[key] === 'string') out[key] = url
    }
    if (typeof input.$pathname === 'string')
      out.$pathname = canonical(input.$pathname)?.slice(SITE.length)
  } else if (events[event.event]) {
    for (const [key, allowed] of Object.entries(events[event.event]))
      if (allowed.includes(input[key])) out[key] = input[key]
    if (uuid.test(input.$session_id)) out.$session_id = input.$session_id
    if (uuid.test(input.distinct_id)) out.distinct_id = input.distinct_id
  } else return null
  const clean = { event: event.event, properties: out }
  // Keep the SDK's own event id and time so retries do not duplicate events.
  if (uuid.test(event.uuid)) clean.uuid = event.uuid
  if (event.timestamp instanceof Date && Number.isFinite(event.timestamp.getTime()))
    clean.timestamp = event.timestamp
  return clean
}

// Official posthog-js options: pageviews on route change, pageleave (time on
// page and scroll depth), no autocapture, replay, person profiles or IP.
export function privacyOptions(win) {
  return {
    api_host: 'https://app.posthog.com',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    autocapture: false,
    capture_dead_clicks: false,
    rageclick: false,
    capture_performance: false,
    disable_session_recording: true,
    person_profiles: 'never',
    save_campaign_params: false,
    save_referrer: false,
    advanced_disable_feature_flags: true,
    disable_surveys: true,
    ip: false,
    get_current_url: () => canonical(win.location.pathname),
    before_send: sanitizeEvent,
  }
}

// Email, phone and WhatsApp links outside article text.
export function contactChannel(anchor) {
  if (anchor.closest('[data-measure-placement="article_body"]')) return null
  let url
  try {
    url = new URL(anchor.href)
  } catch {
    return null
  }
  if (url.protocol === 'mailto:') return 'email'
  if (url.protocol === 'tel:') return 'phone'
  if (['wa.me', 'api.whatsapp.com'].includes(url.hostname)) return 'whatsapp'
  return null
}
