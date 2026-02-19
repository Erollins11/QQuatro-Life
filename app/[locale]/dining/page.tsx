import type { Metadata } from "next";

import DiningCard from "@/app/components/DiningCard";
import SectionIntro from "@/app/components/SectionIntro";
import { restaurants } from "@/data/restaurants";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.dining.title"),
    description: t("seo.dining.description"),
    path: "/dining",
  });
}

export default async function DiningPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("dining.title")} description={t("dining.subtitle")} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {restaurants.map((item) => (
            <DiningCard key={item.slug} item={item} locale={locale} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}