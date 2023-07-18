---
title: מה כדאי לסטודנט לדעת- טסטים
description: "כתיבת טסטים היא חלק חשוב ועיקרי בעולם האג'ייל, וחשוב לדעת את זה מהשלב ההתחלתי שבו אנחנו נמצאים, על מנת להגיע טובים יותר לעבודה הראשונה שלנו."
published: true
date: 2018-11-22 17:29:57
tags: ["מה כדאי לסטודנט לדעת", "Tests"]
---

<!-- wp:block {"ref":835} /-->
<!-- wp:paragraph -->
<p>הפער המרכזי והידוע בין האקדמיה לתעשייה הוא שבאקדמיה אנחנו לומדים <strong>תיאוריה</strong> ומתמקדים בהבנה עמוקה יותר של העקרונות, בעוד שבתעשייה המטרה העיקרית היא להביא <strong>מוצר</strong>, ולכן ההתמקדות היא בדברים שיעזרו לנו בפועל לכתוב קוד מהר יותר ועם פחות באגים. כמובן שהחלוקה שעשיתי היא לא מוחלטת, וכמובן שכל אחד מנסה להתקרב לשני כמה שיותר.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>אז הנושא הראשון שבחרתי הוא-</p>
<!-- /wp:paragraph -->
<!-- wp:heading -->
<h2>טסטים- בדיקות (Tests)</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><strong>ואחרי כל ההקדמה- על מה מדובר?</strong></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>אני לא יודע איך הבדיקות התבצעו פעם, אבל היום, כשחברות התוכנה עובדות בשיטות <a href="#21_agile" term="agile">אג'ייל</a> שמתאפיינות בהגעה מהירה של הקוד מהמתכנת אל המשתמש, אנחנו חייבים ליצור דרכים מהירות ואוטומטיות לבדוק את הקוד.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":5} -->
<h5>מקרה לדוגמא:</h5>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>מבוסס על סיפור אמיתי- הטסטים הראשונים שלי.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><strong>ניקח תרגיל ממבנה נתונים:</strong></p>
<!-- /wp:paragraph -->
<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>צרו תוכנית שמנהלת את האנשים שאתם מעסיקים. התכנית תציג תפריט שמאפשר לכם להוסיף / להסיר אנשים, וכן אפשרות לקבל את האיש הכי גדול ואת ממוצע הגילאים.</p></blockquote>
<!-- /wp:quote -->
<!-- wp:paragraph -->
<p>אנחנו נממש את התכנית בעזרת רשימה מקושרת ממוינת. תהיה לנו מחלקת Person שתחזיק את הנתונים על האיש, ואת הPerson הבא. בנוסף, תהיה לנו מחלקה PersonList שתחזיק את האיש הראשון, ותבצע את הפעולות של החיפוש, הוספה וכו'.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>אני אציג רק את הקוד הרלוונטי כדי לא להעמיס (המימוש הוא בשפת #C. אני מחפש תוסף שיאפשר להציג בכמה שפות):</p>
<!-- /wp:paragraph -->
<pre>[code language="csharp" classname="code"]&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
class PersonList&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
{&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    private Person head;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    public void InsertNewPerson(Person person)&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    {&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        var temp = head;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        while (temp.Next()?.age &amp;amp;amp;amp;amp;amp;amp;gt; person.age)&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        {&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
            temp = temp.Next();&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        }&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        var next = temp.Next();&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        temp.SetNext(person);&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        person.SetNext(next);&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    }&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    public int GetMinAge()&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    {&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        var temp = head;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        while (temp.HasNext()) temp = temp.Next();&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        return temp.age;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    }&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    public double GetAverage()&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    {&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        var temp = head;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        var sum = 0, i = 0;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        for (; temp.HasNext(); i++, temp = temp.Next()) sum += temp.age;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
        return sum / i;&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
    }&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
}&amp;amp;amp;amp;amp;amp;lt;br&amp;amp;amp;amp;amp;amp;gt;
[/code]</pre>
<!-- wp:paragraph -->
<p>מעולה. עכשיו אנחנו רוצים כמובן לראות שהכל בסדר. מה אנחנו עושים? מפעילים את התוכנה, בוחרים אופציה בתפריט, מזינים איזה 10 אנשים ובודקים את הממוצע, מה שלוקח פחות או יותר 20 דקות, כי בהכנסה התשיעית אנחנו מתבלבלים ומזינים שם של אדם במקום אופציה בתפריט, והתוכנה נופלת ומתחילים שוב.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><strong>לא!</strong></p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3>סוגי הבדיקות</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><strong>הבדיקות נחלקות ל4 קבוצות, כשכל קבוצה מרחיבה את הבדיקות של הקבוצה הקודמת.</strong></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>הפוסט הזה יתמקד בעיקר ברמה הראשונה של הבדיקות- בדיקות היחידה, מכיוון שאלו הבדיקות הבסיסיות והקרובות ביותר אלינו כמפתחים, וכתוצאה מכך אני גם יודע להסביר עליהם טוב יותר מעל השאר.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":4} -->
<h4>בדיקות יחידה (Unit Tests):</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><a href="#21_unit-test" term="unit-test">בדיקות יחידה</a> הם הבדיקות העיקריות שאני רוצה לדבר עליהם, מכיוון שהם הכי רלוונטיות לנו כמפתחים צעירים. בדיקות יחידה אלה בדיקות מאוד קטנות, ברמת הפונקציה, שכל מתכנת צריך לכתוב על הקוד שלו (או לפחות לדעת למה הוא לא כותב. כלומר, כשתעבדו באיזה חברה, לדעתי גם אם זה איזה סטארטאפ שרץ מהר ומחליט לא לכתוב טסטים, זאת צריכה להיות החלטה מודעת).</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>כתיבת הבדיקות מתבצעת ברוב מוחלט של הפעמים בעזרת ספריות של השפה, שבאות יחד עם כלי שיודע להריץ את הקוד של הבדיקות ולספר לנו האם הם עברו או לא.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>מה שאנחנו נעשה זה ליצור מחלקת טסטים שתבדוק את הפונקציות של המחלקה שכתבנו.</p>
<!-- /wp:paragraph -->
<!-- wp:html -->
<pre>[code language="csharp"]
[TestClass]
class PersonListTests
{
    [TestMethod]
    public void InsertNewPerson()
    {
        var personToAdd = new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;Baruch&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 25);
        var personList = new PersonList();
        personList.InsertNewPerson(personToAdd);

