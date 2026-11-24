'use client'

import { useEffect } from 'react'
import { initialize } from '@/analytics/initialize.mjs'

export default function MeasurementClient({ apiKey }: { apiKey?: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') initialize(window, apiKey)
  }, [apiKey])
  return null
}
