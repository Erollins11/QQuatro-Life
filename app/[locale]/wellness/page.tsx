import type { Metadata } from "next";
import Image from "next/image";

import SectionIntro from "@/app/components/SectionIntro";
import { media } from "@/data/media";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

const wellnessBlocks = [
  { key: "spa", image: media.wellness.spa },
  { key: "hammam", image: media.wellness.hammam },
  { key: "fitness", image: media.wellness.fitness },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.wellness.title"),
    description: t("seo.wellness.description"),
    path: "/wellness",
  });
}

export default async function WellnessPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("wellness.title")} description={t("wellness.subtitle")} />

        <div className="grid gap-5 md:grid-cols-3">
          {wellnessBlocks.map((block) => (
            <article key={block.key} className="glass-card overflow-hidden rounded-2xl">
              <div className="relative h-52 w-full">
                <Image src={block.image} alt={t(`wellness.blocks.${block.key}.title`)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h2 className="text-2xl text-brand-paper">{t(`wellness.blocks.${block.key}.title`)}</h2>
                <p className="mt-2 text-sm text-brand-muted">{t(`wellness.blocks.${block.key}.description`)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-brand-line p-4 text-sm text-brand-muted">{t("wellness.appointmentCta")}</div>
      </div>
    </section>
  );
}