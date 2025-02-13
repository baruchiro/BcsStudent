import { genPageMetadata } from '@/app/seo'
import AuthorLayout from '@/layouts/AuthorLayout'
import { allAuthors } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const author = allAuthors.find((p) => p.slug === params.slug)
  if (!author) {
    return {}
  }

  return genPageMetadata({
    title: author.name,
    description: author.occupation,
  })
}

export default function Page({ params }: { params: { slug: string } }) {
  const author = allAuthors.find((p) => p.slug === params.slug)

  if (!author) {
    notFound()
  }

  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}

export async function generateStaticParams() {
  return allAuthors.map((author) => ({
    slug: author.slug,
  }))
}
