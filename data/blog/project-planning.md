---
title: פרויקט גמר - תכנון
draft: false
date: 2019-01-03 07:25:28
type: Blog
---
אחרי ה[פוסט](https://www.bcsstudent.com/ihis-computers/) בו תיארתי את
המודל העסקי של הפרויקט, הגיע הזמן להתחיל לעבוד.

בגלל שבסופו של דבר, בפרויקט גמר אנחנו מכוונים בראש ובראשונה לפיתוח תוכנה
מתוחכמת, והמוצר הוא בעדיפות שנייה, אנחנו צריכים להתמקד בפיתוח מערכת
המלצות. מבחינת מוצר, מערכת ההמלצות היא תוספת למערכת, והיא לא מכוונת
לפתור את הבעיה העיקרית שהגדרנו בהגדרת המוצר.

## מערכת ההמלצות

מערכת ההמלצות שאנחנו נכין תהיה מבוססת אלגוריתם Machine Learning (למידה
חישובית- ML). אלגוריתמי ML הם אלגוריתמים **חישוביים** שמתבססים על מידע
קיים- **מחשבים מסוימים** שידוע שמתאימים ל**אנשים מסוימים** (במקרה שלנו),
ויודעים להגיד לנו:

  - מה התוצאה שצפויה עבור קבוצה של ערכים נתונים (Regression).  
    במקרה שלנו, עבור המאפיינים והדרישות של המשתמש, איזה **דירוג** מחשב
    הוא יצטרך (ערך מספרי). **או**
  - לאיזה קבוצות אחרות של ערכים שייכת הקבוצה שלנו (Classification).  
    במקרה שלנו, עבור המאפיינים והדרישות של המשתמש, איזה מעבד הוא יצטרך.
    יש לנו כבר קבוצות משתמשים קיימות, מחולקות לפי מעבד, ואנחנו רוצים
    לראות לאיזה מהקבוצות הוא הכי קרוב.

הנקודה היא שאלגוריתמי ML הם אלגוריתמים מתמטיים, ורוב הזמן אפשר להבין
אותם בעזרת ציור של מערכת צירים (אם כי רוב הזמן הם עובדים במרחב שהוא
יותר מ3 ממדים, את זה קצת קשה לצייר ולדמיין).

## איסוף מידע

כמו שאמרנו, כדי להשתמש באלגוריתם למידה חישובית, אנחנו צריכים תוצאות
שידועות כבר, כדי לאמן מודל שיידע לתת תשובה לגבי שאלות חדשות. כדי
לאסוף את המידע, שכולל פרטים אישיים רלוונטיים (עיסוק, שימושים, תקציב)
וכולל את **התוצאה** (מפרט מחשב), חשבנו לכתוב תוכנה קטנה שתתן ערך- תתן
המלצות לשיפור המחשב הנוכחי.

### התוכנה

#### מטרה

התוכנה צריכה להיות **חוצת פלטפורמות** (Cross Platform), כלומר, רצה על כל
מערכת הפעלה (או לפחות שלושת המערכות העיקריות למחשבים- Windows, Linux,
iOS) כדי למנוע כמה שאפשר את הסטייה של הנתונים. אם המערכת שלנו תכיר רק
מחשבי Windows, היא תמליץ רק על המחשבים האלו, וייקח זמן עד שגם מחשבים
של Apple ייכנסו למערכת.

התוכנה תיקח את המידע על המפרט של המחשב, תשלח אותו לשרת שלנו, וכדי
שהמשתמש יוכל לקבל את ההמלצות שלנו לגבי המחשב הקיים, הוא ייצטרך
לענות על החלק של הפרטים האישיים.

#### שפת תכנות

אנחנו מכירים 2 שפות שיכולות להתקמפל ל3 מערכות ההפעלה- Python & C\#.NET
Core.  
בדקנו קודם כל את c\# כי זאת שפה שאני מכיר טוב, וראינו שאין תמיכה עדיין
בקריאת מפרט המחשב.

(אגב, כמו שאמרנו בפרק [קוד
פתוח](https://www.bcsstudent.com/open-source/), לא נשארנו להסתכל
מהצד. ראינו שחסרה תמיכה, וראינו
שה[Issue](https://github.com/dotnet/corefx/issues/22660) מסומן
כup-for-grabs, אז שאלנו איך אפשר לעזור. בסוף התשובה הייתה לכתוב קוד בC
שהוא משותף לכל מערכות ההפעלה, והרגשנו שזה קצת גדול עלינו מבחינת כמות
הזמן שאנחנו יכולים להשקיע.)

אז עברנו לאופציה השנייה- Python. בעזרת כלי שנקרא
[PyInstaller](http://www.pyinstaller.org/), ניתן ליצור מקוד פייתון קובץ
הרצה עבור כל מערכת הפעלה. בנוסף, בפייתון יש כמה ספריות שעוזרות לנו לקבל
את המידע על מפרט המחשב.

#### ממשק משתמש

אם למצוא שפת תכנות שיכולה לרוץ על כל מערכת הפעלה זה קצת מסובך, ליצור
ממשק משתמש כזה זה כמעט בלתי אפשרי. לC\# שהזכרנו קודם אין תמיכה בממשק
משתמש חוצה פלטפורמות (לפחות לא בצורה רשמית או מקובלת). לPython יש כמה
ספריות להצגת ממשק משתמש, אבל תחזוקה שלו ל3 מערכות ההפעלה היא קצת קשה.
גם אם במערכת אחת הוא עובד טוב, במערכת אחרת הוא מקבל פרופורציות לא נכונות
וכד'.

ואז חשבנו, שהFront-end הכי נפוץ, שכולם משתמשים בו בגלל מערכת הפעלה הוא
הWeb\!  
או בעברית, הצגת מסמך HTML & JS באמצעות הדפדפן, שאת זה כמובן יש לכל מחשב.

נוכל ליצור מראש מסמך HTML שמציג את הנתונים שאספנו וכפתור שליחה נניח,
ונוכל בעזרת Python ליצור אותו בזמן ההרצה, ולהגיד למערכת ההפעלה לפתוח
אותו. המשתמש יראה את הנתונים שאספנו, יתבקש לשלוח אותם, ואם השליחה תצליח,
הוא יועבר לממשק הWeb המרכזי של המוצר העיקרי, ומשם כבר יהיה לנו נוח יותר
לעבוד איתו.

### הסקר

בסופו של דבר, המטרה שלנו היא לאסוף מידע מהמשתמשים. מכיוון שהמשתמשים לא
משרתים שלנו, אם אנחנו רוצים לקבל מהם מידע אנחנו צריכים להכביד עליהם
כמה שפחות ולתת להם ערך כמה שיותר. לכן החלטנו ליצור את התוכנה שתיארתי.

אבל אז חשבנו בכל זאת, שקודם כל, בשביל איסוף ראשוני, אנחנו לא בהכרח
צריכים לקחת בחשבון את האנשים שהרכיבו מחשב בעצמם. לרוב האנשים יש
מחשב נייד, ומספיק לנו לדעת את הדגם שלו כדי למשוך בעצמנו את המפרט שלו
מהאינטרנט.

אז אם מדובר רק בפריט מידע אחד, נוכל **במקביל** לעשות סקר שיבקש מהמשתמשים
להזין את דגם המחשב שלהם.

אם השאלון עושה בעיות, [נשמח אם תענו עליו
כאן](https://goo.gl/forms/x3V0nr4VENdYSint2).

Loading...

**זהו, זה הסטטוס הנוכחי. אני משער שבפעם הבאה כבר נכתוב על הממשק של הכלי
המרכזי- אנחנו צריכים אותו כבר בשביל כלי האיסוף, כמו שאמרתי.**