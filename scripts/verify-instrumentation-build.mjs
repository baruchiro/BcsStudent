// Verification-only overlay for a pre-existing MDX parse error in the base commit.
// Always restore the exact file; this correction is NOT part of instrumentation.
import { readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
const file = 'data/blog/old-laptop.mdx'
const original = await readFile(file, 'utf8')
try {
  await writeFile(file, original.replace('{/_\n', '{/*\n').replace('\n_/}', '\n*/}'))
  const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, INIT_CWD: process.cwd(), NEXT_TELEMETRY_DISABLED: '1' },
  })
  process.exitCode = result.status ?? 1
} finally {
  await writeFile(file, original)
}
