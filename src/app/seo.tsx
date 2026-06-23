import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface SocialMetadataProps {
  title: string
  description?: string
  images?: (string | { url: string })[]
  url?: string
  // Extra Open Graph fields (e.g. type 'article', publishedTime, authors).
  openGraph?: Record<string, unknown>
}

// Shared Open Graph + Twitter card metadata. Used by the root layout,
// page-level metadata (genPageMetadata), and blog posts so the social-card
// shape lives in one place instead of being copied per route.
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
