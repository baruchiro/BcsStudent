# BcsStudent blog — component conventions

A Hebrew-first, RTL developer blog. Components are plain React and style
themselves with **Tailwind utility classes**; the compiled utilities ship in
`_ds_bundle.css` (reachable through `styles.css`). There is no runtime provider
or theme context — drop a component in and it renders styled, as long as the
stylesheet is present.

## Setup & direction

- **No provider needed.** These are leaf presentational components.
- **RTL is the default.** Content is Hebrew, right-to-left. Wrap regions in
  `dir="rtl"` (use `dir="ltr"` for Latin-only blocks like a GitHub button). The
  helper classes `dir-rtl` / `dir-ltr` set both direction and text-align.
- **"Forward" arrows point left** (`←` / `&larr;`), since forward = leftward in
  RTL. See `Card`'s "לפרויקט ←" and `StatusComponent`'s done-link.
- Links inside components route with `next/link` in the app; in this bundle they
  render as plain `<a>` (bundle-time shim — same output for the string hrefs
  these components use).

## Styling idiom — Tailwind utilities (brand vocabulary)

Style your own layout glue with these utility families. All brand shades
(`50`–`950`) of `primary`, `secondary`, and `gray` are available, with `hover:`
and `dark:` variants.

| Purpose | Classes |
|---|---|
| Brand color (olive) | `text-primary-500` `text-primary-600` `bg-primary-500` `border-primary-500` |
| Accent (green) | `text-secondary-600` `bg-secondary-50` `border-secondary-500` |
| Text / neutrals (warm gray) | `text-gray-500` `text-gray-700` `text-gray-900` `bg-gray-50` `bg-gray-200` `border-gray-200` |
| Brand text link | `link-primary` (olive, WCAG-AA, lighter in dark mode — prefer this over hand-rolling link colors) |
| Status | `text-green-600` (done) · `text-yellow-600` (in-progress) |
| Shape / type | `rounded-md` `rounded-lg` `p-4` `p-6` `gap-1` `font-bold` `text-2xl` `tracking-tight` `prose` |
| Dark mode | class-based (`darkMode: 'class'`); pair every color with `dark:` (e.g. `text-gray-500 dark:text-gray-400`) |

Palette anchors: primary `#6b8e23` (olive), secondary `#a8f7b5`, gray `50 #fef8f2`
→ `950 #1f1a16` (warm-toned). Don't introduce accent colors outside
primary/secondary/gray. One primary action per screen.

**Fonts:** headings/UI use `font-sans` (Space Grotesk, a Latin family). Hebrew
text always falls back to a system Hebrew font — that's expected, not a bug.

## Where the truth lives

- Styling: `styles.css` → `_ds_bundle.css` (compiled Tailwind — the emitted
  utility set). Read it before inventing class names.
- Per-component API + usage: each component's `<Name>.d.ts` and `<Name>.prompt.md`.

## Idiomatic snippet

```tsx
import { Card, PageTitle } from 'BscStudent'

export function Projects() {
  return (
    <section dir="rtl" className="mx-auto max-w-4xl p-6">
      <PageTitle>הפרויקטים שלי</PageTitle>
      <div className="-m-4 flex flex-wrap">
        <Card
          title="2MS (Too Many Secrets)"
          description="כלי להגנה על סודות בקוד ובמאגרי git."
          href="https://github.com/Checkmarx/2ms"
          tags={['קוד פתוח', 'git']}
          language={{ name: 'Go', color: '#00ADD8' }}
        />
      </div>
    </section>
  )
}
```
