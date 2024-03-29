---
title: טיפול במחשב עם כונן פגוע
published: true
date: 2016-09-29 16:09:43
---

<p style="text-align:justify;">קיבלתי מחשב נייד שעובד <strong>מאוד</strong> לאט. הכוונה ב"מאוד" היא שאני מדליק אותו ביום שישי, כדי שעד מוצ"ש הוא יצליח לעלות ואני אוכל לבצע בו כמה פעולות.</p>

<p style="text-align:justify;">קודם כל, בעזרת תוכנת <a href="http://www.piriform.com/ccleaner" target="_blank" rel="noopener noreferrer">CCleaner</a> ניקיתי את כל המחשב. את הקבצים כמובן, אבל בעיקר את ערכי הרישום, שעלולים להגדיר כל מיני דברים, כמו תוכנות שעולות עם המחשב או דברים חשודים יותר.</p>

<p style="text-align:justify;">מכיוון שזה לא עזר, התחלתי לחשוד שמדובר בתקלה בחומרה. המחשב הוא מחשב מתוצרת Dell, והוא מגיע עם תוכנת אבחון חומרה ברמת הBIOS. מפעילים אותה מboot options. התוכנה העלתה שגיאה בכונן, ובדיקה של מספר השגיאה באינטרנט הבהירה שיש בעיה בכונן וצריך להחליף אותו.</p>

<p style="text-align:justify;">מחשבים לא מאוד חדשים, מגיעים בדרך כלל עם כונן מסוג HDD. בלי להרחיב, מדובר בכונן עם דיסק מסתובב, והוא איטי יותר ופגיע הרבה יותר מכונן SSD, לכן אני לא מופתע אם הוא גורם לתקלה. כונן SSD הוא מהיר וחזק, והוא בעצם כמו זכרון נייד שאנחנו מכירים מUSB וכונן חיצוני.</p>

<h1 style="text-align:justify;">איך החלפתי כונן HDD פגוע בכונן SSD?</h1>

<h3 style="text-align:justify;">כלים:</h3>

<ol>
<li>מברג.</li>
<li>כונן SSD.</li>
<li>מתאם SATA to USB.</li>
</ol>

<h3>תהליך:</h3>

הערה קטנה: יש כל מיני דרכים לבצע את ההחלפה, ורובם פשוטות יותר, וההבדל או בהתקנה נקייה או בגיבוי מלא. בכל מקרה, פה התקלה הייתה שלא יכולתי להשתמש במחשב כדי לגבות את הקבצים, כי הוא תקוע, בעצם.

<ol>
<li>פתיחת המחשב והוצאת הכונן הקשיח. זה לא אמור להיות מסובך מידי (אם המחשב לא מידי ישן. במחשבים ישנים הכונן עלול להיות מתחת להרבה דברים אחרים). כדאי לבדוק ביוטיוב אילו ברגים צריך לשחרר, ואיזה לוחות להוריד כדי להגיע לכונן. <strong>חשוב מאוד להוציא את הסוללה ולנתק את המחשב מהחשמל!</strong></li>
<li>חיבור הכונן הישן (HDD) למחשב בעזרת המתאם. <strong>אני ממליץ על מתאם עם חיבור לחשמל</strong>. כשהשתמשתי במתאם שלוקח את החשמל מחיבור הUSB, במקרה של ניתוק בהפתעה, הכונן עלול להיהרס. כדאי לחבר קודם את החשמל, כדי שהדיסק יתחיל להסתובב, ולאחר מכן לחבר את הנתונים והUSB.</li>
<li>גיבוי הכונן בעזרת תוכנת <a href="http://www.todo-backup.com/" target="_blank" rel="noopener noreferrer">EaseUS Todo Backup</a>. בקצרה- בעזרת Disk / partition Backup, ניתן לגבות את כל הכונן, או רק חלק מהמחיצות שלו. אני חושב שכדאי לגבות הכל, ואם יש מחיצות לא רלוונטיות, להוריד אותם בדרך הרגילה אחרי שהמחשב כבר פועל. כדאי לשים לב לאפשרות גיבוי Sector By Sector, שמגבה את הכונן "אחד לאחד", גם את המקומות הריקים, מה שאומר שהגיבוי יהיה בגודל של הכונן.. אם לא נבחר באפשרות הזאת, הגיבוי יהיה רק על הקבצים.</li>
<li>ניתוק כונן HDD וחיבור כונן SSD למתאם.</li>
<li>שחזור הכונן בעזרת התוכנה הנ"ל. כשנפתח את התוכנה היא תציג את הגיבוי שנעשה בסעיף 3, ותתן לנו אפשרות Recover, שבה נבחר את כונן הSSD.</li>
<li>לאחר שהעברנו בעצם את התוכן מהHDD לSSD, כל מה שנשאר לעשות הוא לחבר למחשב הפגוע את כונן הSSD, בדיוק במקום ובצורה שבה היה הHDD.</li>
</ol>

וזהו.
