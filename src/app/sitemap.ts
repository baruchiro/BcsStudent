import fs from 'fs'
import { MetadataRoute } from 'next'
import path from 'path'
import { allBlogs } from 'contentlayer2/generated'
import siteMetadata from '@/data/siteMetadata'

// Discover every static (non-dynamic) page route under src/app by walking the
// App Router tree, so new top-level pages are picked up automatically instead
// of being maintained by hand (and missed).
function getStaticRoutes(appDir = path.join(process.cwd(), 'src/app')): string[] {
  const routes: string[] = []

  const walk = (dir: string, segments: string[]) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    if (entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js|mdx)$/.test(e.name))) {
      routes.push(segments.join('/'))
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const name = entry.name
      // Skip dynamic segments ([slug], [...slug]) and private folders (_dir).
      if (name.startsWith('[') || name.startsWith('_')) continue
      // Route groups (group) and parallel routes @slot don't affect the URL.
      const childSegments =
        name.startsWith('(') || name.startsWith('@') ? segments : [...segments, name]
      walk(path.join(dir, name), childSegments)
    }
  }

  walk(appDir, [])
  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const lastModified = new Date().toISOString().split('T')[0]

  const staticRoutes = getStaticRoutes().map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified,
  }))

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  return [...staticRoutes, ...blogRoutes]
}
