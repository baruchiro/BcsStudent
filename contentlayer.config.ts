import {
  ComputedFields,
  defineDocumentType,
  FieldDefs,
  makeSource,
} from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
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
import projectsData from './data/projectsData'
import siteMetadata from './data/siteMetadata'

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

/**
 * Count the occurrences of all tags across blog posts and projects and write to json file
 */
function createTagCount(allBlogs) {
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

  // Count project tags
  projectsData.forEach((project) => {
    project.tags.forEach((tag) => {
      const formattedTag = slug(tag)
      if (formattedTag in tagCount) {
        tagCount[formattedTag] += 1
      } else {
        tagCount[formattedTag] = 1
      }
    })
  })

  writeFileSync('./src/app/tag-data.json', JSON.stringify(tagCount))
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(sortPosts(allBlogs))
    )
    console.log('Local search index generated...')
  }
}

const blogFields: FieldDefs = {
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
}

const blogComputedFields: ComputedFields = {
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
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/!(ideas)/*.mdx',
  contentType: 'mdx',
  fields: blogFields,
  computedFields: blogComputedFields,
}))

export const Idea = defineDocumentType(() => ({
  name: 'Idea',
  filePathPattern: 'blog/ideas/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...blogFields,
    status: {
      type: 'enum' as const,
      options: ['draft', 'in-progress', 'done'],
      default: 'draft',
    },
    externalLinks: {
      type: 'list' as const,
      of: { type: 'string' as const },
      default: [],
    },
    implementation: {
      type: 'string' as const,
      default: '',
    },
  },
  computedFields: blogComputedFields,
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
    layout: { type: 'string' },
    language: { type: 'enum', default: 'he', options: ['he', 'en'] },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Idea, Authors],
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
    const { allBlogs } = await importData()
    createTagCount(allBlogs)
    createSearchIndex(allBlogs)
  },
})
