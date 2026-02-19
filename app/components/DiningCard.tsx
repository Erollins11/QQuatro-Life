import Image from "next/image";
import Link from "next/link";

import type { Restaurant } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

type DiningCardProps = {
  item: Restaurant;
  locale: Locale;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export default function DiningCard({ item, locale, t }: DiningCardProps) {
  return (
    <article className="glass-card overflow-hidden rounded-2xl">
      <div className="relative h-52 w-full">
        <Image
          src={item.images[0]}
          alt={t(item.titleKey)}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-2xl text-brand-paper">{t(item.titleKey)}</h3>
        <p className="text-sm text-brand-muted">{t(item.shortDescriptionKey)}</p>
        <p className="text-xs text-brand-muted">
          <strong className="text-brand-paper">{t("common.labels.hours")}: </strong>
          {t(item.hoursKey)}
        </p>
        <Link href={getLocalizedPath(locale, `/dining/${item.slug}`)} className="button-secondary text-sm">
          {t("common.actions.viewDetails")}
        </Link>
      </div>
    </article>
  );
}
