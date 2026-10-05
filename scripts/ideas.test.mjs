import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

// Exercise the actual Contentlayer resolver, not a copy of its implementation.
await mkdir('.contentlayer', { recursive: true })
const tempDir = await mkdtemp(path.resolve('.contentlayer/ideas-test-'))
let isIdea
try {
  const outfile = path.join(tempDir, 'config.mjs')
  await build({
    entryPoints: ['contentlayer.config.ts'],
    outfile,
    bundle: true,
    packages: 'external',
    platform: 'node',
    format: 'esm',
  })
  const { Blog } = await import(pathToFileURL(outfile).href)
  isIdea = Blog.def().computedFields.isIdea.resolve
} finally {
  await rm(tempDir, { recursive: true, force: true })
}

for (const [name, tags, expected] of [
  ['Hebrew idea tag', ['browser-extension', 'רעיון'], true],
  ['legacy English idea tag', ['idea'], true],
  ['case-insensitive legacy tag', ['Idea', 'webapp'], true],
  ['uppercase legacy tag', ['IDEA'], true],
  ['unrelated tags', ['webapp', 'automation'], false],
  ['no substring matches', ['ideas', 'רעיון-אחר'], false],
  ['empty tags', [], false],
]) {
  test(name, () => {
    assert.equal(isIdea({ tags: { _array: tags } }), expected)
  })
}

test('missing tags are not ideas', () => {
  assert.equal(isIdea({}), false)
})

test('generated content includes every tagged idea and excludes unrelated posts', async () => {
  // Run `contentlayer2 build` first. This catches tag migrations as well as resolver regressions.
  const posts = JSON.parse(await readFile('.contentlayer/generated/Blog/_index.json', 'utf8'))
  const taggedIdeas = posts.filter((post) =>
    post.tags.some((tag) => ['idea', 'רעיון'].includes(tag.toLowerCase()))
  )
  assert.ok(taggedIdeas.length > 0, 'The existing idea content must not disappear')
  assert.deepEqual(
    posts
      .filter((post) => post.isIdea)
      .map((post) => post.slug)
      .sort(),
    taggedIdeas.map((post) => post.slug).sort()
  )
  assert.ok(taggedIdeas.some((post) => post.slug === 'ideas/always-read-more'))
  console.log(`Verified ${taggedIdeas.length} ideas out of ${posts.length} generated blog posts`)
})
