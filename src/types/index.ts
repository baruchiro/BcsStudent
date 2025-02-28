import { Blog as ContentlayerBlog } from 'contentlayer/generated'

export interface Blog extends ContentlayerBlog {
  isIdea?: boolean
  status?: 'draft' | 'in-progress' | 'done'
  externalLinks?: string[]
  implementation?: string
}
