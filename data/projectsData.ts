import { allProjects, Project } from 'contentlayer/generated'

function extractGitHubInfo(url: string): { owner: string; repo: string } | null {
  try {
    const githubUrl = new URL(url)
    if (githubUrl.hostname !== 'github.com') return null

    const [, owner, repo] = githubUrl.pathname.split('/')
    return { owner, repo }
  } catch {
    return null
  }
}

async function fetchGitHubStars(owner: string, repo: string): Promise<number> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  })

  if (!response.ok) {
    console.warn(`Failed to fetch stars for ${owner}/${repo}: ${response.statusText}`)
    return 0
  }

  const data = await response.json()
  return data.stargazers_count || 0
}

async function getLanguageColors() {
  try {
    const colorsResponse = await fetch(
      'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json',
      { next: { revalidate: 86400 } } // Cache for 24 hours
    )
    if (!colorsResponse.ok) {
      throw new Error(`Failed to fetch language colors: ${colorsResponse.statusText}`)
    }
    const languageColorsCache: Record<string, { color: string }> = await colorsResponse.json()
    return languageColorsCache
  } catch (error) {
    console.warn('Failed to fetch language colors:', error)
    return null
  }
}

async function fetchGitHubLanguages(owner: string, repo: string): Promise<Project['language']> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  })

  if (!response.ok) {
    console.warn(`Failed to fetch languages for ${owner}/${repo}: ${response.statusText}`)
    return undefined
  }

  const languages = await response.json()
  const primaryLanguage = Object.entries(languages).sort(
    (a, b) => (b[1] as number) - (a[1] as number)
  )[0]?.[0]

  if (!primaryLanguage) return undefined

  const colors = await getLanguageColors()
  return {
    name: primaryLanguage,
    color: colors?.[primaryLanguage]?.color || '#6e7681', // medium gray
  }
}

export async function getEnhancedProjectsData(): Promise<Project[]> {
  // Pre-fetch language colors to have them ready for all projects
  await getLanguageColors()

  const enhancedProjects = await Promise.all(
    allProjects.map(async (project) => {
      if (!project.href) return project

      const githubInfo = extractGitHubInfo(project.href)
      if (!githubInfo) return project

      try {
        const [stars, language] = await Promise.all([
          fetchGitHubStars(githubInfo.owner, githubInfo.repo),
          fetchGitHubLanguages(githubInfo.owner, githubInfo.repo),
        ])
        return { ...project, stars, language }
      } catch (error) {
        console.error(`Error fetching GitHub data for ${project.href}:`, error)
        return project
      }
    })
  )

  // Sort by stars (projects without stars will be at the end)
  return enhancedProjects.sort((a, b) => (b.stars || 0) - (a.stars || 0))
}
