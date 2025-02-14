'use client'

import analytics from '@/lib/analytics'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function usePageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname

      analytics.page({
        url,
        path: pathname,
        search: searchParams.toString(),
        title: document.title,
      })
    }
  }, [pathname, searchParams])
}
