---
title: מדריך Windows Service בעברית- כתיבה
draft: false
date: 2012-04-05 12:18:00
type: Blog
---
<div dir="rtl" style="text-align: right;">

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; height: auto; margin-right: 23px; text-align: right; vertical-align: baseline; width: auto; word-wrap: normal !important; padding: 0;">

<span class="TextRun Underlined SCX155025806" style="font-size: 14pt; font-weight: bold; text-decoration: underline; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">מתחילים\!</span><span class="EOP SCX155025806" style="font-size: 14pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">נפתח
את visual studio ונבחר New Project\>Visual C\#\>Windows\>Windows Service
וניתן לו את השם "TheWindowsServiceProject". לחץ
OK.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

|                                                                                                                                                                                                                               |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://word-edit.officeapps.live.com/we/GetImage.ashx?Fi=SDEC96D5B09D87A2E9!362&C=1__BL2-SKY-WAC-WSHI&ak=t%3d0%26s%3d0%26v%3d!ADDjYhbvrchTdE8&ObjectDataBlobId=%7Bc1c03d12-fae9-53de-9652-4899f0a0299d%7D%7B1%7D&Word=1) |
|                                                                                                         יצירת פרויקט                                                                                                          |

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">נוצרו
לנו 2 קבצים- Program.cs, ו
Service1.cs.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">נפתח
את Program.cs, בו נמצאת פעולת ה Main שפועלת ראשונה בפרויקט. שים לב לקוד.
בקוד נוצר מערך מסוג ServiceBase, ומאותחל עם אובייקט אחד מסוג Service1
(שזה בעצם השירות שלנו\!) לאחר מכן  ע"י הפעולה הסטטית ServiceBase.Run,
מופעלים כל השירותים. (אתה מבין בעצם שתוכל להוסיף עוד שירות, ולהוסיף
אותו
במערך..)</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" dir="ltr" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">static
void
Main()</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">{</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; text-indent: 48px; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">ServiceBase\[\]
ServicesToRun;</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; text-indent: 48px; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">ServicesToRun
= new
ServiceBase\[\] </span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0 0 0 48px; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">{ </span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0 0 0 96px; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">new
Service1() </span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0 0 0 48px; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">};</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0 0 0 48px; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">ServiceBase.Run(ServicesToRun);</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">}</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">כעת
נשנה את שם השירות, כדי שנזכור את ההתייחסות אליו. לחץ על השירות
(Service1.cs) ב"סייר
הפתרון" </span><span class="TextRun SCX155025806" style="font-size: 8pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">(אל
תשאל אותי למה קוראים לזה
ככה..) </span><span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">והחלף
את שמו ל"TheService". בתיבת הדו שיח שתופיע, ותשאל אם לשנות את כל ההניות
לאותו שם, בחר כמובן OK. תוכל לראות שאכן שם השירות השתנה גם בקובץ
Program.cs.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">חשוב
לציין שהפעולה Run מפעילה את השירות בתהליך משלו, ועוברת לשורה הבאה. במקרה
שלנו, תוכנת בקרה מפעילה את השירות, ואם תוסיף הרבה קוד לפני פעולת Run
התוכנה מוגבלת לזמן כלשהו עד הפעלת השירות, ובמקרה כזה היא תעצור לפני
הגעת
השירות.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun Underlined SCX155025806" style="font-size: 12pt; text-decoration: underline; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">מאפייני
השירות:</span><span class="EOP SCX155025806" style="font-size: 12pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">פתח
את TheService.cs, ויופיע לך חלון אפור. לחץ עליו ותגש לטבלת המאפיינים
(Properties).</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

  - 
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">ServiceName-
    שם השירות, נכתוב שם "MyServiceRunning". שם השירות זה השם שיופיע
    בטבלת השירותים של
    Windows. </span><span class="TextRun SCX155025806" style="font-size: 11pt; font-weight: bold; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">שים
    לב\!</span><span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL"> חשוב
    לשנות את השם בכל יצירת Windows Service, משום שהשארת 2 שירותים עם
    אותו שם תגרום להם
    להתנגש.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

  - 
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">AutoLog-
    כאשר מוגדר כ True (ברירת מחדל), השירות יטפל בשבילך בהודעות עבור
    התחלה, הפסקה וכו'. מומלץ להשאיר כך, כדי לא לקבל מידע רב
    מידי.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

  - 
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">מאפייני
    Can- כשתגדיר מאפיין כזה כTrue, תצטרך להוסיף שיטה שתגיף לאירוע
    שהמאפיין מוגד
    עבורו.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun Underlined SCX155025806" style="font-size: 12pt; text-decoration: underline; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">קוד:</span><span class="TextRun Underlined SCX155025806" style="font-size: 12pt; text-decoration: underline; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL"> </span><span class="EOP SCX155025806" style="font-size: 12pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">לחץ
