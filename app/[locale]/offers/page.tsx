import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import SectionIntro from "@/app/components/SectionIntro";
import { getCmsContent } from "@/lib/cms";
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
  const cms = await getCmsContent(locale, t);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("offers.title")} description={t("offers.subtitle")} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cms.offers.map((offer) => (
            <article key={offer.slug} className="glass-card overflow-hidden rounded-2xl">
              <div className="relative h-48 w-full">
                <Image src={offer.images[0]} alt={offer.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>

              <div className="space-y-3 p-5">
                <h2 className="text-2xl text-brand-paper">{offer.title}</h2>
                <p className="text-sm text-brand-muted">{offer.shortDescription}</p>
                <p className="text-xs text-brand-muted">
                  <strong className="text-brand-paper">{t("offers.validUntil")}: </strong>
                  {offer.validUntil}
                </p>
                <Link href={`/${locale}/offers/${offer.slug}`} className="button-secondary text-sm">
                  {t("common.actions.viewDetails")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}