---
name: write-post
description: >
  Write a new blog post for this blog (Baruch's Hebrew dev blog, BcsStudent) in the author's
  voice. Use this skill whenever the user wants to write, draft, or add a blog post — including
  "כתוב פוסט", "פוסט חדש", "add a post about X", "turn these notes / this talk / this idea into a
  post", "תכתוב לי על X לבלוג", or when drafting/expanding anything under `data/blog/`. Covers the
  author's voice, frontmatter, MDX components, cross-linking, tagging, file placement, and the
  contentlayer validation step. Use it even if the user doesn't say the word "skill" — any request
  to produce blog content for this repo should go through here.
---

# Write a Blog Post

This blog is **Baruch's personal dev blog**, in **Hebrew (RTL)**, built with Next.js + Contentlayer
(Tailwind Nextjs Starter Blog). Posts live in `data/blog/`. Your job is to produce a post that reads
like the author wrote it — not a generic AI article. Voice is the thing that matters most; get that
right and the rest is mechanics.

Before drafting, skim 2–3 existing posts close to the topic (e.g. `data/blog/self-hosted.mdx`,
`data/blog/ai-blog-chat.mdx`, `data/blog/actual-budget-ai.mdx`, `data/blog/api-automations.md`) so
you match the register of *this* author rather than a remembered average.

## File & format

- Path: `data/blog/<slug>.md` or `.mdx`. Use **`.mdx`** if you'll use any component (`<Note>`,
  `<N8nDemo>`, sized `<img>`); plain `.md` otherwise.
- Slug: **English, kebab-case, descriptive.** AI posts often take an `-ai` suffix
  (`actual-budget-ai`, `email-summary-ai`). The slug becomes the URL `/blog/<slug>`.
- Nested folders exist (`data/blog/money/`, `data/blog/ideas/`) — only use them if the post clearly
  belongs to that series.

## Frontmatter

The canonical rules are in `CLAUDE.md` (the *Blog post frontmatter* and *Content & RTL* sections). In short:

```yaml
---
title: 'כותרת עם נקודתיים: עוטפים בגרשיים בודדים'
date: 2026-06-03            # required, YYYY-MM-DD
draft: false               # published posts are usually false; PR review is the gate
summary: >
  משפט-שניים בעברית שמתארים את הפוסט. נכתב בגוף ראשון, בלי שיווקיות.
tags: ['ai', 'n8n', 'self-hosted']   # 2–5, see Tags below
type: Blog                 # always Blog for blog posts
images: /static/images/<slug>/<slug>.png   # OPTIONAL — see Images
---
```

`title` is the only field that often needs quoting (wrap in single quotes when it contains a colon).
`lastmod`, `authors`, `layout`, `canonicalUrl` exist but are rarely needed.

## Voice — the part that matters

Full reference: the **Voice** section of the `brand-guidelines` skill
(`.claude/skills/brand-guidelines/SKILL.md`). The essence:

- **First person, casual Hebrew** (אני, שלי). Talk to the reader like a friend who codes.
- **Tell the journey, not just the result.** Posts read like "ככה הגעתי לזה" — what I tried, what
  annoyed me, what I learned. Sections like `## מסקנות` / `## מה בהמשך?` are common.
- **Opinionated and self-deprecating.** Recurring threads: prefers free/open-source, dislikes paying
  ("אני לא אוהב לשלם מחיר 😉"), self-hosting ethos, "less code = less maintenance". Parenthetical
  asides and honest hedging ("האם זה אופטימלי? לא יודע.") are signature.
- **Mix English tech terms inline** (Docker, workflow, Auth, RAG) — don't translate them. The blog's
  `DirectionWrapper` handles RTL/LTR.
- **Casual connectors**: אז, טוב, בקצרה, תכל'ס, אממממ.
- **Close with engagement** — invite a comment, e.g. "תכתבו לי בתגובות...".
- **Avoid**: formal/academic tone, unexplained jargon, salesy phrasing, generic "in today's
  fast-paced world" openers. If a sentence could open any Medium post, rewrite it.

