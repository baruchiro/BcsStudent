export interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  tags: string[]
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
    tags: ['open-source', 'javascript', 'github', 'extension'],
  },
  {
    title: 'Israeli Bank Scrapers',
    description:
      'ספריית קוד פתוח המספקת כלים לגישה אוטומטית למידע מכל הבנקים וחברות האשראי הגדולות בישראל.',
    href: 'https://github.com/eshaham/israeli-bank-scrapers',
    tags: ['open-source', 'typescript', 'banking', 'scraping'],
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
