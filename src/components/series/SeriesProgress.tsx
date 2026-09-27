interface SeriesProgressProps {
  total: number
  current: number
  // Levelled series are entry points, not steps, so only the current segment lights up
  isLevelled: boolean
  size?: 'sm' | 'md'
  className?: string
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
  return (
    <span aria-hidden="true" className={`flex ${sizeClass} ${className}`}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1
        const color =
          n === current
            ? 'bg-primary-500'
            : !isLevelled && n < current
              ? 'bg-primary-500/40'
              : 'bg-gray-900/10 dark:bg-white/10'
        return <span key={n} className={`flex-1 rounded-full ${color}`} />
      })}
    </span>
  )
}
