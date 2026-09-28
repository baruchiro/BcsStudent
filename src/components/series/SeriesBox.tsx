import Link from '@/components/Link'
import SeriesProgress from '@/components/series/SeriesProgress'
import { getStepState, type SeriesEntry, type SeriesInfo, type StepState } from '@/utils/series'

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

const circleClass: Record<StepState, string> = {
  done: 'bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-300',
  current: 'bg-primary-500 text-white ring-4 ring-primary-100 dark:ring-primary-900/60',
  upcoming:
    'border border-gray-900/15 bg-white text-gray-600 dark:border-white/15 dark:bg-gray-900 dark:text-gray-300',
}

function StepCircle({ step, state }: { step: number; state: StepState }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums ${circleClass[state]}`}
    >
      {step}
    </span>
  )
}

function StepTitle({ entry }: { entry: SeriesEntry }) {
  if (entry.isCurrent) {
    return (
      <span aria-current="page" className="font-semibold text-gray-900 dark:text-gray-100">
        {entry.title}
      </span>
    )
  }
  return (
    <Link
      href={`/${entry.path}`}
      className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
    >
      {entry.title}
    </Link>
  )
}

function SeriesStep({
  entry,
  step,
  state,
  isLast,
}: {
  entry: SeriesEntry
  step: number
  state: StepState
  isLast: boolean
}) {
  return (
    <li className="relative flex gap-3 pb-4 last:pb-0">
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 start-3 top-7 w-px bg-gray-900/10 dark:bg-white/10"
        />
      )}
      <StepCircle step={step} state={state} />
      <div className="min-w-0 pt-0.5 leading-snug">
        <StepTitle entry={entry} />
        {entry.hasCustomLabel && (
          <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-300/80">{entry.label}</div>
        )}
      </div>
    </li>
  )
}

function SeriesSteps({ series }: { series: SeriesInfo }) {
  const current = series.currentIndex + 1
  return (
    <ol className="mt-4">
      {series.entries.map((entry, i) => (
        <SeriesStep
          key={entry.path}
          entry={entry}
          step={i + 1}
          state={getStepState(i + 1, current, series.isLevelled)}
          isLast={i === series.entries.length - 1}
        />
      ))}
    </ol>
  )
}

// Inline at the top of the post below xl: expanded on desktop, collapsed on mobile (two copies
// instead of JS, so there is no layout shift). From xl the post has a side column, and the series
// moves there next to the tags and prev/next links.
export default function SeriesBox({
  series,
  placement = 'inline',
}: {
  series: SeriesInfo
  placement?: 'inline' | 'sidebar'
}) {
  const label = `הסדרה ${series.name}`

  if (placement === 'sidebar') {
    return (
      <nav aria-label={label} className="hidden xl:block">
        <SeriesHeader series={series} />
        <SeriesSteps series={series} />
      </nav>
    )
  }

  const boxClass =
    'not-prose mb-10 rounded-xl border border-gray-900/10 bg-gray-50 p-4 text-sm dark:border-white/10 dark:bg-white/5'
  return (
    <nav aria-label={label} className="xl:hidden">
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
