import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'
import PostListLayout from '@/layouts/PostListLayout'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({ title: 'בלוג' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return (
    <PostListLayout
      posts={posts}
      title="בלוג"
      description={siteMetadata.description}
      showNewsletter={true}
      viewAllLink={{
        href: '/tags',
        text: 'כל הפוסטים',
      }}
    />
  )
}
