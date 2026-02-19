import { cmsConfig } from "@/config/cms";
import type { Locale } from "@/lib/i18n";

import { fetchHeadlessCmsContent, mergeCmsContent } from "@/lib/cms/headless";
import { getLocalCmsContent } from "@/lib/cms/local";
import type { CmsContentBundle, CmsTranslator } from "@/lib/cms/types";

export async function getCmsContent(locale: Locale, t: CmsTranslator): Promise<CmsContentBundle> {
  const local = getLocalCmsContent(t);

  if (cmsConfig.provider !== "headless") {
    return local;
  }

  try {
    const remote = await fetchHeadlessCmsContent(locale);
    return mergeCmsContent(local, remote);
  } catch {
    return local;
  }
}

export { getLocalCmsContent };
export type { CmsContentBundle };