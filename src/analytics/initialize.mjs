import posthog from 'posthog-js'
import { contactChannel, privacyOptions } from './core.mjs'

let started = false
export function initialize(win, apiKey) {
  if (started || !apiKey) return
  started = true
  posthog.init(apiKey, {
    ...privacyOptions(win),
    loaded: () => {
      win.document.addEventListener('click', (event) => {
        const anchor = event.target?.closest?.('a[href]')
        const channel = anchor && contactChannel(anchor)
        if (channel) posthog.capture('contact_intent', { channel })
      })
    },
  })
}
