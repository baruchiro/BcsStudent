import { components } from '@/components/MDXComponents'
import siteMetadata from '@/data/siteMetadata'
import AuthorLayout from '@/layouts/AuthorLayout'
import { Authors, allAuthors } from 'contentlayer2/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'

const sameAs = [
  siteMetadata.github,
  siteMetadata.linkedin,
  siteMetadata.twitter,
  siteMetadata.facebook,
  siteMetadata.instagram,
  siteMetadata.threads,
  siteMetadata.telegram,
  siteMetadata.bluesky,
  siteMetadata.mastodon,
].filter(Boolean)

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteMetadata.siteUrl}/#person`,
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      description: siteMetadata.description,
      sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteMetadata.siteUrl}/#website`,
      name: siteMetadata.title,
      url: siteMetadata.siteUrl,
      inLanguage: siteMetadata.language,
      description: siteMetadata.description,
      author: { '@id': `${siteMetadata.siteUrl}/#person` },
    },
  ],
}

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} components={components} />
      </AuthorLayout>
    </>
  )
}
