---
ID: 153
title: מדריך Windows Service בעברית- הקדמה
author: Baruch Rothkoff
post_excerpt: ""
layout: post
permalink: >
  https://www.bcsstudent.com/win-service-introduction/
published: true
date: 2012-04-05 12:09:00
---
<div dir="rtl" style="text-align:right;">
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">בס"ד</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:center;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun Underlined SCX192270846" style="font-size:20pt;font-weight:bold;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">כתיבה והתקנה של Windows Service</span><span class="EOP SCX192270846" style="font-size:20pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:center;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">תורגם מ</span><a class="Hyperlink SCX192270846" href="http://arcanecode.com/2007/05/21/windows-services-in-c-getting-started-part-1/" style="text-decoration:none;word-wrap:normal !important;margin:0;padding:0;"><span class="TextRun Underlined SCX192270846" style="color:blue;font-size:11pt;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">Arcane Code</span></a><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">  ע"י ברוך רוטקוף (baruchiro@gmail.com)</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:center;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">שימוש ב Visual Studio 2010</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:center;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">טוב, זה המדריך הראשון שלי, אז קבלו בהבנה, ואם יש הערות- אני אשמח לקבל! </span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:9pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">הערה: די בסוף כתיבת המדריך שמתי לב שלפרויקט קראתי Th</span><span class="TextRun SCX192270846" style="font-size:9pt;font-weight:bold;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">a</span><span class="TextRun SCX192270846" style="font-size:9pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">WindowsServiceProject (שים לב- a במקום e). מה שיכולתי לשנות, שיניתי.. אתה- תשתמש תמיד בe, גם אם בתמונה או בטקסט כתוב a.</span><span class="TextRun SCX192270846" style="font-size:9pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL"> </span><span class="EOP SCX192270846" style="font-size:9pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun Underlined SCX192270846" style="font-size:14pt;font-weight:bold;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">
</span></div>
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun Underlined SCX192270846" style="font-size:14pt;font-weight:bold;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">
</span></div>
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun Underlined SCX192270846" style="font-size:14pt;font-weight:bold;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">הקדמה:</span><span class="EOP SCX192270846" style="font-size:14pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">Windows Service- שירות של Windows.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;font-weight:bold;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">שירות</span><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL"> זה סוג של תוכנה שפועלת ברקע, בלי תצוגה גרפית כלשהו. אם אתה צריך תוכנה שתפעל כל הזמן על שרת, מסוף, או שתפעל ברקע- תשתמש ב Windows Service. ההתקנה של השירות במערכת ההפעלה, תגרום להפעלתו כל הזמן, ביחד עם המערכת.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">לכן, שים לב- </span><span class="TextRun SCX192270846" style="font-size:11pt;font-weight:bold;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">לשירות אין ממשק משתמש!</span><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL"> בגלל שהשירות פועל ברקע, הודעות (MessageBox) טפסים (Forms) וכד'- אסורים. אם אתה צריך לכתוב הודעות, עליך להשתמש ב Event Logger.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">להתחלת השירות יש 3 אפשרויות.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<ol class="NumberListStyle1 SCX192270846" start="1" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<li class="OutlineElement Rtl SCX192270846" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">ידני (Manual) ברירת מחדל- במצב הזה המשתמש או תוכנית חייבים להפעיל את השירות.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX192270846" style="margin:0;padding:0;"></span></li>
<li class="OutlineElement Rtl SCX192270846" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">אוטומטי (Automatic)- כאן windows יהיה אחראי על השירות, ויתחיל אותו כש Windows עצמו מתחיל.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX192270846" style="margin:0;padding:0;"></span></li>
<li class="OutlineElement Rtl SCX192270846" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">לא זמין (Disabled)- אף אחד לא יכול להתחיל את השירות, עד שתשנה לאחד מהערכים הקודמים.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX192270846" style="margin:0;padding:0;"></span></li>
</ol>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun Underlined SCX192270846" style="font-size:12pt;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">אבטחה:</span><span class="TextRun Underlined SCX192270846" style="font-size:12pt;text-decoration:underline;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL"> </span><span class="EOP SCX192270846" style="font-size:12pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<ul class="BulletListStyle1 SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<li class="OutlineElement Rtl SCX192270846" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">LocalService- הכי מוגן. אין אפשרות גישה למשימות מאובטחות כמו גישה לדיסק קשיח. זה טוב כשאתה צריך לעקוב אחרי מה שקורה במחשב ולשמור ביומן האירועים של השירות, בלי הרבה משאבים.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX192270846" style="margin:0;padding:0;"></span></li>
<li class="OutlineElement Rtl SCX192270846" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">NetworkService- מתאים לשרת. מגביל את הגישה למשימות מאובטחות, אבל מאפשר התקשרות עם מחשבים אחרים.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX192270846" style="margin:0;padding:0;"></span></li>
<li class="OutlineElement Rtl SCX192270846" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">LocalSystem- בעל הרשאות בלתי מוגבלות. לא מומלץ לבחור בזה אם השירות מחובר לאינטרנט, כי במקרה של פריצת הקוד, התוצאות יכולות להיות קשות.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX192270846" style="margin:0;padding:0;"></span></li>
<li class="OutlineElement Rtl SCX192270846" style="font-size:8pt;vertical-align:baseline;margin:0 48px 0 0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="EN-US">User (ברירת מחדל)- דורש שם משתמש וסיסמה, ונותן הרשאות של אותו משתמש.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
<span class="ListGhost SCX192270846" style="margin:0;padding:0;"></span></li>
</ul>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"><span class="TextRun SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;" xml:lang="HE-IL">כדאי גם לשים לב, ששירות שונה מתוכנה חלונאית רגילה בדרך הדיבוג, ובדרך ההתקנה, שבה נעסוק בהמשך.</span><span class="EOP SCX192270846" style="font-size:11pt;word-wrap:normal !important;margin:0;padding:0;"> </span></div>
</div>
<div class="OutlineElement Rtl SCX192270846" style="font-family:Calibri, sans-serif;font-size:11px;text-align:-webkit-auto;margin:0;padding:0;">
<div class="Paragraph Rtl SCX192270846" style="color:windowtext;direction:rtl;font-size:8pt;text-align:right;vertical-align:baseline;word-wrap:normal !important;padding:0;"></div>
</div>
</div>

<div class="blogger-post-footer">אני תמיד שמח לתגובות!
(גם אם זה אחרי שנה, שנתיים, עשר..)

ברוך רוטקוף.

</div>