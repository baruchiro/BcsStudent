import Link from '@/components/Link'
import PostListItem from '@/components/PostListItem'
import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { CoreContent } from 'pliny/utils/contentlayer'

interface ViewAllLink {
  href: string
  text: string
}

interface Props {
  posts: CoreContent<Blog>[]
  title: string
  description?: string
  showNewsletter?: boolean
  maxDisplay?: number
  viewAllLink?: ViewAllLink
}

export default function PostListLayout({
  posts,
  title,
  description,
  showNewsletter = false,
  maxDisplay = 15,
  viewAllLink,
}: Props) {
  const publishedPosts = posts.filter((post) => !post.draft)
  const displayPosts = viewAllLink ? publishedPosts.slice(0, maxDisplay) : publishedPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          {description && (
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!displayPosts.length && 'לא נמצאו פוסטים'}
          {displayPosts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </ul>
      </div>
      {viewAllLink && publishedPosts.length > maxDisplay && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href={viewAllLink.href}
            className="flex items-center gap-1 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={viewAllLink.text}
          >
            <span>{viewAllLink.text}</span>
            <span>{'\u2190'}</span>
          </Link>
        </div>
      )}
      {showNewsletter && siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
