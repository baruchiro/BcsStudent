import siteMetadata from '@/data/siteMetadata'
import { serializeJsonLd } from '@/utils/jsonLd'
import type { Blog } from 'contentlayer2/generated'

// Renders one JSON-LD @graph for a blog post: the contentlayer-generated
// BlogPosting node plus a BreadcrumbList. The @graph carries @context at the
// top level, so the BlogPosting node drops its own when nested.
export default function PostStructuredData({
  post,
  authorNames,
}: {
  post: Blog
  authorNames: string[]
}) {
  const article = { ...post.structuredData }
  delete article['@context']
  article.author = authorNames.map((name) => ({ '@type': 'Person', name }))

  const labels =
    post.language === 'en' ? { home: 'Home', blog: 'Blog' } : { home: 'ראשי', blog: 'בלוג' }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.home, item: siteMetadata.siteUrl },
      { '@type': 'ListItem', position: 2, name: labels.blog, item: `${siteMetadata.siteUrl}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteMetadata.siteUrl}/${post.path}`,
      },
    ],
  }

  const graph = { '@context': 'https://schema.org', '@graph': [article, breadcrumb] }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  )
}
