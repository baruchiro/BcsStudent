---
title: מדריך Windows Service בעברית- התקנה
draft: false
date: 2012-04-05 12:24:00
type: Blog
---






התקנה:   









בשונה
מיישומים אחרים, ש Visual Studio מתקין אוטומטית, את השירות נצטרך להתקין
בעצמנו.  









קודם
כל, מומלץ ללחוץ על F6 כדי לבדוק אם קיימות
שגיאות.  









נגיע
חזרה לחלון האפור של TheService.cs, נלחץ לחיצה ימנית ונבחר "Add
Installer". יתווסף לנו קובץ ProjectInstaller.cs ועוד כמה
Reference.  









כנס
לקובץ ProjectInstaller.cs, ולחץ על ServiceInstaller1. גש לטבלת
המאפיינים, ושים
לב-  





  - 
    
    
    
    המאפיין
    DisplayName- המאפיין שיוצג בטבלת השירותים. (אני כתבתי
    "MyServiceInWindows"). 
    
    
    
    

  - 
    
    
    
    המאפיין
    Description- כתיבת תיאור לשירות, בתור הסבר שיוצג עם השירות ברשימת
    השירותים של Windows. (אני כתבתי "My experimental service
    (description)"
    ).  
    
    
    
    

  - 
    
    
    
    המאפיין
    StartType- תוכל לעיין בהקדמה למעלה כדי להיזכר בערכים
    שלו. 
    
    
    
    













עכשיו
פתח את Visual Studio Command Prompt (אני הייתי צריך "לפתוח כמנהל", אחרת
זה לא עבד..) הקלד שם "installutil -i" ואז את מיקום היישום- קובץ exe
שבתיקייה
"binDebug".  









![](https://word-edit.officeapps.live.com/we/GetImage.ashx?Fi=SDEC96D5B09D87A2E9!362&C=1__BL2-SKY-WAC-WSHI&ak=t%3d0%26s%3d0%26v%3d!ADDjYhbvrchTdE8&ObjectDataBlobId=%7B5abe51f7-52ea-5fb9-968a-d6a4b8f68308%7D%7B1%7D&Word=1)

















שים
לב ל2 ההודעות בסוף, אלו מאשרות את ההתקנה-







  - The
    Commit Phase completed successfuli.
  - The
    transacted install has completed.







אם
סיימת עם
זה- 









![](https://word-edit.officeapps.live.com/we/GetImage.ashx?Fi=SDEC96D5B09D87A2E9!362&C=1__BL2-SKY-WAC-WSHI&ak=t%3d0%26s%3d0%26v%3d!ADDjYhbvrchTdE8&ObjectDataBlobId=%7B220b9e40-75da-5851-bfc8-cee6b52fb22b%7D%7B1%7D&Word=1)









אולי
תנסה להפעיל את שורת הפקודה של visual studio כמנהל, או שהשירות מותקן כבר
(כך שתנסה להסיר אותו קודם, ראה
בהמשך.) 

















פתח
את MMC (פשוט כתוב ב"הפעלה" (באנגלית "Run...") את הראשי תיבות MMC), קובץ,
הוספה של יישום snap-in, והוסף מהרשימה את
"שירותים". 









פתח
את הרשימה ע"י דאבלקליק, וחפש את השירות שלך לפי השם שקראת לו במאפיין
DisplayName בהתחלת חלק ההתקנה
במדריך. 









אם
במאפיין StartType בחרת  Manual, לחץ פעמיים על השירות כדי להפעיל אותו.
שים לב לתיאור
שמופיע. 









הוסף
snap-in חדש, את "מציג האירועים", וחפש שם את השירות
שלנו. 

















להסרת
השירות (בשביל לשנות קוד הנך חייב להסיר את השירות, לשמור את השינויים
ולהתקינו מחדש)
- 









אותה
פקודה בדיוק, רק installutil
-u. 

























בקשה
אישית- 









אם
קראת את המדריך, ספר לי, שאני אדע שלא בזבזתי עליו זמן (לוקח זמן לכתוב
מדריך מושקע..), וגם כי סתם אני נהנה להחליף דעות עם אנשים בנושאי
תכנות
למיניהם.... 









ברוך
רוטקוף-
baruchiro@gmail.com 









אני תמיד שמח לתגובות\! (גם אם זה אחרי שנה, שנתיים, עשר..) ברוך רוטקוף.


