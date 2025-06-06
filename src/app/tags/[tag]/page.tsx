import { genPageMetadata } from '@/app/seo'
import tagData from '@/app/tag-data.json'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs, allCommunities } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { Metadata } from 'next'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

const isTagMatch = (tags: string[], targetTag: string) => {
  return tags.some((t) => t === targetTag || slug(t) === targetTag)
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  // Filter blog posts
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && isTagMatch(post.tags, tag)))
  )

  // Filter projects with the same logic
  const filteredProjects = projectsData.filter((project) => isTagMatch(project.tags, tag))

  // Filter communities with the same logic
  const filteredCommunities = allCommunities.filter((community) => isTagMatch(community.tags, tag))

  return (
    <ListLayout
      posts={filteredPosts}
      projects={filteredProjects}
      communities={filteredCommunities}
      title={title}
    />
  )
}
