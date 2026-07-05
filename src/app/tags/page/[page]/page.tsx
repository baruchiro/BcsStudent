import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer2/generated'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 10

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  // Page 1 is served by /tags itself; starting at 2 avoids a duplicate URL.
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
    page: (i + 2).toString(),
  }))
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(page as string)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (Number.isNaN(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="כל הפוסטים"
    />
  )
}
