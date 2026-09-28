// @northsoon/astro-seo
// SEO component + Astro integration for Astro with full TypeScript support.

// Astro integration (default export so `npx astro add` works).
// Named component imports keep working: `import { AstroHead } from "@northsoon/astro-seo"`.
export { default } from "./src/integration";
export { default as astroSeo } from "./src/integration";
export type { AstroSeoIntegrationOptions } from "./src/integration";

// Component exports (named imports keep working)
export { default as AstroHead } from "./src/AstroHead.astro";

// Type exports
export * from "./src/types";
export * from "./src/types-extended";
