import CategoryIndicator from '@/components/CategoryIndicator'
import Comments from '@/components/Comments'
import IdeaProperties from '@/components/IdeaProperties'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getCoverImage } from '@/utils/coverImage'
import type { Authors, Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { ReactNode } from 'react'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/master/data/${path}`
const discussUrl = (path) =>
  `https://x.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, images } = content
  const basePath = path.split('/')[0]
  const coverImage = getCoverImage(images)

  const renderAuthorSocialLink = (author: CoreContent<Authors>) => {
    if (author.twitter) {
      return (
        <Link
          href={author.twitter}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {author.twitter.replace('https://twitter.com/', '@')}
        </Link>
      )
    }

    if (author.linkedin) {
      return (
        <Link
          href={author.linkedin}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {author.linkedin.replace('https://www.linkedin.com/', '')}
        </Link>
      )
    }
    return null
  }

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header className="relative py-16 sm:py-24">
          {coverImage && (
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <Image src={coverImage} alt={title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-900/90" />
            </div>
          )}
          <div className="relative space-y-1 text-center">
            <dl className="space-y-10">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd
                  className={`text-base font-medium leading-6 ${
                    coverImage ? 'text-white/90' : 'text-gray-900 dark:text-white/90'
                  } drop-shadow`}
                >
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                </dd>
              </div>
            </dl>
            <div className="space-y-2">
              <PageTitle>
                <span
                  className={`${coverImage ? 'text-white' : 'text-gray-900 dark:text-white'} drop-shadow-md`}
                >
                  {title}
                </span>
              </PageTitle>
              <CategoryIndicator post={content} hasCoverImage={!!coverImage} />
            </div>
          </div>
        </header>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          <Link
                            href={`/authors/${author.slug}`}
                            className="hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {author.name}
                          </Link>
                        </dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>{renderAuthorSocialLink(author)}</dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                <IdeaProperties post={content} />
                {children}
              </div>
              <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href={discussUrl(path)} rel="nofollow">
                      דיון בטוויטר
                    </Link>
                    {` • `}
                    <Link href={editUrl(filePath)}>צפייה ב-GitHub</Link>
                  </div>
                  <iframe
                    src="https://github.com/sponsors/baruchiro/button"
                    title="Sponsor baruchiro"
                    height="32"
                    width="114"
                    style={{ border: 0, borderRadius: '6px' }}
                  />
                </div>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      תגיות
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          המאמר הקודם
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          המאמר הבא
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="חזרה לבלוג"
                >
                  חזרה לבלוג &larr;
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
