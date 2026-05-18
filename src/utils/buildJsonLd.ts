/**
 * buildJsonLd.ts
 * Converts a JSON-LD object into a <script type="application/ld+json"> tag.
 * Used internally by AstroHead.astro via set:html.
 *
 * Security: after JSON.stringify, the output is sanitized to prevent XSS via
 * early </script> injection — characters <, > and & are replaced with their
 * Unicode escape equivalents (\u003C, \u003E, \u0026). JSON parsers handle
 * these transparently; the data is never corrupted.
 *
 * Arrays are supported: pass multiple Schema.org objects in one prop.
 */

export const buildJsonLd = (
  jsonLd: Record<string, unknown> | Record<string, unknown>[],
): string => {
  // Escape <, > and & as Unicode sequences to prevent early </script> injection (XSS).
  // JSON unicode escapes are valid JSON — parsers handle them transparently.
  const data = JSON.stringify(jsonLd)
    .replace(/</g, "\\u003C")
    .replace(/>/g, "\\u003E")
    .replace(/&/g, "\\u0026");
  return `<script type="application/ld+json">${data}</script>`;
};
