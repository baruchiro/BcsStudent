'use client'

import { useEffect } from 'react'
import { initialize } from '@/analytics/initialize.mjs'

export default function MeasurementClient({
  apiKey,
  siteUrl,
}: {
  apiKey?: string
  siteUrl: string
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') initialize(window, apiKey, siteUrl)
  }, [apiKey, siteUrl])
  return null
}
