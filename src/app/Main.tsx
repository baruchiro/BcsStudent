import DirectionWrapper from '@/components/DirectionWrapper'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import Image from 'next/image'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { formatDate } from 'pliny/utils/formatDate'
import { getCoverImage } from '@/utils/coverImage'
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
          {publishedPosts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, language = 'he' } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <div className="space-y-4">
                      <dl>
                        <dt className="sr-only">פורסם ב</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      {post.images && (
                        <div>
                          <Image
                            src={getCoverImage(post.images)}
                            alt={title}
                            width={200}
                            height={150}
                            className="rounded-lg object-cover object-center"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-5 xl:col-span-3">
                      <DirectionWrapper language={language}>
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </DirectionWrapper>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="flex items-center gap-1 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`קרא עוד: "${title}"`}
                        >
                          <span>קרא עוד</span>
                          <span>{'\u2190'}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
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
