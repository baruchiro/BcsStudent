---
ID: 458
post_title: שלבים ליצירת RecycleView
author: Baruch Rothkoff
post_excerpt: ""
layout: post
permalink: >
  https://www.bcsstudent.com/android-recycleview/
published: true
post_date: 2016-08-31 16:02:29
---
<ol>
<ol>
 	<li>יצירת קובץ Resource שמייצג שורה ברשימה, בשם item_photo.</li>
 	<li>יצירת מחלקה PhotoViewHolder שיורשת מRecycleView.ViewHolder. מחלקה זו משמשת לבניית שורה ברשימה ולהתנהגות שלה.
<ol>
 	<li>בנאי- מקבל View (שהוא מופע של הResource שיצרנו בסעיף 1) ומאתחל את הViews שמוגדרים במחלקה (ImageView).</li>
 	<li>פונקצייה שמקבלת אובייקט מהרשימה שאנחנו מעוניינים להציג (תמונה) ועל פיו מאתחלת את התצוגה של הViews (נותנת את התמונה כפרמטר לImageView).</li>
</ol>
</li>
 	<li>יצירת מחלקת Adapter בשם PhotosAdapter שיורשת מ
&lt;RecycleView.Adapter&lt;PhotoViewHolder
מחלקה זאת מנהלת את הרשימה של האובייקטים שאנחנו רוצים להציג, ומנהלת את הבנייה של השורות.
<ol>
 	<li>בנאי- מקבל את הרשימה (List) של האובייקטים שאנחנו רוצים להציג ברשימה (RecycleView).</li>
 	<li>פונקצייה-&nbsp;onCreateViewHolder שמקבלת ViewGroup, ממנו, בעזרת Inflater שיקבל את הקובץ שיצרנו ב<strong>סעיף 1</strong>, נוכל ליצור View של שורה, שאותו נשים בבנאי ב<strong>סעיף 2.1</strong>, והנה יש לנו אובייקט PhotoViewHolder שאנחנו יכולים להחזיר (הוא הreturn של הפונקצייה).</li>
 	<li>פונקצייה-&nbsp;onBindViewHolder שתקבל את הViewHolder מהפוקנצייה הקודמת, וגם מיקום של אובייקט, כך שנוכל לפנות לאובייקט במיקום הזה ברשימה, ולהכניס אותו לאובייקט בעזרת הפונקצייה של&nbsp;<strong>סעיף 2.2</strong>.</li>
 	<li>פונקצייה-&nbsp;getItemCount שמחזירה את כמות האובייקטים (גודל הרשימה).&nbsp;<strong>בנוסף</strong>, אם נדרש נוסיף פונקציות לטיפול ברשימה, ובסופם נצטרך להשתמש בNotify.</li>
</ol>
</li>
 	<li>הכרזה על הRecycleView שלנו (או יצירת הפנייה אליו במידה והוא כבר קיים בResource של הActivity).
<ol>
 	<li>הגדרת&nbsp;setHasFixedSize רק אם אנחנו לא מתכננים שהגודל שלו ישתנה.</li>
 	<li>יצירת אובייקט LayoutManager בהתאם לצורה שבה אנחנו רוצים שהנתונים יוצגו (LinearLayoutManager- Horisontal\Vartical, GridLayoutManager etc') והוספה שלו ע"י myRecycleView.setLayoutManager</li>
 	<li>יצירת אובייקט של PhotoAdapter ולתת לו את הנתונים. הוספת האובייקט בעזרת myRecycleView.setAdapter</li>
</ol>
</li>
</ol>
</ol>
&nbsp;

&nbsp;

אם אני אדע איך שמים פה קוד, אני אשים דוגמאות קוד.