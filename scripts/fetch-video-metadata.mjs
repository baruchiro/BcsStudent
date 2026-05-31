/**
 * Fetches metadata (title, publish date, summary) for every video in
 * data/videos/*.mdx from the host (YouTube) using youtubei.js, and writes it to
 * data/videos/_metadata.json.
 *
 * The .mdx files hold only the link (+ editorial tags) as the source of truth;
 * this script resolves the rest "on generate". It is wired into `yarn build`.
 *
 * It is intentionally non-fatal: any network/parse failure keeps the existing
 * cached metadata and exits 0, so a build never breaks if YouTube is
 * unreachable (e.g. offline, rate-limited).
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { Innertube } from 'youtubei.js'

const VIDEOS_DIR = path.join(process.cwd(), 'data', 'videos')
const CACHE_PATH = path.join(VIDEOS_DIR, '_metadata.json')

function getVideoId(url) {
  const match = url?.match(/(?:youtu\.be\/|\/shorts\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

function collectVideoUrls() {
  return readdirSync(VIDEOS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => matter(readFileSync(path.join(VIDEOS_DIR, file), 'utf-8')).data.url)
    .filter(Boolean)
}

function loadCache() {
  if (!existsSync(CACHE_PATH)) return {}
  try {
    return JSON.parse(readFileSync(CACHE_PATH, 'utf-8'))
  } catch {
    return {}
  }
}

function toISODate(value) {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10)
}

async function main() {
  const urls = collectVideoUrls()
  const cache = loadCache()

  let yt
  try {
    yt = await Innertube.create({ retrieve_player: false })
  } catch (err) {
    console.warn(
      `[fetch-video-metadata] Could not reach YouTube (${err.message}). Keeping cached metadata.`
    )
    return
  }

  for (const url of urls) {
    const id = getVideoId(url)
    if (!id) {
      console.warn(`[fetch-video-metadata] Could not parse a video id from "${url}", skipping.`)
      continue
    }

    try {
      const info = await yt.getInfo(id)
      const title = info.basic_info?.title ?? cache[id]?.title
      const date =
        toISODate(info.primary_info?.published?.text) ??
        toISODate(info.basic_info?.start_timestamp) ??
        cache[id]?.date
      const description = info.basic_info?.short_description ?? ''
      const summary = description.split('\n')[0].trim().slice(0, 200) || cache[id]?.summary || ''

      cache[id] = { ...cache[id], title, date, summary }
      console.log(`[fetch-video-metadata] ${id}: "${title}" (${date})`)
    } catch (err) {
      console.warn(
        `[fetch-video-metadata] Failed to fetch ${id}: ${err.message}. Keeping cached values.`
      )
    }
  }

  writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`)
  console.log(`[fetch-video-metadata] Wrote ${path.relative(process.cwd(), CACHE_PATH)}`)
}

main().catch((err) => {
  console.warn(`[fetch-video-metadata] Unexpected error: ${err.message}. Keeping cached metadata.`)
})
