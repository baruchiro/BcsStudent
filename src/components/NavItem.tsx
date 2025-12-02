'use client'

import Link from './Link'

interface NavItemProps {
  href: string
  title: string
  callToActionButton?: boolean
  hideOnRootPage?: boolean
  isRootPage: boolean
}

const NavItem = ({ href, title, callToActionButton, hideOnRootPage, isRootPage }: NavItemProps) => {
  if (callToActionButton) {
    return (
      <div
        aria-hidden={hideOnRootPage && isRootPage ? 'true' : undefined}
        className={`hidden overflow-hidden transition-all duration-300 md:block ${
          hideOnRootPage && isRootPage ? 'max-w-0' : 'max-w-[200px]'
        }`}
      >
        <Link
          href={href}
          className="inline-block whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          {title}
        </Link>
      </div>
    )
  }

  if (hideOnRootPage) {
    return (
      <div
        className={`hidden overflow-hidden transition-all duration-300 md:block ${
          isRootPage ? 'max-w-0' : 'max-w-fit'
        }`}
        aria-hidden={isRootPage ? 'true' : undefined}
      >
        <Link href={href} className="font-medium text-gray-900 dark:text-gray-100">
          {title}
        </Link>
      </div>
    )
  }

  return (
    <Link href={href} className="hidden font-medium text-gray-900 dark:text-gray-100 md:block">
      {title}
    </Link>
  )
}

export default NavItem
