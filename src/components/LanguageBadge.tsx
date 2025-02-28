interface LanguageBadgeProps {
  language: string
  color: string
}

export default function LanguageBadge({ language, color }: LanguageBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium"
      style={{
        backgroundColor: `${color}20`, // Using 20% opacity version of the color
        color: color,
      }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {language}
    </span>
  )
}
