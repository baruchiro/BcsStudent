import seriesData from '@/app/series-data.json'
import SeriesProgress from '@/components/series/SeriesProgress'
import { getSeriesPosition, type SeriesPost } from '@/utils/series'

interface SeriesBadgeProps {
  post: SeriesPost
}

export default function SeriesBadge({ post }: SeriesBadgeProps) {
  const position = getSeriesPosition(post, seriesData)
  if (!position) return null
  const { name, order, total, isLevelled } = position
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 py-1 pe-3 ps-2.5 text-xs font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
      <SeriesProgress
        total={total}
        current={order}
        isLevelled={isLevelled}
        size="sm"
        className="w-12"
      />
      <span className="sr-only">{`סדרה: ${name}, חלק ${order} מתוך ${total}`}</span>
      <span aria-hidden="true">{name}</span>
      <span aria-hidden="true" className="tabular-nums opacity-70">
        {order}/{total}
      </span>
    </div>
  )
}
