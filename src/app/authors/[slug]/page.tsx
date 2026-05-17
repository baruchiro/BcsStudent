import { genPageMetadata } from '@/app/seo'
import { components } from '@/components/MDXComponents'
import AuthorLayout from '@/layouts/AuthorLayout'
import { allAuthors } from 'contentlayer2/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = allAuthors.find((p) => p.slug === slug)
  if (!author) {
    return {}
  }

  return genPageMetadata({
    title: author.name,
    description: author.occupation,
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = allAuthors.find((p) => p.slug === slug)

  if (!author) {
    notFound()
  }

  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} components={components} />
    </AuthorLayout>
  )
}

export async function generateStaticParams() {
  return allAuthors.map((author) => ({
    slug: author.slug,
  }))
}
