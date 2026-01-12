import '@/css/prism.css'
import 'katex/dist/katex.css'

import DirectionWrapper from '@/components/DirectionWrapper'
import { components } from '@/components/MDXComponents'
import siteMetadata from '@/data/siteMetadata'
import PostBanner from '@/layouts/PostBanner'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'
import type { Authors, Blog } from 'contentlayer/generated'
import { allAuthors, allBlogs, allCommunities } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
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

  const needsN8nDemo = post.body.code.includes('<n8n-demo')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {needsN8nDemo && (
        <>
          <Script
            src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js"
            strategy="beforeInteractive"
          />
          <Script
            src="https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js"
            strategy="beforeInteractive"
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js"
            type="module"
            strategy="beforeInteractive"
          />
        </>
      )}
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        relevantCommunities={relevantCommunities}
      >
        <DirectionWrapper language={post.language}>
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        </DirectionWrapper>
      </Layout>
    </>
  )
}
