---
title: פעולות מומלצות לפינוי מקום במחשב
draft: false
date: 2016-07-27 15:00:40
type: Blog
---
הגעתי למחשב נייח שהיה צריך להספיק לעדכן את Windows לפני ה29 ביולי, ולא
היה מספיק מקום פנוי כדי לקבל את העדכון.

**[ניקוי
הדיסק:](https://baruchiro.wordpress.com/2016/05/12/%d7%9e%d7%94-%d7%a2%d7%95%d7%a9%d7%99%d7%9d-%d7%9b%d7%a9%d7%94%d7%9e%d7%97%d7%a9%d7%91-%d7%90%d7%99%d7%98%d7%99/)**

\[gallery ids="96,93,92,91" columns="4"\]

ניקוי הדיסק נעשה על ידי לחיצה ימנית על אחד הכוננים (C, E...) בחירה
ב"מאפיינים" ולחיצה על "ניקוי הדיסק".

לאחר שהמחשב סורק את הכונן, אפשר לבחור באפשרות "נקה קבצי מערכת". כנראה
שלא תמחק משהו קריטי, פשוט יש שם קבצים שהמערכת נעזרת בהם לפעמים. מצד
שני, אם הייתה התקנה מחדש של Windows, גם יכולים להיות שם כמה עשרות GB
של ההתקנה הקודמת.

כדאי לעשות ניקוי לכל הכוננים שיש.

בדקתי את גודל הקבצים בכוננים בעזרת התוכנה
[WinDirStat](https://windirstat.info/), וראיתי שבכונן C (מחיצת מערכת)
התיקייה winsxs שוקלת כמעט 20GB, והיא מלאה באלפי קבצים קטנים. התיקייה
הזאת משמשת לעדכוני Windows. מכיוון שגם ככה תכננתי להתקין מערכת הפעלה
חדשה, לא ניסיתי למצוא לה פתרון, כי ידעתי שהיא לא תהיה רלוונטית אחרי
שנעדכן את המערכת.

במקום זה, העברתי את התיקייה של Dropbox לכונן D כדי לפנות מקום לעדכון של
Windows 10, מה שפינה לי מספיק מקום.

**גיבוי:**

תמיד מומלץ לגבות לכונן חיצוני לפני שמעלים קבצים לאינטרנט, למקרה שעשינו
משהו לא נכון, ונרצה להתחיל שוב מחדש. למרות שבמקרה שלי, הייתי צריך
לגבות 150GB של תמונות, ודווקא הגיבוי הוא זה שנהרס, והקבצים עלו
בצורה יפה לאינטרנט.

**עדכון:**

המחשב ניסה לחפש עדכונים כדי לקבל את העדכון לWindows 10. אחרי כמה שעות
הוא עדיין לא מצא, ובינתיים התעסקתי בשלבים הבאים.

לאחר מכן נזכרתי שאפשר להוריד ידנית את [כלי
העדכון](https://www.microsoft.com/he-il/software-download/windows10)
מהאתר של Microsoft.

**פתיחת חשבון גוגל חדש:**

על הדרך ביקשו ממני לשנות את כתובת המייל של חשבון גוגל. מכיוון שהדבר
היחיד שלא ניתן לשנות בחשבון זה כתובת המייל, הייתי צריך [לפתוח חשבון
גוגל חדש](https://accounts.google.com/signup) לפני שאני מגבה אליו את כל
הקבצים.

אחרי שפתחתי חשבון, אני נדרש לכמה פעולות כדי להמשיך את השימוש הרגיל
מהכתובת הישנה לכתובת החדשה.

כדי לקבל מיילים למייל החדש במקום למייל הישן, אני נכנס בחשבון הישן
להגדרות בGmail, לכרטיסייה "[העברה
וPOPIMAP](https://mail.google.com/mail/u/0/#settings/fwdandpop)" ומוסיף
כתובת להעברה. אני מקבל מייל אישור בGmail בחשבון הישן, ואני צריך לאשר.

כדי להשתמש בלוח השנה, אני נכנס ללוח השנה בחשבון הישן, ומשתף את הלוח עם
כתובת המייל החדשה. חשוב לשים לב שכתובת המייל החדשה מקבלת את כל הרשאות
הלוח. אפשר גם לשתף את שאר הלוחות הקיימים, או במידה והם לוחות ציבוריים,
לבדוק מה כתובת המייל שלהם, ולהוסיף אותם גם ללוח השנה בחשבון החדש.

את כל שאר הנתונים שמאוחסנים בגוגל, ניתן להוריד בעזרת [כלי
הארכיונים](https://takeout.google.com/settings/takeout).

**העלאת תמונות:** [פורסם בפוסט
נפרד](https://baruchiro.wordpress.com/2016/07/27/%d7%92%d7%99%d7%91%d7%95%d7%99-%d7%95%d7%a0%d7%99%d7%94%d7%95%d7%9c-%d7%aa%d7%9e%d7%95%d7%a0%d7%95%d7%aa-google-photos/).

**גיבוי וסנכרון מוזיקה:** [פורסם בפוסט
נפרד](https://baruchiro.wordpress.com/2016/07/27/%d7%a1%d7%a0%d7%9b%d7%a8%d7%95%d7%9f-%d7%9e%d7%95%d7%96%d7%99%d7%a7%d7%94-google-music/).

## **צור קשר**

\[contact-form subject="יצירת קשר לפוסט: פינוי מקום
במחשב"\]\[contact-field label="שם" type="name" required="1"
/\]\[contact-field label="כתובת דואר אלקטרוני" type="email" required="1"
/\]\[contact-field label="פירוט הפנייה" type="textarea" required="1"
/\]\[/contact-form\]