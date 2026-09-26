import { seriesMark } from '@/utils/series'

interface SeriesMarkProps {
  post: { title: string; path: string; series?: string; seriesOrder?: number; seriesLabel?: string }
}

export default function SeriesMark({ post }: SeriesMarkProps) {
  const text = seriesMark(post)
  if (!text) return null
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      <span aria-hidden="true">📚 </span>
      סדרה: {text}
    </div>
  )
}
