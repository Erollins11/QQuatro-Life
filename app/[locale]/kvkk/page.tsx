import type { Metadata } from "next";

import SectionIntro from "@/app/components/SectionIntro";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.legal.kvkk"),
    description: t("legal.kvkk.intro"),
    path: "/kvkk",
  });
}

export default async function KvkkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell max-w-4xl space-y-8">
        <SectionIntro title={t("legal.kvkk.title")} description={t("legal.kvkk.intro")} />

        <article className="glass-card rounded-2xl p-6 text-sm leading-relaxed text-brand-muted">
          <h2 className="text-xl text-brand-paper">{t("legal.kvkk.sections.purposeTitle")}</h2>
          <p className="mt-2">{t("legal.kvkk.sections.purposeText")}</p>

          <h2 className="mt-6 text-xl text-brand-paper">{t("legal.kvkk.sections.legalBasisTitle")}</h2>
          <p className="mt-2">{t("legal.kvkk.sections.legalBasisText")}</p>

          <h2 className="mt-6 text-xl text-brand-paper">{t("legal.kvkk.sections.rightsTitle")}</h2>
          <p className="mt-2">{t("legal.kvkk.sections.rightsText")}</p>
        </article>
      </div>
    </section>
  );
}