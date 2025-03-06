import Link from '@/components/Link'

interface StatusComponentProps {
  status: string
  implementation?: string
}

export default function StatusComponent({ status, implementation }: StatusComponentProps) {
  const content = status === 'done' ? '✓ הושלם' : '🚧 בתהליך'
  const statusStyle =
    status === 'done'
      ? 'text-sm font-medium text-green-600 dark:text-green-400'
      : 'text-sm font-medium text-yellow-600 dark:text-yellow-400'

  if (status === 'done' && implementation) {
    return (
      <Link
        href={implementation}
        className={`${statusStyle} no-underline hover:text-primary-600 dark:hover:text-primary-400`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content} ←
      </Link>
    )
  }
  return <span className={statusStyle}>{content}</span>
}
