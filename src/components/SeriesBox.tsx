import Link from '@/components/Link'
import type { SeriesInfo } from '@/utils/series'

function SeriesList({ series }: { series: SeriesInfo }) {
  return (
    <ol className="mt-3 space-y-1">
      {series.entries.map((entry) => (
        <li key={entry.path} className="flex gap-2">
          <span className="shrink-0 text-gray-500 dark:text-gray-400">{entry.label}:</span>
          {entry.isCurrent ? (
            <span className="font-semibold text-gray-900 dark:text-gray-100" aria-current="page">
              {entry.title}
            </span>
          ) : (
            <Link href={`/${entry.path}`} className="link-primary">
              {entry.title}
            </Link>
          )}
        </li>
      ))}
    </ol>
  )
}

// Expanded on desktop, collapsed on mobile. Two copies instead of JS so there is no layout shift.
export default function SeriesBox({ series }: { series: SeriesInfo }) {
  const current = series.entries[series.currentIndex]
  // A labelled post (a level, or an appendix in an ordered series) shows its label
  const position = current?.hasCustomLabel
    ? current.label
    : `חלק ${series.currentIndex + 1} מתוך ${series.entries.length}`
  const summary = (
    <>
      <span className="font-semibold text-gray-900 dark:text-gray-100">סדרה: {series.name}</span>
      {position && <span className="text-gray-500 dark:text-gray-400"> · {position}</span>}
    </>
  )
  const boxClass =
    'not-prose mb-8 rounded-lg border-s-4 border-primary-500 bg-gray-50/50 p-4 text-sm dark:bg-gray-800/30'

  return (
    <nav aria-label={`הסדרה ${series.name}`}>
      <details className={`${boxClass} md:hidden`}>
        <summary className="cursor-pointer">{summary}</summary>
        <SeriesList series={series} />
      </details>
      <div className={`${boxClass} hidden md:block`}>
        <div>{summary}</div>
        <SeriesList series={series} />
      </div>
    </nav>
  )
}
