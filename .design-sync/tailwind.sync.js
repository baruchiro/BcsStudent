// Sync-only Tailwind config: reuse the blog's real theme/plugins, but scan the
// components + authored previews so the generated stylesheet contains exactly
// the utilities the design-sync previews use.
const base = require('../tailwind.config.js')
const SHADES = '(50|100|200|300|400|500|600|700|800|900|950)'
module.exports = {
  ...base,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './.design-sync/previews/**/*.{tsx,jsx}',
    './.design-sync/shims/**/*.{tsx,jsx}',
  ],
  // The bundle stylesheet is JIT — it would otherwise only contain utilities the
  // existing components happen to use. Safelist the full brand palette so a design
  // agent building NEW on-brand UIs with this DS gets styled output.
  safelist: [
    {
      pattern: new RegExp(`^(bg|text|border)-(primary|secondary|gray)-${SHADES}$`),
      variants: ['hover', 'dark'],
    },
  ],
}
