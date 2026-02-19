import Link from "next/link";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export default function SiteFooter({ locale, t }: SiteFooterProps) {
  return (
    <footer className="border-t border-brand-line bg-brand-ink/70">
      <div className="page-shell grid gap-10 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-2xl font-semibold">{siteConfig.hotelName}</p>
          <p className="text-sm text-brand-muted">{siteConfig.address}</p>
          <a href={`tel:${siteConfig.phone}`} className="block text-sm text-brand-paper hover:text-brand-sand">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="block text-sm text-brand-paper hover:text-brand-sand">
            {siteConfig.email}
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-brand-paper">{t("footer.legalTitle")}</p>
          <Link href={getLocalizedPath(locale, "/kvkk")} className="block text-brand-muted hover:text-brand-paper">
            {t("footer.kvkk")}
          </Link>
          <Link href={getLocalizedPath(locale, "/privacy")} className="block text-brand-muted hover:text-brand-paper">
            {t("footer.privacy")}
          </Link>
          <Link href={getLocalizedPath(locale, "/cookies")} className="block text-brand-muted hover:text-brand-paper">
            {t("footer.cookies")}
          </Link>
          <Link href={getLocalizedPath(locale, "/tour")} className="block text-brand-muted hover:text-brand-paper">
            {t("navigation.tour")}
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-brand-paper">{t("footer.followUs")}</p>
          {siteConfig.socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="block text-brand-muted hover:text-brand-paper">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-brand-line py-4 text-center text-xs text-brand-muted">
        {new Date().getFullYear()} {siteConfig.hotelName}. {t("footer.rights")}
      </div>
    </footer>
  );
}
