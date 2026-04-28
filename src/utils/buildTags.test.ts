import { describe, it, expect } from "vitest";
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
});