פעמיים על השטח האפור שבשירות, ותקבל את מחלקת השירות. שים לב ל2 פעולות-
OnStart ו OnStop. די מובן שהם פועלות בהתחלה ובעצירה, בהתאמה.. שים לב
שהמחלקה יורשת מ ServiceBase, שמחייבת ליישם את 2 השיטות
האלה...</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">כעת
נוסיף קוד. נבצע כתיבה ליומן האירועים כל דקה. מומלץ להסתכל בפרטי
המחלקה </span>[<span class="TextRun SCX155025806" style="color: blue; font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">EventLog</span>](http://msdn.microsoft.com/en-us/library/system.diagnostics.eventlog.aspx)<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL"> לפני
ותוך
כדי.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

1.  
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">ייבא
    את מרחב השמות System.Timers ע"י הוספת משפט using לאיזור
    הusingים.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

2.  
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">הצהר
    על אובייקט מסוג Timer בשם timer1, ואתחל אותו בפונקצייה הבונה של
    השירות, תן לו לפעול כל דקה. (6000 אלפית
    שנייה).</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

3.  
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">הוסף
    לאירוע Elapsed שלו את הפונקצייה
    timer1\_Elapsed.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

4.  
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">במתודות
    OnStart ו OnStop הפעל את הפונקציות Start ו Stop של
    הטיימר.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

5.  
    
    <div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">
    
    <span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">שים
    את הקוד הזה במתודה
    timer1\_Elapsed-</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>
    
    </div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">string
message = "My Service:
"</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; text-indent: 48px; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">+
DateTime.Now.ToShortDateString() + "
"</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; text-indent: 48px; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">+
DateTime.Now.ToShortTimeString();</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="EN-US">this.EventLog.WriteEntry(message,EventLogEntryType.Information);</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Ltr SCX155025806" dir="ltr" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph SCX155025806" style="color: windowtext; font-size: 8pt; text-align: left; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">הקוד
שלי נראה
כך:</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

|                                                                                                                                                                                                                               |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://word-edit.officeapps.live.com/we/GetImage.ashx?Fi=SDEC96D5B09D87A2E9!362&C=1__BL2-SKY-WAC-WSHI&ak=t%3d0%26s%3d0%26v%3d!ADDjYhbvrchTdE8&ObjectDataBlobId=%7B90690639-be65-57dd-ba8e-8520886c9898%7D%7B1%7D&Word=1) |
|                                                                                                           קוד סופי                                                                                                            |

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun Underlined SCX155025806" style="font-size: 12pt; text-decoration: underline; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">האובייקט
EventLog:</span><span class="EOP SCX155025806" style="font-size: 12pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">האובייקט
שייך למחלקה
EventLog. </span><span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">תפקיד
המחלקה הוא לרשום הודעות ביומן
האירועים.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

<div class="OutlineElement Rtl SCX155025806" style="font-family: Calibri, sans-serif; font-size: 11px; text-align: -webkit-auto; margin: 0; padding: 0;">

<div class="Paragraph Rtl SCX155025806" style="color: windowtext; direction: rtl; font-size: 8pt; text-align: right; vertical-align: baseline; word-wrap: normal !important; padding: 0;">

<span class="TextRun SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;" lang="HE-IL">כתבנו
הודעה, ושלחנו אותה. שים לב להדרת סוג
ההודעה.</span><span class="EOP SCX155025806" style="font-size: 11pt; word-wrap: normal !important; margin: 0; padding: 0;"> </span>

</div>

</div>

</div>

<div class="blogger-post-footer">

אני תמיד שמח לתגובות\! (גם אם זה אחרי שנה, שנתיים, עשר..) ברוך רוטקוף.

</div>
