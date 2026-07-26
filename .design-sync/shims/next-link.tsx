import * as React from 'react'

// Bundle-time shim for `next/link`. The design-sync bundle runs in a bare
// browser with no Next.js App Router context, so the real next/link throws.
// For the DS components here (all use string hrefs) next/link renders a plain
// anchor anyway, so this preserves the true rendered output.
type Props = { href?: unknown } & React.AnchorHTMLAttributes<HTMLAnchorElement>
const Link = ({ href, children, ...rest }: Props) => (
  <a href={typeof href === 'string' ? href : '#'} {...rest}>
    {children}
  </a>
)
export default Link
