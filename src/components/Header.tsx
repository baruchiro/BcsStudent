'use client'

import profile from '@/data/baruch.png'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { usePathname } from 'next/navigation'
import Image from './Image'
import Link from './Link'
import MobileNav from './MobileNav'
import NavItem from './NavItem'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const pathname = usePathname()
  const isRootPage = pathname === '/'

  return (
    <header className="flex items-center justify-between py-10">
      {/* Hide logo on root page to avoid repetition with AuthorLayout profile photo.
          Animate it moving toward center (where author photo is), scaling up, and fading out.
          On xl screens and above, logo is on the right side so it only moves down without centering.
          Below xl screens, logo is centered so it moves to center. */}
      <div
        className={`origin-top-right transition-all duration-300 rtl:origin-top-left ${
          isRootPage ? 'header-logo-transition-root pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="ms-3">
              <Image
                src={profile.src}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6 rtl:space-x-reverse sm:rtl:space-x-reverse">
        {headerNavLinks
          .filter((link) => !link.hideOnDesktop)
          .map((link) => (
            <NavItem
              key={link.title}
              href={link.href}
              title={link.title}
              callToActionButton={link.callToActionButton}
              hideOnRootPage={link.hideOnRootPage}
              isRootPage={isRootPage}
            />
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
