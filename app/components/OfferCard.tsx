import Image from "next/image";
import Link from "next/link";

import type { Offer } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

type OfferCardProps = {
  offer: Offer;
  locale: Locale;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export default function OfferCard({ offer, locale, t }: OfferCardProps) {
  return (
    <article className="glass-card overflow-hidden rounded-2xl">
      <div className="relative h-48 w-full">
        <Image src={offer.images[0]} alt={t(offer.titleKey)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-2xl text-brand-paper">{t(offer.titleKey)}</h3>
        <p className="text-sm text-brand-muted">{t(offer.shortDescriptionKey)}</p>
        <p className="text-xs text-brand-muted">
          <strong className="text-brand-paper">{t("offers.validUntil")}: </strong>
          {offer.validUntil}
        </p>
        <Link href={getLocalizedPath(locale, `/offers/${offer.slug}`)} className="button-secondary text-sm">
          {t("common.actions.viewDetails")}
        </Link>
      </div>
    </article>
  );
}
