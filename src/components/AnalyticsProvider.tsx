'use client'

import analytics from '@/lib/analytics'
import { useEffect } from 'react'
import { AnalyticsProvider as Provider } from 'use-analytics'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track initial page view
    analytics.page()
  }, [])

  return <Provider instance={analytics}>{children}</Provider>
}
