import type { Metadata } from "next";
import Image from "next/image";

import SectionIntro from "@/app/components/SectionIntro";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.tour.title"),
    description: t("seo.tour.description"),
    path: "/tour",
  });
}

export default async function TourPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("tour.title")} description={t("tour.subtitle")} />

        <article className="glass-card overflow-hidden rounded-2xl">
          <div className="relative h-[420px] w-full">
            <Image src="/placeholders/tour.svg" alt={t("tour.title")} fill className="object-cover" sizes="100vw" />
          </div>
          <div className="p-6 text-sm text-brand-muted">{t("tour.placeholder")}</div>
        </article>
      </div>
    </section>
  );
}