        Assert.AreEqual(personToAdd, personList.GetHead());
    }

    [TestMethod]
    public void GetMinAge()
    {
        var personList = new PersonList();
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;A&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 34));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;B&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 100));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;C&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 0));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;D&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 34));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;E&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 22));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;F&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 57));

        Assert.AreEqual(0, personList.GetMinAge());
    }

    [TestMethod]
    public void GetAverage()
    {
        var personList = new PersonList();
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;A&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 34));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;B&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 100));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;C&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 0));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;D&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 34));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;E&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 22));
        personList.InsertNewPerson(new Person(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;F&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;, 57));

        Assert.AreEqual(41, (int)personList.GetMinAge());
    }

}
[/code]</pre>

<!-- /wp:html -->
<!-- wp:paragraph -->
<p>אם נריץ את הקוד בעזרת הפקודה `dotnet test` למשל, נקבל דו"ח עבור שלושת הטסטים והאם הם עברו.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>אז חוץ מזה שעכשיו במקום להריץ את הMain ולהזין בתפריט כל מיני אופציות, הרווחנו גם דרך מהירה לבדוק כל פעם שנרצה, האם הקוד שלנו עובד כמו שצריך. ואם עכשיו נרצה למשל לממש את התרגיל בעזרת מחלקה אחת בלבד- מחלקת Person שמלבד השדות תחזיק גם את הפונקציות הנדרשות ותבצע אותם רקורסיבית על עצמה, כל מה שנצטרך לעשות זה לשנות את PersonList בטסטים לPerson, ולהריץ אותם.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":4} -->
<h4>בדיקות אינטגרציה (Integration Tests):</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><a href="#21_integration-test" term="integration-test">בדיקות האינטגרציה</a> הם בדיקות ברמה קצת יותר כללית מבדיקות היחידה. בעוד שבדיקות היחידה בודקות לוגיקה של פונקציות, בדיקות האינטגרציה בודקות את הקשר והשילוב בין כל חלקי הקוד. כלומר, בדיקה של כל תהליך התוכנה ללא תלות במשתמש או במערכת ההפעלה וכל שאר הדברים שתלויים בהתקנה, מרמת החיבור והעבודה בין מחלקות ואובייקטים, ועד דיבור עם שירותים וחלקי תוכנה אחרים.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>רוב בדיקות האינטגרציה מתבצעות בצורה דומה לבדיקות היחידה, עם בדיקות שנכתבות בעזרת ספריה של השפה.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":4} -->
<h4>בדיקות מערכת (System Tests):</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>בדיקות המערכת אלו הבדיקות שמגיעות אחרי בדיקות היחידה והאינטגרציה, ובהתאם, בשלב זה אנחנו כבר פחות נדרשים לבדוק את הלוגיקה של התוכנה. בשלב בדיקות המערכת אנחנו נבדוק את ההנחות שלנו לגבי הסביבה שבה התוכנה פועלת. אם למשל התוכנה פועלת על מספר שרתים, בשלבים הקודמים "זייפנו" את השרתים בעזרת שימוש בכל מיני טכניקות של כתיבת טסטים (יצרנו אובייקטים מדומים, השתמשנו בכלים שמדמים סביבה וכד'), ועכשיו נבדוק את התוכנה יחד עם המערכת שבה היא רצה.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>בדיקות כאלה יכולות להתבצע בדרכים מגוונות, בהתאם למה שאנחנו רוצים לבדוק. תיתכן בדיקה של חיפוש השירות שיצרנו במערכת ההפעלה, שליחת בקשות בצורות שונות אל התוכנה שלנו, ועוד.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>בכך שאנחנו עושים את הבדיקות בשלבים, אנחנו יודעים שאם נתקלנו בבעיה בשלב המערכת, כנראה שהבעיה היא בסביבה ולא בלוגיקה של הקוד (אם כי תמיד צריך גם לחשוב- אולי יש בעיה בלוגיקה של הקוד שלא כיסינו בשלבים הקודמים?)</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":4} -->
<h4>בדיקות קבלה (Acceptance Tests):</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>אני מודה, לא פגשתי בדיקות כאלה עדיין, ואני מניח שהם נמצאות יותר בצד של המוצר מאשר בצד של הפיתוח. אני מבין שהבדיקות האלה לוקחות מוצר מוגמר ומבצעות עליו בדיקות שימוש. יש אנשי QA שכל תפקידם לחשוב על מקרים שצריך לבדוק, וכדאי לנו ללמוד מהם כדי לדעת איך לכסות את כל המקרים גם בבדיקות שאנחנו כותבים בעצמנו כחלק מהפיתוח.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3>להרחבה:</h3>
<!-- /wp:heading -->
<!-- wp:list {"ordered":true} -->
<ol><li>נושא אחד שלא נכנסתי אליו בפוסט הוא השיטות והטכניקות לזיוף אובייקטים בבדיקות שאינם נדרשים כרגע. כדי לכתוב בדיקות טובות, אנחנו צריכים להתמקד במשהו מסוים לבדיקה, ולוודא ששאר הדברים בתוכנה לא משפיעים על תוצאות הבדיקה (כי אחרת איך נדע איפה הבעיה?)</li><li>נושא שני הוא תהליכי CI, ששם הבדיקות תופסות חלק משמעותי, ואני מקווה לכתוב על זה <a aria-label="פוסט אחר (opens in a new tab)" href="https://www.bcsstudent.com/ci-cd/" rel="noreferrer noopener" target="_blank">פוסט אחר</a> בהזדמנות.</li></ol>
<!-- /wp:list --><div class="terms_div">
<!-- wp:heading -->
<h2 class="terms_title">מושגים</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul class="terms_list"><li id="21_agile" term="agile"><strong>agile</strong>- עדיין אין פירוט למושג הזה.</li><li id="21_unit-test" term="unit-test"><strong>unit-test</strong>- עדיין אין פירוט למושג הזה.</li><li id="21_integration-test" term="integration-test"><strong>integration-test</strong>- עדיין אין פירוט למושג הזה.</li></ul>
<!-- /wp:list -->
</div>
