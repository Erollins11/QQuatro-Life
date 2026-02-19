import type { Metadata } from "next";
import Image from "next/image";

import EventRequestForm from "@/app/components/EventRequestForm";
import SectionIntro from "@/app/components/SectionIntro";
import { getI18n, resolveLocale } from "@/lib/page";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return buildPageMetadata({
    locale,
    title: t("seo.events.title"),
    description: t("seo.events.description"),
    path: "/events",
  });
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const { t } = await getI18n(locale);

  return (
    <section className="section-spacing">
      <div className="page-shell space-y-8">
        <SectionIntro title={t("events.title")} description={t("events.subtitle")} />

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-56 w-full">
              <Image src="/placeholders/event.svg" alt={t("events.weddings.title")} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="p-5">
              <h2 className="text-3xl text-brand-paper">{t("events.weddings.title")}</h2>
              <p className="mt-2 text-sm text-brand-muted">{t("events.weddings.description")}</p>
            </div>
          </article>

          <article className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-56 w-full">
              <Image src="/placeholders/room-lounge.svg" alt={t("events.meetings.title")} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="p-5">
              <h2 className="text-3xl text-brand-paper">{t("events.meetings.title")}</h2>
              <p className="mt-2 text-sm text-brand-muted">{t("events.meetings.description")}</p>
            </div>
          </article>
        </div>

        <EventRequestForm
          labels={{
            title: t("events.form.title"),
            name: t("events.form.name"),
            email: t("events.form.email"),
            phone: t("events.form.phone"),
            date: t("events.form.date"),
            message: t("events.form.message"),
            submit: t("events.form.submit"),
            success: t("events.form.success"),
            errors: {
              name: t("events.form.errors.name"),
              email: t("events.form.errors.email"),
              phone: t("events.form.errors.phone"),
              date: t("events.form.errors.date"),
              message: t("events.form.errors.message"),
            },
          }}
        />
      </div>
    </section>
  );
}