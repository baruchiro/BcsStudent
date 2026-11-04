import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { test } from 'node:test'
import { buildSync } from 'esbuild'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
const root = path.resolve(import.meta.dirname, '..')
const cache = path.join(root, 'node_modules', '.cache')
mkdirSync(cache, { recursive: true })
const temp = mkdtempSync(path.join(cache, 'footer-test-'))
let Footer
try {
  const output = path.join(temp, 'footer.cjs')
  buildSync({
    entryPoints: [path.join(root, 'src/components/Footer.tsx')],
    outfile: output,
    bundle: true,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    jsx: 'automatic',
    tsconfig: path.join(root, 'tsconfig.json'),
  })
  Footer = require(output).default
} finally {
  rmSync(temp, { recursive: true, force: true })
}

const html = renderToStaticMarkup(createElement(Footer))

test('footer links to the exact WhatsApp channel with an accessible channel label', () => {
  const url = 'https://whatsapp.com/channel/0029VbEMF5XE50UdcmQI681f'
  const links = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) || []
  const channelLinks = links.filter((link) => link.includes(`href="${url}"`))
  assert.equal(channelLinks.length, 1, 'Expected exactly one WhatsApp channel link')
  assert.match(channelLinks[0], /<span class="sr-only">ערוץ הווטסאפ<\/span>/)
  assert.match(channelLinks[0], /target="_blank"/)
  assert.match(channelLinks[0], /rel="noopener noreferrer"/)
  assert.match(channelLinks[0], /<svg\b/)
})

test('footer preserves all existing social destinations', () => {
  const metadata = require('../data/siteMetadata.js')
  for (const kind of [
    'github',
    'facebook',
    'youtube',
    'linkedin',
    'twitter',
    'telegram',
    'instagram',
    'threads',
    'mastodon',
    'bluesky',
  ]) {
    if (metadata[kind]) assert.ok(html.includes(`href="${metadata[kind]}"`), kind)
  }
  assert.ok(html.includes(`href="mailto:${metadata.email}"`))
  assert.ok(html.includes('href="/feed.xml"'))
})
