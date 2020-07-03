---
ID: 549
title: RESTful API with ASP.NET Web API 2
author: Baruch Rothkoff
post_excerpt: ""
layout: post
permalink: >
  https://www.bcsstudent.com/restful-api-with-asp-net-web-api-2/
published: true
date: 2017-04-25 18:55:49
---
<!-- wp:paragraph -->
<p>סיכום על כתיבת Controller שמגיב לבקשות HTTP.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>המאמר הוא קודם כל סיכום בשבילי, כדי שבפעמים הבאות אני אוכל לבצע מהר יותר. לכן יש דברים שאני לא מרחיב בהם, וכמובן שמומלץ להסתכל <a href="https://docs.microsoft.com/en-us/aspnet/web-api/overview/" rel="noopener noreferrer" target="_blank">במקור</a>.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>ניצור פרויקט ASP.NET Web Apllication ריק, על מנת שנבין כל שלב בעצמנו.</p>
<!-- /wp:paragraph -->
<!-- wp:heading -->
<h2>הבדלים בין Web API 2 לבין MVC Controller</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>נוסיף לפרויקט תיקייה בשם Controllers (לא חובה דווקא בשם הזה). נוסיף לתיקייה Controller, וייפתח לנו החלון הבא שידרוש מאיתנו לבחור Controller:</p>
<!-- /wp:paragraph -->
<!-- wp:image {"id":558} -->
<figure class="wp-block-image"><img alt="Select Controller" class="wp-image-558" src="https://baruchiro.files.wordpress.com/2017/04/e2808fe2808fd79cd79bd799d793d794.png"/></figure>
<!-- /wp:image -->
<!-- wp:paragraph -->
<p>אנחנו רואים 2 סוגים של Controllers. אני לא יודע להרחיב לעומק, אבל MVC Controller מתאים יותר למודל MVC שכולל גם <strong>V</strong>iew, ומאיתנו לא נדרש View, כי אנחנו רוצים לשלוח נתונים בלבד. אפשר להשתמש ב2 הControllers ל2 המטרות (שליחת נתונים והצגת View), אבל לטובת לימוד של כתיבת RESTful נשתמש בWeb API 2 כדי להבין טוב יותר את הפעולות שאנחנו עושים.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>אחרי שנוסיף את Web API Controller - Empty (נבחר ריק- שוב, כדי ללמוד) נכתוב את השם שלו בתיבה שקפצה. השם שלו יהיה מורכב משם הController- הנתונים שנרצה להביא, וסיומת Controller. בדוגמא שלנו נבחר בשם UsersController.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>אחרי שלחצנו אישור, Visual Sudio יוסיף כמה קבצים (במידה וזאת הפעם הראשונה שאנחנו מוסיפים Controller).</p>
<!-- /wp:paragraph -->
<!-- wp:heading -->
<h2>בקשות HTTP:</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>בקשות http אלו הבקשות הרגילות שאנחנו משתמשים בהם בגלישה באינטרנט, והם מבוססות על שורת הכתובת. ישנם 4 בקשות http עיקריות:</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>GET- הבקשה שאנחנו מבצעים כשגולשים לאתר. אנחנו שולחים כתובת ומקבלים נתונים (באתר אינטרנט נקבל טקסט HTML, ואם יש לנו דפדפן, הוא יידע להמיר את זה לתצוגת אתר אינטרנט.)</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>POST- שליחת נתונים. בבקשת POST אנחנו שולחים נתונים לכתובת http מסוימת, בדיוק כמו באתר אינטרנט, רק שבנוסף גם שולחים איתה נתונים נוספים. שרת האינטרנט יודע לקחת את הנתונים שנשלחו ולבצע איתם פעולה. פעולת POST בדרך כלל תהיה הוספה של נתונים למאגר.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>PUT- עדכון נתונים. תתבצע בד"כ ע"י כתובת http ספציפית שמתאימה לאובייקט מסוים, ותשלח נתונים מעודכנים לבי אובייקט זה.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>DELETE- דומה לבקשת GET. מורכבת מכתובת בלבד ומבקשת מהשרת למחוק אובייקט כלשהו.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>כמובן, כמו שנראה, אנחנו כותבים פונקציות שמגיבות לבקשות אלו, לכן אין מניעה לבצע מחיקה בבקשת GET או החזרת נתונים בעזרת POST, אבל אין סיבה בדרך כלל לעשות את זה.</p>
<!-- /wp:paragraph -->
<!-- wp:heading -->
<h2>הController:</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>כמו שראינו, שם הController הוא שם האובייקט שאיתו נתעסק, עם סיומת controller (אצלנו: UsersController), והוא יורש מapiController, בשונה מMVC Controller שיורש מController. מלבד זאת, אין לנו כרגע פונקציות בקובץ.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>בתור התחלה, לפני שנצלול לעומק, נוכל להגיד כמה דברים פשוטים, שהם בעצם הברירת מחדל ברגע שיצרנו Controller.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>הגישה לController נעשית באמצעות הכתובות:</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"direction":"ltr"} -->
<p dir="ltr"><code><code><code>/api/{Controller} - /api/Users<br/>/api/{Controller}/{id} - /api/Users/5</code></code></code></p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3>תגובה לבקשות HTTP:</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>ונוכל בהתאמה ליצור פונקציות שיגיבו לארבעת בקשות הHTTP. כדי שפונקצייה תגיב לבקשה מסוימת, השם שלה צריך להתחיל בשם הבקשה, לדוגמא: GetAll, PostOne, DeleteByID, Put. הController יודע להתאים את סוג הבקשה לפונקצייה המתאימה.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3>שליחת נתונים באמצעות תבנית:</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>כמו שרואים בדוגמאות של הכתובות, ניתן להוסיף לכתובת גם id. את הid הזה נקלוט כמשתנה לפונקצייה, וגם אותו הController יזהה אוטומטית. לדוגמא:</p>
<!-- /wp:paragraph -->
<!-- wp:html -->
[code language="csharp"]
public string GetAll(){} //path: /api/Users
public string GetByID(int id){} //path: /api/Users/3, and id=3
[/code]
<!-- /wp:html -->
<!-- wp:paragraph -->
<p>מכיוון שהוגדר בברירת המחדל שיש משתנה בשם id שמתקבל משורת הכתובת, אם נכתוב פונקציה בעלת משתנה id, נוכל להגיב למקרה הזה.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3>שליחת נתונים בעזרת מחרוזת שאילתא:</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>האפשרות השלישית של שליחת נתונים היא דרך <strong>מחרוזת שאילתא</strong>. מחרוזת שאילתא נמצאת בסוף הכתובת, והסימן שלה הוא ?. המחרוזת היא רצף של שמות וערכים, לדוגמא:</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"direction":"ltr"} -->
<p dir="ltr"><code>https://www.google.com?search=HelloWorld&amp;type=photos</code></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>המחרוזת הזאת תיתן לנו ערכים למשתנים search, type. בתאמה, נוכל לכתוב פונקציה שמבקשת כמה ערכים, ואם תהיה כתובת שנותנת ערכים כאלה, הפונקצייה תיקרא.</p>
<!-- /wp:paragraph -->
<!-- wp:html -->
[code language="csharp"]
public GetByName(string name){} // path: /api/Users?name=Baruch
public Get(int id, string name){} // path: /api/Users/5?name=Baruch
[/code]
<!-- /wp:html -->
<!-- wp:paragraph -->
<p>במידה והController לא מוצא פונקצייה שמתאימה <strong>בדיוק</strong> לערכים שהוא קיבל, הוא ישתמש בפונקציית ברירת המחדל (ללא ערכים).</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>אני לא מרחיב יותר מידי, אפשר על פי הדברים האלו לעשות ניסויים- מה קורה אם משנים את סדר המשתנים? מה קורה אם שולחים את id כמחרוזת שאילתא? מה קורה אם בכתובת כותבים את id כstring?</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1} -->
<h1>ניתוב (Routing)</h1>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>עד עכשיו השתמשנו בכתובות ובערכי ברירת המחדל. עכשיו נראה איך אפשר לשנות את הכתובת שאליה הController מגיב.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3>שלבי הניתוב שאנחנו מכירים:</h3>
<!-- /wp:heading -->
<!-- wp:list {"ordered":true} -->
<ol><li>הASP.NET לוקח מהכתובת של הבקשה את חלק ה{Controller}, מצמיד אותו למילה Controller ומחפש Controller בשם הזה.</li><li>בתוך הController מחפש פונקצייה שמתחילה בשם הבקשה.</li><li>לאחר שנמצאו הפונקציות המתאימות לבקשה, מנסה להתאים את רשימת המשתנים לפונקצייה.</li></ol>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>נראה שאת חלק מהשלבים אפשר לשנות.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>הניתוב  מתבצע ע"י טבלת ניתוב שמוגדרת בקובץ WebApiConfig.cs שנמצא בתיקיית App_Start, ונוצר אוטומטית בזמן שהוספנו את הController הראשון.</p>
<!-- /wp:paragraph -->
<!-- wp:html -->
[code language="csharp"]
config.Routes.MapHttpRoute(
 name: "DefaultApi",
 routeTemplate: "api/{controller}/{id}",
 defaults: new { id = RouteParameter.Optional }
 );
