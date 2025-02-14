'use client'

import { usePageView } from '@/hooks/usePageView'
import analytics from '@/lib/analytics'
import { AnalyticsProvider as Provider } from 'use-analytics'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  usePageView()

  return <Provider instance={analytics}>{children}</Provider>
}
