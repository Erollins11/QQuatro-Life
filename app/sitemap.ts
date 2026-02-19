import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { offers } from "@/data/offers";
import { rooms } from "@/data/rooms";
import { restaurants } from "@/data/restaurants";
import { locales } from "@/lib/i18n";

const staticPaths = [
  "",
  "/accommodation",
  "/dining",
  "/experiences",
  "/wellness",
  "/offers",
  "/events",
  "/gallery",
  "/contact",
  "/book",
  "/tour",
  "/kvkk",
  "/privacy",
  "/cookies",
];

function absolute(path: string) {
  return `${siteConfig.baseUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: absolute(`/${locale}${path}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const room of rooms) {
      entries.push({
        url: absolute(`/${locale}/accommodation/${room.slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const item of restaurants) {
      entries.push({
        url: absolute(`/${locale}/dining/${item.slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const offer of offers) {
      entries.push({
        url: absolute(`/${locale}/offers/${offer.slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
