// A series is declared in each post's frontmatter:
//   series: 'שרת ביתי'   display name, also the key that groups posts
//   seriesOrder: 2       position in the series (1..n, no gaps or duplicates)
//   seriesLabel: 'למתחילים'   optional, shown under the title in the series box
// A series where every post has a label is "levelled" (entry points per reader level);
// otherwise it is "ordered" (parts meant to be read in sequence).

export interface SeriesPost {
  title: string
  path: string
  series?: string
  seriesOrder?: number
  seriesLabel?: string
}

export interface SeriesEntry {
  title: string
  path: string
  label?: string
  isCurrent: boolean
}

export interface SeriesInfo {
  name: string
  isLevelled: boolean
  entries: SeriesEntry[]
  currentIndex: number
}

const byOrder = (a: SeriesPost, b: SeriesPost) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)

// `allPosts` should already exclude what the reader can't see (drafts in production)
export function getSeriesInfo(path: string, allPosts: SeriesPost[]): SeriesInfo | undefined {
  const post = allPosts.find((p) => p.path === path)
  if (!post?.series) return undefined
  const members = allPosts.filter((p) => p.series === post.series).sort(byOrder)
  const isLevelled = members.every((p) => p.seriesLabel)
  const entries = members.map((p) => ({
    title: p.title,
    path: p.path,
    label: p.seriesLabel,
    isCurrent: p.path === path,
  }))
  return {
    name: post.series,
    isLevelled,
    entries,
    currentIndex: entries.findIndex((e) => e.isCurrent),
  }
}

export type StepState = 'done' | 'current' | 'upcoming'

// Levelled series are entry points, not steps, so nothing before the current post counts as done
export function getStepState(step: number, current: number, isLevelled: boolean): StepState {
  if (step === current) return 'current'
  if (!isLevelled && step < current) return 'done'
  return 'upcoming'
}

export interface SeriesPosition {
  name: string
  order: number
  total: number
  isLevelled: boolean
}

// Where a post sits in its series, for post lists and search. `seriesData` is
// src/app/series-data.json, written by contentlayer's onSuccess.
export function getSeriesPosition(
  post: SeriesPost,
  seriesData: Record<string, { total: number; isLevelled: boolean }>
): SeriesPosition | undefined {
  if (!post.series || !post.seriesOrder) return undefined
  const data = seriesData[post.series]
  if (!data) return undefined
  return { name: post.series, order: post.seriesOrder, ...data }
}

// Checked over all posts, drafts included, so a typo can't hide behind a draft
export function validateSeries(posts: SeriesPost[]): string[] {
  const errors: string[] = []
  const groups = new Map<string, SeriesPost[]>()
  for (const p of posts) {
    if (!p.series) {
      if (p.seriesOrder !== undefined || p.seriesLabel !== undefined)
        errors.push(`${p.path}: seriesOrder/seriesLabel without series`)
      continue
    }
    if (p.seriesOrder === undefined) errors.push(`${p.path}: series without seriesOrder`)
    groups.set(p.series, [...(groups.get(p.series) || []), p])
  }
  for (const [name, members] of groups) {
    if (members.length < 2) {
      errors.push(`series "${name}" has only one post (${members[0].path}), is the name a typo?`)
      continue
    }
    const orders = members.map((p) => p.seriesOrder).sort((a, b) => (a ?? 0) - (b ?? 0))
    if (orders.some((o, i) => o !== i + 1))
      errors.push(
        `series "${name}": seriesOrder must be 1..${members.length} without gaps or duplicates, got ${orders.join(', ')}`
      )
  }
  return errors
}
