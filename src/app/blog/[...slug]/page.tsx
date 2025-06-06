import '@/css/prism.css'
import 'katex/dist/katex.css'

import DirectionWrapper from '@/components/DirectionWrapper'
import { components } from '@/components/MDXComponents'
import SocialIcon, { SocialKind } from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import PostBanner from '@/layouts/PostBanner'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'
import type { Authors, Blog } from 'contentlayer/generated'
import { allAuthors, allBlogs, allCommunities } from 'contentlayer/generated'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allCoreContent, coreContent, sortPosts } from 'pliny/utils/contentlayer'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  // Find relevant communities by shared tags
  const postTags = (post.tags || []).map((t) => t.toLowerCase())
  const relevantCommunities = allCommunities
    .map((community) => {
      const sharedTags = (community.tags || [])
        .map((t) => t.toLowerCase())
        .filter((tag) => postTags.includes(tag))
      return sharedTags.length > 0
        ? { ...community, sharedTagsCount: sharedTags.length }
        : undefined
    })
    .filter((c): c is (typeof allCommunities)[number] & { sharedTagsCount: number } => Boolean(c))
    .sort((a, b) => b.sharedTagsCount - a.sharedTagsCount)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <DirectionWrapper language={post.language}>
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
          {relevantCommunities.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold">קהילות רלוונטיות</h2>
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relevantCommunities.map((community) => (
                  <li
                    key={community.slug}
                    className="flex items-center gap-4 rounded-lg border bg-white p-4 dark:bg-gray-900"
                  >
                    {community.image && (
                      <Image
                        src={community.image}
                        alt={community.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full border object-contain"
                      />
                    )}
                    <div>
                      <div className="text-lg font-semibold">{community.name}</div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span>{community.description}</span>
                        {community.links && (
                          <span className="ml-2 flex flex-row gap-2">
                            {Object.entries(community.links).map(([key, url]) => (
                              <SocialIcon
                                key={key}
                                kind={key as SocialKind}
                                href={url as string}
                                size={5}
                              />
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </DirectionWrapper>
      </Layout>
    </>
  )
}
