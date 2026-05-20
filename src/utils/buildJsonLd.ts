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

import type { JsonLdObject } from "../types";

export const buildJsonLd = (jsonLd: JsonLdObject | JsonLdObject[]): string => {
  // Skip empty arrays — happens naturally with `jsonLd={items.map(...)}` patterns
  // where `items` is empty. Emitting <script>[]</script> would just pollute <head>.
  if (Array.isArray(jsonLd) && jsonLd.length === 0) return "";

  // Single regex pass — same XSS guarantee as three sequential replaces, half the allocations.
  const data = JSON.stringify(jsonLd).replace(/[<>&]/g, (c) =>
    c === "<" ? "\\u003C" : c === ">" ? "\\u003E" : "\\u0026",
  );
  return `<script type="application/ld+json">${data}</script>`;
};
