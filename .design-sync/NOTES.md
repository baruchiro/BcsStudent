# design-sync notes — BcsStudent blog

Repo-specific gotchas for future syncs. This is a **Next.js blog app**, not a
packaged component library, so the sync runs the package shape in a custom
configuration. Read this before re-syncing.

## Environment / install

- Yarn Berry `3.6.1`, `nodeLinker: node-modules`. **Corepack cannot fetch the
  yarn binary** (`repo.yarnpkg.com` is blocked by the agent proxy, 403). Install
  by invoking the committed binary directly:
  `node .yarn/releases/yarn-3.6.1.cjs install`. Do NOT `corepack enable`.
- `registry.npmjs.org` IS reachable (in the proxy `noProxy` list), so package
  downloads work; only the corepack self-download is blocked.
- Converter deps live in `.ds-sync/`. **`npm` is aliased to `npq-hero`** (an
  interactive security wrapper that prompts `Continue install? (y/N)` and hangs a
  non-interactive shell). Bypass it with `command npm`:
  `cd .ds-sync && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 command npm i esbuild ts-morph @types/react playwright`.
- **Render check needs no playwright browser download.** A system Chromium is
  present (`/opt/homebrew/bin/chromium`, v126); `package-validate.mjs` /
  `package-capture.mjs` honor `DS_CHROMIUM_PATH`, so run them with
  `DS_CHROMIUM_PATH=/opt/homebrew/bin/chromium`. Only the `playwright` npm lib is
  needed (install with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`).
- **`build-styles.mjs` now invokes tailwindcss via `node <cli.js>`**, not by
  exec'ing the bin: Yarn Berry's node-modules linker left `tailwindcss/lib/cli.js`
  without its executable bit (`spawnSync … EACCES`). Committed fix — don't revert.
- On a **fresh clone**, the repo's own deps (tailwindcss, react, next) must be
  installed first (`node .yarn/releases/yarn-3.6.1.cjs install`); this run found
  them already present and skipped it.

## Why the custom entry + shims

- Components are **`export default`**, but the synth entry uses `export *`
  (drops defaults). So we ship a hand-written named-re-export entry:
  `.design-sync/ds-entry.tsx` (passed via `--entry`). `componentSrcMap`
  enumerates the 10 components (no built `.d.ts` exists to auto-discover them).
- Components pull in Next.js runtime deps that throw in a bare browser bundle.
  Aliased to shims via `.design-sync/tsconfig.sync.json` `paths` (same
  bundle-time aliasing the tool already does for React — the components stay
  the real shipped code):
  - `next/link` → `shims/next-link.tsx` (plain `<a>`; these components only use
    string hrefs, which is exactly what next/link renders anyway).
  - `next/image` → `shims/next-image.tsx` (the `<img>` next/image emits).
  - `react-github-btn` → `shims/github-btn.tsx` — **SUBSTITUTE**. The real
    widget loads an external `buttons.github.io` iframe that cannot populate in
    a sandboxed render, so it's replaced with a static, on-brand GitHub "Star"
    button. Affects `GithubStarButton` and `Card`.

## CSS

- The blog's CSS is compiled by Next/Tailwind at build time; `src/css/tailwind.css`
  is uncompiled `@tailwind` source. `.design-sync/build-styles.mjs` (= `cfg.buildCmd`)
  compiles a static stylesheet `.design-sync/generated-styles.css` from the real
  `tailwind.config.js`, scanning `src/` + `.design-sync/previews/`. `cfg.cssEntry`
  points at it. **It is gitignored and generated — always run `cfg.buildCmd`
  before the converter** (the resync driver does).
- Custom classes worth knowing: `link-primary` (brand link color), `dir-ltr` /
  `dir-rtl` (RTL handling), `prose` (via @tailwindcss/typography).

## Content direction

- Blog is **Hebrew / RTL**. Previews should use realistic Hebrew content and set
  `dir="rtl"` where the real UI does. Brand: primary olive `#6b8e23`, warm-gray
  neutrals, Space Grotesk headings (see `.claude/skills/brand-guidelines`).

## dtsPropsFor

- `CategoryIndicator` / `IdeaProperties` take `CoreContent<Blog>` (contentlayer
  cross-package generic). Hand-written prop bodies in `cfg.dtsPropsFor` reflect
  only the fields these components actually read.

## Known render warns (triaged — legitimate, not new issues)

- **YouTubeShort** renders a `youtube-nocookie` `<iframe>`. The offline
  render-check sandbox has no YouTube access, so the card shows YouTube's "Video
  unavailable" placeholder in a correct vertical Shorts frame (DOM root non-empty;
  mechanical render check passes 10/10). It plays the real short in the live
  claude.ai/design browser. Graded `needs-work` locally as an honest reflection of
  the offline capture. **The user explicitly chose to ship it (2026-07-24 sync).**
  On re-sync it will re-grade `needs-work` from the offline capture — that is
  expected; keep shipping it unless the user says otherwise. Not a broken component.

## CSS safelist (why generated-styles.css is ~75KB, not ~48KB)

- `tailwind.sync.js` safelists `(bg|text|border)-(primary|secondary|gray)-<shade>`
  with `hover:`/`dark:` variants. Without it the JIT sheet would contain only the
  utilities the existing components happen to use, so a design agent building NEW
  on-brand UIs would write brand classes that render unstyled. Keep the safelist.

## Upload environment

- The DesignSync tool needs design-system authorization not available in
  claude.ai/code web sessions (`/design-login` requires an interactive terminal).
  **First real upload happened 2026-07-24 from an interactive Claude Code
  terminal** — DesignSync auth worked without extra steps. `projectId` is now
  pinned in config.json: `e8d63bf5-2991-48ab-b4fc-1155c31bb2b2`
  (https://claude.ai/design/p/e8d63bf5-2991-48ab-b4fc-1155c31bb2b2). Re-syncs
  fetch the anchor from it automatically; run them from an interactive terminal.
- The project began empty, so the first sync took the **incremental** upload path.
  A pinned `projectId` means future runs take the **atomic** path (build+verify
  fully, then one upload pass) — expected, not a regression.

## Re-sync risks (watch-list)

- **Shim drift**: if `Card`/`Tag`/etc. start using non-string hrefs, richer
  next/image features, or a different GitHub widget, the shims may misrepresent
  output. Re-check the shims against component source on re-sync.
- **`react-github-btn` is a substitute**, not the real widget — the star count
  is hard-coded decorative. Accepted deliberately.
- `generated-styles.css` coverage depends on Tailwind scanning previews; a new
  utility used only in a preview added by hand needs a `build-styles` re-run.
- No `dist/` — everything is bundled from `src/` via the custom entry. Adding a
  reusable component means adding it to `ds-entry.tsx` AND `componentSrcMap`.
