import { siteConfig } from "@/config/site";

type SeasonBannerProps = {
  t: (key: string, values?: Record<string, string | number>) => string;
};

export default function SeasonBanner({ t }: SeasonBannerProps) {
  if (!siteConfig.seasonBanner.enabled) {
    return null;
  }

  return (
    <div className="border-b border-brand-line bg-brand-ocean/25">
      <div className="page-shell py-2 text-center text-sm text-brand-paper">
        <strong className="mr-2 font-semibold text-brand-sand">{t("home.seasonBanner.title")}:</strong>
        {t("home.seasonBanner.description", {
          openingDate: siteConfig.seasonBanner.openingDate,
          closingDate: siteConfig.seasonBanner.closingDate,
        })}
      </div>
    </div>
  );
}
