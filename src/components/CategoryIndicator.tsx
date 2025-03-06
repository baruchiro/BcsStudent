import type { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

interface CategoryIndicatorProps {
  post: CoreContent<Blog>
  hasCoverImage?: boolean
}

export default function CategoryIndicator({ post, hasCoverImage }: CategoryIndicatorProps) {
  const baseTextColorClass = hasCoverImage ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'

  return (
    <div className="flex items-center justify-center gap-4">
      {post.isIdea && (
        <div
          className={`flex items-center justify-center text-sm ${baseTextColorClass} drop-shadow`}
        >
          <span className="ml-1">💡</span>
          <span>רעיון</span>
        </div>
      )}
      {/* Add more category indicators here in the future */}
    </div>
  )
}
