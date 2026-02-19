import type { Metadata } from "next";

import SectionIntro from "@/app/components/SectionIntro";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.legal.privacy"),
    description: t("legal.privacy.intro"),
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell max-w-4xl space-y-8">
        <SectionIntro title={t("legal.privacy.title")} description={t("legal.privacy.intro")} />

        <article className="glass-card rounded-2xl p-6 text-sm leading-relaxed text-brand-muted">
          <h2 className="text-xl text-brand-paper">{t("legal.privacy.sections.collectionTitle")}</h2>
          <p className="mt-2">{t("legal.privacy.sections.collectionText")}</p>

          <h2 className="mt-6 text-xl text-brand-paper">{t("legal.privacy.sections.usageTitle")}</h2>
          <p className="mt-2">{t("legal.privacy.sections.usageText")}</p>

          <h2 className="mt-6 text-xl text-brand-paper">{t("legal.privacy.sections.retentionTitle")}</h2>
          <p className="mt-2">{t("legal.privacy.sections.retentionText")}</p>
        </article>
      </div>
    </section>
  );
}