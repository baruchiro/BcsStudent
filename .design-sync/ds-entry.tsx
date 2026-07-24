// design-sync bundle entry: re-export the blog's reusable UI components as
// named exports so they land on window.<globalName>.<Name>. These are the
// real shipped components from src/components — nothing is reimplemented.
export { default as Card } from '@/components/Card'
export { default as Tag } from '@/components/Tag'
export { default as Note } from '@/components/Note'
export { default as LanguageBadge } from '@/components/LanguageBadge'
export { default as CategoryIndicator } from '@/components/CategoryIndicator'
export { default as PageTitle } from '@/components/PageTitle'
export { default as StatusComponent } from '@/components/StatusComponent'
export { default as IdeaProperties } from '@/components/IdeaProperties'
export { default as GithubStarButton } from '@/components/GithubStarButton'
export { default as YouTubeShort } from '@/components/YouTubeShort'
