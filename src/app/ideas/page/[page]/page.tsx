import { genPageMetadata } from '@/app/seo'
import IdeasListLayout from '@/layouts/IdeasListLayout'
import { Blog } from '@/types'
import { allBlogs } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 10

interface Props {
  params: {
    page: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parseInt(params.page)
  if (Number.isNaN(page)) {
    return {}
  }

  return genPageMetadata({
    title: `רעיונות דף ${page}`,
    description: `רעיונות לאפליקציות דף ${page}`,
    path: `/ideas/page/${page}`,
  })
}

export const generateStaticParams = async () => {
  const ideas = (allBlogs as Blog[]).filter((post) => post.isIdea)
  const totalPages = Math.ceil(ideas.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function Page({ params }: Props) {
  const ideas = allCoreContent(sortPosts((allBlogs as Blog[]).filter((post) => post.isIdea)))
  const pageNumber = parseInt(params.page)

  if (
    Number.isNaN(pageNumber) ||
    pageNumber < 1 ||
    pageNumber > Math.ceil(ideas.length / POSTS_PER_PAGE)
  ) {
    notFound()
  }

  const initialDisplayPosts = ideas.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(ideas.length / POSTS_PER_PAGE),
  }

  return (
    <IdeasListLayout
      posts={ideas}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="רעיונות לאפליקציות"
    />
  )
}
