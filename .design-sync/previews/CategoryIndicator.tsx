import { CategoryIndicator } from 'BscStudent'

export const Idea = () => (
  <div dir="rtl">
    <CategoryIndicator post={{ isIdea: true }} />
  </div>
)

export const OnCoverImage = () => (
  <div dir="rtl" className="rounded-lg bg-gray-900 p-6">
    <CategoryIndicator post={{ isIdea: true }} hasCoverImage />
  </div>
)
