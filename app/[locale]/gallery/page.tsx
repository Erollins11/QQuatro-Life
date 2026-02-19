import type { Metadata } from "next";
import Image from "next/image";

import GalleryFilterGrid from "@/app/components/GalleryFilterGrid";
import SectionIntro from "@/app/components/SectionIntro";
import { galleryItems } from "@/data/galleryItems";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.gallery.title"),
    description: t("seo.gallery.description"),
    path: "/gallery",
  });
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  const items = galleryItems.map((item) => ({
    slug: item.slug,
    title: t(item.titleKey),
    shortDescription: t(item.shortDescriptionKey),
    category: item.category,
    image: item.images[0],
  }));

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("gallery.title")} description={t("gallery.subtitle")} />

        <GalleryFilterGrid
          items={items}
          labels={{
            all: t("gallery.filters.all"),
            hotel: t("gallery.filters.hotel"),
            rooms: t("gallery.filters.rooms"),
            dining: t("gallery.filters.dining"),
            beach: t("gallery.filters.beach"),
            spa: t("gallery.filters.spa"),
          }}
        />

        <article className="glass-card overflow-hidden rounded-2xl">
          <div className="relative h-60 w-full">
            <Image src="/placeholders/video.svg" alt={t("gallery.videoPlaceholder.title")} fill className="object-cover" sizes="100vw" />
          </div>
          <div className="p-6">
            <h2 className="text-3xl text-brand-paper">{t("gallery.videoPlaceholder.title")}</h2>
            <p className="mt-2 text-sm text-brand-muted">{t("gallery.videoPlaceholder.description")}</p>
          </div>
        </article>
      </div>
    </section>
  );
}