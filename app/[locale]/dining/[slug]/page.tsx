import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { restaurants } from "@/data/restaurants";
import { getCmsContent } from "@/lib/cms";
import { locales } from "@/lib/i18n";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

type DiningParams = {
  locale: string;
  slug: string;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => restaurants.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({ params }: { params: Promise<DiningParams> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = await resolveLocale(Promise.resolve({ locale }));
  const { t } = await getI18n(resolvedLocale);
  const cms = await getCmsContent(resolvedLocale, t);

  const venue = cms.restaurants.find((item) => item.slug === slug);
  if (!venue) {
    return {};
  }

  return buildPageMetadata({
    locale: resolvedLocale,
    title: venue.title,
    description: venue.shortDescription,
    path: `/dining/${venue.slug}`,
  });
}

export default async function DiningDetailPage({ params }: { params: Promise<DiningParams> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params.then((value) => ({ locale: value.locale })));
  const { t } = await getI18n(locale);
  const cms = await getCmsContent(locale, t);

  const venue = cms.restaurants.find((item) => item.slug === slug);
  if (!venue) {
    notFound();
  }

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <Link href={`/${locale}/dining`} className="text-sm text-brand-muted hover:text-brand-paper">
          ← {t("dining.title")}
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-72 w-full md:h-96">
              <Image src={venue.images[0]} alt={venue.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>
            <div className="grid gap-3 p-4 md:grid-cols-2">
              {venue.images.slice(1).map((image) => (
                <div key={image} className="relative h-36 overflow-hidden rounded-xl">
                  <Image src={image} alt={venue.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
                </div>
              ))}
            </div>
          </article>

          <aside className="glass-card rounded-2xl p-6">
            <h1 className="text-4xl text-brand-paper">{venue.title}</h1>
            <p className="mt-3 text-brand-muted">{venue.description}</p>

            <dl className="mt-6 space-y-3 text-sm text-brand-muted">
              <div>
                <dt className="font-semibold text-brand-paper">{t("dining.detail.concept")}</dt>
                <dd>{venue.concept}</dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-paper">{t("dining.detail.hours")}</dt>
                <dd>{venue.hours}</dd>
              </div>
              {venue.dressCode ? (
                <div>
                  <dt className="font-semibold text-brand-paper">{t("dining.detail.dressCode")}</dt>
                  <dd>{venue.dressCode}</dd>
                </div>
              ) : null}
            </dl>

            <ul className="mt-5 space-y-1 text-sm text-brand-muted">
              {venue.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}