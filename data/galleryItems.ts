import { media } from "@/data/media";
import type { GalleryItem } from "@/data/types";

export const galleryItems: GalleryItem[] = [
  {
    slug: "lobby-arrival",
    titleKey: "gallery.items.lobbyArrival.title",
    shortDescriptionKey: "gallery.items.lobbyArrival.shortDescription",
    category: "hotel",
    features: ["features.architecture", "features.concierge", "features.signatureScent"],
    images: [media.homeHero],
  },
  {
    slug: "deluxe-room-view",
    titleKey: "gallery.items.deluxeRoomView.title",
    shortDescriptionKey: "gallery.items.deluxeRoomView.shortDescription",
    category: "rooms",
    features: ["features.seaView", "features.privateTerrace", "features.linenQuality"],
    images: [media.rooms.deluxe],
  },
  {
    slug: "chef-table",
    titleKey: "gallery.items.chefTable.title",
    shortDescriptionKey: "gallery.items.chefTable.shortDescription",
    category: "dining",
    features: ["features.tastingMenu", "features.localProduce", "features.openKitchen"],
    images: [media.dining.aura],
  },
  {
    slug: "sunset-pier",
    titleKey: "gallery.items.sunsetPier.title",
    shortDescriptionKey: "gallery.items.sunsetPier.shortDescription",
    category: "beach",
    features: ["features.privateBeach", "features.sunsetLounge", "features.cabanaService"],
    images: [media.gallery.pier],
  },
  {
    slug: "spa-ritual",
    titleKey: "gallery.items.spaRitual.title",
    shortDescriptionKey: "gallery.items.spaRitual.shortDescription",
    category: "spa",
    features: ["features.signatureRitual", "features.hammam", "features.relaxArea"],
    images: [media.wellness.spa],
  },
  {
    slug: "pool-suite",
    titleKey: "gallery.items.poolSuite.title",
    shortDescriptionKey: "gallery.items.poolSuite.shortDescription",
    category: "rooms",
    features: ["features.privatePool", "features.poolDeck", "features.morningLight"],
    images: [media.rooms.lagoonPool],
  },
  {
    slug: "beach-club",
    titleKey: "gallery.items.beachClub.title",
    shortDescriptionKey: "gallery.items.beachClub.shortDescription",
    category: "beach",
    features: ["features.liveDJ", "features.dayPass", "features.signatureCocktails"],
    images: [media.experiences.beachPool],
  },
  {
    slug: "wellness-lounge",
    titleKey: "gallery.items.wellnessLounge.title",
    shortDescriptionKey: "gallery.items.wellnessLounge.shortDescription",
    category: "spa",
    features: ["features.relaxArea", "features.herbalTea", "features.silentZone"],
    images: [media.wellness.hammam],
  },
];