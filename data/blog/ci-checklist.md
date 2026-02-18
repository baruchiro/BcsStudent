---
title: צ'קליסט CI לפרויקט
summary: |
  בכל פעם שאני מתחיל פרויקט חדש, אישי או של העבודה, אני צריך להיזכר מחדש איזה בדיקות וכלים אני נוהג להוסיף, תלוי בשפה של הפרויקט, בצרכים שלו והאם הוא אישי או ארגוני.

  אז הנה רשימה של כלים ובדיקות להוסיף לפרויקט חדש.
date: 2023-07-19T14:53:45.583Z
draft: false
tags: [cicd, developer-experience, testing]
type: Blog
---

בכל פעם שאני מתחיל פרויקט חדש, אישי או של העבודה, אני צריך להיזכר מחדש איזה בדיקות וכלים אני נוהג להוסיף, תלוי בשפה של הפרויקט, בצרכים שלו והאם הוא אישי או ארגוני.

אז הנה רשימה של כלים ובדיקות להוסיף לפרויקט חדש.

> תשלחו לי כלים שאתם משתמשים בהם ואני אוסיף אותם לרשימה.

## Git Hooks

בפרויקטים של JavaScript אני מוסיף את [husky](https://typicode.github.io/husky/) שמאפשר לי להגדיר Git hooks (כלומר פקודות שירוצו לפני\אחרי commit/push וכו'), ובעזרתו אני יכול לחסוך למפתח טעויות פשוטות שאחרת הוא יגלה רק כשהוא יפתח PR.

את husky אני משלב עם [lint-staged](https://github.com/okonet/lint-staged) שמאפשר לי למנוע מהמפתח לקבל שגיאות שלא נגרמו על ידו, ולהריץ את הבדיקות רק על הקוד שהוא מבקש להכניס.

בשלב הזה אני מריץ את הכלים הפשוטים שחוסכים לכולנו כאב ראש:

- [ ] Linting ([ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/))
- [ ] Type Checking ([TypeScript](https://www.typescriptlang.org/))
- [ ] Pretty Formatting ([Prettier](https://prettier.io/))

וזה נראה כך:

```json
# package.json
"lint-staged": {
    "**/*": "prettier --write --ignore-unknown",
    "{src,tests}/**/*.js": "eslint --fix"
}
```

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

_[דוגמא מפרויקט Overlay](https://github.com/os-scar/overlay/blob/master/package.json#L64-L67)_

## Pull Request Validation

כאן לא מדובר בכלים ספציפיים, אלא בפעולות שכדאי להוסיף עוד בשלב הPull Request כדי לחסוך הערות מיותרות בסקירה, וגם כדי לזהות בהקדם בעיות שעלולות לצוץ בענף הראשי:

- [ ] Linting ([golangci-lint](https://github.com/golangci/golangci-lint), [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/), [`go mod tidy`](https://github.com/Checkmarx/2ms/blob/cf3f46a51041a8e8fe934775e295fe2ea9dc810e/.github/workflows/pr-validation.yml#L25C6-L28)) (ולא לשכוח לחפש פורמט של Github, למשל `stylelint --formatter=github` או [@jamesacarr/eslint-formatter-github-actions](https://www.npmjs.com/package/@jamesacarr/eslint-formatter-github-actions))
- [ ] Type Checking
- [ ] Unit Tests
- [ ] Build (bundle, compile, Docker)

_[דוגמא מפרויקט כספיון](https://github.com/brafdlog/caspion/blob/master/.github/workflows/ci.yml)_ (_TypeScript_)  
_[דוגמא מפרויקט 2ms](https://github.com/Checkmarx/2ms/blob/master/.github/workflows/pr-validation.yml)_ (_Go_)
\_ולא לשכוח להשתמש ב[`merge_group`](https://github.com/os-scar/overlay/blob/dcdf44f27e8c24542f1f0ca8f2b39be0e5b97d1b/.github/workflows/pr-validation.yml#L7)

### [lockfile-lint](https://github.com/lirantal/lockfile-lint)

_[JavaScript/TypeScript]_

בפרויקטים של JS, החבילות מותקנות על פי מה שכתוב בקובץ lock (`package-lock.json`/`yarn.lock`), ולכן חשוב לוודא שהקובץ הזה תקין ולא נערך בצורה לא צפויה, מכיוון שתוקף יכול לשנות את הרישום של אחת החבילות בקובץ, ואנחנו לא נשים לב, כי מי מסתכל על הקובץ הזה בכלל?

_[דוגמא מפרויקט Overlay](https://github.com/os-scar/overlay/blob/master/package.json#L24)_

### [new-dependencies-advisor](https://github.com/lirantal/github-action-new-dependencies-advisor)

_[JavaScript/TypeScript]_

כלי שמתריע על תלות חדשה שנוספת לפרויקט בקוד הנוכחי, ומציג את הציון והפידבק של [Snyk Advisor](https://snyk.io/advisor/) על החבילה החדשה.

_[דוגמא מפרויקט Overlay](https://github.com/os-scar/overlay/blob/dcdf44f27e8c24542f1f0ca8f2b39be0e5b97d1b/.github/workflows/pr-validation.yml#L15-L19)_

### [gosec](https://github.com/securego/gosec)

_[Go]_

כלי בדיקת אבטחה לGo.

כלי אבטחה אני מריץ בכמה הזדמנויות. קודם כל בשלב ה*Pull Request* כמובן, כדי לוודא שלא מכניסים בעיות אבטחה חדשות. אבל מכיוון שכלי אבטחה חייבים להתעדכן עם הזמן, אני מריץ אותם באופן קבוע (אחת ליום או לשבוע) גם על הענף הראשי, כדי לוודא שלא צצו בעיות אבטחה חדשות.

_[דוגמא מפרויקט 2ms](https://github.com/Checkmarx/2ms/blob/master/.github/workflows/gosec.yml)_

### [Kics](https://github.com/marketplace/actions/kics-github-action)

Kics הוא מנוע לזיהוי חולשות אבטחה בInfrastructure as Code. כמעט בכל פרויקט יש לפחות קובץ Dockerfile, וKics סורק אותו למציאת בעיות פוטנציאליות.

_[דוגמא מפרויקט 2ms](https://github.com/Checkmarx/2ms/blob/cf3f46a51041a8e8fe934775e295fe2ea9dc810e/.github/workflows/pr-validation.yml#L55-L71)_

### PR title

אני משתדל להקפיד על [Conventional Commits](https://www.conventionalcommits.org/) כמו שנראה בהמשך, ולכן אני מוסיף בדיקה שהכותרת של הPR עומדת בקונבנציה. בדרך כלל אני נעזר ב[commitlint](https://commitlint.js.org/) בשביל לבדוק.

```yaml
name: Validate Conventional Commit title

on:
  pull_request:
    types: [opened, edited, synchronize, reopened]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: install commitlint
        run: npm install -g @commitlint/cli @commitlint/config-conventional
      - name: config commitlint
        run: |
          echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
      - name: validate PR title
        run: |
          echo ${{ github.event.pull_request.title }} | commitlint
```

את הבדיקה הזאת צריך לתמוך על ידי ההגדרה שהכותרת של הPR תהיה גם ההודעה בcommit:

![Squash Pull Request Title](/static/images/ci-checklist/pr-title-config.png)

_[דוגמא מפרויקט Overlay](https://github.com/os-scar/overlay/blob/master/.github/workflows/pr-title.yml)_

## CI

אז מעבר לפעולות הברורות מאליהן של העלאת חבילה לnpm, עדכון האתר או Dockerhub, יש כמה פעולות נוספות שאני מבצע.

> בעקרון רציתי לנצל את ההזדמנות לבדוק את פרויקט [allero](https://github.com/allero-io/allero) שעושה ולידציה על הCI, אבל ראיתי שהוא לא מתוחזק אז ויתרתי.

### [Semantic Release](../semantic-release/)

כדי לשמור על עקרונות [semver](https://semver.org/), אני משתמש בכלי שנקרא [semantic-release](../semantic-release/), ועל פי הפורמט של הקומיטים (שתואר בPR Title למעלה), מעדכן את מספר הגרסה ויוצר גרסה.

מצד אחד מדובר בכלי מדהים, הוא יודע כמעט בלי הגדרות מיוחדות ליצור Github Release, להעלות לnpmjs.org, ליצור changelog ולכתוב בתגובה לIssues/Pull Requests שהם נכללו בגרסה האחרונה.

הבעיה שלי אם הכלי הזה היא שברגע שאני רוצה להתאים אותו לצרכים שלי, אם אני רוצה לשנות את הפורמט של התיאור של הגרסה, או להיעזר בו ליצירת גרסה זמנית שאני מעלה אליה קבצים, אני תמיד מסתבך ומבזבז על זה הרבה זמן.

_[דוגמא מפרויקט כספיון](https://github.com/brafdlog/caspion/blob/f847d6420ca6d97f0d96832523a66a626a0cc0a4/.github/workflows/semantic-release.yml#L27-L31)_

## ניהול פרויקט ואינטגרציות

### פינוי משימות וPull Requests שנשכחו

כמנהל פרויקט קוד פתוח, קורה לי הרבה שבאים אנשים ומציעים לי תרומת קוד, ובתהליך הReview הם נשברים או סתם נהיים עסוקים, ולא משלימים את העבודה.

קורה גם לפעמים שיש לי הערות שאולי קשה לי להסביר אבל קל לי מאוד לבצע.

התוצאה של הסיבות הללו היא שבסופו של דבר יש Pull Request שלא קורה איתו כלום שבוע, או שיותר גרוע, אני חסר סבלנות ואני לוקח למישהו Pull Request ומשלים אותו.

בשביל להימנע מהמבוכה הזאת, אני מבצע כמה פעולות.

#### השמה אוטומטית של Pull Request

ברגע שמישהו פותח PR, אני אוטומטית assign עליו את הPR. זה יעזור לי בהמשך כפי שתראו.

```yml
assign-author:
  runs-on: ubuntu-latest
  if: github.event_name == 'pull_request_target'
  steps:
    - uses: toshimaru/auto-author-assign@v1.6.2
```

#### התראה על Pull Request לא פעיל

יש Github Action רשמי של Github שעוזר לנו לנהל stale issues. אני משתמש בו עם פרמטרים מאוד מסוימים כדי למצוא Issues/PRs שלא פעילים כמה ימים, ואז אני כותב בהם הודעה שקוראת למפתח לעדכן מה הסטטוס, ואני מוסיף תגית מיוחדת.

#### הורדת משימה ממפתח

בצורה אוטומטית אני עובר על הIssues/PRs שסומנו קודם לכן בתגית המיוחדת, ואם לא התבצעה בהם פעולה בימים האחרונים (מאז ששמתי את התגית), אני מוריד מהם את הassign, ובעצם מסמן שאפשר לקחת אותם ולהמשיך את העבודה שמישהו אחר עשה.

```yml
comment-on-possible-stale-issues:
  # This job uses the stale action to find inactive assigned issues and pull requests,
  # and comments on them to remind the assignee to take action.
  # If the assignee does not take action, the another action will unassign them.
  name: Comment on possible stable issues
  if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/stale@v8
      with:
        include-only-assigned: true
        exempt-assignees: 'baruchiro'
        days-before-stale: 7
        days-before-close: -1 # Never close an issue/pr
        stale-issue-message: 'Hey! This task was taken over a few days ago, but nothing has happened since then. Maybe the current contributor can comment on this?'
        stale-pr-message: 'Hey! This pull request was made a few days ago and still needs changes, but nothing has happened since then. Maybe the current contributor can comment on this?'
        stale-issue-label: 'Waiting for contributor'
        stale-pr-label: 'Waiting for contributor'
        exempt-issue-labels: 'on hold'
        exempt-pr-labels: 'on hold'
        remove-stale-when-updated: true
    - uses: boundfoxstudios/action-unassign-contributor-after-days-of-inactivity@1.0.2
      with:
        last-activity: 7
        labels: 'Waiting for contributor'
        exempt-assignees: 'baruchiro'
        labels-to-remove: 'Waiting for contributor'
        message: 'Due to a long period of inactivity, this task was unassigned automatically.'
```

_[דוגמא מפרויקט Overlay](https://github.com/os-scar/overlay/blob/master/.github/workflows/project-management.yaml)_

### Community tag

ב[פרק 19 של הפודקאסט "קוד פתוח"](https://myishay.podbean.com/e/פרק-19-הסודותשל-אלסטיקעם-ל/), ליזה כץ אומרת שבמבט לאחור, באלסטיק היו צריכים לסמן איזה קוד הגיע מתורמים חיצוניים, מכיוון שבגיטאהב אין את המידע הזה.

אצלנו באחד הפרויקטים התחלנו מהיום הראשון לסמן PRים שמגיעים מבחוץ:

```yml
- name: Mark as Community if PR is from a fork
  if: github.event.pull_request.head.repo.full_name != github.repository
  uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.addLabels({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        labels: ['Community']
      })
```

_[דוגמא מפרויקט 2ms](https://github.com/Checkmarx/2ms/blob/master/.github/workflows/pr-labels.yml)_

### Notify Discord

בימים שעוד היה API פתוח לטוויטר, הייתי שולח לשם, אבל בימינו שטוויטר מתחיל להיסגר, ודיסקורד מתחיל לעלות, אני מעוניין לשלוח עדכונים מסוימים לערוצים מסוימים.

למשל, לשלוח הודעות על גרסה חדשה שיוצאת, כמובן. בנוסף, בשביל ערוצי קוד פתוח, אני שולח good first issues חדשים שנפתחים.

בדיסקורד זה מאוד פשוט, יוצרים Webhook ושולחים אליו הודעה.

```yml
- name: Notify Discord
  if: ${{ steps.semantic_release_info.outputs.git_tag }}
  run: |
    curl -X POST -H "Content-Type: application/json" -d "{\"content\": \"$msg\"}" ${{ secrets.DISCORD_CHECKMARX_WEBHOOK }}
    curl -X POST -H "Content-Type: application/json" -d "{\"content\": \"$msg\"}" ${{ secrets.DISCORD_MAAKAF_WEBHOOK }}
    curl -X POST -H "Content-Type: application/json" -d "{\"content\": \"$msg\"}" ${{ secrets.DISCORD_SCAR_WEBHOOK }}
  env:
    msg: 'Yay! 🎉 \n Version ${{ steps.semantic_release_info.outputs.version }} was released! \n Check it out in: ${{ steps.upload_artifacts.outputs.url }}'
```

_[דוגמא מפרויקט Overlay](https://github.com/os-scar/overlay/blob/dcdf44f27e8c24542f1f0ca8f2b39be0e5b97d1b/.github/workflows/project-management.yaml#L66-L77)_ (הודעה על `good first issue`)

## Badges

רשימת תגיות (badges) שימושיות ל־README:

### קוד פתוח

- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/en)

### GitHub

- גרסה אחרונה: `![Latest Release](https://img.shields.io/github/v/release/owner/repo)` — להחליף `owner/repo` בנתיב הפרויקט
- רישיון: `![GitHub License](https://img.shields.io/github/license/owner/repo)` — להחליף בנתיב הפרויקט

### npm

- גרסת החבילה: `![npm](https://img.shields.io/npm/v/package-name?logo=npm&label=version)` — להחליף `package-name` בשם החבילה

## תוספות מתגובות לפוסט

[ישראל המליץ בטוויטר](https://twitter.com/IsraelFruchter/status/1681352397266862098) על [cookiecutter](https://github.com/cookiecutter/cookiecutter), כלי ליצירת Templates לפרויקטים. האמת שנראה טוב ואני מקווה שביום שאני אצור פרויקט לשימוש חוזר אני אשתמש בזה (אם כי אני כבר חושב שאולי זה מוגבל רק לvariables ולא לרמה של איזה קבצים לכלול בפרויקט, אבל לא קראתי את כל התיעוד)

[מענדי המליץ בטוויטר](https://twitter.com/LandaMendy/status/1681394842264272921) על [`ts-reset`](https://github.com/total-typescript/ts-reset), זאת חבילה שקצת מתקנת Types של TypeScript. אני שומר את זה פה אבל זה כנראה שייך לפוסט מעט דומה על כלים לעבודה על פרויקטים (כאן אנחנו מתמקדים בCI)

[Chorenzo](https://chorenzo.com/): AI sidekick שמטפל ב"engineering chores" ועוזר ליישר פרויקטים להנחיות ו recipes (lint, CI/CD, פורמט קוד, עדכון תלויות, best practices). עובד מתוך Cursor, Windsurf או Copilot. עדיין לא ניסיתי אבל מאוד רוצה. אם תנסו לפניי, אשמח לשמוע.
