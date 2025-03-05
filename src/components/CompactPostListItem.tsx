import DirectionWrapper from '@/components/DirectionWrapper'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

interface CompactPostListItemProps {
  post: CoreContent<Blog>
}

export default function CompactPostListItem({ post }: CompactPostListItemProps) {
  const slug = post.slug || post.path
  const { date, title, summary, tags, language = 'he' } = post

  return (
    <li className="py-5">
      <article className="flex flex-col space-y-2 pe-4 ps-6 xl:space-y-0">
        <dl>
          <dt className="sr-only">פורסם ב</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </dd>
        </dl>
        <div className="space-y-3">
          <DirectionWrapper language={language}>
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold leading-8 tracking-tight">
                <span className="text-gray-400 dark:text-gray-500" aria-hidden="true">
                  📝
                </span>
                <Link href={`/${slug}`} className="text-gray-900 dark:text-gray-100">
                  {title}
                </Link>
              </h2>
              <div className="flex flex-wrap">
                {tags?.map((tag) => <Tag key={tag} text={tag} />)}
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
          </DirectionWrapper>
        </div>
      </article>
    </li>
  )
}
