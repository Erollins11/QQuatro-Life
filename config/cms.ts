export type CmsProvider = "local" | "headless";

const rawProvider = process.env.CMS_PROVIDER?.trim().toLowerCase();

export const cmsConfig = {
  provider: (rawProvider === "headless" ? "headless" : "local") as CmsProvider,
  baseUrl: process.env.CMS_BASE_URL?.trim() || "",
  apiToken: process.env.CMS_API_TOKEN?.trim() || "",
  homeHeroVideoUrl: process.env.HOME_HERO_VIDEO_URL?.trim() || "",
  galleryVideoUrl: process.env.GALLERY_VIDEO_URL?.trim() || "",
};