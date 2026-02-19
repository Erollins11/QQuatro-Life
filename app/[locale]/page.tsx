import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import UpsellCards from "@/app/components/UpsellCards";
import { getBookingLink, getWhatsAppLink, siteConfig } from "@/config/site";
import { homeQuickCards } from "@/data/homeCards";
import { getCmsContent } from "@/lib/cms";
import { getLocalizedPath } from "@/lib/i18n";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildHotelJsonLd, buildOrganizationJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.home.title"),
    description: t("seo.home.description"),
    path: "",
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);
  const cms = await getCmsContent(locale, t);

  const bookingLink = getBookingLink(locale);
  const whatsappLink = getWhatsAppLink(t("contact.quickMessage"));

  const hotelJsonLd = buildHotelJsonLd(locale);
  const orgJsonLd = buildOrganizationJsonLd();

  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden md:min-h-[84vh]">
        <div className="absolute inset-0">
          {cms.home.heroVideoUrl ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={cms.home.heroImage}
              aria-label={cms.home.heroImageAlt}
            >
              <source src={cms.home.heroVideoUrl} />
            </video>
          ) : (
            <Image
              src={cms.home.heroImage}
              alt={cms.home.heroImageAlt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-ink/55 to-brand-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/30 to-transparent" />

        <div className="page-shell relative z-10 flex min-h-[78vh] items-center justify-center py-12 text-center md:min-h-[84vh] md:py-16">
          <div className="w-full max-w-4xl space-y-6 rounded-2xl border border-brand-line bg-brand-ink/40 p-6 backdrop-blur-sm md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sand">{t("home.hero.eyebrow")}</p>
            <h1 className="text-5xl leading-[1.05] text-brand-paper md:text-7xl">{t("home.hero.title")}</h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-paper/90 md:text-lg">{t("home.hero.subtitle")}</p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={bookingLink.href}
                className="button-primary"
                target={bookingLink.isExternal ? "_blank" : undefined}
                rel={bookingLink.isExternal ? "noopener noreferrer" : undefined}
              >
                {t("home.hero.primaryCta")}
              </Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="button-secondary">
                {t("home.hero.secondaryCta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-12 pb-10 md:-mt-16">
        <div className="page-shell grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {homeQuickCards.map((card) => (
            <Link key={card.href} href={getLocalizedPath(locale, card.href)} className="glass-card rounded-2xl p-5 transition hover:border-brand-sand">
              <h2 className="text-2xl text-brand-paper">{t(card.titleKey)}</h2>
              <p className="mt-2 text-sm text-brand-muted">{t(card.descriptionKey)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-shell glass-card rounded-3xl p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sand">{t("home.conceptBand.label")}</p>
          <h2 className="mt-3 text-4xl text-brand-paper">{t("home.conceptBand.title")}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-brand-muted">{t("home.conceptBand.description")}</p>
        </div>
      </section>

      <section className="pb-14">
        <div className="page-shell grid gap-4 md:grid-cols-2">
          <article className="glass-card rounded-2xl p-6">
            <h2 className="text-3xl text-brand-paper">{t("home.contactCta.title")}</h2>
            <p className="mt-2 text-brand-muted">{t("home.contactCta.description")}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="button-secondary">
                {t("home.contactCta.whatsapp")}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="button-primary">
                {t("home.contactCta.phone")}
              </a>
            </div>
          </article>

          <article className="glass-card rounded-2xl p-6">
            <h2 className="text-3xl text-brand-paper">{t("navigation.tour")}</h2>
            <p className="mt-2 text-brand-muted">{t("tour.subtitle")}</p>
            <Link href={getLocalizedPath(locale, "/tour")} className="mt-4 inline-flex button-secondary">
              {t("common.actions.explore")}
            </Link>
          </article>
        </div>
      </section>

      <UpsellCards locale={locale} t={t} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </>
  );
}