[/code]
<!-- /wp:html -->
<!-- wp:paragraph -->
<p>זה הקוד. נעבור על שלושת הערכים שהוא מקבל:</p>
<!-- /wp:paragraph -->
<!-- wp:list {"ordered":true} -->
<ol><li>name: שם הניתוב, לא יודע עד כמה הוא משמעותי.</li><li>routeTemplate: מגדיר את מבנה הכתובת. {Controller} הוא שומר מקום לשם הController, ובהמשך נראה שומרי מקום נוספים. שאר שומרי המקום הם לבחירתנו, והם השמות של המשתנים. גם עם זה ניתן לשחק ולראות מה קורה.</li><li>default: כאן ניתן להגדיר האם יש פרמטרים שניתן להתעלם מהם. אם לא היינו מגדירים את id כאופציונלי, הכתובת ללא id לא הייתה חוקית, ולא הייתה מתקבלת.</li></ol>
<!-- /wp:list -->
<!-- wp:heading {"level":3} -->
<h3>שינויים אפשריים בכתיבת הפונקציות:</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul><li>ניתן לכתוב פונקצייה ללא התחלה של שם הבקשה, ולשייך אותה בעזרת אפיון לפי הדוגמא:</li><li>
[code language="csharp"]
[HttpGet]
public string GiveMe(int id){}
[/code]
<p> </p>
</li><li>ניתן להוסיף פרמטר נוסף לכתובת הניתוב- {action}, וניתן להשתמש בו ב2 דרכים:
<ul>
<li>הaction בשורת הכתובת יפנה אותנו לשימוש בפונקצייה בעלת אותו שם:
[code language="csharp"]
[HttpGet]
public string Members(int id) //path: /api/{Controler}/{action}/{id}
[/code]
</li>
<li>ניתן להכריז על פונקצייה כמגיבה לפעולה זאת:
[code language="csharp"][/code]
[HttpGet]
[ActionName("Members")]
public string GiveMe()
[code language="csharp"][/code]
</li>
</ul>
</li></ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>זהו. זה היה הבסיס. במאמר הבא (אני מקווה) תהיה שיטה טובה יותר לניתוב, ובהמשך נדבר גם על יצירת בקשות וקבלת נתונים, ובסוף על בניית מאגר נתונים.</p>
<!-- /wp:paragraph -->