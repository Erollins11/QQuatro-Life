import type { Metadata } from "next";
import Image from "next/image";

import GalleryFilterGrid from "@/app/components/GalleryFilterGrid";
import SectionIntro from "@/app/components/SectionIntro";
import { getCmsContent } from "@/lib/cms";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

function toYoutubeEmbed(url: string): string | null {
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = new URL(url).searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  return null;
}

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
  const cms = await getCmsContent(locale, t);

  const youtubeEmbed = cms.home.galleryVideoUrl ? toYoutubeEmbed(cms.home.galleryVideoUrl) : null;

  const items = cms.galleryItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription,
    category: item.category,
    image: item.image,
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
          <div className="relative h-72 w-full">
            {youtubeEmbed ? (
              <iframe
                src={youtubeEmbed}
                title={t("gallery.videoPlaceholder.title")}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : cms.home.galleryVideoUrl ? (
              <video className="h-full w-full object-cover" controls poster={cms.home.galleryVideoPoster} preload="metadata">
                <source src={cms.home.galleryVideoUrl} />
              </video>
            ) : (
              <Image src={cms.home.galleryVideoPoster} alt={t("gallery.videoPlaceholder.title")} fill className="object-cover" sizes="100vw" />
            )}
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