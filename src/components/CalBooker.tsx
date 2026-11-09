'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
import { wireBooking } from '@/analytics/booking.mjs'

type CalBookerProps = {
  eventSlug: string
  username: string
  view?: 'month_view' | 'week_view' | 'column_view'
}

export default function CalBooker({ eventSlug, username, view = 'month_view' }: CalBookerProps) {
  const calLink = `${username}/${eventSlug}`

  useEffect(() => {
    let cancelled = false
    let cleanup: (() => void) | undefined
    ;(async function () {
      const cal = await getCalApi({ namespace: 'consulting' })
      if (cancelled) return
      cleanup = wireBooking(cal, (event: string, properties: Record<string, string>) => {
        ;(
          window as Window & {
            __siteMeasurement?: {
              emit: (event: string, properties: Record<string, string>) => void
            }
          }
        ).__siteMeasurement?.emit(event, properties)
      })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: view,
      })
    })().catch(() => {
      console.warn('Booking widget initialization failed; booking measurement is unavailable.')
    })
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [view])

  return (
    <Cal
      namespace="consulting"
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: view }}
    />
  )
}
