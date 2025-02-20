interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'PRStuck',
    description:
      'כלי CLI לניהול תלויות בין Pull Requests בגיטהאב. מאפשר מעקב אחר PRs תקועים, ארגון PRs לפי פיצ׳רים, וניהול היררכיית תלויות. נבנה עם Node.js ו-React.',
    imgSrc: '/static/images/projects/prstuck.png',
    href: 'https://github.com/baruchiro/gh-prstuck',
  },
]

export default projectsData
