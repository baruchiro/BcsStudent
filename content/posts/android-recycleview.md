---
title: שלבים ליצירת RecycleView
draft: false
date: 2016-08-31 16:02:29
type: Blog
---
1.  יצירת קובץ Resource שמייצג שורה ברשימה, בשם item\_photo.
2.  יצירת מחלקה PhotoViewHolder שיורשת מRecycleView.ViewHolder. מחלקה זו
    משמשת לבניית שורה ברשימה ולהתנהגות שלה.
    1.  בנאי- מקבל View (שהוא מופע של הResource שיצרנו בסעיף 1) ומאתחל
        את הViews שמוגדרים במחלקה (ImageView).
    2.  פונקצייה שמקבלת אובייקט מהרשימה שאנחנו מעוניינים להציג (תמונה)
        ועל פיו מאתחלת את התצוגה של הViews (נותנת את התמונה כפרמטר
        לImageView).
3.  יצירת מחלקת Adapter בשם PhotosAdapter שיורשת מ
    \<RecycleView.Adapter\<PhotoViewHolder מחלקה זאת מנהלת את הרשימה של
    האובייקטים שאנחנו רוצים להציג, ומנהלת את הבנייה של השורות.
    1.  בנאי- מקבל את הרשימה (List) של האובייקטים שאנחנו רוצים להציג
        ברשימה (RecycleView).
    2.  פונקצייה- onCreateViewHolder שמקבלת ViewGroup, ממנו, בעזרת
        Inflater שיקבל את הקובץ שיצרנו ב**סעיף 1**, נוכל ליצור View של
        שורה, שאותו נשים בבנאי ב**סעיף 2.1**, והנה יש לנו אובייקט
        PhotoViewHolder שאנחנו יכולים להחזיר (הוא הreturn של הפונקצייה).
    3.  פונקצייה- onBindViewHolder שתקבל את הViewHolder מהפוקנצייה
        הקודמת, וגם מיקום של אובייקט, כך שנוכל לפנות לאובייקט
        במיקום הזה ברשימה, ולהכניס אותו לאובייקט בעזרת הפונקצייה
        של **סעיף 2.2**.
    4.  פונקצייה- getItemCount שמחזירה את כמות האובייקטים (גודל
        הרשימה). **בנוסף**, אם נדרש נוסיף פונקציות לטיפול ברשימה,
        ובסופם נצטרך להשתמש בNotify.
4.  הכרזה על הRecycleView שלנו (או יצירת הפנייה אליו במידה והוא כבר קיים
    בResource של הActivity).
    1.  הגדרת setHasFixedSize רק אם אנחנו לא מתכננים שהגודל שלו ישתנה.
    2.  יצירת אובייקט LayoutManager בהתאם לצורה שבה אנחנו רוצים שהנתונים
        יוצגו (LinearLayoutManager- HorisontalVartical,
        GridLayoutManager etc') והוספה שלו ע"י
        myRecycleView.setLayoutManager
    3.  יצירת אובייקט של PhotoAdapter ולתת לו את הנתונים. הוספת האובייקט
        בעזרת myRecycleView.setAdapter

אם אני אדע איך שמים פה קוד, אני אשים דוגמאות קוד.
