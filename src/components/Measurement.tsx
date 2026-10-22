import { allBlogs, allCommunities, allProjects, allVideos } from 'contentlayer2/generated'
import { slug } from 'github-slugger'
import MeasurementClient from './MeasurementClient'
import siteMetadata from '@/data/siteMetadata'

export default function Measurement() {
  const blogs = allBlogs.filter((item) => !item.draft)
  const videos = allVideos.filter((item) => !item.draft)
  const tags = new Set(
    [...blogs, ...videos, ...allProjects, ...allCommunities]
      .flatMap((item) => item.tags || [])
      .map((tag) => slug(tag).normalize('NFC'))
  )
  // Only public canonical keys cross this boundary, never author/contact metadata.
  const entries = [
    ...blogs.map((item) => ({ path: '/' + item.path, type: 'article' })),
    ...allProjects.map((item) => ({
      path: '/' + item.path,
      type: 'project',
      destinations: item.href ? [item.href] : [],
    })),
    ...allCommunities.map((item) => ({
      path: '/' + item.path,
      type: 'community',
      destinations: Object.values(item.links || {}),
    })),
    ...videos.map((item) => ({ path: '/' + item.path, type: 'video', destinations: [item.url] })),
    ...[...tags].map((tag) => ({ path: '/tags/' + tag, type: 'tag_results' })),
    ...['/blog', '/tags', '/projects', '/communities', '/videos'].map((path) => ({
      path,
      type: 'index',
    })),
  ]
  return (
    <MeasurementClient
      entries={entries}
      apiKey={siteMetadata.analytics?.posthogAnalytics?.posthogProjectApiKey}
    />
  )
}
