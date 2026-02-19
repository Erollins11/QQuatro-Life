import type { Metadata } from "next";

import AccommodationFilterGrid from "@/app/components/AccommodationFilterGrid";
import SectionIntro from "@/app/components/SectionIntro";
import { getBookingLink } from "@/config/site";
import { getCmsContent } from "@/lib/cms";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.accommodation.title"),
    description: t("seo.accommodation.description"),
    path: "/accommodation",
  });
}

export default async function AccommodationPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);
  const cms = await getCmsContent(locale, t);

  const bookingLink = getBookingLink(locale);

  const roomModels = cms.rooms.map((room) => ({
    slug: room.slug,
    title: room.title,
    shortDescription: room.shortDescription,
    features: room.features,
    image: room.images[0],
    area: room.area,
    capacity: room.capacity,
    view: room.view,
    bedType: room.bedType,
    hasPrivatePool: room.hasPrivatePool,
    isVilla: room.isVilla,
  }));

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("accommodation.title")} description={t("accommodation.subtitle")} />

        <AccommodationFilterGrid
          locale={locale}
          rooms={roomModels}
          bookingHref={bookingLink.href}
          bookingExternal={bookingLink.isExternal}
          ui={{
            filterTitle: t("accommodation.filters.title"),
            peopleLabel: t("accommodation.filters.people"),
            areaLabel: t("accommodation.filters.area"),
            viewLabel: t("accommodation.filters.view"),
            bedTypeLabel: t("accommodation.filters.bedType"),
            poolVillaLabel: t("accommodation.filters.poolOrVilla"),
            poolVillaOption: t("accommodation.filters.poolOrVillaOptions.onlyPoolOrVilla"),
            allLabel: t("accommodation.filters.all"),
            areaUnit: t("common.labels.area"),
            capacityUnit: t("common.labels.capacity"),
            cardAreaLabel: t("accommodation.card.area"),
            cardCapacityLabel: t("accommodation.card.capacity"),
            detailsLabel: t("common.actions.viewDetails"),
            bookLabel: t("common.actions.book"),
            viewOptions: {
              sea: t("accommodation.filters.views.sea"),
              garden: t("accommodation.filters.views.garden"),
              bay: t("accommodation.filters.views.bay"),
            },
            bedOptions: {
              king: t("accommodation.filters.beds.king"),
              twin: t("accommodation.filters.beds.twin"),
              family: t("accommodation.filters.beds.family"),
            },
            emptyState: t("accommodation.filters.emptyState"),
          }}
        />
      </div>
    </section>
  );
}