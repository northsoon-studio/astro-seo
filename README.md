# @northsoon/astro-seo

🚀 SEO component for Astro with full TypeScript support.

An enhanced, maintained version of `@astrolib/seo` with properly exported TypeScript types, declaration files (`.d.ts`), and better documentation.

> **v3.0.0** — Major release: typed JSON-LD, full Twitter Cards support, stricter `MetaTag` discriminated union, fix for `titleTemplate` with `$` sequences, and dev-mode URL warnings. See [Migration from v2](#-migration-from-v2) and the [changelog](#-changelog) for details.

## ✨ Features

- ✅ **Full TypeScript support** with auto-generated `.d.ts` declaration files
- ✅ **IDE autocompletion** for all props (works out of the box!)
- ✅ **Type validation** - TypeScript catches errors before runtime
- ✅ Open Graph support (Facebook, LinkedIn, etc.)
- ✅ Twitter Cards support
- ✅ Customizable robots meta tags
- ✅ Canonical URLs
- ✅ Language alternates (hreflang)
- ✅ Custom additional meta tags
- ✅ Custom additional link tags
- ✅ Compatible with Astro 4.x, 5.x, and 6.x
- ✅ Compatible with TypeScript 5.x and 6.x
- ✅ Unit tested with Vitest
- ✅ **JSON-LD support** — pass any Schema.org object as a prop, rendered as `<script type="application/ld+json">`

## 🔧 How TypeScript Types Work

This package includes pre-built declaration files (`.d.ts`) in the `dist/` folder. When you install the package:

1. **TypeScript automatically finds the types** via `package.json` → `"types": "./dist/index.d.ts"`
2. **No manual setup required** - just import and use
3. **Full autocompletion** in VS Code, WebStorm, and other IDEs
4. **Type checking** validates your props at compile time

```
@northsoon/astro-seo/
├── index.ts              ← Source code
├── dist/
│   ├── index.d.ts        ← Type declarations (auto-detected)
│   └── src/
│       ├── types.d.ts          ← Core SEO types
│       └── types-extended.d.ts ← Schema.org helper types
```

## 📦 Installation

```bash
# npm
npm install @northsoon/astro-seo

# pnpm
pnpm add @northsoon/astro-seo

# yarn
yarn add @northsoon/astro-seo
```

## 🚀 Quick Start

```astro
---
import { AstroHead } from "@northsoon/astro-seo";
---

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <AstroHead
    title="My Page"
    description="Page description for SEO (150-160 characters)"
    canonical="https://mysite.com/page"
  />
</head>
```

## 📖 Full Example

```astro
---
import { AstroHead } from "@northsoon/astro-seo";
---

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <AstroHead
    title="My Amazing Page"
    titleTemplate="%s | My Site"
    description="A detailed description of my page for search engines"
    canonical="https://mysite.com/page"
    noindex={false}
    nofollow={false}
    openGraph={{
      url: "https://mysite.com/page",
      title: "My Amazing Page",
      description: "A detailed description for social media",
      type: "website",
      locale: "en_US",
      site_name: "My Website",
      images: [
        {
          url: "https://mysite.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Preview image",
          type: "image/jpeg",
        },
      ],
    }}
    twitter={{
      handle: "@myhandle",
      site: "@mysite",
      cardType: "summary_large_image",
    }}
    languageAlternates={[
      { hreflang: "en", href: "https://mysite.com/en/page" },
      { hreflang: "es", href: "https://mysite.com/es/page" },
      { hreflang: "x-default", href: "https://mysite.com/page" },
    ]}
    additionalMetaTags={[
      { name: "author", content: "Your Name" },
      { name: "theme-color", content: "#ffffff" },
    ]}
    additionalLinkTags={[
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ]}
  />
</head>
```

## 🔧 Available Props

| Prop                 | Type                    | Description                                         |
| -------------------- | ----------------------- | --------------------------------------------------- |
| `title`              | `string`                | Page title                                          |
| `titleTemplate`      | `string`                | Title template (use `%s` as placeholder)            |
| `description`        | `string`                | Meta description                                    |
| `canonical`          | `string`                | Canonical URL                                       |
| `noindex`            | `boolean`               | If `true`, tells search engines not to index        |
| `nofollow`           | `boolean`               | If `true`, tells search engines not to follow links |
| `robotsProps`        | `AdditionalRobotsProps` | Additional robots directives                        |
| `openGraph`          | `OpenGraph`             | Open Graph configuration                            |
| `twitter`            | `Twitter`               | Twitter Cards configuration                         |
| `facebook`           | `{ appId: string }`     | Facebook App ID                                     |
| `mobileAlternate`    | `MobileAlternate`       | Mobile alternate version                            |
| `languageAlternates` | `LanguageAlternate[]`   | Language alternate versions                         |
| `additionalMetaTags` | `MetaTag[]`             | Additional meta tags                                |
| `additionalLinkTags` | `LinkTag[]`             | Additional link tags                                |

## 🤖 Robots Configuration

```astro
<AstroHead
  title="My Page"
  noindex={false}
  nofollow={false}
  robotsProps={{
    nosnippet: false,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
    noarchive: false,
    noimageindex: false,
    notranslate: false,
  }}
/>
```

## 📱 Open Graph for Articles

```astro
<AstroHead
  title="My Blog Article"
  openGraph={{
    type: "article",
    article: {
      publishedTime: "2025-12-11T00:00:00Z",
      modifiedTime: "2025-12-11T12:00:00Z",
      authors: ["https://mysite.com/author"],
      section: "Technology",
      tags: ["Astro", "SEO", "TypeScript"],
    },
  }}
/>
```

## 🎥 Open Graph for Videos

```astro
<AstroHead
  title="My Video"
  openGraph={{
    type: "video.other",
    video: {
      actors: [{ profile: "https://example.com/actor", role: "Lead" }],
      directors: ["https://example.com/director"],
      duration: 120,
      releaseDate: "2025-12-11",
      tags: ["tutorial", "astro"],
    },
  }}
/>
```

## � JSON-LD (Structured Data)

Pass any [Schema.org](https://schema.org) object to generate a `<script type="application/ld+json">` tag. This enables Google Rich Results (star ratings, breadcrumbs, FAQ dropdowns, etc.).

```astro
<AstroHead
  title="Northsoon Studio"
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Northsoon Studio",
    "url": "https://northsoon.com",
    "telephone": "+1-780-555-0100",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Grande Prairie",
      "addressRegion": "AB",
      "addressCountry": "CA"
    }
  }}
/>
```

For multiple schemas on the same page, pass an array:

```astro
<AstroHead
  title="My Site"
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Northsoon Studio",
      "url": "https://northsoon.com"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Northsoon Studio",
      "url": "https://northsoon.com"
    }
  ]}
/>
```

Validate your structured data at [Google Rich Results Test](https://search.google.com/test/rich-results).

## �📝 TypeScript Types

All types are exported and **work automatically** - no additional setup needed!

```typescript
import { AstroHead } from "@northsoon/astro-seo";
import type {
  // Core SEO types
  AstroSeoProps,
  OpenGraph,
  OpenGraphArticle,
  OpenGraphMedia,
  Twitter,
  MetaTag,
  LinkTag,
  LanguageAlternate,
  AdditionalRobotsProps,
  // Schema.org helper types (for JSON-LD)
  ContactPoint,
  OpeningHoursSpecification,
  Offer,
  AggregateRating,
  Review,
  Video,
} from "@northsoon/astro-seo";

// TypeScript validates your props
const seoConfig: AstroSeoProps = {
  title: "My Page",
  description: "Page description",
  openGraph: {
    type: "website",
    site_name: "My Site", // ✅ Autocompletion works!
  },
};
```

### What You Get

| Feature                 | Description                       |
| ----------------------- | --------------------------------- |
| **Autocompletion**      | All props show up in your IDE     |
| **Type checking**       | Errors caught before runtime      |
| **Hover documentation** | See prop descriptions on hover    |
| **Refactoring support** | Safe renaming across your project |

### Verifying Types Work

Run `astro check` in your project to verify:

```bash
npx astro check
# Should show: 0 errors ✓
```

## 🔄 Migration from v1

### Component rename

In **v2.0.0** the component was renamed from `AstroSeo` to `AstroHead` to have a unique identity:

```diff
- import { AstroSeo } from "@northsoon/astro-seo";
+ import { AstroHead } from "@northsoon/astro-seo";
```

```diff
- <AstroSeo title="..." />
+ <AstroHead title="..." />
```

### Removed props

`OpenGraph.defaultImageWidth` and `OpenGraph.defaultImageHeight` have been removed. They were accepted by TypeScript but never rendered any tag — silently doing nothing. Remove them from your config:

```diff
  openGraph={{
    type: "website",
-   defaultImageWidth: 1200,
-   defaultImageHeight: 630,
    images: [{ url: "...", width: 1200, height: 630 }],
  }}
```

Use `images[].width` and `images[].height` instead — those are the props that actually generate the `og:image:width` and `og:image:height` tags.

### Bug fix: `maxVideoPreview` now works

In v1, setting `robotsProps.maxVideoPreview` was silently ignored. In v2.0.0 it correctly generates `max-video-preview:N` in the robots meta tag.

## 🔄 Migration from @astrolib/seo

If you are coming from `@astrolib/seo`:

```diff
- import { AstroSeo } from "@astrolib/seo";
+ import { AstroHead } from "@northsoon/astro-seo";
```

Props are 100% compatible!

## � Troubleshooting

### TypeScript can't find types

Make sure you have TypeScript configured in your Astro project:

```bash
npx astro add check
```

This installs `@astrojs/check` and `typescript` if missing.

### IDE not showing autocompletion

1. Restart your TypeScript server (VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server")
2. Make sure you're on version `2.0.0` or higher

### Verify installation

```bash
# Check installed version
npm list @northsoon/astro-seo

# Should show @northsoon/astro-seo@3.0.0 or higher
```

## 🔁 Migration from v2

v3.0.0 is mostly additive, but a few changes can surface type errors in code that compiled under v2:

- **`MetaTag` is now a true discriminated union.** Entries in `additionalMetaTags` must declare exactly one of `name`, `property`, or `httpEquiv`. Entries missing all three were silently emitted as invalid `<meta content="…">` in v2 — in v3 they are skipped (with a dev warning) and TypeScript will flag them at build time.
- **`jsonLd` is now typed as `JsonLdObject` instead of `Record<string, unknown>`.** Existing usage keeps working — `JsonLdObject` is `{ "@context"?, "@type"? } & Record<string, unknown>` — but you now get IDE autocomplete for `@context` and common Schema.org `@type` values.
- **Internal file renamed**: `src/AstroSeo.astro` → `src/AstroHead.astro`. Public API unchanged (still `import { AstroHead }`). Only affects code doing deep imports.

No runtime behavior changed for code that was already correctly typed.

## 🆕 What's New in v3

### Twitter Cards: full support

```astro
<AstroHead
  twitter={{
    cardType: "summary_large_image",
    site: "@mysite",
    handle: "@author",
    title: "Tweet-specific title",          // optional, falls back to og:title
    description: "Tweet-specific summary",  // optional, falls back to og:description
    image: "https://mysite.com/twitter.png",
    imageAlt: "Alt text for accessibility",
  }}
/>
```

Only the fields you set are emitted — Twitter natively falls back to `og:*` for anything you omit, so there's no duplication.

### JSON-LD with autocomplete

```ts
import type { JsonLdObject } from "@northsoon/astro-seo";

const orgSchema: JsonLdObject = {
  "@context": "https://schema.org",  // autocompletes
  "@type": "Organization",            // autocompletes common types
  name: "Northsoon Studio",
  url: "https://northsoon.com",
};
```

### Dev-mode URL warnings

`canonical`, `openGraph.url`, `openGraph.images[].url`, `openGraph.videos[].url`, and `twitter.image` now log a `console.warn` in dev when given relative URLs (Google requires absolute for `canonical`, social crawlers for the rest). Silent in production.

## 📋 Changelog

### v3.0.0

- **Feat:** Full Twitter Cards support — `twitter.title`, `twitter.description`, `twitter.image`, `twitter.imageAlt`
- **Feat:** `JsonLdObject` type — `@context` and `@type` autocomplete for the `jsonLd` prop, with `SchemaOrgType` helper
- **Feat:** Dev-mode `console.warn` when `canonical`, `openGraph.url`, OG media URLs, or `twitter.image` are relative
- **Fix:** `titleTemplate` no longer interprets `$&`, `$1`, `$$` in `title` as replacement patterns (uses `split`/`join` instead of `replaceAll`)
- **Fix:** `additionalMetaTags` entries without `name`/`property`/`httpEquiv` are skipped (and warn in dev) instead of emitting invalid `<meta>`
- **Refactor:** Unified `createMetaTag` / `createLinkTag` through a single `createTag` helper
- **Refactor:** `MetaTag` is now a true discriminated union — TypeScript rejects entries that mix or omit discriminators
- **Refactor:** `buildJsonLd` uses a single-pass regex for the XSS escape (same guarantee, fewer allocations)
- **Chore:** Renamed `src/AstroSeo.astro` → `src/AstroHead.astro` to match the exported name
- **Test:** added 9 new tests — `$&` regression, http-equiv tags, invalid `additionalMetaTags`, Twitter title/description/image/imageAlt, no-duplication fallback

### v2.1.2

- **Security fix:** `buildJsonLd` now escapes `<`, `>` and `&` as Unicode sequences (`\u003C`, `\u003E`, `\u0026`) to prevent XSS injection via early `</script>` tag closing
- Fix: `types-extended.ts` types (`ContactPoint`, `OpeningHoursSpecification`, `Offer`, `AggregateRating`, `Review`, `Video`, and more) are now exported from the public API and fully accessible to TypeScript consumers
- Improvement: `Twitter.cardType` now has IDE autocompletion with valid values (`"summary"`, `"summary_large_image"`, `"app"`, `"player"`) while still accepting any string
- Test: added 5 new unit tests covering `facebook.appId`, `mobileAlternate`, `additionalLinkTags`, and XSS protection in `description`
- Chore: added `.npmrc` with `node-linker=hoisted` to fix `@vitest/utils` resolution issue on Windows with pnpm + Node.js v24

### v2.1.0

- Feat: `jsonLd` prop — pass any Schema.org object (or array of objects) to generate a `<script type="application/ld+json">` tag automatically
- Test: added 6 unit tests for `buildJsonLd` covering LocalBusiness, WebSite, BreadcrumbList, FAQPage, and arrays

### v2.0.5

- Fix: `titleTemplate` now uses `replaceAll` — correctly replaces all occurrences of `%s` instead of only the first
- Test: added unit tests with Vitest covering title, description, robots, canonical, Open Graph, Twitter, hreflang, and additionalMetaTags

### v2.0.4

- Fix: `src/astro.d.ts` and `src/env.d.ts` (dev-only files) no longer shipped in the npm package — prevents potential type conflicts in user projects
- Fix: `package.json` `files` field is now explicit, only shipping the files users actually need

### v2.0.3

- Fix: resolved `Fragment` TS2304 error in VS Code Astro language server when working on the library

### v2.0.2

- Updated TypeScript to 6.0.3 (build tool only — no impact on your project's TypeScript version)

### v2.0.1

- Fix: peer dependency updated to `"^4.0.0 || ^5.0.0 || ^6.0.0"` — removes Astro 6 install warning

### v2.0.0

- **Breaking:** Renamed `AstroSeo` → `AstroHead`
- **Breaking:** Removed `OpenGraph.defaultImageWidth` / `defaultImageHeight` (were silently ignored)
- **Breaking:** Removed unused JSON-LD types (`Person`, `Answer`, `Question`, etc.)
- Fix: `maxVideoPreview` now correctly generates `max-video-preview:N` in the robots tag

## �📄 License

MIT © [Manuel Caballero](https://github.com/VVV-WIT-07-DEV)

Made with ❤️ by [Northsoon](https://northsoon.com)

---

⭐ If this package helps you, consider giving it a star on GitHub!
