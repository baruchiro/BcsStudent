import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface SocialMetadataProps {
  title: string
  description?: string
  images?: (string | { url: string })[]
  url?: string
  openGraph?: Record<string, unknown>
}

export function genSocialMetadata({
  title,
  description = siteMetadata.description,
  images = [siteMetadata.socialBanner],
  url = './',
  openGraph,
}: SocialMetadataProps): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: siteMetadata.title,
      images,
      locale: siteMetadata.locale.replace('-', '_'),
      type: 'website',
      ...openGraph,
    } as Metadata['openGraph'],
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images,
    },
  }
}

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    ...genSocialMetadata({
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      images: image ? [image] : undefined,
    }),
    ...rest,
  }
}
