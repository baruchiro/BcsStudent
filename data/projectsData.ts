export interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  tags: string[]
  stars?: number
  language?: {
    name: string
    color: string
  }
}

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
    projectsData.map(async (project) => {
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

const projectsData: Project[] = [
  {
    title: 'כספיון',
    description:
      'אפליקציה לניהול תקציב המרכזת למקום אחד את כל פירוטי ההוצאות מחשבונות הבנק וכרטיסי האשראי. האפליקציה רצה מקומית במחשב, מאובטחת, וכוללת ייצוא נתונים ל-Excel, Google Sheets ו-YNAB.',
    imgSrc: '/static/images/projects/caspion.png',
    href: 'https://github.com/brafdlog/caspion',
    tags: ['open-source', 'כסף', 'כספיון'],
  },
  {
    title: 'Overlay',
    description:
      'תוסף דפדפן המסייע למפתחים להעריך חבילות קוד פתוח לפני השימוש בהן. זמין עבור Firefox ו-Chrome, ומספק תובנות על החבילה ישירות ב-npm, PyPI, Stack Overflow ורג׳יסטרים נוספים.',
    imgSrc: '/static/images/projects/overlay.png',
    href: 'https://github.com/os-scar/overlay',
    tags: ['open-source', 'github', 'extension'],
  },
  {
    title: 'Israeli Bank Scrapers',
    description:
      'ספריית קוד פתוח המספקת כלים לגישה אוטומטית למידע מכל הבנקים וחברות האשראי הגדולות בישראל.',
    href: 'https://github.com/eshaham/israeli-bank-scrapers',
    tags: ['open-source', 'כסף', 'כספיון'],
  },
  {
    title: 'PRStuck',
    description:
      'כלי CLI לניהול תלויות בין Pull Requests בגיטהאב. מאפשר מעקב אחר PRs תקועים, ארגון PRs לפי פיצ׳רים, וניהול היררכיית תלויות. נבנה עם Node.js ו-React.',
    imgSrc: '/static/images/projects/prstuck.png',
    href: 'https://github.com/baruchiro/gh-prstuck',
    tags: ['github', 'cli', 'open-source', 'extension'],
  },
  {
    title: 'URL Title Preview',
    description:
      'תוסף ל-VSCode המציג כותרות של דפי אינטרנט בעת ריחוף מעל קישורים בקוד, מה שמקל על הבנת תוכן הקישורים מבלי לצאת מהעורך.',
    href: 'https://github.com/baruchiro/url-title-preview',
    tags: ['open-source', 'code', 'github', 'extension'],
  },
  {
    title: 'gh-local-changes',
    description:
      'תוסף ל-GitHub CLI הסורק תיקיות כדי למצוא מאגרי git עם ענפים שלא נדחפו או שינויים שטרם בוצע להם commit, ועוזר למפתחים לעקוב אחר העבודה המקומית שלהם.',
    href: 'https://github.com/baruchiro/gh-local-changes',
    tags: ['cli', 'git', 'open-source', 'extension'],
  },
  {
    title: '2MS (Too Many Secrets)',
    description:
      'כלי המסייע להגן על סיסמאות בכל קובץ או מערכת כמו CMS, צ׳אטים ומאגרי git, ומשפר את נהלי האבטחה בתהליכי הפיתוח.',
    href: 'https://github.com/Checkmarx/2ms',
    tags: ['open-source', 'code', 'git'],
  },
]

export default projectsData
