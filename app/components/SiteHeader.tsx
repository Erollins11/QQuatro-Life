import Image from "next/image";
import Link from "next/link";

import LocaleSwitcher from "@/app/components/LocaleSwitcher";
import { getBookingLink, siteConfig } from "@/config/site";
import { media } from "@/data/media";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  t: (key: string, values?: Record<string, string | number>) => string;
};

const navItems = [
  { key: "navigation.home", path: "" },
  { key: "navigation.accommodation", path: "/accommodation" },
  { key: "navigation.dining", path: "/dining" },
  { key: "navigation.experiences", path: "/experiences" },
  { key: "navigation.wellness", path: "/wellness" },
  { key: "navigation.offers", path: "/offers" },
  { key: "navigation.events", path: "/events" },
  { key: "navigation.gallery", path: "/gallery" },
  { key: "navigation.contact", path: "/contact" },
];

export default function SiteHeader({ locale, t }: SiteHeaderProps) {
  const bookingLink = getBookingLink(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-ink/90 backdrop-blur-xl">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-sand focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-ink"
      >
        {t("header.skipToContent")}
      </a>

      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href={getLocalizedPath(locale)} className="group inline-flex items-center gap-4">
          <span className="relative h-20 w-20 overflow-hidden rounded-xl border border-brand-line bg-brand-paper p-1 shadow-sm md:h-24 md:w-24">
            <Image src={media.logo} alt={`${siteConfig.hotelName} logo`} fill className="object-contain" sizes="96px" priority />
          </span>
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-muted">{t("home.hero.eyebrow")}</span>
            <span className="block text-2xl font-semibold text-brand-paper transition group-hover:text-brand-sand">{siteConfig.hotelName}</span>
          </span>
        </Link>

        <nav aria-label={t("header.aria.mainNav")} className="order-3 w-full lg:order-none lg:w-auto">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-muted">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={getLocalizedPath(locale, item.path)} className="transition hover:text-brand-paper">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher
            locale={locale}
            ariaLabel={t("header.aria.language")}
            labels={{ tr: t("common.localeName.tr"), en: t("common.localeName.en") }}
          />

          <Link
            href={bookingLink.href}
            className="button-primary text-sm"
            target={bookingLink.isExternal ? "_blank" : undefined}
            rel={bookingLink.isExternal ? "noopener noreferrer" : undefined}
          >
            {t("common.actions.checkAvailability")}
          </Link>
        </div>
      </div>
    </header>
  );
}
