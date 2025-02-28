import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { Blog } from '@/types'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

interface Props {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: {
    currentPage: number
    totalPages: number
  }
}

export default function IdeasListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            רעיונות לאפליקציות שאני חושב שיכולות להיות שימושיות
          </p>
        </div>
        <ul>
          {displayPosts.map((post) => {
            const { slug, date, title, summary, tags, status } = post
            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/ideas/${slug}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                        <span
                          className={`mr-3 text-sm font-medium ${
                            status === 'done'
                              ? 'text-green-600 dark:text-green-400'
                              : status === 'in-progress'
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {status === 'done'
                            ? '✓ הושלם'
                            : status === 'in-progress'
                              ? '🚧 בתהליך'
                              : '📝 טיוטה'}
                        </span>
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <nav className="flex justify-between">
            {pagination.currentPage > 1 && (
              <Link
                href={`/ideas/page/${pagination.currentPage - 1}`}
                rel="prev"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Previous
              </Link>
            )}
            {pagination.currentPage < pagination.totalPages && (
              <Link
                href={`/ideas/page/${pagination.currentPage + 1}`}
                rel="next"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Next
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  )
}
