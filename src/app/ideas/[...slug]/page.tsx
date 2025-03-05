import '@/css/prism.css'
import 'katex/dist/katex.css'

import { genPageMetadata } from '@/app/seo'
import DirectionWrapper from '@/components/DirectionWrapper'
import { components } from '@/components/MDXComponents'
import { allBlogs, Blog } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

interface Props {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURI(params.slug.join('/'))
  const idea = (allBlogs as Blog[]).find((post) => post.isIdea && post.slug === slug)
  if (!idea) {
    return {}
  }

  return genPageMetadata({
    title: idea.title,
    description: idea.summary,
    date: idea.date,
    lastmod: idea.lastmod,
    path: `/ideas/${idea.slug}`,
    tags: idea.tags,
  })
}

export const generateStaticParams = async () => {
  return (allBlogs as Blog[])
    .filter((post) => post.isIdea)
    .map((idea) => ({
      slug: idea.slug.split('/'),
    }))
}

export default async function Page({ params }: Props) {
  const slug = decodeURI(params.slug.join('/'))
  const idea = (allBlogs as Blog[]).find((post) => post.isIdea && post.slug === slug)

  if (!idea) {
    notFound()
  }

  const mainContent = (
    <div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-1 pb-8 pt-6 md:space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {idea.title}
            </h1>
            <span
              className={`text-sm font-medium ${
                idea.status === 'done'
                  ? 'text-green-600 dark:text-green-400'
                  : idea.status === 'in-progress'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {idea.status === 'done'
                ? '✓ הושלם'
                : idea.status === 'in-progress'
                  ? '🚧 בתהליך'
                  : '📝 טיוטה'}
            </span>
          </div>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-3">
            <DirectionWrapper language={idea.language}>
              <MDXLayoutRenderer code={idea.body.code} components={components} />
            </DirectionWrapper>
          </div>
        </div>
      </div>
      {idea.externalLinks && idea.externalLinks.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">קישורים נוספים</h2>
          <ul className="list-inside list-disc space-y-2">
            {idea.externalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {idea.implementation && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">מימוש</h2>
          <div className="prose dark:prose-invert">{idea.implementation}</div>
        </div>
      )}
    </div>
  )

  return <>{mainContent}</>
}
