# [Baruch Odem](https://baruchiro.com/)

To be a computer science student.

## About

My blog, mainly about programming, in Hebrew.

Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/), based on [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

[![Deployed on Vercel](https://vercel.com/button)](https://baruchiro.com/)

## מדדי התנהגות ובדיקות רגרסיה

המימוש שבאתר נמצא ב־`src/analytics` וב־`Measurement`: הוא שולח אירועי צפייה,
כוונת יצירת קשר, בחירת תגיות ומשאבים, ניווט מאומת וזמן פעילות מוערך דרך
טעינת PostHog הקיימת. אין SDK נוסף בזמן ריצה, replay או איסוף תוכן טפסים.
לחיצה אינה פנייה שהתקבלה או הזמנה שאושרה; אלה דורשות אינטגרציית שרת מאומתת
שאינה מחוברת במימוש הזה.

הבדיקות הן כלי פיתוח בלבד, לא קוד שנשלח לדפדפן הגולש. תלויות Playwright
ו־PostHog לבדיקה נמצאות ב־devDependencies בשורש; אין פרויקט QA נפרד.
תהליך `Analytics regression` מריץ אותן באירועי שינוי קוד ותוכן בבקשת שינוי
ובענף הראשי. כלי אימות מקור חד־פעמיים הוסרו; בדיקות הרגרסיה נשארות כדי
לתפוס שבר עתידי בפרטיות, בניווט ובאתחול ה־SDK.

הרצה מקומית עם Node בגרסה 22 ומעלה:

```sh
node .yarn/releases/yarn-3.6.1.cjs install --immutable --mode=skip-build
node .yarn/releases/yarn-3.6.1.cjs playwright install chromium
node .yarn/releases/yarn-3.6.1.cjs test:analytics
NEXT_PUBLIC_POSTHOG_KEY=public-local-test-key NEXT_TELEMETRY_DISABLED=1 INIT_CWD=$PWD node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 -p 4318
# במסוף נוסף
ANALYTICS_TEST_URL=http://127.0.0.1:4318 node .yarn/releases/yarn-3.6.1.cjs test:analytics:site
```

הבדיקות משתמשות במפתח דמה, מיירטות בקשות חיצוניות ומגישות SDK מקומי מקובע.
אין להשתמש במפתח אמיתי או בכתובת production/preview לבדיקות.
מדידת חשיפת השירותים מתבססת על העוגן הציבורי של כותרת השירותים הקיימת,
ללא סימון מעקב ב־MDX וללא קריאת טקסט מה־DOM. שינוי הכותרת דורש עדכון
העוגן ב־`browser.mjs`; בדיקת האתר הבנוי תתריע אם הוא חסר.

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
