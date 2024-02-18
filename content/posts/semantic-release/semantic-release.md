---
title: How to setup auto semantic-release
draft: false
date: 2021-07-27
cover_image: ./semantic-release.jpeg
tags: ["git", "SemVer"]
language: en
publications:
  - https://medium.com/@baruchiro/how-to-setup-auto-semantic-release-184483d2198e
  - https://dev.to/baruchiro/how-to-setup-auto-semantic-release-4fd8
summary: |
  Setup auto-increment, release, and changelog with semantic-release, in Github repo with Github Actions.
---

## Semantic Versioning

_Semantic Versioning_ (AKA _SemVer_) is a convention for package versions. Since it is the most used convention (AFAIK, I don't know about others...), it is well documented and widely used around the open-source, so I'm not going to describe it. You can read more [here](https://semver.org/).

## Semantic Release

_Semantic Release_ is a tool to implement _SemVer_ automatically in a project.

> Fully automated version management and package publishing
> _from [Semantic Release](https://semantic-release.gitbook.io/) docs._

In this post, I want to share with you the process of adding and configuring the `semantic-release` tool, because I had to collect the information from multiple sources, even from the source code of the tool.

Let's start.

### Prerequisites

In this post, I assume you have

- [ ] a _NodeJS_ project (with a `package.json` file)
- [ ] in a _Github_ repository
- [ ] with basic knowledge in _Github Actions_
- [ ] and fearlessly use CLI and read its output

### Command Line

The `semantic-release` feels like a great tool, and it does a lot of things by default, and does them right.

The first thing you want to do is to run the tool, just like that. Don't worry, it will identify that you're not in a CI environment, and it will automatically run on _dry_ mode.

In your project folder, run `npx semantic-release`, it will print some beautifully organized output. Read that output.

First of all, it failed because of **missing tokens**, follow the links inside the errors to create the tokens.

It will not create a version (dry run), and you expect one of the next messages:

<details>
<summary><code>There is no previous release, the next release version is 1.0.0</code></summary>

If you never published a release before (and **release** means **git tag**), `semantic-release` will create a default version `1.0.0` in any way.

</details>

<details>
 <summary><code>configured to only publish from master</code></summary>

The whole line:

> `This test run was triggered on the branch foo, while semantic-release is configured to only publish from master, therefore a new version won’t be published.`

We will see the `semantic-release` is triggering a version when pushing to specific branches. If you're not in the `master` branch, the `semantic-release` will not process your git history to create a version.

</details>

<details>
 <summary><code>There are no relevant changes, so no new version is released.</code></summary>

Maybe you see messages about `Analyzing commit` because you committed some changes since your last version, but eventually, the `semantic-release` didn't find a commit message in a pattern to create a new release.

We will touch on the commit messages pattern later.

</details>

<details>
 <summary><code>Published release 1.1.0 on default channel</code></summary>

OK, but it did nothing because, with _dry-run mode_, all the actions were skipped, this is just a completion message.

</details>

### Commit Format

We ran the `semantic-release` tool with the default configurations. Before any other configuration adjustment, the most important thing you may ask is, why is `semantic-release` analyzing my commits but `There are no relevant changes`?

That is because `semantic-release` uses [commit message format](https://semantic-release.gitbook.io/semantic-release/#commit-message-format) to decide if and what version should be bumped.

Try to commit with the message `perf(pencil): remove graphiteWidth option` and see if now it's deciding to bump your version.

### Configuration

I saw the [default commit format (Angular Conventions)](https://semantic-release.gitbook.io/semantic-release/#commit-message-format) and I felt it will add overhead and will be less readable, and it is not worth the time I'm saving with automatic releasing. I wanted to change the commit format.

To do that, we need to [configure](https://semantic-release.gitbook.io/semantic-release/usage/configuration) the `semantic-release`, and since any configuration section will override the default configuration we used so far, I think the best idea is first to configure the default configuration explicitly, and then start to adjust it.

The default configuration for the relevant sections (in [`release.config.js`](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file) format) is:

```javascript
module.exports = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "master",
    "next",
    "next-major",
    {
      name: "beta",
      prerelease: true,
    },
    {
      name: "alpha",
      prerelease: true,
    },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
};
```

- [Default `branches`](https://semantic-release.gitbook.io/semantic-release/usage/configuration#branches)
- [Default `plugins`](https://semantic-release.gitbook.io/semantic-release/usage/plugins#default-plugins)

#### Branch Configuration

The first configuration I wanted to change is the `branches`. For me and for now, I just need to trigger the release on the `master` branch, you can see how simple is the, just `branches: ['master']` instead of the current config.

---

##### So far so good?

You have that configuration, you may push and start using automatic release. What else?

For me, I wanted to take it few steps forward, to

- [ ] Use more convenient and readable commit messages.
- [ ] Set the commit message just before finishing the PR, and not on each commit.
- [ ] Manage a `CHANGELOG` file.
- [ ] _Bonus:_ Tweet about the new version

Let's continue.

## Custom Commit Message Convention

The default plugin [`@semantic-release/commit-analyzer`](https://github.com/semantic-release/commit-analyzer) is responsible to analyze the commit message, and it is configured by two settings:

1. The _convention_ (`preset`)
2. The _rules_ (`releaseRules`)
3. (Other options: `parserOpts`)

I decided to follow the [ESLint convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint):

```markdown
# Format:

Tag: Short description (fixes #1234)

# Examples:

Build: Update Travis to only test Node 0.10 (refs #734)
Fix: Semi rule incorrectly flagging extra semicolon (fixes #840)
Upgrade: Esprima to 1.2, switch to using comment attachment (fixes #730)
```

This format is better, right?

To use this format, we first need to select `eslint` as our `parser`, but surprise! It is not coming with all its default available tags (the `Build`, `Fix`, `Upgrade` and more), and instead, the `@semantic-release/commit-analyzer` [will handle only a four tags](https://github.com/semantic-release/commit-analyzer/blob/4fa5c212ce40bd45c3f8b340d693d9b58f8a55d7/lib/default-release-rules.js#L23-L27):

```javascript
{tag: 'Breaking', release: 'major'},
{tag: 'Fix', release: 'patch'},
{tag: 'Update', release: 'minor'},
{tag: 'New', release: 'minor'},
```

You can keep it with this default, or if you want to add more tags, you can add your custom object to **replace** the default one.

For me, the `plugins` are now:

```javascript
plugins: [
  [
    "@semantic-release/commit-analyzer",
    {
      preset: "eslint",
    },
  ],
  [
    "@semantic-release/release-notes-generator",
    {
      preset: "eslint",
    },
  ],
  "@semantic-release/npm",
  "@semantic-release/github",
];
```

**Note** that I had to update the `@semantic-release/release-notes-generator` settings since it is also analyzing the commits to generate the release notes.

And finally, I documented the default tags in my repo, just to easily find them if I forgot.

## Conventional PullRequest title

For now, you expect the contributors to use the conventional commit messages (and you may use [commitlint](https://github.com/conventional-changelog/commitlint)). But you don't have to force it.

First of all, you can keep it optional, and if you want to trigger a new release, make sure that one of the commits in a PR is in the convention.

In my repos, I'm using two conventions, side by side:

### Merge Commit

If the Pull Request contains more than one change (and of course, in multiple commits), although it is not best practice, you know, a small repo without contributors... Anyway, in that case, I'm looking at the commits to see if there are _conventional commits_ there, and if so, I'm **merging** the PR, and the commits will be in the `master` branch and will trigger the release.

### Squash Commits

If the PR is only about one change, we don't have the commits to be conventional. Instead, we can change the **pull request title** to be conventional, and **squash** the pull request to be only one commit in `master`. In _Github_, by default, the **pull request title becomes to be the commit message in squash merge**.

To help me to remember that, I created a _Github Actions workflow_ to validate the pull request title and comment on the PR if the title does not match my convention.

```yaml
name: PR Title

on:
  pull_request:
    types: [opened, edited, synchronize, reopened]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: deepakputhraya/action-pr-title@3864bebc79c5f829d25dd42d3c6579d040b0ef16
        name: Validate PR Title
        continue-on-error: true
        with:
          regex: '\w+:( [\w\.,]+)+( \(\w+ #\d+\))?' # Regex the title should match.
          # allowed_prefixes: 'feature,fix,JIRA' # title should start with the given prefix
          # disallowed_prefixes: 'feat/,hotfix' # title should not start with the given prefix
          # prefix_case_sensitive: false # title prefix are case insensitive
          # min_length: 5 # Min length of the title
          max_length: 50 # Max length of the title
          github_token: ${{ secrets.GITHUB_TOKEN }} # Default: ${{ github.token }}
      - uses: mshick/add-pr-comment@07f690343c25a94e24a8acb70d03c86b701ae322
        name: Comment on PR
        if: ${{ failure() }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          message: |
            Please fix the title of this PR.

            Example: `New: Add new feature`

            See more in `/docs/RELEASE.md`.
```

> I compared a lot of optional actions to do this validation and comment, and I'm not sure I selected the best. Please share with me your suggestions.

## Manage a CHANGELOG file

There is a practice to manage a file with all the release notes, for all the versions, listed on it.

Unfortunately, I can't think about a beautiful way to update the CHANGELOG without adding another commit after the release.

To generate the CHANGELOG and commit it, we will add two (obvious) plugins to semantic-release: [`@semantic-release/changelog`](https://github.com/semantic-release/changelog) and [`@semantic-release/git`](https://github.com/semantic-release/git).

```javascript
plugins: [
  ...
  [
   "@semantic-release/changelog",
   {
    "changelogFile": "CHANGELOG.md"
   }
  ],
  [
   "@semantic-release/git",
   {
    "assets": ["CHANGELOG.md"],
    "message": "${nextRelease.version} CHANGELOG [skip ci]\n\n${nextRelease.notes}"
   }
  ]
  '@semantic-release/npm',
  '@semantic-release/github'
]
```

**Please note** the plugins are running sequentially, and you have to put the `changelog` plugin **before** the `git` plugin.

This configuration will first update the `CHANGELOG.md` file in the local folder, and after that will commit it with a custom message, includes the `[skip ci]`, to mark this commit as out of release process.

## _Bonus:_ Tweet about a new release

Now you have a fully working process to automate your release, and more than that, I hope you got enough information to continue to adjust the process to your needs.

One more thing I'm doing is to [tweet about new releases](https://twitter.com/hashtag/send_tweet_action), to implement, follow the instructions in [ethomson/send-tweet-action](https://github.com/ethomson/send-tweet-action).

If you want to get the new version number (or any other value) from `semantic-release`, you need to put it in Environment Variables, and you can do it with [@semantic-release/exec](https://github.com/semantic-release/exec):

```javascript
plugins: [
  ...[
    "@semantic-release/exec",
    {
      successCmd: 'echo"SEMVER_VERSION=${nextRelease.version}" > $GITHUB_ENV',
    },
  ],
];
```

## Summary

> [Finally, all my configuration files](https://gist.github.com/baruchiro/3a52a9897556a880b32f74f03caca299.js).

---

Update: while writing this post to document my process, I finally found [another blog post that already documented it](https://svdoscience.com/2020-10-31/versioning-with-semantic-release), you are welcome to use both :-).

Thanks to my teammate [Leonid Weinberg](https://www.linkedin.com/in/leonid-weinberg-a45964143/) who review the article to correct language errors.
