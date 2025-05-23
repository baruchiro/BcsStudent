---
title: בוט "לא רלוונטי"
date: 2020-07-08
draft: false
tags: ['idea', 'Bot']
summary: |
  קיבלתם הודעה בווטסאפ שנראית חשודה? משהו על ריקוד של אפיפיור או הודעה ממשרד הסייבר?
  מה אם הייתם יכולים לשלוח את ההודעה לבוט ולשמוע שהבוט כבר ראה אותה בשנה שעברה?
type: Blog
---

תראו, אולי יש כבר מנגנונים משוכללים לזיהוי Fake-news, אבל האמת שחיפשתי ולא מצאתי משהו דומה. כנראה שכדי לבדוק פייק ניוז טוב צריך חוקרים אנושיים שיבדקו את העובדות.

אבל לא מדובר פה בפייק ניוז אמיתי, אלא יותר בספאם והודעות שרשרת.

כשאני רואה הודעה חשודה, מעבר לסימנים המחשידים כמו מילים שנראות כמו תרגום משפה אחרת, ובקשה לשיתוף לכמה שיותר אנשים, אני מחפש אותה באתר [לא רלוונטי](https://irrelevant.org.il/). מהאתר אני מקבל שתי אבחנות עיקריות:

1.  עצם העובדה שחנן דיווח על ההודעה כבר לפני שנה, אומר לי שלא מדובר בהודעה עדכנית.
2.  יש לי פידבק של אדם שבדק את ההודעה ויודע להגיד מה רמת האמינות שלה.

יש בעיה קטנה- חנן הוא לא מחשב ויכולת הקלט שלו מוגבלת. אי אפשר לכתוב פקודה שתייצר עוד "חנןים", אבל מצד שני, אני די בטוח שאנשים כותבים פקודה שמייצרת עוד ועוד הודעות זבל.

אז בהינתן שתי האבחנות הנ"ל, אני מציע מערכת פשוטה ברמת העקרון-

צריך ליצור EndPoint שניתן לשלוח אליו הודעות חשודות. ברגע שיש שירות כזה, הוא יכול קודם כל להגיד מתי הוא ראה את ההודעה החשודה בפעם הראשונה, ומידע כזה (שעונה על אבחנה 1), יכול לדעתי לפתור את הספק ללפחות חצי מההודעות החשודות.

לגבי אבחנה 2, זה כבר יותר מסובך. ייתכן שלמשל מידע על כמה אנשים שדיווחו על הודעה זו כחשודה כבר יכול לתת איזה חיווי לגבי האמינות.

ניתן בשלב מאוחר יותר ליצור מערכת פידבק מסוימת, שאנשים כמו חנן יוכלו לסמן הודעות מסוימות כהודעות שנבדקו על ידם, ובכך להוסיף אמינות לגבי אמינות ההודעה.

מעבר לכך, אם יוצרים את הפתרון כפתרון מכוון קהילה\קוד פתוח, מדעני נתונים ומתכנתים יוכלו לעבוד עם הdata ולנסות ליצור מודלים נוספים של חיזוי, או שיפורים נוספים כמו זיהוי הודעות דומות וכו'.

אני לא מציע פה להתחרות בחנן, אלא להיפך, לדעתי כדאי ליצור איתו קשר, כדי להיעזר בנסיון ובידע שלו.
