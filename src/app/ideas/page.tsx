import { genPageMetadata } from '@/app/seo'
import IdeasListLayout from '@/layouts/IdeasListLayout'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({ title: 'רעיונות' })

export default function IdeasPage() {
  const ideas = allCoreContent(sortPosts(allBlogs.filter((post) => post.isIdea)))
  const pageNumber = 1
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
