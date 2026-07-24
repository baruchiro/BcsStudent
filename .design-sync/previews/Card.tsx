import { Card } from 'BscStudent'

// olive brand-gradient cover so the image layout renders without a remote fetch
// olive brand-gradient covers so the image layout renders without a remote fetch
const svgCover = (label: string, from: string, to: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='544' height='306'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='544' height='306' fill='url(#g)'/><text x='32' y='170' font-family='sans-serif' font-size='40' font-weight='700' fill='white'>${label}</text></svg>`
  )
const cover = svgCover('caspion', '#6b8e23', '#a8f7b5')

export const Project = () => (
  <Card
    title="2MS (Too Many Secrets)"
    description="כלי המסייע להגן על סיסמאות בכל קובץ או מערכת כמו CMS, צ׳אטים ומאגרי git, ומשפר את נהלי האבטחה בתהליכי הפיתוח."
    imgSrc={svgCover('2MS', '#3a4a14', '#6b8e23')}
    href="https://github.com/Checkmarx/2ms"
    tags={['קוד פתוח', 'git', 'אבטחה']}
    language={{ name: 'Go', color: '#00ADD8' }}
  />
)

export const WithCover = () => (
  <Card
    title="כספיון"
    description="אפליקציה לניהול תקציב המרכזת למקום אחד את כל פירוטי ההוצאות מחשבונות הבנק וכרטיסי האשראי, רצה מקומית ומאובטחת."
    imgSrc={cover}
    href="https://github.com/brafdlog/caspion"
    tags={['קוד פתוח', 'כסף']}
    language={{ name: 'TypeScript', color: '#3178c6' }}
  />
)

export const Minimal = () => (
  <Card
    title="gh-local-changes"
    description="תוסף ל-GitHub CLI הסורק תיקיות כדי למצוא מאגרי git עם שינויים שטרם נדחפו."
    tags={['cli', 'git']}
  />
)
