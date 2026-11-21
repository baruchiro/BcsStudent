import { startMeasurement } from './browser.mjs'
import { sanitizeEvent, createRegistry } from './core.mjs'

// The same PostHog browser integration formerly initialized by pliny. One loader,
// not an additional SDK. The before_send guard is installed before initialization.
export function initialize(win, entries, apiKey) {
  if (win.__siteMeasurement) return win.__siteMeasurement
  if (win.__siteMeasurementLoading) return null
  if (!apiKey) return null
  win.__siteMeasurementLoading = true
  const registry = createRegistry(entries)
  const host = 'https://app.posthog.com' // preserve existing pliny endpoint
  const stub = []
  stub._i = []
  stub.people = []
  stub.toString = () => 'posthog (stub)'
  stub.people.toString = () => 'posthog.people (stub)'
  for (const name of [
    'capture',
    'register',
    'register_once',
    'unregister',
    'set_config',
    'opt_out_capturing',
    'opt_in_capturing',
    'reset',
  ])
    stub[name] = (...args) => stub.push([name, ...args])
  stub.__SV = 1
  const options = {
    api_host: host,
    capture_pageview: false, // route owner emits once, including initial view
    capture_pageleave: true,
    capture_performance: true,
    disable_session_recording: true,
    enable_recording_console_log: false,
    person_profiles: 'never',
    save_campaign_params: false,
    save_referrer: false,
    advanced_disable_feature_flags: true,
    disable_surveys: true,
    disable_product_tours: true,
    get_current_url: () => 'https://www.baruchiro.com' + registry.page(win.location.pathname).path,
    ip: false,
    mask_all_text: true,
    mask_all_element_attributes: true,
    // Preserve the existing consent opt-out storage/default; never call opt-in.
    // No identify, alias, person properties or custom visitor IDs.
    before_send: (event) => sanitizeEvent(event, registry),
    loaded: (sdk) => {
      const runner = startMeasurement(win, entries, sdk)
      runner.route(win.location.pathname)
    },
  }
  stub._i.push([apiKey, options, 'posthog'])
  win.posthog = stub
  const script = win.document.createElement('script')
  script.src = host + '/static/array.js'
  script.async = true
  win.document.head.appendChild(script)
  return null
}
