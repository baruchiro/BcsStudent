// Generate a build-safe, on-brand cover placeholder for a blog post.
//
// Usage (RUN FROM THE REPO ROOT so Node resolves `sharp` from node_modules;
// a copy placed in /tmp will fail with ERR_MODULE_NOT_FOUND):
//
//   node .claude/skills/write-post/scripts/make-cover.mjs <slug> ["Latin Title"] ["latin subtitle"]
//
// Writes public/static/images/<slug>/cover.png at 1200x630, then set
//   images: /static/images/<slug>/cover.png
// in the post frontmatter. Keep any text LATIN — raster Hebrew breaks without a
// configured RTL font. This is only a placeholder: also hand the author a real
// AI-image prompt to swap in a better cover.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const [slug, title = '', subtitle = ''] = process.argv.slice(2)
if (!slug) {
  console.error('usage: make-cover.mjs <slug> ["Latin Title"] ["latin subtitle"]')
  process.exit(1)
}

// Brand palette — see .cursor/rules/brand-guidelines.mdc
const C = {
  primary: '#6b8e23',
  primaryHi: '#7ba32f',
  light: '#e8f5d0',
  secondary: '#a8f7b5',
  text: '#3a3229',
  bg: '#fef8f2',
}
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const W = 1200,
  H = 630,
  cy = title ? 360 : 300
const node = (x, hl = false) => `
  <rect x="${x}" y="${cy}" width="96" height="96" rx="24" fill="${hl ? 'url(#hl)' : 'url(#g)'}"
    stroke="#ffffff" stroke-width="4" filter="url(#sh)"/>
  <circle cx="${x + 48}" cy="${cy + 48}" r="14" fill="#ffffff" opacity="${hl ? 0.95 : 0.85}"/>`
const titleSvg = title
  ? `<text x="100" y="150" font-family="Space Grotesk, Arial, sans-serif" font-size="78" font-weight="700" fill="${C.text}">${esc(title)}</text>`
  : ''
const subSvg = subtitle
  ? `<text x="104" y="205" font-family="Space Grotesk, Arial, sans-serif" font-size="30" font-weight="500" fill="${C.primary}">${esc(subtitle)}</text>`
  : ''
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.bg}"/><stop offset="1" stop-color="${C.light}"/></linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.primaryHi}"/><stop offset="1" stop-color="${C.primary}"/></linearGradient>
    <radialGradient id="hl" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="${C.secondary}"/><stop offset="1" stop-color="${C.primary}"/></radialGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.secondary}" stop-opacity="0.9"/><stop offset="1" stop-color="${C.secondary}" stop-opacity="0"/></radialGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="${C.text}" flood-opacity="0.18"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <path d="M 196 ${cy + 48} H 1004" fill="none" stroke="${C.primary}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 16" opacity="0.6"/>
  <circle cx="748" cy="${cy + 48}" r="120" fill="url(#glow)"/>
  ${node(100)}
  ${node(372)}
  ${node(652, true)}
  ${node(924)}
  ${titleSvg}
  ${subSvg}
</svg>`

await mkdir(`public/static/images/${slug}`, { recursive: true })
await sharp(Buffer.from(svg)).png().toFile(`public/static/images/${slug}/cover.png`)
console.log(`wrote public/static/images/${slug}/cover.png (1200x630)`)
