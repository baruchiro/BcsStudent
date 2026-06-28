# SEO / AEO follow-ups

Tracking work from applying the `seo` and `seo-aeo-best-practices` skills
(branch `claude/seo-skills-search-7i6uqf`, PR #256).

## Done
- Open Graph `locale` fixed `en_US` → `he_IL` (layout, seo helper, blog post).
- Per-post `BlogPosting` JSON-LD enriched: `inLanguage`, `author`, `publisher`
  (Organization + logo), `mainEntityOfPage`.
- Homepage `Person` + `WebSite` JSON-LD with `sameAs` → all social profiles.
- Sitemap now includes `communities`, `ideas`, `about`.

## Open follow-ups
1. **Site-wide entity schema** — `Person`/`Organization` JSON-LD is on the
   homepage only. Consider moving it to `src/app/layout.tsx` so every page
   carries the entity signal.
2. **`BreadcrumbList` JSON-LD on blog posts** — recommended by the
   structured-data reference; needs a small component that maps the post path.
3. **Sitemap completeness** — `sitemap.ts` lists only the `/tags` index, not
   individual tag pages or author pages. Add per-tag and per-author routes.
4. **Enable PR creation for the updater workflow** — in GitHub repo settings,
   Actions → General → Workflow permissions: enable "Allow GitHub Actions to
   create and approve pull requests" and read/write permissions, so the weekly
   `update-skills` workflow can open its PR.

## Maintenance note: skills updater
- The weekly workflow uses `npx skills add --copy` (verified idempotent, copies
  the `references/` subtree, and reproduces the committed files exactly).
- **Avoid `npx skills update`**: observed a destructive failure mode where,
  under GitHub API rate limiting, it reports "✓ Updated" while emptying the
  skill directories.
