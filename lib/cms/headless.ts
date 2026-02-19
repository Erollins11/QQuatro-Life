import { cmsConfig } from "@/config/cms";
import type { Locale } from "@/lib/i18n";

import type { CmsContentBundle } from "@/lib/cms/types";

type PartialCmsContent = Partial<CmsContentBundle>;

export async function fetchHeadlessCmsContent(locale: Locale): Promise<PartialCmsContent | null> {
  if (!cmsConfig.baseUrl) {
    return null;
  }

  const endpoint = `${cmsConfig.baseUrl.replace(/\/$/, "")}/content/${locale}`;

  const response = await fetch(endpoint, {
    headers: {
      ...(cmsConfig.apiToken ? { Authorization: `Bearer ${cmsConfig.apiToken}` } : {}),
    },
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status}`);
  }

  const payload = (await response.json()) as unknown;

  if (!payload || typeof payload !== "object") {
    return null;
  }

  return payload as PartialCmsContent;
}

export function mergeCmsContent(base: CmsContentBundle, override: PartialCmsContent | null): CmsContentBundle {
  if (!override) {
    return base;
  }

  return {
    home: {
      ...base.home,
      ...(override.home ?? {}),
    },
    rooms: Array.isArray(override.rooms) ? override.rooms : base.rooms,
    restaurants: Array.isArray(override.restaurants) ? override.restaurants : base.restaurants,
    offers: Array.isArray(override.offers) ? override.offers : base.offers,
    galleryItems: Array.isArray(override.galleryItems) ? override.galleryItems : base.galleryItems,
  };
}