import type { Metadata } from "next";
import Link from "next/link";

import { getBookingLink, getWhatsAppLink, siteConfig } from "@/config/site";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.book.title"),
    description: t("seo.book.description"),
    path: "/book",
  });
}

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  const bookingLink = getBookingLink(locale);
  const whatsappLink = getWhatsAppLink(t("contact.quickMessage"));

  return (
    <section className="section-spacing">
      <div className="page-shell max-w-3xl">
        <article className="glass-card rounded-2xl p-8">
          <h1 className="text-4xl text-brand-paper">{t("book.title")}</h1>
          <p className="mt-2 text-brand-muted">{t("book.subtitle")}</p>

          {!bookingLink.isExternal ? (
            <>
              <h2 className="mt-6 text-2xl text-brand-paper">{t("book.unavailableTitle")}</h2>
              <p className="mt-2 text-sm text-brand-muted">{t("book.unavailableDescription")}</p>
              <p className="mt-3 text-sm text-brand-muted">{t("book.contactAlternative")}</p>
            </>
          ) : (
            <p className="mt-6 text-sm text-brand-muted">{t("common.actions.checkAvailability")}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={bookingLink.href}
              className="button-primary"
              target={bookingLink.isExternal ? "_blank" : undefined}
              rel={bookingLink.isExternal ? "noopener noreferrer" : undefined}
            >
              {t("common.actions.book")}
            </Link>
            <a href={whatsappLink} className="button-secondary" target="_blank" rel="noopener noreferrer">
              {t("common.actions.whatsapp")}
            </a>
            <a href={`tel:${siteConfig.phone}`} className="button-secondary">
              {siteConfig.phone}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
