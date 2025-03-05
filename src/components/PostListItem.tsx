import DirectionWrapper from '@/components/DirectionWrapper'
import Link from '@/components/Link'
import StatusComponent from '@/components/StatusComponent'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getCoverImage } from '@/utils/coverImage'
import { Blog } from 'contentlayer/generated'
import Image from 'next/image'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

interface PostListItemProps {
  post: CoreContent<Blog>
}

export default function PostListItem({ post }: PostListItemProps) {
  const slug = post.slug || post.path
  const {
    date,
    title,
    summary,
    tags,
    language = 'he',
    images,
    isIdea,
    status,
    implementation,
  } = post

  return (
    <li className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <div className="space-y-4">
            <dl>
              <dt className="sr-only">פורסם ב</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
              </dd>
            </dl>
            {images && (
              <div>
                <Image
                  src={getCoverImage(images)}
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
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-2xl font-bold leading-8 tracking-tight">
                      {isIdea && (
                        <span className="text-gray-400 dark:text-gray-500" aria-hidden="true">
                          💡
                        </span>
                      )}
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    {isIdea && status && status !== 'draft' && (
                      <StatusComponent status={status} implementation={implementation} />
                    )}
                  </div>
                  <div className="flex flex-wrap">
                    {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                  </div>
                </div>
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
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
}
