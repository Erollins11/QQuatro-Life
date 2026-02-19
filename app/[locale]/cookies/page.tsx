import type { Metadata } from "next";

import SectionIntro from "@/app/components/SectionIntro";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.legal.cookies"),
    description: t("legal.cookies.intro"),
    path: "/cookies",
  });
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell max-w-4xl space-y-8">
        <SectionIntro title={t("legal.cookies.title")} description={t("legal.cookies.intro")} />

        <article className="glass-card rounded-2xl p-6 text-sm leading-relaxed text-brand-muted">
          <h2 className="text-xl text-brand-paper">{t("legal.cookies.sections.typesTitle")}</h2>
          <p className="mt-2">{t("legal.cookies.sections.typesText")}</p>

          <h2 className="mt-6 text-xl text-brand-paper">{t("legal.cookies.sections.managementTitle")}</h2>
          <p className="mt-2">{t("legal.cookies.sections.managementText")}</p>

          <h2 className="mt-6 text-xl text-brand-paper">{t("legal.cookies.sections.updateTitle")}</h2>
          <p className="mt-2">{t("legal.cookies.sections.updateText")}</p>
        </article>
      </div>
    </section>
  );
}