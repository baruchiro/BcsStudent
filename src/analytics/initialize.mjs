import posthog from 'posthog-js'
import { startMeasurement } from './browser.mjs'
import { createRegistry, privacyOptions } from './core.mjs'

let started = false
// The official posthog-js SDK, initialized once with the site's privacy options.
// The before_send guard runs before any event leaves the browser.
export function initialize(win, entries, apiKey) {
  if (win.__siteMeasurement) return win.__siteMeasurement
  if (started || !apiKey) return null
  started = true
  const registry = createRegistry(entries)
  posthog.init(apiKey, {
    ...privacyOptions(win, registry),
    loaded: (sdk) => {
      const runner = startMeasurement(win, entries, sdk)
      runner.route(win.location.pathname)
    },
  })
  return null
}
