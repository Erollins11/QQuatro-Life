import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

type UpsellCardsProps = {
  locale: Locale;
  t: (key: string, values?: Record<string, string | number>) => string;
};

const upsellItems = [
  { key: "cabana", href: "/experiences" },
  { key: "dayPass", href: "/offers" },
  { key: "transfer", href: "/contact" },
];

export default function UpsellCards({ locale, t }: UpsellCardsProps) {
  return (
    <section className="section-spacing">
      <div className="page-shell">
        <div className="mb-8">
          <h2 className="text-3xl text-brand-paper md:text-4xl">{t("home.upsells.title")}</h2>
          <p className="mt-2 text-brand-muted">{t("home.upsells.subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {upsellItems.map((item) => (
            <article key={item.key} className="glass-card rounded-2xl p-5">
              <h3 className="text-2xl text-brand-paper">{t(`home.upsells.${item.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t(`home.upsells.${item.key}.description`)}</p>
              <Link href={getLocalizedPath(locale, item.href)} className="mt-4 inline-block text-sm font-semibold text-brand-sand hover:text-brand-paper">
                {t("common.actions.learnMore")}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
