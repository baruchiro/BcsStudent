// Supported Cal embed callbacks. Ignore their payload completely.
// An inline widget may not emit eventTypeSelected; absence is unknown, not zero.
export function wireBooking(cal, emit) {
  let ready = false
  const onReady = () => {
    if (!ready) {
      ready = true
      emit('booking_widget_ready', { placement: 'home_booking' })
    }
  }
  const onIntent = () => emit('booking_intent', { placement: 'home_booking' })
  cal('on', { action: 'linkReady', callback: onReady })
  cal('on', { action: 'eventTypeSelected', callback: onIntent })
  // No bookingSuccessful callbacks: server-side dedupe and trusted confirmation
  // require a separately approved receiver. Never read/forward raw booking data.
  return () => {
    cal('off', { action: 'linkReady', callback: onReady })
    cal('off', { action: 'eventTypeSelected', callback: onIntent })
  }
}
