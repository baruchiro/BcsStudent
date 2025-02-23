'use client'

declare module 'react-github-btn'

import GitHubButton from 'react-github-btn'

interface GithubStarButtonProps {
  href: string
}

const extractGithubInfo = (url: string) => {
  try {
    const githubUrl = new URL(url)
    if (githubUrl.hostname !== 'github.com') return null

    const [owner, repo] = githubUrl.pathname.slice(1).split('/')
    if (!owner || !repo) return null

    return { owner, repo }
  } catch {
    return null
  }
}

export default function GithubStarButton({ href }: GithubStarButtonProps) {
  const githubInfo = extractGithubInfo(href)

  if (!githubInfo) return null

  const { owner, repo } = githubInfo

  return (
    <GitHubButton
      href={href}
      data-color-scheme="no-preference: light; light: light; dark: dark;"
      data-size="large"
      data-show-count="true"
      aria-label={`Star ${owner}/${repo} on GitHub`}
    >
      Star
    </GitHubButton>
  )
}
