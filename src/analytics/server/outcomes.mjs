// SERVER-ONLY INTEGRATION INTERFACE. Not imported by the website/browser, not an
// HTTP endpoint, and not connected to any receiver or PostHog project.
// A future approved adapter authenticates first, then atomically deduplicates and
// increments its aggregate in one transaction (or durable transactional outbox).
// Qualification must be an explicit business decision. No session linkage here.
export function createOutcomeReceiver({ verify, commitVerifiedOutcome }) {
  if (typeof verify !== 'function' || typeof commitVerifiedOutcome !== 'function') throw new TypeError('Verified source and atomic aggregate transaction required')
  return async function receive(opaqueMessage) {
    const result = await verify(opaqueMessage)
    if (result?.accepted !== true) return false
    if (!['inquiry_received', 'qualified_inquiry_confirmed', 'booking_confirmed'].includes(result.outcome)) return false
    if (!['inbox', 'business_review', 'cal_verified'].includes(result.source)) return false
    if ((result.outcome === 'booking_confirmed') !== (result.source === 'cal_verified')) return false
    if (result.outcome === 'qualified_inquiry_confirmed' && result.source !== 'business_review') return false
    // Do not spread receiver data, IDs, contact details, or booking payloads.
    return await commitVerifiedOutcome(result, { outcome: result.outcome, source: result.source })
  }
}
