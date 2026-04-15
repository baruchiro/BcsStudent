'use client'

import Link from './Link'

interface MobileNavItemProps {
  href: string
  title: string
  callToActionButton?: boolean
  onToggleNav: () => void
}

const MobileNavItem = ({ href, title, callToActionButton, onToggleNav }: MobileNavItemProps) => {
  const classes = callToActionButton
    ? 'inline-block rounded-md bg-primary-500 px-6 py-3 text-2xl font-bold text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500'
    : 'text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100'
  return (
    <div className="px-12 py-4">
      <Link href={href} className={classes} onClick={onToggleNav}>
        {title}
      </Link>
    </div>
  )
}

export default MobileNavItem