Use `<Note>...</Note>` for a side-comment or a "for the technical reader" aside; the author leans on
it heavily instead of footnotes.

### Avoid AI tells (critical)

Readers now spot AI-written text instantly, and the author cares about this a lot. Two hard rules:

- **No em-dashes (`—`) and no spaced hyphens (` - `) as separators or parentheticals.** This is the
  single biggest "a machine wrote this" signal. Restructure instead with a comma, a period, a colon,
  or real parentheses `(…)`. Rewrite `הידיים — שרת n8n-mcp` as `הידיים: שרת n8n-mcp`; rewrite
  `וכשהוא נכשל — והוא ייכשל — יש לי לוג` as two sentences, or move the aside into parentheses.
- **Keep** legitimate Hebrew prefix-hyphens (`ל-n8n`, `ב-Paperless`, `ה-API`, `מ-AI`) and hyphenated
  tags (`self-hosted`). Those are correct typography, not the tell.

Other tells to avoid: repeated "not X, but Y" constructions, triplet lists in every paragraph, and a
parenthetical aside on every line. One or two asides per post, not one per sentence.

### Use precise, native terms

Name things by their real name. If the AI reaches n8n's nodes through **MCP** (e.g. `n8n-mcp`), call it
MCP, not a vague "coding agent" or "integration". The author is a domain expert and prefers the exact
term. Don't overstate architecture you're unsure of either: an AI agent can connect to the tools
**remotely**, so it need not run "in the same Docker environment". Say what is actually true.

## Structure

Open with a personal hook (a preference, a pain, a bit of history) — often linking to a related past
post. Use `##` / `###` section headers. Keep paragraphs short. End with a takeaway + an invitation to
comment. Typical length is ~600–1200 words; don't pad.

## MDX components (only in `.mdx`)

The source of truth is `src/components/MDXComponents.tsx`. Available:

- `<Note>…</Note>` — boxed aside. Most-used component.
- `<N8nDemo file="/static/files/<Workflow>.json" />` — embeds an interactive n8n workflow. **Only use
  if a real workflow JSON exists in `public/static/files/`** — never invent the path.
