/**
 * buildJsonLd.ts
 * Converts a JSON-LD object into a <script type="application/ld+json"> tag.
 * Used internally by AstroHead.astro via set:html.
 *
 * JSON.stringify handles serialization safely — no manual string concatenation.
 * Arrays are supported: pass multiple Schema.org objects in one prop.
 */

export const buildJsonLd = (
  jsonLd: Record<string, unknown> | Record<string, unknown>[]
): string => {
  const data = JSON.stringify(jsonLd);
  return `<script type="application/ld+json">${data}</script>`;
};
