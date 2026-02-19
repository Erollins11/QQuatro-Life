import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBookingLink } from "@/config/site";
import { rooms } from "@/data/rooms";
import { getCmsContent } from "@/lib/cms";
import { locales } from "@/lib/i18n";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

type RoomDetailParams = {
  locale: string;
  slug: string;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => rooms.map((room) => ({ locale, slug: room.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RoomDetailParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolvedLocale = await resolveLocale(Promise.resolve({ locale }));
  const { t } = await getI18n(resolvedLocale);
  const cms = await getCmsContent(resolvedLocale, t);

  const room = cms.rooms.find((item) => item.slug === slug);
  if (!room) {
    return {};
  }

  return buildPageMetadata({
    locale: resolvedLocale,
    title: room.title,
    description: room.shortDescription,
    path: `/accommodation/${room.slug}`,
  });
}

export default async function AccommodationDetailPage({ params }: { params: Promise<RoomDetailParams> }) {
  const { slug } = await params;
  const locale = await resolveLocale(
    params.then((value) => ({
      locale: value.locale,
    })),
  );
  const { t } = await getI18n(locale);
  const cms = await getCmsContent(locale, t);

  const room = cms.rooms.find((item) => item.slug === slug);

  if (!room) {
    notFound();
  }

  const bookingLink = getBookingLink(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <Link href={`/${locale}/accommodation`} className="text-sm text-brand-muted hover:text-brand-paper">
          ← {t("accommodation.title")}
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-72 w-full md:h-96">
              <Image src={room.images[0]} alt={room.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>

            <div className="grid gap-3 p-4 md:grid-cols-2">
              {room.images.slice(1).map((image) => (
                <div key={image} className="relative h-36 overflow-hidden rounded-xl">
                  <Image src={image} alt={room.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
                </div>
              ))}
            </div>
          </article>

          <aside className="glass-card rounded-2xl p-6">
            <h1 className="text-4xl text-brand-paper">{room.title}</h1>
            <p className="mt-3 text-brand-muted">{room.description}</p>

            <h2 className="mt-6 text-xl text-brand-paper">{t("accommodation.detail.specs")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              <li>
                {t("accommodation.card.area")}: {room.area} {t("common.labels.area")}
              </li>
              <li>
                {t("accommodation.card.capacity")}: {room.capacity} {t("common.labels.capacity")}
              </li>
              <li>
                {t("common.labels.view")}: {t(`accommodation.filters.views.${room.view}`)}
              </li>
              <li>
                {t("common.labels.bedType")}: {t(`accommodation.filters.beds.${room.bedType}`)}
              </li>
              <li>
                {t("accommodation.filters.poolOrVilla")}: {t(room.hasPrivatePool || room.isVilla ? "common.labels.yes" : "common.labels.no")}
              </li>
            </ul>

            <ul className="mt-4 space-y-1 text-sm text-brand-muted">
              {room.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-brand-muted">{t("accommodation.detail.reserveNote")}</p>

            <Link
              href={bookingLink.href}
              className="button-primary mt-4"
              target={bookingLink.isExternal ? "_blank" : undefined}
              rel={bookingLink.isExternal ? "noopener noreferrer" : undefined}
            >
              {t("common.actions.book")}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}