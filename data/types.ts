export type RoomView = "sea" | "garden" | "bay";
export type BedType = "king" | "twin" | "family";

export type Room = {
  slug: string;
  titleKey: string;
  shortDescriptionKey: string;
  descriptionKey: string;
  features: string[];
  images: string[];
  area: number;
  capacity: number;
  view: RoomView;
  bedType: BedType;
  hasPrivatePool: boolean;
  isVilla: boolean;
};

export type Restaurant = {
  slug: string;
  titleKey: string;
  shortDescriptionKey: string;
  descriptionKey: string;
  features: string[];
  conceptKey: string;
  hoursKey: string;
  dressCodeKey?: string;
  images: string[];
};

export type Offer = {
  slug: string;
  titleKey: string;
  shortDescriptionKey: string;
  descriptionKey: string;
  features: string[];
  images: string[];
  validUntil: string;
};

export type GalleryCategory = "hotel" | "rooms" | "dining" | "beach" | "spa";

export type GalleryItem = {
  slug: string;
  titleKey: string;
  shortDescriptionKey: string;
  category: GalleryCategory;
  features: string[];
  images: string[];
};
