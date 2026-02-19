import { cmsConfig } from "@/config/cms";
import { siteConfig } from "@/config/site";
import { galleryItems } from "@/data/galleryItems";
import { media } from "@/data/media";
import { offers } from "@/data/offers";
import { restaurants } from "@/data/restaurants";
import { rooms } from "@/data/rooms";

import type { CmsContentBundle, CmsTranslator } from "@/lib/cms/types";

export function getLocalCmsContent(t: CmsTranslator): CmsContentBundle {
  return {
    home: {
      heroImage: media.homeHero,
      heroImageAlt: `${siteConfig.hotelName} Hero`,
      heroVideoUrl: cmsConfig.homeHeroVideoUrl || undefined,
      galleryVideoUrl: cmsConfig.galleryVideoUrl || undefined,
      galleryVideoPoster: media.galleryVideoPoster,
    },
    rooms: rooms.map((room) => ({
      slug: room.slug,
      title: t(room.titleKey),
      shortDescription: t(room.shortDescriptionKey),
      description: t(room.descriptionKey),
      features: room.features.map((feature) => t(feature)),
      images: room.images,
      area: room.area,
      capacity: room.capacity,
      view: room.view,
      bedType: room.bedType,
      hasPrivatePool: room.hasPrivatePool,
      isVilla: room.isVilla,
    })),
    restaurants: restaurants.map((item) => ({
      slug: item.slug,
      title: t(item.titleKey),
      shortDescription: t(item.shortDescriptionKey),
      description: t(item.descriptionKey),
      concept: t(item.conceptKey),
      hours: t(item.hoursKey),
      dressCode: item.dressCodeKey ? t(item.dressCodeKey) : undefined,
      features: item.features.map((feature) => t(feature)),
      images: item.images,
    })),
    offers: offers.map((offer) => ({
      slug: offer.slug,
      title: t(offer.titleKey),
      shortDescription: t(offer.shortDescriptionKey),
      description: t(offer.descriptionKey),
      features: offer.features.map((feature) => t(feature)),
      images: offer.images,
      validUntil: offer.validUntil,
    })),
    galleryItems: galleryItems.map((item) => ({
      slug: item.slug,
      title: t(item.titleKey),
      shortDescription: t(item.shortDescriptionKey),
      category: item.category,
      image: item.images[0],
    })),
  };
}
