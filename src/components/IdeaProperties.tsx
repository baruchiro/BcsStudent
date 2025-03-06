import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import Link from './Link'
import StatusComponent from './StatusComponent'

interface IdeaPropertiesProps {
  post: CoreContent<Blog>
}

export default function IdeaProperties({ post }: IdeaPropertiesProps) {
  if (!post.isIdea) return null

  const hasStatus = post.status && post.status !== 'draft'
  const hasLinks = post.externalLinks && post.externalLinks.length > 0

  if (!hasStatus && !hasLinks) return null

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
      {hasStatus && (
        <div className="flex items-center justify-end gap-2">
          <StatusComponent status={post.status} implementation={post.implementation} />
        </div>
      )}
      {hasLinks && (
        <div className={hasStatus ? 'mt-4' : ''}>
          <h2 className="mb-2 text-lg font-bold">קישורים נוספים</h2>
          <ul className="list-inside list-disc space-y-1">
            {post.externalLinks.map((link, index) => (
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
      )}
    </div>
  )
}
