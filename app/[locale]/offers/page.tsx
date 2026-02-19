import type { Metadata } from "next";

import OfferCard from "@/app/components/OfferCard";
import SectionIntro from "@/app/components/SectionIntro";
import { offers } from "@/data/offers";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.offers.title"),
    description: t("seo.offers.description"),
    path: "/offers",
  });
}

export default async function OffersPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("offers.title")} description={t("offers.subtitle")} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} locale={locale} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}