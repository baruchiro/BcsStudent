# [Baruch Odem](https://baruchiro.com/)

To be a computer science student.

## About

My blog, mainly about programming, in Hebrew.

Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/), based on [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

[![Deployed on Vercel](https://vercel.com/button)](https://baruchiro.com/)

## מדדי התנהגות ובדיקות

המימוש ב־`src/analytics` וב־`Measurement` שולח אירועי צפייה, כוונת יצירת קשר,
בחירת תגיות ומשאבים, ניווט מאומת וזמן פעילות מוערך, דרך ערכת ה־SDK הרשמית של
PostHog. מסנן פרטיות (`before_send`) מעביר רק שדות שמוגדרים בסכמה: בלי replay,
בלי איסוף תוכן טפסים ובלי זיהוי משתמשים. לחיצה אינה פנייה שהתקבלה, ואין ממשק
שרת למדידת פניות. מקור ההגעה נשלח בצפיות בלבד: אתר מפנה (כתובת ללא פרמטרים)
ופרמטרי `utm_*` בערכים בטוחים; בלי מזהי לחיצה כמו `gclid`.

בדיקות היחידה בודקות את מסנן הפרטיות, אימות הניווט ושעון הפעילות:

```sh
node .yarn/releases/yarn-3.6.1.cjs install --immutable --mode=skip-build
node .yarn/releases/yarn-3.6.1.cjs test:analytics
```

מדידת חשיפת השירותים מתבססת על העוגן הציבורי של כותרת השירותים הקיימת,
ללא סימון מעקב ב־MDX וללא קריאת טקסט מה־DOM. שינוי הכותרת דורש עדכון
העוגן ב־`browser.mjs`.

## Communities Collection

To add a new community:

1. Create a markdown file in `data/communities/` (e.g., `my-community.md`).
2. Use the following frontmatter structure:

```yaml
---
name: 'Community Name'
description: 'Short description in Hebrew.'
image: '/static/images/communities/community-image.png'
links:
  Telegram: 'https://t.me/community'
  Website: 'https://community.com'
tags:
  - tag-one
  - tag-two
---
```

- Store images in `public/static/images/communities/`.
- Use 2-5 tags, lowercase, hyphens for spaces, and prefer existing tags.
- Write all content in Hebrew and follow RTL conventions.
