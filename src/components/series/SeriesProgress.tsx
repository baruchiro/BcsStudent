import { getStepState, type StepState } from '@/utils/series'

interface SeriesProgressProps {
  total: number
  current: number
  isLevelled: boolean
  size?: 'sm' | 'md'
  className?: string
}

const segmentClass: Record<StepState, string> = {
  done: 'bg-primary-500/40',
  current: 'bg-primary-500',
  upcoming: 'bg-gray-900/10 dark:bg-white/10',
}

// One segment per post, filled up to the current one. Decorative: callers provide the text.
export default function SeriesProgress({
  total,
  current,
  isLevelled,
  size = 'md',
  className = '',
}: SeriesProgressProps) {
  const sizeClass = size === 'sm' ? 'h-1 gap-0.5' : 'h-1.5 gap-1'
  const steps = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <span aria-hidden="true" className={`flex ${sizeClass} ${className}`}>
      {steps.map((step) => (
        <span
          key={step}
          className={`flex-1 rounded-full ${segmentClass[getStepState(step, current, isLevelled)]}`}
        />
      ))}
    </span>
  )
}
