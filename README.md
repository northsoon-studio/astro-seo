# @northsoon/astro-seo

🚀 SEO component for Astro with full TypeScript support.

An enhanced, maintained version of `@astrolib/seo` with properly exported TypeScript types, declaration files (`.d.ts`), and better documentation.

> **v2.0.4** — The component is exported as `AstroHead`. If you were using `AstroSeo` from a previous version, see the [migration guide](#-migration-from-v1) below.

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
│       └── types.d.ts    ← All exported types
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

## 📝 TypeScript Types

All types are exported and **work automatically** - no additional setup needed!

```typescript
import { AstroHead } from "@northsoon/astro-seo";
import type {
  AstroSeoProps,
  OpenGraph,
  OpenGraphArticle,
  OpenGraphMedia,
  Twitter,
  MetaTag,
  LinkTag,
  LanguageAlternate,
  AdditionalRobotsProps,
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

# Should show @northsoon/astro-seo@2.0.5 or higher
```

## 📋 Changelog

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
