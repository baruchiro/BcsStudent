import Link from '@/components/Link'
import PostListItem from '@/components/PostListItem'
import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { CoreContent } from 'pliny/utils/contentlayer'

const MAX_DISPLAY = 15

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const publishedPosts = posts.filter((post) => !post.draft)

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            ברוכים הבאים
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!publishedPosts.length && 'לא נמצאו פוסטים'}
          {publishedPosts.slice(0, MAX_DISPLAY).map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </ul>
      </div>
      {publishedPosts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="flex items-center gap-1 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="כל הפוסטים"
          >
            <span>כל הפוסטים</span>
            <span>{'\u2190'}</span>
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
