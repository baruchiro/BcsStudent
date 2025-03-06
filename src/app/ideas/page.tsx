import { genPageMetadata } from '@/app/seo'
import PostListLayout from '@/layouts/PostListLayout'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({ title: 'רעיונות' })

export default function IdeasPage() {
  const ideas = allCoreContent(sortPosts(allBlogs.filter((post) => post.isIdea)))

  return (
    <PostListLayout
      posts={ideas}
      title="רעיונות לאפליקציות"
      description="רעיונות לאפליקציות שאני חושב שיכולות להיות שימושיות"
    />
  )
}
