import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer2/source-files'
import { readFileSync, writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import path from 'path'
import readingTime from 'reading-time'
// Remark packages
import {
  extractTocHeadings,
  remarkCodeTitles,
  remarkExtractFrontmatter,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// Rehype packages
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import siteMetadata from './data/siteMetadata'

interface PlainArr {
  _array: string[]
  _typeId: symbol
  depth: number
  length: number
}

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const contentHeaderLinkIcon = fromHtmlIsomorphic(
  `
<span class="content-header-link">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
<path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
<path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
</svg>
</span>
`,
  { fragment: true }
)

/**
 * Count the occurrences of all tags across blog posts and projects and write to json file
 */
function createTagCount(allBlogs, allProjects, allCommunities, allVideos) {
  const tagCount: Record<string, number> = {}

  // Count blog post tags
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  // Count video tags
  allVideos.forEach((video) => {
    if (video.tags && (!isProduction || video.draft !== true)) {
      video.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  // Count project tags
  allProjects.forEach((project) => {
    project.tags?.forEach((tag) => {
      const formattedTag = slug(tag)
      if (formattedTag in tagCount) {
        tagCount[formattedTag] += 1
      } else {
        tagCount[formattedTag] = 1
      }
    })
  })

  allCommunities.forEach((community) => {
    community.tags?.forEach((tag) => {
      const formattedTag = slug(tag)
      if (formattedTag in tagCount) {
        tagCount[formattedTag] += 1
      }
    })
  })

  const sortedTagCount = Object.fromEntries(
    Object.entries(tagCount).sort(([, countA], [, countB]) => countB - countA)
  ) as Record<string, number>

  writeFileSync('./src/app/tag-data.json', JSON.stringify(sortedTagCount, null, 2))
}

function createSearchIndex(allBlogs, allVideos, allProjects) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    const publishedVideos = allVideos.filter((video) => !isProduction || video.draft !== true)
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify([...sortPosts(allBlogs), ...publishedVideos, ...allProjects])
    )
    console.log('Local search index generated...')
  }
}

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    language: { type: 'enum', default: 'he', options: ['he', 'en'] },
    series: { type: 'boolean', default: false },
    publications: { type: 'list', of: { type: 'string' } },
    // Idea-specific fields
    status: {
      type: 'enum',
      options: ['draft', 'in-progress', 'done'],
      default: 'draft',
    },
    externalLinks: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    implementation: {
      type: 'string',
      default: '',
    },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
    isIdea: {
      type: 'boolean',
      resolve: (doc) =>
        (doc.tags as unknown as PlainArr)?._array.map((tag) => tag.toLowerCase()).includes('idea'),
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    githubSponsor: { type: 'boolean', default: false },
    telegram: { type: 'string' },
    mastodon: { type: 'string' },
    facebook: { type: 'string' },
    youtube: { type: 'string' },
    instagram: { type: 'string' },
    threads: { type: 'string' },
    bluesky: { type: 'string' },
    layout: { type: 'string' },
    language: { type: 'enum', default: 'he', options: ['he', 'en'] },
  },
  computedFields,
}))

export const Community = defineDocumentType(() => ({
  name: 'Community',
  filePathPattern: 'communities/*.md',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: true },
    links: { type: 'json', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    imgSrc: { type: 'string' },
    href: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    stars: { type: 'number' },
    language: { type: 'json' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath,
    },
  },
}))

/**
 * Extract the 11-char YouTube id from any video url form
 * (youtu.be/ID, /shorts/ID, watch?v=ID, /embed/ID).
 */
function getVideoId(url: string) {
  const match = url?.match(/(?:youtu\.be\/|\/shorts\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : ''
}

/**
 * Metadata (title/date/summary) fetched from the host by
 * scripts/fetch-video-metadata.mjs. The video .mdx files hold only the link
 * (+ editorial tags); everything else is resolved from this generated cache.
 */
let videoMetadata: Record<string, { title?: string; date?: string; summary?: string }> = {}
try {
  videoMetadata = JSON.parse(
    readFileSync(path.join(root, 'data/videos/_metadata.json'), 'utf-8')
  ) as typeof videoMetadata
} catch {
  // No cache yet — computed fields fall back to safe defaults.
}

export const Video = defineDocumentType(() => ({
  name: 'Video',
  filePathPattern: 'videos/**/*.mdx',
  contentType: 'mdx',
  fields: {
    // The link is the single hand-authored source of truth (with editorial tags).
    url: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    draft: { type: 'boolean', default: false },
  },
  computedFields: {
    videoId: {
      type: 'string',
      resolve: (doc) => {
        const id = getVideoId(doc.url)
        if (!id) {
          throw new Error(
            `Unsupported video url in ${doc._raw.sourceFilePath}: "${doc.url}". Expected a YouTube link (youtu.be/<id>, /shorts/<id>, watch?v=<id>, /embed/<id>).`
          )
        }
        return id
      },
    },
    title: {
      type: 'string',
      resolve: (doc) => videoMetadata[getVideoId(doc.url)]?.title ?? doc.url,
    },
    date: {
      type: 'string',
      resolve: (doc) =>
        videoMetadata[getVideoId(doc.url)]?.date ?? new Date(0).toISOString().slice(0, 10),
    },
    summary: {
      type: 'string',
      resolve: (doc) => videoMetadata[getVideoId(doc.url)]?.summary ?? '',
    },
    image: {
      type: 'string',
      resolve: (doc) => `https://i.ytimg.com/vi/${getVideoId(doc.url)}/hqdefault.jpg`,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath,
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors, Community, Project, Video],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      // @ts-ignore
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: contentHeaderLinkIcon,
        },
      ],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs, allProjects, allCommunities, allVideos } = await importData()
    createTagCount(allBlogs, allProjects, allCommunities, allVideos)
    createSearchIndex(allBlogs, allVideos, allProjects)
  },
})
