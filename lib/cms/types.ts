import type { BedType, GalleryCategory, RoomView } from "@/data/types";

export type CmsHomeContent = {
  heroImage: string;
  heroImageAlt: string;
  heroVideoUrl?: string;
  galleryVideoUrl?: string;
  galleryVideoPoster: string;
};

export type CmsRoom = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[];
  area: number;
  capacity: number;
  view: RoomView;
  bedType: BedType;
  hasPrivatePool: boolean;
  isVilla: boolean;
};

export type CmsRestaurant = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  concept: string;
  hours: string;
  dressCode?: string;
  features: string[];
  images: string[];
};

export type CmsOffer = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[];
  validUntil: string;
};

export type CmsGalleryItem = {
  slug: string;
  title: string;
  shortDescription: string;
  category: GalleryCategory;
  image: string;
};

export type CmsContentBundle = {
  home: CmsHomeContent;
  rooms: CmsRoom[];
  restaurants: CmsRestaurant[];
  offers: CmsOffer[];
  galleryItems: CmsGalleryItem[];
};

export type CmsTranslator = (key: string, values?: Record<string, string | number>) => string;