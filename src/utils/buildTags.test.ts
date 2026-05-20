import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { buildTags } from "./buildTags";

describe("buildTags — title", () => {
  it("generates the <title> tag", () => {
    const result = buildTags({ title: "My page" });
    expect(result).toContain("<title>My page</title>");
  });

  it("applies titleTemplate replacing all %s occurrences", () => {
    const result = buildTags({
      title: "Home",
      titleTemplate: "%s | Northsoon",
    });
    expect(result).toContain("<title>Home | Northsoon</title>");
  });

  it("does not generate <title> if title is not provided", () => {
    const result = buildTags({});
    expect(result).not.toContain("<title>");
  });

  it("titleTemplate preserves $ sequences in title (regression: replaceAll interprets $& as the match)", () => {
    const result = buildTags({
      title: "Save $& 50% — only $5",
      titleTemplate: "%s | Site",
    });
    expect(result).toContain("<title>Save $&amp; 50% — only $5 | Site</title>");
    expect(result).not.toContain("%s");
  });

  it("titleTemplate without %s emits the template unchanged", () => {
    const result = buildTags({
      title: "Home",
      titleTemplate: "Static Title",
    });
    expect(result).toContain("<title>Static Title</title>");
  });

  it("escapes dangerous HTML in the title (XSS protection)", () => {
    const result = buildTags({ title: '<script>alert("xss")</script>' });
    expect(result).not.toContain("<script>");
    expect(result).toContain("&lt;script&gt;");
  });
});

describe("buildTags — description", () => {
  it("generates meta description", () => {
    const result = buildTags({ description: "Test description" });
    expect(result).toContain('name="description"');
    expect(result).toContain('content="Test description"');
  });

  it("escapes dangerous HTML in description (XSS protection)", () => {
    const result = buildTags({ description: '"><script>alert(1)</script>' });
    expect(result).not.toContain("<script>");
    expect(result).toContain("&lt;script&gt;");
  });
});

describe("buildTags — robots", () => {
  it("noindex:true generates 'noindex'", () => {
    const result = buildTags({ noindex: true });
    expect(result).toContain("noindex");
  });

  it("noindex:false generates 'index' — explicit false is not the same as omitting the prop", () => {
    const result = buildTags({ noindex: false });
    expect(result).toContain('"index"');
    expect(result).not.toContain("noindex");
  });

  it("nofollow:true generates 'nofollow'", () => {
    const result = buildTags({ nofollow: true });
    expect(result).toContain("nofollow");
  });

  it("nofollow:false generates 'follow'", () => {
    const result = buildTags({ nofollow: false });
    expect(result).toContain('"follow"');
  });

  it("does not generate meta robots if no robots props are passed", () => {
    const result = buildTags({ title: "Page title" });
    expect(result).not.toContain('name="robots"');
  });

  it("robotsProps.maxVideoPreview generates the correct value (bug fix from @astrolib/seo)", () => {
    const result = buildTags({ robotsProps: { maxVideoPreview: 30 } });
    expect(result).toContain("max-video-preview:30");
  });

  it("robotsProps.maxSnippet generates the correct value", () => {
    const result = buildTags({ robotsProps: { maxSnippet: -1 } });
    expect(result).toContain("max-snippet:-1");
  });
});

describe("buildTags — canonical", () => {
  it("generates canonical link tag", () => {
    const result = buildTags({ canonical: "https://northsoon.com/page" });
    expect(result).toContain('rel="canonical"');
    expect(result).toContain('href="https://northsoon.com/page"');
  });
});

describe("buildTags — Open Graph", () => {
  it("uses title as og:title fallback when openGraph.title is not provided", () => {
    const result = buildTags({
      title: "My page",
      openGraph: { type: "website" },
    });
    expect(result).toContain('property="og:title"');
    expect(result).toContain('content="My page"');
  });

  it("uses openGraph.title over title when both are provided", () => {
    const result = buildTags({
      title: "General title",
      openGraph: { title: "Social media title" },
    });
    expect(result).toContain('content="Social media title"');
  });

  it("generates og:type", () => {
    const result = buildTags({ openGraph: { type: "article" } });
    expect(result).toContain('property="og:type"');
    expect(result).toContain('content="article"');
  });

  it("generates og:image with width and height", () => {
    const result = buildTags({
      openGraph: {
        images: [
          { url: "https://northsoon.com/og.jpg", width: 1200, height: 630 },
        ],
      },
    });
    expect(result).toContain('property="og:image"');
    expect(result).toContain('content="https://northsoon.com/og.jpg"');
    expect(result).toContain('property="og:image:width"');
    expect(result).toContain('content="1200"');
    expect(result).toContain('property="og:image:height"');
    expect(result).toContain('content="630"');
  });

  it("generates og:article:published_time for articles", () => {
    const result = buildTags({
      openGraph: {
        type: "article",
        article: { publishedTime: "2026-04-27T00:00:00Z" },
      },
    });
    expect(result).toContain('property="og:article:published_time"');
    expect(result).toContain('content="2026-04-27T00:00:00Z"');
  });
});

