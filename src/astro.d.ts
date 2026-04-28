/// <reference types="astro/env" />

// Explicit declaration for Fragment — globally available in all Astro templates.
// The Astro language server normally injects this automatically; this declaration
// ensures it's available in library projects where auto-injection may not trigger.
declare const Fragment: any;

// Type declarations for Astro components
declare module "*.astro" {
  import type { AstroComponentFactory } from "astro/runtime/server/index.js";
  const component: AstroComponentFactory;
  export default component;
}
