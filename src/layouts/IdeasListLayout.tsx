import Link from '@/components/Link'
import PostListItem from '@/components/PostListItem'
import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

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
          {displayPosts.map((post) => (
            <PostListItem key={post.path} post={post} />
          ))}
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
