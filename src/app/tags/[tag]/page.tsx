import { genPageMetadata } from '@/app/seo'
import tagData from '@/app/tag-data.json'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs, allCommunities, allProjects, allVideos } from 'contentlayer2/generated'
import { slug } from 'github-slugger'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag: tagParam } = await params
  const tag = decodeURI(tagParam)
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
  // Return the raw (decoded) tag. Next.js percent-encodes route params itself,
  // so passing encodeURI(tag) here double-encodes non-ASCII (Hebrew) tags: the
  // prerendered page then receives a still-encoded value, filters on it, and
  // renders an empty list with a garbled title. ASCII tags are unaffected.
  const paths = tagKeys.map((tag) => ({ tag }))
  return paths
}

const isTagMatch = (tags: string[], targetTag: string) => {
  return tags.some((t) => t === targetTag || slug(t) === targetTag)
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagParam } = await params
  const tag = decodeURI(tagParam)

  // Filter blog posts
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && isTagMatch(post.tags, tag)))
  )

  // Filter projects with the same logic
  const filteredProjects = allProjects.filter((project) => isTagMatch(project.tags, tag))

  // Filter communities with the same logic
  const filteredCommunities = allCommunities.filter((community) => isTagMatch(community.tags, tag))

  // Filter videos with the same logic
  const filteredVideos = sortPosts(
    allVideos.filter((video) => video.tags && isTagMatch(video.tags, tag))
  )

  // A tag with no matching content is a soft-404 — return a real 404 so search
  // engines drop it instead of clustering the thin page (e.g. converted tags).
  if (
    filteredPosts.length === 0 &&
    filteredProjects.length === 0 &&
    filteredCommunities.length === 0 &&
    filteredVideos.length === 0
  ) {
    notFound()
  }

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  return (
    <ListLayout
      posts={filteredPosts}
      projects={filteredProjects}
      communities={filteredCommunities}
      videos={filteredVideos}
      title={title}
    />
  )
}
