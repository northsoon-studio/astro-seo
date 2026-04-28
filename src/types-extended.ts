export type OpeningHoursSpecification = {
  opens: string;
  closes: string;
  dayOfWeek: string | string[];
  validFrom?: string;
  validThrough?: string;
};

export type Offer = {
  priceSpecification: PriceSpecification;
  itemOffered: Service;
};

export type PriceSpecification = {
  type: string;
  priceCurrency: string;
  price: string;
};

export type Service = {
  name: string;
  description: string;
};

export type Geo = {
  latitude: string;
  longitude: string;
};

export type GeoCircle = {
  geoMidpoint: Geo;
  geoRadius: string;
};
export type Action = {
  actionName: string;
  actionType: string;
  target: string;
};

export type Step = {
  type: string;
  name: string;
  url?: string;
  itemListElement?: StepDetails[];
  image?: string;
};

export type StepDetails = {
  type: "HowToTip" | "HowToDirection";
  text: string;
};

export interface Instruction {
  name?: string;
  text: string;
  url?: string;
  image?: string;
}

export interface Performer {
  type?: "Person" | "PerformingGroup";
  name: string;
}

export type EventStatus =
  | "EventCancelled"
  | "EventMovedOnline"
  | "EventPostponed"
  | "EventRescheduled"
  | "EventScheduled";

export type EventAttendanceMode =
  | "MixedEventAttendanceMode"
  | "OfflineEventAttendanceMode"
  | "OnlineEventAttendanceMode";

export interface Organizer {
  type: "Person" | "Organization";
  name: string;
  url: string;
}

export interface ContactPoint {
  contactType: string;
  telephone: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}

export interface CreativeWork {
  author: string;
  about: string;
  name: string;
  datePublished: string;
  audience?: string;
  keywords?: string;
  thumbnailUrl?: string;
  image?: string;
}

export interface Producer {
  name: string;
  url?: string;
}

export interface Provider {
  type?: "Organization" | "Person";
  name: string;
  url?: string;
}

export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}

export interface Video {
  name: string;
  description: string;
  thumbnailUrls: string[];
  uploadDate: string;
  contentUrl?: string;
  duration?: string;
  embedUrl?: string;
  expires?: string;
  hasPart?: Clip | Clip[];
  watchCount?: number;
  publication?: BroadcastEvent | BroadcastEvent[];
  regionsAllowed?: string | string[];
}

export interface Clip {
  name: string;
  startOffset: number;
  url: string;
}

export interface BroadcastEvent {
  name?: string;
  isLiveBroadcast: boolean;
  startDate: string;
  endDate: string;
}

export type Offers = {
  price: string;
  priceCurrency: string;
  priceValidUntil?: string;
  itemCondition?: string;
  availability?: string;
  url?: string;
  seller: {
    name: string;
  };
  validFrom?: string;
};

export type AggregateOffer = {
  priceCurrency: string;
  lowPrice: string;
  highPrice?: string;
  offerCount?: string;
  offers?: Offers | Offers[];
};

export type AggregateRating = {
  ratingValue: string;
  reviewCount?: string;
  ratingCount?: string;
  bestRating?: string;
};

export type GamePlayMode = "CoOp" | "MultiPlayer" | "SinglePlayer";

export type Review = {
  author: string;
  datePublished?: string;
  reviewBody?: string;
  name?: string;
  publisher?: Publisher;
  reviewRating: ReviewRating;
};

export type ReviewRating = {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
};

export type Author = {
  type: string;
  name: string;
};

export type ArticleAuthor = {
  name: string;
  url: string;
};

export type Publisher = {
  type: string;
  name: string;
};

export type ReviewedBy = {
  type?: string;
  name: string;
};

export type ApplicationCategory =
  | "Game"
  | "SocialNetworking"
  | "Travel"
  | "Shopping"
  | "Sports"
  | "Lifestyle"
  | "Business"
  | "Design"
  | "Developer"
  | "Driver"
  | "Educational"
  | "Health"
  | "Finance"
  | "Security"
  | "Browser"
  | "Communication"
  | "DesktopEnhancement"
  | "Entertainment"
  | "Multimedia"
  | "Home"
  | "Utilities"
  | "Reference";

export type OrganizationCategory =
  | "Airline"
  | "Consortium"
  | "Corporation"
  | "EducationalOrganization"
  | "FundingScheme"
  | "GovernmentOrganization"
  | "LibrarySystem"
  | "LocalBusiness"
  | "MedicalOrganization"
  | "NGO"
  | "NewsMediaOrganization"
  | "PerformingGroup"
  | "Project"
  | "ResearchOrganization"
  | "SportsOrganization"
  | "WorkersUnion"
  | "Organization";


