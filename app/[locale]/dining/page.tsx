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
    title: t("seo.dining.title"),
    description: t("seo.dining.description"),
    path: "/dining",
  });
}

export default async function DiningPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);
  const cms = await getCmsContent(locale, t);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("dining.title")} description={t("dining.subtitle")} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cms.restaurants.map((item) => (
            <article key={item.slug} className="glass-card overflow-hidden rounded-2xl">
              <div className="relative h-52 w-full">
                <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="space-y-3 p-5">
                <h2 className="text-2xl text-brand-paper">{item.title}</h2>
                <p className="text-sm text-brand-muted">{item.shortDescription}</p>
                <p className="text-xs text-brand-muted">
                  <strong className="text-brand-paper">{t("common.labels.hours")}: </strong>
                  {item.hours}
                </p>
                <Link href={`/${locale}/dining/${item.slug}`} className="button-secondary inline-flex text-sm">
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