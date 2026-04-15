import {
  Bluesky,
  Discord,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Mastodon,
  Telegram,
  Threads,
  Twitter,
  WhatsApp,
  Youtube,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  telegram: Telegram,
  bluesky: Bluesky,
  discord: Discord,
  whatsapp: WhatsApp,
}

export type SocialKind = keyof typeof components

type SocialIconProps = {
  kind: SocialKind
  href: string | undefined
  size?: number
  tooltip?: string
}

const getSizeClasses = (size: number): string => {
  const sizeMap: Record<number, string> = {
    4: 'h-4 w-4',
    5: 'h-5 w-5',
    6: 'h-6 w-6',
    8: 'h-8 w-8',
    10: 'h-10 w-10',
    12: 'h-12 w-12',
  }
  return sizeMap[size] || 'h-8 w-8'
}

const SocialIcon = ({ kind, href, size = 8, tooltip }: SocialIconProps) => {
  const SocialSvg = components[kind]
  if (!SocialSvg) {
    console.warn(`SocialIcon: ${kind} not found`)
    return null
  }

  const invalidHref = !href?.trim() || (kind === 'mail' && !href?.startsWith('mailto:'))
  const displayTooltip = tooltip || (invalidHref ? 'בקש ממני להצטרף' : undefined)

  const iconElement = (
    <SocialSvg
      className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 ${getSizeClasses(size)}`}
    />
  )

  if (invalidHref) {
    return (
      <span
        className="relative cursor-default text-sm text-gray-500 transition hover:text-gray-600"
        title={displayTooltip}
      >
        <span className="sr-only">{kind}</span>
        {iconElement}
      </span>
    )
  }

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      title={displayTooltip}
    >
      <span className="sr-only">{kind}</span>
      {iconElement}
    </a>
  )
}

export default SocialIcon
