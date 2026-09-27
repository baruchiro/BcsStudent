import Link from '@/components/Link'
import SeriesProgress from '@/components/series/SeriesProgress'
import type { SeriesInfo } from '@/utils/series'

function SeriesHeader({ series, collapsible }: { series: SeriesInfo; collapsible?: boolean }) {
  const current = series.currentIndex + 1
  const total = series.entries.length
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-primary-600 dark:text-primary-400">סדרה</div>
          <div className="truncate text-base font-bold text-gray-900 dark:text-gray-100">
            {series.name}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold tabular-nums text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
            <span className="sr-only">{`חלק ${current} מתוך ${total}`}</span>
            <span aria-hidden="true">
              {current}/{total}
            </span>
          </span>
          {collapsible && (
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-gray-900/40 transition-transform group-open:rotate-180 dark:text-white/40"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <SeriesProgress
        total={total}
        current={current}
        isLevelled={series.isLevelled}
        className="mt-3"
      />
    </>
  )
}

function SeriesSteps({ series }: { series: SeriesInfo }) {
  const lastIndex = series.entries.length - 1
  return (
    <ol className="mt-4">
      {series.entries.map((entry, i) => {
        const isDone = !series.isLevelled && i < series.currentIndex
        const circleClass = entry.isCurrent
          ? 'bg-primary-500 text-white ring-4 ring-primary-100 dark:ring-primary-900/60'
          : isDone
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-300'
            : 'border border-gray-900/15 bg-white text-gray-600 dark:border-white/15 dark:bg-gray-900 dark:text-gray-300'
        return (
          <li key={entry.path} className="relative flex gap-3 pb-4 last:pb-0">
            {i < lastIndex && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 start-3 top-7 w-px bg-gray-900/10 dark:bg-white/10"
              />
            )}
            <span
              aria-hidden="true"
              className={`relative grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums ${circleClass}`}
            >
              {i + 1}
            </span>
            <div className="min-w-0 pt-0.5 leading-snug">
              {entry.isCurrent ? (
                <span
                  aria-current="page"
                  className="font-semibold text-gray-900 dark:text-gray-100"
                >
                  {entry.title}
                </span>
              ) : (
                <Link
                  href={`/${entry.path}`}
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  {entry.title}
                </Link>
              )}
              {entry.hasCustomLabel && (
                <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-300/80">
                  {entry.label}
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// Expanded on desktop, collapsed on mobile. Two copies instead of JS so there is no layout shift.
export default function SeriesBox({ series }: { series: SeriesInfo }) {
  const boxClass =
    'not-prose mb-10 rounded-xl border border-gray-900/10 bg-gray-50 p-4 text-sm dark:border-white/10 dark:bg-white/5'

  return (
    <nav aria-label={`הסדרה ${series.name}`}>
      <details className={`group ${boxClass} md:hidden`}>
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <SeriesHeader series={series} collapsible />
        </summary>
        <SeriesSteps series={series} />
      </details>
      <div className={`${boxClass} hidden md:block`}>
        <SeriesHeader series={series} />
        <SeriesSteps series={series} />
      </div>
    </nav>
  )
}
