---
title: מדריך Windows Service בעברית- התקנה
draft: false
date: 2012-04-05 12:24:00
---

<div dir="rtl" style="text-align:right;">
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;height:auto;margin-right:23px;text-align:right;vertical-align:baseline;width:auto;word-wrap:normal !important;padding:0;"><span class="TextRun Underlined SCX124670610" style="font-size:14pt;font-weight:bold;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">התקנה:  </span><span class="EOP SCX124670610" style="font-size:14pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">בשונה מיישומים אחרים, ש Visual Studio מתקין אוטומטית, את השירות נצטרך להתקין בעצמנו. </span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">קודם כל, מומלץ ללחוץ על F6 כדי לבדוק אם קיימות שגיאות. </span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">נגיע חזרה לחלון האפור של TheService.cs, נלחץ לחיצה ימנית ונבחר "Add Installer". יתווסף לנו קובץ ProjectInstaller.cs ועוד כמה Reference. </span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">כנס לקובץ ProjectInstaller.cs, ולחץ על ServiceInstaller1. גש לטבלת המאפיינים, ושים לב- </span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<ul class="BulletListStyle1 SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<li class="OutlineElement Rtl SCX124670610" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">המאפיין DisplayName- המאפיין שיוצג בטבלת השירותים. (אני כתבתי "MyServiceInWindows").</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX124670610" style="margin:0;padding:0;"></span></li>
<li class="OutlineElement Rtl SCX124670610" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">המאפיין Description- כתיבת תיאור לשירות, בתור הסבר שיוצג עם השירות ברשימת השירותים של Windows. (אני כתבתי "My experimental service (description)" ). </span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX124670610" style="margin:0;padding:0;"></span></li>
<li class="OutlineElement Rtl SCX124670610" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">המאפיין StartType- תוכל לעיין בהקדמה למעלה כדי להיזכר בערכים שלו.</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX124670610" style="margin:0;padding:0;"></span></li>
</ul>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">עכשיו פתח את Visual Studio Command Prompt (אני הייתי צריך "לפתוח כמנהל", אחרת זה לא עבד..) הקלד שם "installutil -i" ואז את מיקום היישום- קובץ exe שבתיקייה "binDebug". </span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="WACImageContainer Selected SCX124670610" style="margin:0;padding:0;"><img alt="" class="WACImage SCX124670610" height="640" src="https://word-edit.officeapps.live.com/we/GetImage.ashx?Fi=SDEC96D5B09D87A2E9!362&amp;C=1__BL2-SKY-WAC-WSHI&amp;ak=t%3d0%26s%3d0%26v%3d!ADDjYhbvrchTdE8&amp;ObjectDataBlobId={5abe51f7-52ea-5fb9-968a-d6a4b8f68308}{1}&amp;Word=1" width="596"/></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-family:Calibri, sans-serif;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">שים לב ל2 ההודעות בסוף, אלו מאשרות את ההתקנה-</span></div>
<div class="Paragraph Rtl SCX124670610" style="direction:rtl;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
<ul style="text-align:left;">
<li><span style="font-family:Calibri, sans-serif;"><span style="font-size:15px;">The Commit Phase completed successfuli.</span></span></li>
<li><span style="font-family:Calibri, sans-serif;"><span style="font-size:15px;">The transacted install has completed.</span></span></li>
</ul>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">אם סיימת עם זה-</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="WACImageContainer Selected SCX124670610" style="margin:0;padding:0;"><img alt="" class="WACImage SCX124670610" height="60" src="https://word-edit.officeapps.live.com/we/GetImage.ashx?Fi=SDEC96D5B09D87A2E9!362&amp;C=1__BL2-SKY-WAC-WSHI&amp;ak=t%3d0%26s%3d0%26v%3d!ADDjYhbvrchTdE8&amp;ObjectDataBlobId={220b9e40-75da-5851-bfc8-cee6b52fb22b}{1}&amp;Word=1" width="640"/></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">אולי תנסה להפעיל את שורת הפקודה של visual studio כמנהל, או שהשירות מותקן כבר (כך שתנסה להסיר אותו קודם, ראה בהמשך.)</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">פתח את MMC (פשוט כתוב ב"הפעלה" (באנגלית "Run...") את הראשי תיבות MMC), קובץ, הוספה של יישום snap-in, והוסף מהרשימה את "שירותים".</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">פתח את הרשימה ע"י דאבלקליק, וחפש את השירות שלך לפי השם שקראת לו במאפיין DisplayName בהתחלת חלק ההתקנה במדריך.</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">אם במאפיין StartType בחרת  Manual, לחץ פעמיים על השירות כדי להפעיל אותו. שים לב לתיאור שמופיע.</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">הוסף snap-in חדש, את "מציג האירועים", וחפש שם את השירות שלנו.</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">להסרת השירות (בשביל לשנות קוד הנך חייב להסיר את השירות, לשמור את השינויים ולהתקינו מחדש) -</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">אותה פקודה בדיוק, רק installutil -u.</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">בקשה אישית-</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">אם קראת את המדריך, ספר לי, שאני אדע שלא בזבזתי עליו זמן (לוקח זמן לכתוב מדריך מושקע..), וגם כי סתם אני נהנה להחליף דעות עם אנשים בנושאי תכנות למיניהם....</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX124670610" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX124670610" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">ברוך רוטקוף- baruchiro@gmail.com</span><span class="EOP SCX124670610" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
</div>

<div class="blogger-post-footer">אני תמיד שמח לתגובות!
(גם אם זה אחרי שנה, שנתיים, עשר..)

ברוך רוטקוף.

</div>
