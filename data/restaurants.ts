import { media } from "@/data/media";
import type { Restaurant } from "@/data/types";

export const restaurants: Restaurant[] = [
  {
    slug: "aura-main-restaurant",
    titleKey: "dining.venues.auraMainRestaurant.title",
    shortDescriptionKey: "dining.venues.auraMainRestaurant.shortDescription",
    descriptionKey: "dining.venues.auraMainRestaurant.description",
    conceptKey: "dining.venues.auraMainRestaurant.concept",
    hoursKey: "dining.venues.auraMainRestaurant.hours",
    dressCodeKey: "dining.venues.auraMainRestaurant.dressCode",
    features: ["features.localProduce", "features.tastingMenu", "features.terrace"],
    images: [media.dining.aura, media.dining.shoreline],
  },
  {
    slug: "shoreline-grill",
    titleKey: "dining.venues.shorelineGrill.title",
    shortDescriptionKey: "dining.venues.shorelineGrill.shortDescription",
    descriptionKey: "dining.venues.shorelineGrill.description",
    conceptKey: "dining.venues.shorelineGrill.concept",
    hoursKey: "dining.venues.shorelineGrill.hours",
    dressCodeKey: "dining.venues.shorelineGrill.dressCode",
    features: ["features.woodFire", "features.freshSeafood", "features.sunsetTable"],
    images: [media.dining.shoreline, media.dining.aura],
  },
  {
    slug: "cove-lounge-bar",
    titleKey: "dining.venues.coveLoungeBar.title",
    shortDescriptionKey: "dining.venues.coveLoungeBar.shortDescription",
    descriptionKey: "dining.venues.coveLoungeBar.description",
    conceptKey: "dining.venues.coveLoungeBar.concept",
    hoursKey: "dining.venues.coveLoungeBar.hours",
    dressCodeKey: "dining.venues.coveLoungeBar.dressCode",
    features: ["features.signatureCocktails", "features.liveDJ", "features.pianoNights"],
    images: [media.dining.cove, media.dining.aura],
  },
];

export function getRestaurantBySlug(slug: string) {
  return restaurants.find((item) => item.slug === slug);
}