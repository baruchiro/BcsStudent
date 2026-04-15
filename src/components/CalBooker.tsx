'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

type CalBookerProps = {
  eventSlug: string
  username: string
  view?: 'month_view' | 'week_view' | 'column_view'
}

export default function CalBooker({ eventSlug, username, view = 'month_view' }: CalBookerProps) {
  const calLink = `${username}/${eventSlug}`

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'consulting' })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: view,
      })
    })()
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
