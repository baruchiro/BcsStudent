export interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  tags: string[]
}

const projectsData: Project[] = [
  {
    title: 'PRStuck',
    description:
      'כלי CLI לניהול תלויות בין Pull Requests בגיטהאב. מאפשר מעקב אחר PRs תקועים, ארגון PRs לפי פיצ׳רים, וניהול היררכיית תלויות. נבנה עם Node.js ו-React.',
    imgSrc: '/static/images/projects/prstuck.png',
    href: 'https://github.com/baruchiro/gh-prstuck',
    tags: ['github', 'cli', 'nodejs', 'open-source'],
  },
  {
    title: 'כספיון',
    description:
      'אפליקציה לניהול תקציב המרכזת למקום אחד את כל פירוטי ההוצאות מחשבונות הבנק וכרטיסי האשראי. האפליקציה רצה מקומית במחשב, מאובטחת, וכוללת ייצוא נתונים ל-Excel, Google Sheets ו-YNAB.',
    imgSrc: '/static/images/projects/caspion.png',
    href: 'https://github.com/brafdlog/caspion',
    tags: ['open-source', 'כסף', 'כספיון'],
  },
]

export default projectsData
