---
ID: 156
author: Baruch Rothkoff
layout: post
permalink: https://www.bcsstudent.com/excel-hours-count/
post_date: 2016-05-15 07:56:26
post_excerpt: חישוב כמות שעות בין תאריכים באקסל
post_title: חישוב כמות שעות בין תאריכים באקסל
published: true
---

<!-- wp:paragraph -->
<p>כדי לחשב את כמות השעות בין שני שדות של תאריכים באקסל, נשתמש בפונקצייה הבאה:</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"direction":"ltr"} -->
<p dir="ltr"><code>CONVERT(LastDay-FirstDay, "day","hr")</code></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>הפונקצייה לוקחת את ההפרש בין התאריכים (FirstDay &amp; LastDay מייצגים הפניות לתאים של התאריכים) וממירה את ההפרש מימים לשעות.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>זה אמנם פשוט, אבל לא מצאתי את זה בפירוש בגוגל, אז כתבתי כאן, ואני מקווה שזה יגיע לתוצאות חיפוש.</p>
<!-- /wp:paragraph -->