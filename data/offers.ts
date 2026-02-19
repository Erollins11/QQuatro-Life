import type { Offer } from "@/data/types";

export const offers: Offer[] = [
  {
    slug: "early-booking",
    titleKey: "offers.items.earlyBooking.title",
    shortDescriptionKey: "offers.items.earlyBooking.shortDescription",
    descriptionKey: "offers.items.earlyBooking.description",
    features: ["offers.features.discount20", "offers.features.breakfast", "offers.features.freeUpgrade"],
    images: ["/placeholders/offer-early.svg"],
    validUntil: "2026-04-30",
  },
  {
    slug: "long-stay",
    titleKey: "offers.items.longStay.title",
    shortDescriptionKey: "offers.items.longStay.shortDescription",
    descriptionKey: "offers.items.longStay.description",
    features: ["offers.features.discount15", "offers.features.airportTransfer", "offers.features.laundry"],
    images: ["/placeholders/offer-longstay.svg"],
    validUntil: "2026-12-31",
  },
  {
    slug: "honeymoon",
    titleKey: "offers.items.honeymoon.title",
    shortDescriptionKey: "offers.items.honeymoon.shortDescription",
    descriptionKey: "offers.items.honeymoon.description",
    features: ["offers.features.roomDecoration", "offers.features.coupleMassage", "offers.features.privateDinner"],
    images: ["/placeholders/offer-honeymoon.svg"],
    validUntil: "2026-10-31",
  },
];

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
