---
name: organize-tags
description: Chooses and normalizes tags for blog posts, projects, and communities. Use when adding or editing tags on any resource, when the user asks to pick tags, when reviewing frontmatter that includes tags, or when the user explicitly asks to organize tags, review tags, or run tag cleanup (manual tag review flow).
---

# Organize Tags

## Resources That Have Tags

- **Blog posts**: `data/blog/**/*.md`, `data/blog/**/*.mdx` — frontmatter `tags`
- **Projects**: `data/projects/*.mdx` — frontmatter `tags`
- **Communities**: `data/communities/*.md` — frontmatter `tags`

## Tag Rules

1. **Language**: Tags must be in English.
2. **Case**: Case-insensitive — always store and suggest tags in **lowercase** (e.g. `open-source`, `devx`, `no-code`).
3. **Spaces**: Use hyphens for multi-word tags (e.g. `what-to-know-as-a-student`, not `what to know as a student`).
4. **Count**: Each resource should have **2–5 tags**.
5. **Reuse**: Prefer existing tags. Current tag list and counts are in `src/app/tag-data.json` — check it before adding new tags.
6. **Relevance**: Tags must be specific and relevant to the main topics of the content.

## When Considering a Tag

Follow this workflow for each tag:

1. **Define the resources it relates to**: Identify which blog posts, projects, or communities currently use this tag.
2. **Check if there are more resources that can be attached to it**: Search for other resources that might benefit from this tag but don't have it yet.
3. **Think if there is a better name for it**: Consider if the tag name clearly conveys its purpose and follows naming conventions (lowercase, hyphens, English).
4. **Check if there is a closer/similar tag**: Look for tags with similar names or tags attached to similar resources. Consider merging if they're redundant.
5. **Single-use tag evaluation**: If after all steps the tag still relates only to one resource, consider removing it unless it is very specific and required.

## When Suggesting or Editing Tags

1. Read `src/app/tag-data.json` to see existing tags (keys are normalized lowercase-with-hyphens).
2. Apply the "When Considering a Tag" workflow above for each tag.
3. Propose only tags that follow the rules above; normalize any existing tags in the file to lowercase and hyphens.
4. If adding a new tag, ensure it is necessary and not redundant with an existing one (e.g. prefer `open-source` over coining `opensource`).

## Cleanup (When Reviewing or Consolidating Tags)

- Prefer consolidating similar tags (e.g. merge variants into one canonical form).
- Remove or merge tags that are used only once unless they are highly specific and necessary.
- Remove overly generic tags that don't add value.

## Manual Tag Review Flow

When the user explicitly asks to organize tags, review tags, or run tag cleanup, run this interactive flow:

1. **Load and sort**: Read `src/app/tag-data.json`. Sort tags by count **ascending** (least used first). Process tags in that order.
2. **For each tag** (one at a time):
   - Show the tag name and its count.
   - List which resources use it (blog posts, projects, communities — by path or title).
   - Apply the "When Considering a Tag" workflow (define resources, check for more, better name, similar tag, single-use evaluation).
   - Present options: **keep**, **rename** (suggest new name), **merge** (into another tag), **remove**.
   - Wait for user feedback (e.g. "keep", "rename to X", "merge into Y", "remove", or "skip").
   - If user chooses rename/merge/remove: make the edits in the relevant frontmatter files and in tag usage; then continue.
   - run "yarn build" to update the tag data.json file.
   - Move to the next tag only after user responds or explicitly says "next" / "skip".
3. **Stop when**: All tags have been reviewed, or the user asks to stop.’t add value.
