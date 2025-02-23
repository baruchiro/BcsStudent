declare module 'react-github-btn' {
  import { ComponentType } from 'react'

  interface GitHubButtonProps {
    href: string
    'data-color-scheme'?: string
    'data-size'?: 'large' | 'small'
    'data-show-count'?: boolean | string
    'aria-label'?: string
    children?: React.ReactNode
  }

  const GitHubButton: ComponentType<GitHubButtonProps>
  export default GitHubButton
} 