- Sized image: `<img src="/static/images/<slug>/x.png" alt="…" style={{ maxHeight: '500px', width: 'auto', margin: '0 auto' }} />` (the author's pattern for cover/inline images).
- `<YouTubeShort>`, `<TOCInline>`, `<BlogNewsletterForm>`, `<CalBooker>`, `<Image>` also registered.
- Plain markdown links render through a custom `<Link>` — just use `[text](url)`.

## Linking (a stylistic signature — do it generously)

- **Cross-link the author's own posts** with relative paths `/blog/<slug>` whenever relevant. This is
  a strong habit of the blog. Example: when recommending to run things on a server, link
  `[SelfHosted](/blog/self-hosted)`; for n8n/RAG link `/blog/ai-blog-chat`; for MCP+budget link
  `/blog/actual-budget-ai`; for early no-code automation link `/blog/api-automations`. Verify the
  slug exists (`ls data/blog`) before linking.
- **Link tools to their real homes**: official site and/or GitHub repo on first mention
  (`[n8n](https://n8n.io/)`, `[Paperless](https://docs.paperless-ngx.com/)`). Public projects only.
- **Never link to private repos.** The author's `home-server` repo
  (`github.com/baruchiro/home-server`) is **private**; do not link it or deep-link its files
  (`infra-stack.yml`, `ai-stack.yml`, `update-skills.sh`, etc.) in a published post, because the links
  404 for every reader. To show config, paste a short inline snippet instead, or point at a public
  project (e.g. `czlonkowski/n8n-mcp`, `czlonkowski/n8n-skills`, which are public).

## Tags

Defer to the **`organize-tags`** skill (`.claude/skills/organize-tags/SKILL.md`). Rules: 2–5 tags,
English, lowercase-with-hyphens, **reuse existing** tags from `src/app/tag-data.json` before coining
new ones. Common relevant tags: `ai`, `n8n`, `self-hosted`, `no-code`, `mcp`, `open-source`, `docker`,
`devx`. Don't introduce a near-duplicate of an existing tag.

Actually **run** the organize-tags workflow per tag (does it truly apply? is there a closer existing
tag? is it justified, or just filler?), and confirm each chosen tag exists in `src/app/tag-data.json`
with the exact lowercase-hyphen key. Don't just assert "2–5, looks fine".

## Images (cover required)

Every post ships with a **cover image**; the author treats this as mandatory. Convention:
`public/static/images/<slug>/cover.png`, referenced as `images: /static/images/<slug>/cover.png`.

You can't shoot a real photo, so do **both**:

**1. Generate a build-safe, on-brand placeholder.** A bundled script renders one from an SVG via the
installed `sharp`:

```bash
# run from the repo ROOT so Node resolves `sharp` (a script under /tmp will NOT find it)
node .claude/skills/write-post/scripts/make-cover.mjs <slug> "Latin Title" "short latin subtitle"
```

Then eyeball the result with the Read tool before committing. Guidelines for any cover you make:

- **Size**: 1200×630 (the OG/social ratio).
- **Palette** (from the `brand-guidelines` skill, `.claude/skills/brand-guidelines/SKILL.md`): primary `#6b8e23`, primary-light `#e8f5d0`,
  secondary `#a8f7b5`, text `#3a3229`, warm bg `#fef8f2`. Stay on-brand; no new accent colors.
- **No Hebrew text in the raster** — RTL/shaping breaks without a configured Hebrew font. Use a short
  **Latin** wordmark/tagline, or no text at all (the Hebrew title already shows on the page).
- **Style**: minimal, modern, flat, lots of negative space. A light motif that fits the topic
  (e.g. connected workflow nodes for automation posts) beats clip-art.

**2. Hand the author a real AI-image prompt** so they can swap in a better cover. Make it specific and
ready to paste: subject + composition + style + palette + mood + `1200×630` + `no text`. Shape:
"A minimal, modern flat-illustration banner, 1200×630, olive-green `#6b8e23` and warm cream `#fef8f2`
palette: <topic motif>. Soft depth, generous negative space, no text, no logos."

Never point `images` at a file that doesn't exist: a missing local image **breaks the Next build**, not
just the rendering.

## Validate before calling it done

`next lint` skips `data/`, so it won't catch MDX errors. Contentlayer is the real check:

```bash
yarn install            # if node_modules is missing
rm -rf .contentlayer
npx contentlayer2 build # compiles every post; your file must appear with no error
```

Then confirm the post parsed: read `.contentlayer/generated/Blog/_index.json` and check your slug,
title, tags, and `readingTime`. A build warning about `videos/_metadata.json` is pre-existing and
unrelated.

**Do not commit** `src/app/tag-data.json` just because the build regenerated it — it's rebuilt on
deploy, and committing it sweeps in unrelated count drift. Commit only your post file (plus any real
images you added). Keep PRs to a single post unless told otherwise.

## Don'ts

- Don't use em-dashes (`—`) or spaced-hyphen separators anywhere in the prose; they read as AI-written.
- Don't write in English, or in a formal/salesy register.
- Don't link private repos (e.g. `home-server`); don't invent image paths or `<N8nDemo>` workflow files.
- Don't coin new tags when an existing one fits.
- Don't fabricate links to the author's posts; check the slug first.
- Don't pad to hit a length; the author values getting to the point.

## Good exemplars to model

`self-hosted.mdx` (voice + structure + linking), `ai-blog-chat.mdx` (AI/n8n register, `<N8nDemo>`),
`actual-budget-ai.mdx` (code blocks + journey), `api-automations.md` (older voice, "less code" thesis).
