const events = {
  contact_intent: { channel: ['email', 'phone', 'whatsapp'] },
  booking_widget_ready: { placement: ['home_booking'] },
  booking_intent: { placement: ['home_booking'] },
}
// Only these browser-side SDK fields may leave the page.
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
const sdkIds = ['distinct_id', '$session_id', '$window_id', '$pageview_id', '$prev_pageview_id']
const projectToken = /^[A-Za-z0-9_]{1,100}$/
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const campaignValue = /^[\p{L}\p{N}_.\- ]{1,100}$/u
const sdkNumbers = [
  '$prev_pageview_duration',
  '$prev_pageview_max_scroll_percentage',
  '$prev_pageview_last_scroll_percentage',
  '$prev_pageview_max_content_percentage',
  '$prev_pageview_last_content_percentage',
]

// Path only: no query string, no hash.
const canonical = (value, siteUrl) => {
  try {
    return siteUrl + new URL(value, siteUrl).pathname
  } catch {
    return undefined
  }
}

// Referrer keeps the origin and path of the referring page, never its query or hash.
const referrerUrl = (value) => {
  if (typeof value !== 'string') return undefined
  try {
    const { protocol, origin, pathname } = new URL(value)
    return protocol === 'http:' || protocol === 'https:' ? origin + pathname : undefined
  } catch {
    return undefined
  }
}

const referringDomain = (value) =>
  typeof value === 'string' && /^[a-z0-9.-]{1,253}$/i.test(value) ? value : undefined

// Privacy guard run by posthog-js before any event is sent. Everything not
// listed here is dropped.
export function sanitizeEvent(event, siteUrl) {
  if (!event) return null
  const input = event.properties || {}
  const out = { $process_person_profile: false }
  if (event.event === '$pageview' || event.event === '$pageleave') {
    for (const key of sdkIds) if (uuid.test(input[key])) out[key] = input[key]
    for (const key of sdkNumbers)
      if (Number.isFinite(input[key]) && input[key] >= 0) out[key] = input[key]
    for (const key of ['$current_url', '$prev_pageview_url']) {
      const url = canonical(input[key], siteUrl)
      if (url && typeof input[key] === 'string') out[key] = url
    }
    if (typeof input.$pathname === 'string')
      out.$pathname = canonical(input.$pathname, siteUrl)?.slice(siteUrl.length)
    if (event.event === '$pageview') {
      const referrer = referrerUrl(input.$referrer)
      if (referrer) out.$referrer = referrer
      const domain = referringDomain(input.$referring_domain)
      if (domain) out.$referring_domain = domain
      for (const key of campaignKeys)
        if (typeof input[key] === 'string' && campaignValue.test(input[key])) out[key] = input[key]
    }
  } else if (events[event.event]) {
    for (const [key, allowed] of Object.entries(events[event.event]))
      if (allowed.includes(input[key])) out[key] = input[key]
    if (uuid.test(input.$session_id)) out.$session_id = input.$session_id
    if (uuid.test(input.distinct_id)) out.distinct_id = input.distinct_id
  } else return null
  if (typeof input.token === 'string' && projectToken.test(input.token)) out.token = input.token
  const clean = { event: event.event, properties: out }
  // Keep the SDK's own event id and time so retries do not duplicate events.
  if (uuid.test(event.uuid)) clean.uuid = event.uuid
  if (event.timestamp instanceof Date && Number.isFinite(event.timestamp.getTime()))
    clean.timestamp = event.timestamp
  return clean
}

// Official posthog-js options: pageviews on route change, pageleave (time on
// page and scroll depth), referrer and UTM on pageviews, no autocapture,
// replay, person profiles or IP.
export function privacyOptions(win, siteUrl) {
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
    save_campaign_params: true,
    save_referrer: true,
    mask_personal_data_properties: true,
    advanced_disable_feature_flags: true,
    disable_surveys: true,
    ip: false,
    get_current_url: () => canonical(win.location.pathname, siteUrl),
    before_send: (event) => sanitizeEvent(event, siteUrl),
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
