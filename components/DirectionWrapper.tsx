'use client'

import { ReactNode } from 'react'

interface DirectionWrapperProps {
  children: ReactNode
  language?: string
  className?: string
}

export default function DirectionWrapper({
  children,
  language = 'he',
  className = '',
}: DirectionWrapperProps) {
  const isEnglish = language === 'en'
  const directionClass = isEnglish ? 'dir-ltr' : 'dir-rtl'

  return (
    <div className={`${directionClass} ${className}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      {children}
    </div>
  )
}
