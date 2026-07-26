// Generates .design-sync/generated-styles.css — a static Tailwind stylesheet
// compiled from the blog's real tailwind config, scanning src/ + the authored
// previews so every utility a preview uses is present. Re-run before each
// design-sync build (it is cfg.buildCmd). No network needed.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const bin = resolve(root, 'node_modules/.bin/tailwindcss')
if (!existsSync(bin)) {
  console.error('[build-styles] tailwindcss binary not found — run the yarn install first')
  process.exit(1)
}

const args = [
  '-c', resolve(here, 'tailwind.sync.js'),
  '-i', resolve(root, 'src/css/tailwind.css'),
  '-o', resolve(here, 'generated-styles.css'),
  '--minify',
]
console.error('[build-styles] compiling Tailwind →', resolve(here, 'generated-styles.css'))
// Invoke via `node <cli.js>` rather than exec'ing the bin directly: Yarn Berry's
// node-modules linker can leave the CLI without its executable bit (EACCES).
execFileSync(process.execPath, [bin, ...args], { cwd: root, stdio: 'inherit' })
console.error('[build-styles] done')
