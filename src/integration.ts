/**
 * integration.ts - Astro integration for @northsoon/astro-seo.
 *
 * Enables `npx astro add @northsoon/astro-seo` and wires the `site` origin
 * into the Astro config so `<AstroHead />` (via `Astro.site`) can resolve
 * relative URLs into absolute ones. The `<AstroHead />` component itself
 * stays explicit - add it to your layouts manually.
 *
 * Usage in `astro.config.mjs`:
 *
 * ```js
 * import { defineConfig } from "astro/config";
 * import astroSeo from "@northsoon/astro-seo";
 *
 * export default defineConfig({
 *   site: "https://northsoon.com",
 *   integrations: [astroSeo()],
 * });
 * ```
 */
import type { AstroIntegration } from "astro";

export interface AstroSeoIntegrationOptions {
  /**
   * Site origin (e.g. `"https://northsoon.com"`). When the Astro config has
   * no `site` yet, the integration sets it. When both are set but differ,
   * the Astro config wins and a warning is logged.
   */
  site?: string;
}

export default function astroSeo(
  options: AstroSeoIntegrationOptions = {},
): AstroIntegration {
  return {
    name: "@northsoon/astro-seo",
    hooks: {
      "astro:config:setup": ({ config, logger, updateConfig }) => {
        if (options.site !== undefined) {
          let site: URL;
          try {
            site = new URL(options.site);
          } catch {
            logger.warn(
              `[@northsoon/astro-seo] invalid site option. Expected an absolute URL like "https://example.com". Got: "${options.site}"`,
            );
            return;
          }
          if (!config.site) {
            updateConfig({ site: site.href });
          } else {
            let configuredHref = config.site;
            try {
              configuredHref = new URL(config.site).href;
            } catch {
              // Leave unusual values alone; Astro itself will validate them.
            }
            if (configuredHref !== site.href) {
              logger.warn(
                `[@northsoon/astro-seo] integration option site ("${site.href}") differs from Astro config site ("${config.site}"). Using Astro config site.`,
              );
            }
          }
        } else if (!config.site) {
          logger.warn(
            "[@northsoon/astro-seo] no site configured. Set `site` in astro.config.mjs or pass `{ site }` to the integration so relative URLs can be resolved to absolute.",
          );
        }
        logger.info("[@northsoon/astro-seo] ready - add <AstroHead /> to your layouts.");
      },
    },
  };
}
