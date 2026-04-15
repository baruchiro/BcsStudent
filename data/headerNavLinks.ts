export interface HeaderNavLink {
  href: string
  title: string
  callToActionButton?: boolean
  hideOnRootPage?: boolean
  hideOnDesktop?: boolean
}

const headerNavLinks: HeaderNavLink[] = [
  { href: '/', title: 'ראשי', hideOnDesktop: true },
  { href: '/blog', title: 'בלוג' },
  { href: '/ideas', title: 'רעיונות' },
  { href: '/tags', title: 'תגיות' },
  { href: '/projects', title: 'פרויקטים' },
  { href: '/communities', title: 'קהילות' },
  { href: '/', title: 'קביעת פגישה', callToActionButton: true, hideOnRootPage: true },
]

export default headerNavLinks
