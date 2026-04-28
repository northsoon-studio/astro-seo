import { describe, it, expect } from "vitest";
import { buildJsonLd } from "./buildJsonLd";

describe("buildJsonLd", () => {
  it("generates a <script type='application/ld+json'> tag", () => {
    const result = buildJsonLd({ "@context": "https://schema.org" });
    expect(result).toContain('<script type="application/ld+json">');
    expect(result).toContain("</script>");
  });

  it("serializes a LocalBusiness object correctly", () => {
    const result = buildJsonLd({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Northsoon Studio",
      url: "https://northsoon.com",
    });
    expect(result).toContain('"@type":"LocalBusiness"');
    expect(result).toContain('"name":"Northsoon Studio"');
    expect(result).toContain('"url":"https://northsoon.com"');
  });

  it("serializes a WebSite object with SearchAction", () => {
    const result = buildJsonLd({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "My Site",
      url: "https://mysite.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://mysite.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });
    expect(result).toContain('"@type":"WebSite"');
    expect(result).toContain('"@type":"SearchAction"');
  });

  it("accepts an array of JSON-LD objects (multiple schemas on one page)", () => {
    const result = buildJsonLd([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Northsoon Studio",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Northsoon",
      },
    ]);
    expect(result).toContain('"@type":"Organization"');
    expect(result).toContain('"@type":"WebSite"');
  });

  it("serializes a BreadcrumbList correctly", () => {
    const result = buildJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://mysite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://mysite.com/blog",
        },
      ],
    });
    expect(result).toContain('"@type":"BreadcrumbList"');
    expect(result).toContain('"@type":"ListItem"');
    expect(result).toContain('"position":1');
  });

  it("serializes an FAQPage correctly", () => {
    const result = buildJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Astro?",
          acceptedAnswer: { "@type": "Answer", text: "A web framework." },
        },
      ],
    });
    expect(result).toContain('"@type":"FAQPage"');
    expect(result).toContain('"@type":"Question"');
    expect(result).toContain('"@type":"Answer"');
  });
});
