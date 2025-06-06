# [Baruch Odem](https://baruchiro.online/)

To be a computer science student.

## About

My blog, mainly about programming, in Hebrew.

Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/), based on [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

[![Deployed on Vercel](https://vercel.com/button)](https://baruchiro.online/)

## Communities Collection

To add a new community:

1. Create a markdown file in `data/communities/` (e.g., `my-community.md`).
2. Use the following frontmatter structure:

```yaml
---
name: 'Community Name'
description: 'Short description in Hebrew.'
image: '/static/images/communities/community-image.png'
links:
  Telegram: 'https://t.me/community'
  Website: 'https://community.com'
tags:
  - tag-one
  - tag-two
---
```

- Store images in `public/static/images/communities/`.
- Use 2-5 tags, lowercase, hyphens for spaces, and prefer existing tags.
- Write all content in Hebrew and follow RTL conventions.
