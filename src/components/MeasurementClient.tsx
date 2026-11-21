'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initialize } from '@/analytics/initialize.mjs'

type Entry = { path: string; type: string }

export default function MeasurementClient({
  entries,
  apiKey,
}: {
  entries: Entry[]
  apiKey?: string
}) {
  const pathname = usePathname()
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    initialize(window, entries, apiKey)
    // SDK loading is asynchronous; its loaded callback handles first arrival.
    ;(
      window as Window & { __siteMeasurement?: { route: (path: string) => void } }
    ).__siteMeasurement?.route(pathname)
  }, [entries, apiKey, pathname])
  return null
}
