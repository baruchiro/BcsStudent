// Serializes a value to a JSON string safe for embedding inside a
// <script type="application/ld+json"> tag. JSON.stringify leaves "</script>"
// and "<!--" intact, which could let field content break out of the script
// element, so we escape "<" as its unicode form. The output is still valid
// JSON (and valid JSON-LD), since "<" parses back to "<".
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
