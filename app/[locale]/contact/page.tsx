import type { Metadata } from "next";
import Image from "next/image";

import ContactForm from "@/app/components/ContactForm";
import SectionIntro from "@/app/components/SectionIntro";
import { getWhatsAppLink, siteConfig } from "@/config/site";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.contact.title"),
    description: t("seo.contact.description"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  const whatsappLink = getWhatsAppLink(t("contact.quickMessage"));

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("contact.title")} description={t("contact.subtitle")} />

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="glass-card space-y-4 rounded-2xl p-6">
            <div>
              <h2 className="text-xl text-brand-paper">{t("contact.addressTitle")}</h2>
              <p className="mt-1 text-sm text-brand-muted">{siteConfig.address}</p>
            </div>

            <div>
              <h3 className="text-lg text-brand-paper">{t("contact.transportTitle")}</h3>
              <ul className="mt-2 space-y-1 text-sm text-brand-muted">
                <li>{t("contact.transport.airport")}</li>
                <li>{t("contact.transport.marina")}</li>
                <li>{t("contact.transport.cityCenter")}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg text-brand-paper">{t("contact.transferTitle")}</h3>
              <p className="mt-1 text-sm text-brand-muted">{t("home.upsells.transfer.description")}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="button-secondary">
                {t("common.actions.whatsapp")}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="button-primary">
                {siteConfig.phone}
              </a>
            </div>
          </article>

          <article className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-72 w-full">
              <Image src="/placeholders/map.svg" alt={t("contact.mapPlaceholder")} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="p-4 text-sm text-brand-muted">{t("contact.mapPlaceholder")}</div>
          </article>
        </div>

        <ContactForm
          labels={{
            title: t("contact.form.title"),
            name: t("contact.form.name"),
            email: t("contact.form.email"),
            subject: t("contact.form.subject"),
            message: t("contact.form.message"),
            submit: t("contact.form.submit"),
            success: t("contact.form.success"),
            errors: {
              name: t("contact.form.errors.name"),
              email: t("contact.form.errors.email"),
              subject: t("contact.form.errors.subject"),
              message: t("contact.form.errors.message"),
            },
          }}
        />
      </div>
    </section>
  );
}
