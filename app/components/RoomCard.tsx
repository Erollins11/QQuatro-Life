import Image from "next/image";
import Link from "next/link";

import { getBookingLink } from "@/config/site";
import type { Room } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

type RoomCardProps = {
  room: Room;
  locale: Locale;
  t: (key: string, values?: Record<string, string | number>) => string;
};

export default function RoomCard({ room, locale, t }: RoomCardProps) {
  const bookingLink = getBookingLink(locale);

  return (
    <article className="glass-card overflow-hidden rounded-2xl">
      <div className="relative h-56 w-full">
        <Image
          src={room.images[0]}
          alt={t(room.titleKey)}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-2xl text-brand-paper">{t(room.titleKey)}</h3>
        <p className="text-sm leading-relaxed text-brand-muted">{t(room.shortDescriptionKey)}</p>

        <dl className="grid grid-cols-2 gap-2 text-xs text-brand-muted">
          <div>
            <dt className="font-semibold text-brand-paper">{t("accommodation.card.area")}</dt>
            <dd>
              {room.area} {t("common.labels.area")}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-paper">{t("accommodation.card.capacity")}</dt>
            <dd>
              {room.capacity} {t("common.labels.capacity")}
            </dd>
          </div>
        </dl>

        <ul className="grid gap-1 text-xs text-brand-muted">
          {room.features.slice(0, 3).map((feature) => (
            <li key={feature}>• {t(feature)}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-1">
          <Link href={getLocalizedPath(locale, `/accommodation/${room.slug}`)} className="button-secondary text-sm">
            {t("common.actions.viewDetails")}
          </Link>
          <Link
            href={bookingLink.href}
            className="button-primary text-sm"
            target={bookingLink.isExternal ? "_blank" : undefined}
            rel={bookingLink.isExternal ? "noopener noreferrer" : undefined}
          >
            {t("common.actions.book")}
          </Link>
        </div>
      </div>
    </article>
  );
}
