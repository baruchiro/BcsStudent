const { Parser } = require("xml2js");
const { promises: fs } = require("fs");
const path = require("path");
const { EOL } = require("os");
const { default: axios } = require("axios");
const cheerio = require("cheerio");

const ignoreCategories = [
  "אחרים",
  "מדע",
  "StackOverflow",
  "מיקרוסופט",
  "English",
];

const postPath = path.join(
  __dirname,
  "..",
  "..",
  "content",
  "posts",
  "rss-blogs",
  "rss-blogs.md",
);

const preBlog = `---
title: רשימת הבלוגים בנושאי תוכנה בעברית
description: >
  רשימת הבלוגים בנושאי תוכנה וטכנולוגיה, בעברית.
  הוסיפו לכאן גם את הבלוגים שלכם!
published: true
cover_image: ./rss-blogs.png
date: 2019-04-11 18:46:00
---

בטח שמעתם עד כמה חשוב להישאר מעודכנים, בתעשייה ששואפת תמיד לרוץ קדימה. איך דואגים להישאר במעקב אחרי כל הידע שזורם באינטרנט?

למשל, ראיתם בלוג שנראה לכם מעניין (**די ברור על איזה בלוג אני מדבר..**), ואמרתם לעצמכם שאתם חייבים מידי פעם לראות אם יש שם משהו חדש. אז נכנסתם אחרי שבוע, אחרי שבועיים, וכלום לא השתנה (הפעם אני מדבר על בלוג אחר, כן?).

או שסתם ראיתם כבר כל כך הרבה בלוגים, שאתם כבר לא זוכרים להתעדכן מול כולם.

[פרוטוקול RSS](https://he.wikipedia.org/wiki/RSS) הוא פרוטוקול ישן ופשוט, שמציג עדכוני תוכן בפורמט [XML](###xml) קבוע. מה שרלוונטי לנו זאת הידיעה שכמעט כל אתר תוכן (אתרי חדשות, בלוגים, שאלות) מספק גם "RSS Feed", שמציג את התוכן שנוסף לאתר. בעזרת קוראי RSS למיניהם (המלצות בהמשך), נוכל בקלות להוסיף את האתר לרשימת הקריאה שלנו, ו**להתעדכן מכל האתרים במקום אחד**.

פשוט, ומדהים.

> רן בר זיק, כותב המאמרים באתר [אינטרנט ישראל](https://internet-israel.com/), יצר [רשימה של בלוגים](https://github.com/barzik/web-dev-il-resources) משלו. מכיוון שהוא יותר מפורסם ממני, כנראה שמתישהו הרשימה שלו תהיה עדכנית יותר.

**אז הנה הRSS Feeds שאני עוקב אחרים, ואשמח כמובן להמלצות נוספות!**

## בלוגים מומלצים בעברית

אשמח אם תוסיפו בלוגים חדשים בתגובות, ואני אוסיף אותם לרשימה.

הצעות לחלוקת קטגוריות שונה יתקבלו בברכה!

`;

const getTitle = async (url) =>
  axios.get(url).then(({ data }) => {
    const title = cheerio.load(data)("head > title").text().trim();
    console.log(`Received '${title}' from ${url}`);
    return title;
  });
const createCategory = (name) => `### ${name}`;
const createFeed = (name, url, title, feed) => {
  if (!name) {
    console.warn(`'name' is ${name}`, { name, url, title, feed });
    return "";
  }
  const formattedName = `${name}`.startsWith("<div")
    ? name.match(/>(.*)</)[1]
    : name;
  return `- [${formattedName}](${url}): ${title} ([Feed](${feed}))`;
};

fs.readFile(path.join(__dirname, "feedly.opml"), { encoding: "utf-8" })
  .then((opml) => {
    const parser = new Parser();
    return parser.parseStringPromise(opml);
  })
  .then((opmlObj) => {
    return opmlObj.opml.body[0].outline
      .filter(({ outline }) => outline)
      .map(({ $, outline }) => ({
        title: $.title,
        feeds: outline.map(({ $ }) => ({
          name: $.title && $.title.trim(),
          feed: $.xmlUrl,
          url: $.htmlUrl,
        })),
      }))
      .filter(({ title }) => !ignoreCategories.includes(title))
      .reduce(async (post, category) => {
        let content = await post;
        content += createCategory(category.title);
        content += EOL + EOL;

        content += await Promise.all(
          category.feeds.map(async (feed) => {
            const title = await getTitle(feed.url).catch(
              ({ status, statusText, code }) => {
                console.warn(`Error with ${feed.name} ${feed.url}`, {
                  status,
                  statusText,
                  code,
                });
                return "";
              },
            );
            return title && createFeed(feed.name, feed.url, title, feed.feed);
          }),
        ).then((feeds) => feeds.join(EOL));

        return content + EOL + EOL;
      }, Promise.resolve(preBlog));
  })
  .then((post) => fs.writeFile(postPath, post))
  .then(() => console.log("finish"))
  .catch(console.error);