describe("buildTags — Twitter", () => {
  it("generates twitter:card", () => {
    const result = buildTags({ twitter: { cardType: "summary_large_image" } });
    expect(result).toContain('name="twitter:card"');
    expect(result).toContain('content="summary_large_image"');
  });

  it("generates twitter:creator from handle", () => {
    const result = buildTags({ twitter: { handle: "@northsoon" } });
    expect(result).toContain('name="twitter:creator"');
    expect(result).toContain('content="@northsoon"');
  });

  it("generates twitter:title when provided", () => {
    const result = buildTags({ twitter: { title: "Tweet title" } });
    expect(result).toContain('name="twitter:title"');
    expect(result).toContain('content="Tweet title"');
  });

  it("generates twitter:description when provided", () => {
    const result = buildTags({ twitter: { description: "Tweet desc" } });
    expect(result).toContain('name="twitter:description"');
    expect(result).toContain('content="Tweet desc"');
  });

  it("generates twitter:image and twitter:image:alt when both provided", () => {
    const result = buildTags({
      twitter: {
        image: "https://northsoon.com/twitter.png",
        imageAlt: "Northsoon logo",
      },
    });
    expect(result).toContain('name="twitter:image"');
    expect(result).toContain('content="https://northsoon.com/twitter.png"');
    expect(result).toContain('name="twitter:image:alt"');
    expect(result).toContain('content="Northsoon logo"');
  });

  it("does not emit twitter:image:alt when image is absent", () => {
    const result = buildTags({ twitter: { imageAlt: "orphan alt" } });
    expect(result).not.toContain('name="twitter:image:alt"');
  });

  it("does not auto-duplicate og:* into twitter:* — Twitter falls back natively", () => {
    const result = buildTags({
      title: "Page",
      description: "Desc",
      openGraph: { images: [{ url: "https://x.com/og.png" }] },
      twitter: { cardType: "summary_large_image" },
    });
    expect(result).not.toContain('name="twitter:title"');
    expect(result).not.toContain('name="twitter:description"');
    expect(result).not.toContain('name="twitter:image"');
  });
});

describe("buildTags — languageAlternates", () => {
  it("generates hreflang alternate links", () => {
    const result = buildTags({
      languageAlternates: [
        { hreflang: "en", href: "https://northsoon.com/en" },
        { hreflang: "es", href: "https://northsoon.com/es" },
      ],
    });
    expect(result).toContain('hreflang="en"');
    expect(result).toContain('href="https://northsoon.com/en"');
    expect(result).toContain('hreflang="es"');
  });
});

describe("buildTags — additionalMetaTags", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates meta tag with name attribute", () => {
    const result = buildTags({
      additionalMetaTags: [{ name: "author", content: "Manuel Caballero" }],
    });
    expect(result).toContain('name="author"');
    expect(result).toContain('content="Manuel Caballero"');
  });

  it("generates meta tag with property attribute (RDFa)", () => {
    const result = buildTags({
      additionalMetaTags: [{ property: "fb:admins", content: "12345" }],
    });
    expect(result).toContain('property="fb:admins"');
  });

  it("generates meta tag with http-equiv attribute", () => {
    const result = buildTags({
      additionalMetaTags: [
        { httpEquiv: "x-ua-compatible", content: "IE=edge" },
      ],
    });
    expect(result).toContain('http-equiv="x-ua-compatible"');
    expect(result).toContain('content="IE=edge"');
  });

  it("skips entries missing name/property/httpEquiv instead of emitting invalid <meta>", () => {
    // Forced cast: simulates a tag arriving from a non-typed source (CMS, JSON).
    const result = buildTags({
      additionalMetaTags: [
        { content: "orphan" } as unknown as { name: string; content: string },
        { name: "valid", content: "kept" },
      ],
    });
    expect(result).not.toContain('content="orphan"');
    expect(result).toContain('name="valid"');
    expect(result).toContain('content="kept"');
  });
});

describe("buildTags — additionalLinkTags", () => {
  it("generates link tag with rel and href", () => {
    const result = buildTags({
      additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
    });
    expect(result).toContain('rel="icon"');
    expect(result).toContain('href="/favicon.ico"');
  });

  it("generates link tag with optional attributes (sizes, type, crossOrigin)", () => {
    const result = buildTags({
      additionalLinkTags: [
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          crossOrigin: "anonymous",
        },
      ],
    });
    expect(result).toContain('sizes="180x180"');
    expect(result).toContain('type="image/png"');
    expect(result).toContain('crossorigin="anonymous"');
  });
});

describe("buildTags — facebook", () => {
  it("generates fb:app_id meta tag", () => {
    const result = buildTags({ facebook: { appId: "123456789" } });
    expect(result).toContain('property="fb:app_id"');
    expect(result).toContain('content="123456789"');
  });
});

describe("buildTags — mobileAlternate", () => {
  it("generates alternate link for mobile with media query", () => {
    const result = buildTags({
      mobileAlternate: {
        media: "only screen and (max-width: 640px)",
        href: "https://m.northsoon.com/page",
      },
    });
    expect(result).toContain('rel="alternate"');
    expect(result).toContain('media="only screen and (max-width: 640px)"');
    expect(result).toContain('href="https://m.northsoon.com/page"');
  });
});
