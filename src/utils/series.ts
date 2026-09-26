// A series is declared in each post's frontmatter:
//   series: 'שרת ביתי'   display name, also the key that groups posts
//   seriesOrder: 2       position in the series (1..n, no gaps or duplicates)
//   seriesLabel: 'למתחילים'   optional, shown instead of "חלק N"
// A series where every post has a label is "levelled" (entry points per reader level);
// otherwise it is "ordered" (parts meant to be read in sequence).

interface SeriesPost {
  title: string
  path: string
  draft?: boolean
  series?: string
  seriesOrder?: number
  seriesLabel?: string
}

export interface SeriesEntry {
  title: string
  path: string
  label: string
  hasCustomLabel: boolean
  isCurrent: boolean
}

export interface SeriesInfo {
  name: string
  isLevelled: boolean
  entries: SeriesEntry[]
  currentIndex: number
}

const byOrder = (a: SeriesPost, b: SeriesPost) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)

// `posts` should already exclude what the reader can't see (drafts in production)
export function getSeriesInfo(post: SeriesPost, posts: SeriesPost[]): SeriesInfo | undefined {
  if (!post.series) return undefined
  const members = posts.filter((p) => p.series === post.series).sort(byOrder)
  const isLevelled = members.every((p) => p.seriesLabel)
  const entries = members.map((p, i) => ({
    title: p.title,
    path: p.path,
    label: p.seriesLabel || `חלק ${i + 1}`,
    hasCustomLabel: Boolean(p.seriesLabel),
    isCurrent: p.path === post.path,
  }))
  return {
    name: post.series,
    isLevelled,
    entries,
    currentIndex: entries.findIndex((e) => e.isCurrent),
  }
}

// Short text for post lists and search results, e.g. "כסף · חלק 2"
export function seriesMark(post: SeriesPost): string | undefined {
  if (!post.series) return undefined
  return `${post.series} · ${post.seriesLabel || `חלק ${post.seriesOrder}`}`
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
    const expected = members.map((_, i) => i + 1)
    if (orders.some((o, i) => o !== expected[i]))
      errors.push(
        `series "${name}": seriesOrder must be 1..${members.length} without gaps or duplicates, got ${orders.join(', ')}`
      )
  }
  return errors
}
