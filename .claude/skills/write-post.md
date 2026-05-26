---
description: Write a new blog post for baruchiro.com. Creates a properly formatted Hebrew MDX/MD post that matches the blog's tone and style. Use when the user asks to write, draft, or create a blog post.
---

# Writing a Blog Post

You are writing a post for Baruch's personal tech blog at baruchiro.com. Study the guidelines and style below carefully before writing.

## Language & Tone

- **Write in Hebrew** (RTL). The blog is primarily Hebrew.
- Tone is **conversational and personal** — first person ("אני"), direct address to the reader ("אתם"), self-aware humor.
- Be honest about uncertainty: "לא יודע", "עוד לא הבנתי עד הסוף", "כנראה שלא".
- Acknowledge your own learning journey — don't pretend to be an expert, share the process.
- Use light humor and self-deprecating asides in parentheses, e.g. `(אתם יכולים לנחש שאלו רק תוכניות ולא באמת סיימתי)`.
- End posts with encouragement or an open invitation to respond: "בהצלחה!", "תכתבו לי בתגובות".

## Post Structure

1. **Opening hook** — Start with a relatable problem, personal context, or backstory. No "Introduction" header needed.
2. **Explain the concept** — "מה זה X?" sections for new tools/concepts. Keep explanations accessible.
3. **Walk through the solution** — practical steps, code examples, screenshots where relevant.
4. **Personal angle** — what worked, what didn't, what you're still figuring out.
5. **What's next / future ideas** — a bullet list of things you're considering or haven't finished yet.
6. **Short closing** — 1-2 sentences wrapping up, or an invitation to comment.

## Writing Style Patterns

- Use `###` for sub-sections (not `##` for everything — mix as needed).
- Bold (`**text**`) for emphasis on key phrases.
- Numbered or bulleted lists for steps, apps, or ideas.
- Inline links naturally woven into text.
- Reference your own previous posts with relative links: `[פוסט על self hosted](/blog/self-hosted)`.
- Use `<Note>` MDX component for important asides or caveats.
- Use `<img>` with inline style for images that need size constraints.

## Frontmatter

```yaml
---
title: 'כותרת הפוסט בעברית'
date: YYYY-MM-DD
draft: false
summary: |
  תקציר קצר של הפוסט. שתיים-שלוש משפטים שמסבירות מה הפוסט מכסה ומה הקורא ילמד.
tags: [tag1, tag2]
images: '/static/images/post-slug/cover.png'
type: Blog
---
```

- `title`: Required. Hebrew. Wrap in single quotes if it contains colons.
- `date`: Required. Format `YYYY-MM-DD`.
- `summary`: 2-3 sentences. Use `|` block scalar for multiline.
- `tags`: 2–5 tags. **Must use existing tags from this list** (add new ones only if truly necessary):
  `ai`, `application-security`, `bot`, `browser-extension`, `career`, `caspion`, `ci-cd`, `cli`, `code`, `developer-experience`, `devtool`, `devx`, `docker`, `free`, `git`, `github`, `hardware`, `homeassistant`, `ide-extension`, `idea`, `integrations`, `javascript`, `mcp`, `mobile`, `money`, `n8n`, `no-code`, `open-source`, `recommendation`, `self-hosted`, `shorts`, `testing`, `vscode`, `webapp`, `what-to-know-as-a-student`, `work`
- `images`: Optional. Path under `/static/images/post-slug/`.
- `type`: Always `Blog`.
- Tags must be lowercase and hyphen-separated.

## File Naming & Location

- Save to: `data/blog/post-slug.md` or `data/blog/post-slug.mdx`
- Use `.mdx` if the post uses JSX components (`<Note>`, `<N8nDemo>`, inline `<img>` with style props).
- Use `.md` for plain markdown posts.
- Filename: kebab-case, all lowercase, no spaces.

## Code Blocks

- Use fenced code blocks with language identifiers.
- For docker-compose or yaml examples, use ```yaml.
- For titled code blocks: ` ```js:filename.js `.

## Topics & Recurring Themes

Baruch writes about:
- **Self-hosted tools** and home server setup (docker-compose, Cloudflare Tunnel, Tailscale, HomeAssistant)
- **AI integrations**: n8n, MCP servers, RAG, personal AI assistants
- **Open-source** projects he contributes to (israeli-bank-scrapers, Moneyman, Caspion)
- **Developer tools & DX**: Git, CI/CD, VSCode extensions, automation
- **Career & work**: impact, productivity, working in organizations
- **Finance automation**: Actual Budget, Moneyman, personal finance tracking
- **Quick tips** ("Shorts"): short practical posts under ~500 words

## Example Opening Patterns

- Personal backstory: "כבר שנים שאני מוביל פרויקטים שמטרתם..."
- Problem-first: "אני בדרך כלל מעדיף שהמידע שלי יהיה אצלי..."
- Casual question: "אז איך אפשר בלי AI?"
- Honest admission: "זה התחיל ב..." or "עד שהבנתי ש..."

## Step-by-Step

1. Ask the user: what is the post topic/idea? What should it cover?
2. Draft the frontmatter (title, date = today, tags from the list, summary).
3. Write the post body in Hebrew following the structure above.
4. Save the file to `data/blog/[slug].md` or `.mdx`.
5. Show the user the file and ask if they want any changes.
