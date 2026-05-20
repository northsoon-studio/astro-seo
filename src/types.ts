export interface OpenGraphMedia {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
}

export interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

export interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphMedia>;
  videos?: ReadonlyArray<OpenGraphMedia>;
  locale?: string;
  site_name?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}

export interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

export interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}

export interface Twitter {
  handle?: string;
  site?: string;
  cardType?:
    | "summary"
    | "summary_large_image"
    | "app"
    | "player"
    | (string & {});
  /** Overrides og:title for the Twitter card. Falls back to og:title / title if omitted. */
  title?: string;
  /** Overrides og:description for the Twitter card. Falls back to og:description / description if omitted. */
  description?: string;
  /** Absolute URL of the image. Falls back to the first og:image if omitted. */
  image?: string;
  /** Alt text for the Twitter image (required by Twitter for accessibility when image is set). */
  imageAlt?: string;
}

export interface MobileAlternate {
  media: string;
  href: string;
}

export interface LanguageAlternate {
  hreflang: string;
  href: string;
}

export interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  media?: string;
  type?: string;
  color?: string;
  as?: string;
  crossOrigin?: string;
}

export type HTTPEquivValue =
  | "content-security-policy"
  | "content-type"
  | "default-style"
  | "x-ua-compatible"
  | "refresh";

/**
 * A meta tag must declare exactly one of `name`, `property`, or `httpEquiv`.
 * Modelled as a discriminated union so TypeScript rejects entries that mix them
 * or omit all three at the call site.
 */
export type MetaTag =
  | { content: string; name: string }
  | { content: string; property: string }
  | { content: string; httpEquiv: HTTPEquivValue };

export type ImagePrevSize = "none" | "standard" | "large";

export interface AdditionalRobotsProps {
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: ImagePrevSize;
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailableAfter?: string;
  noimageindex?: boolean;
  notranslate?: boolean;
}

/**
 * Common Schema.org `@type` values. The trailing `(string & {})` keeps the field
 * open to any other Schema.org type while still surfacing IntelliSense for the
 * popular ones.
 */
export type SchemaOrgType =
  | "Article"
  | "BlogPosting"
  | "BreadcrumbList"
  | "Course"
  | "Event"
  | "FAQPage"
  | "HowTo"
  | "JobPosting"
  | "LocalBusiness"
  | "Organization"
  | "Person"
  | "Product"
  | "Recipe"
  | "Review"
  | "SoftwareApplication"
  | "VideoObject"
  | "WebPage"
  | "WebSite"
  | (string & {});

/**
 * A single JSON-LD object. `@context` and `@type` are typed for autocomplete;
 * any other Schema.org property is accepted.
 */
export type JsonLdObject = {
  "@context"?: "https://schema.org" | (string & {});
  "@type"?: SchemaOrgType;
} & Record<string, unknown>;

export interface AstroSeoProps {
  title?: string;
  titleTemplate?: string;
  noindex?: boolean;
  nofollow?: boolean;
  robotsProps?: AdditionalRobotsProps;
  description?: string;
  canonical?: string;
  mobileAlternate?: MobileAlternate;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  openGraph?: OpenGraph;
  facebook?: { appId: string };
  twitter?: Twitter;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
  jsonLd?: JsonLdObject | JsonLdObject[];
}
