import type { Metadata } from "next";
import Image from "next/image";

import SectionIntro from "@/app/components/SectionIntro";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

const experienceBlocks = [
  { key: "beachPool", image: "/placeholders/gallery-beach-1.svg" },
  { key: "waterSports", image: "/placeholders/gallery-beach-2.svg" },
  { key: "yacht", image: "/placeholders/tour.svg" },
  { key: "sports", image: "/placeholders/event.svg" },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.experiences.title"),
    description: t("seo.experiences.description"),
    path: "/experiences",
  });
}

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell">
        <SectionIntro title={t("experiences.title")} description={t("experiences.subtitle")} />

        <div className="grid gap-5 md:grid-cols-2">
          {experienceBlocks.map((block) => (
            <article key={block.key} className="glass-card overflow-hidden rounded-2xl">
              <div className="relative h-56 w-full">
                <Image
                  src={block.image}
                  alt={t(`experiences.blocks.${block.key}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-3xl text-brand-paper">{t(`experiences.blocks.${block.key}.title`)}</h2>
                <p className="mt-2 text-sm text-brand-muted">{t(`experiences.blocks.${block.key}.description`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}