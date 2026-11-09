---
פרויקט: PR Review Loop (תוסף VS Code + פלאגין Claude Code)
הצעת פוסט קצר (draft בלבד, לא לפרסום ישיר):

כותרת מוצעת: "של מי התור ב-PR הזה?"

מבנה מוצע:
- הבעיה: כש-Claude Code עובד על הערות סקירה, קל לאבד מי באמת בתור — אתה, Claude, CI או CodeRabbit.
- הפתרון: הפלאגין (`pr-review-loop` ב-skills של baruchiro) מנקז את השרשורים ל-`pr-status.json`; התוסף (`baruchiro.pr-review-loop` ב-Marketplace של VS Code) מציג בצד את ה-PR הבא, את סדר הסקירה ואת מי שבאמת צריך את התור עכשיו, עם רענון אוטומטי.
- התקנה: Marketplace + `claude plugin marketplace add baruchiro/skills && claude plugin install pr-review-loop@skills`.
- צילום מסך: `media/screenshot.png` מהמאגר.

הערות:
- אין חומר אישי חדש או סיפור אישי; הפוסט מוצע כטכני בלבד.
- אם יאושר בהמשך פוסט מלא, יידרשו תמונת שער ייחודית וחומר אישי רלוונטי.
- לא יתווסף לאתר כעת; נשאר כהצעה בתיאור ה-PR.
---
