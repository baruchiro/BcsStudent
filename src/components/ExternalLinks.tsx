import Link from './Link'

interface ExternalLinksProps {
  links: string[]
}

export default function ExternalLinks({ links }: ExternalLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold">קישורים נוספים</h2>
      <ul className="list-inside list-disc space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
