import type { Metadata } from "next";

import SeasonBanner from "@/app/components/SeasonBanner";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { locales } from "@/lib/i18n";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.siteTitle"),
    description: t("seo.defaultDescription"),
    path: "",
  });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <div lang={locale} className="min-h-screen">
      <SeasonBanner t={t} />
      <SiteHeader locale={locale} t={t} />
      <main id="main-content">{children}</main>
      <SiteFooter locale={locale} t={t} />
    </div>
  );
}