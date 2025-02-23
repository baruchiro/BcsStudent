/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import tagData from '@/app/tag-data.json'
import DirectionWrapper from '@/components/DirectionWrapper'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { Project } from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import type { Blog } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  projects?: Project[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname?.split('/')[1] || ''
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            הקודם
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            הקודם
          </Link>
        )}
        <span>
          {currentPage} מתוך {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            הבא
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            הבא
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  projects = [],
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="sm:space-s-24 flex">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname?.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">כל הפוסטים</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  כל הפוסטים
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {pathname?.split('/tags/')[1] === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`צפה בפוסטים עם תגית ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="w-full ps-8">
            <ul>
              {projects.map((project) => (
                <li key={project.title} className="py-5">
                  <article className="flex flex-col space-y-2 rounded-lg border-s-4 border-primary-500 bg-gray-50 pe-4 ps-6 dark:bg-gray-900/50 xl:space-y-0">
                    <div className="space-y-3">
                      <DirectionWrapper language="he">
                        <div>
                          <h2 className="flex items-center gap-2 text-2xl font-bold leading-8 tracking-tight">
                            <span className="text-primary-500" aria-hidden="true">
                              📦
                            </span>
                            {project.href ? (
                              <Link
                                href={project.href}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {project.title}
                              </Link>
                            ) : (
                              <span className="text-gray-900 dark:text-gray-100">
                                {project.title}
                              </span>
                            )}
                          </h2>
                          <div className="flex flex-wrap">
                            {project.tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {project.description}
                        </div>
                      </DirectionWrapper>
                    </div>
                  </article>
                </li>
              ))}
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, language = 'he' } = post
                return (
                  <li key={path} className="py-5">
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
                              <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </DirectionWrapper>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
