import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBookingLink } from "@/config/site";
import { getOfferBySlug, offers } from "@/data/offers";
import { locales } from "@/lib/i18n";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

type OfferParams = {
  locale: string;
  slug: string;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => offers.map((offer) => ({ locale, slug: offer.slug })));
}

export async function generateMetadata({ params }: { params: Promise<OfferParams> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    return {};
  }

  const resolvedLocale = await resolveLocale(Promise.resolve({ locale }));
  const { t } = await getI18n(resolvedLocale);

  return buildPageMetadata({
    locale: resolvedLocale,
    title: t(offer.titleKey),
    description: t(offer.shortDescriptionKey),
    path: `/offers/${offer.slug}`,
  });
}

export default async function OfferDetailPage({ params }: { params: Promise<OfferParams> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params.then((value) => ({ locale: value.locale })));
  const { t } = await getI18n(locale);

  const offer = getOfferBySlug(slug);
  if (!offer) {
    notFound();
  }

  const bookingLink = getBookingLink(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <Link href={`/${locale}/offers`} className="text-sm text-brand-muted hover:text-brand-paper">
          ← {t("offers.title")}
        </Link>

        <article className="glass-card overflow-hidden rounded-2xl">
          <div className="relative h-72 w-full">
            <Image src={offer.images[0]} alt={t(offer.titleKey)} fill className="object-cover" priority sizes="100vw" />
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-4xl text-brand-paper">{t(offer.titleKey)}</h1>
              <p className="mt-3 text-brand-muted">{t(offer.descriptionKey)}</p>
              <p className="mt-4 text-xs text-brand-muted">
                {t("offers.validUntil")}: {offer.validUntil}
              </p>
            </div>

            <aside>
              <ul className="space-y-2 text-sm text-brand-muted">
                {offer.features.map((feature) => (
                  <li key={feature}>• {t(feature)}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-brand-muted">{t("offers.detail.terms")}</p>

              <Link
                href={bookingLink.href}
                className="button-primary mt-5"
                target={bookingLink.isExternal ? "_blank" : undefined}
                rel={bookingLink.isExternal ? "noopener noreferrer" : undefined}
              >
                {t("common.actions.book")}
              </Link>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}