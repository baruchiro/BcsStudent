import siteMetadata from '@/data/siteMetadata'
import PostListLayout from '@/layouts/PostListLayout'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export default function Home() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return (
    <PostListLayout
      posts={posts}
      title="ברוכים הבאים"
      description={siteMetadata.description}
      showNewsletter={true}
      viewAllLink={{
        href: '/blog',
        text: 'כל הפוסטים',
      }}
    />
  )
}
