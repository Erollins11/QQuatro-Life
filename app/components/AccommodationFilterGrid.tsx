"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { BedType, RoomView } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

type RoomViewModel = {
  slug: string;
  title: string;
  shortDescription: string;
  features: string[];
  image: string;
  area: number;
  capacity: number;
  view: RoomView;
  bedType: BedType;
  hasPrivatePool: boolean;
  isVilla: boolean;
};

type AccommodationFilterGridProps = {
  locale: Locale;
  rooms: RoomViewModel[];
  bookingHref: string;
  bookingExternal: boolean;
  ui: {
    filterTitle: string;
    peopleLabel: string;
    areaLabel: string;
    viewLabel: string;
    bedTypeLabel: string;
    poolVillaLabel: string;
    poolVillaOption: string;
    allLabel: string;
    areaUnit: string;
    capacityUnit: string;
    cardAreaLabel: string;
    cardCapacityLabel: string;
    detailsLabel: string;
    bookLabel: string;
    viewOptions: Record<RoomView, string>;
    bedOptions: Record<BedType, string>;
    emptyState: string;
  };
};

export default function AccommodationFilterGrid({
  locale,
  rooms,
  bookingHref,
  bookingExternal,
  ui,
}: AccommodationFilterGridProps) {
  const [people, setPeople] = useState<number>(1);
  const [areaRange, setAreaRange] = useState<string>("all");
  const [view, setView] = useState<"all" | RoomView>("all");
  const [bedType, setBedType] = useState<"all" | BedType>("all");
  const [poolOrVilla, setPoolOrVilla] = useState(false);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (room.capacity < people) {
        return false;
      }

      if (areaRange === "0-45" && !(room.area <= 45)) {
        return false;
      }

      if (areaRange === "46-70" && !(room.area >= 46 && room.area <= 70)) {
        return false;
      }

      if (areaRange === "71+" && !(room.area >= 71)) {
        return false;
      }

      if (view !== "all" && room.view !== view) {
        return false;
      }

      if (bedType !== "all" && room.bedType !== bedType) {
        return false;
      }

      if (poolOrVilla && !(room.hasPrivatePool || room.isVilla)) {
        return false;
      }

      return true;
    });
  }, [areaRange, bedType, people, poolOrVilla, rooms, view]);

  return (
    <div className="space-y-8">
      <section className="glass-card rounded-2xl p-5" aria-label={ui.filterTitle}>
        <h2 className="mb-4 text-xl text-brand-paper">{ui.filterTitle}</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <label className="text-sm text-brand-muted">
            {ui.peopleLabel}
            <input
              type="number"
              min={1}
              max={10}
              value={people}
              onChange={(event) => setPeople(Math.max(1, Number(event.target.value) || 1))}
              className="input-base mt-1"
            />
          </label>

          <label className="text-sm text-brand-muted">
            {ui.areaLabel}
            <select value={areaRange} onChange={(event) => setAreaRange(event.target.value)} className="input-base mt-1">
              <option value="all">{ui.allLabel}</option>
              <option value="0-45">0-45 {ui.areaUnit}</option>
              <option value="46-70">46-70 {ui.areaUnit}</option>
              <option value="71+">71+ {ui.areaUnit}</option>
            </select>
          </label>

          <label className="text-sm text-brand-muted">
            {ui.viewLabel}
            <select value={view} onChange={(event) => setView(event.target.value as "all" | RoomView)} className="input-base mt-1">
              <option value="all">{ui.allLabel}</option>
              <option value="sea">{ui.viewOptions.sea}</option>
              <option value="garden">{ui.viewOptions.garden}</option>
              <option value="bay">{ui.viewOptions.bay}</option>
            </select>
          </label>

          <label className="text-sm text-brand-muted">
            {ui.bedTypeLabel}
            <select
              value={bedType}
              onChange={(event) => setBedType(event.target.value as "all" | BedType)}
              className="input-base mt-1"
            >
              <option value="all">{ui.allLabel}</option>
              <option value="king">{ui.bedOptions.king}</option>
              <option value="twin">{ui.bedOptions.twin}</option>
              <option value="family">{ui.bedOptions.family}</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2 rounded-lg border border-brand-line px-3 py-2 text-sm text-brand-muted">
            <input
              type="checkbox"
              checked={poolOrVilla}
              onChange={(event) => setPoolOrVilla(event.target.checked)}
              aria-label={ui.poolVillaLabel}
            />
            <span>{ui.poolVillaOption}</span>
          </label>
        </div>
      </section>

      {filteredRooms.length === 0 ? (
        <p className="rounded-xl border border-brand-line p-4 text-sm text-brand-muted">{ui.emptyState}</p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredRooms.map((room) => (
          <article key={room.slug} className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-52 w-full">
              <Image src={room.image} alt={room.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>

            <div className="space-y-4 p-5">
              <h3 className="text-2xl text-brand-paper">{room.title}</h3>
              <p className="text-sm text-brand-muted">{room.shortDescription}</p>

              <dl className="grid grid-cols-2 gap-2 text-xs text-brand-muted">
                <div>
                  <dt className="font-semibold text-brand-paper">{ui.cardAreaLabel}</dt>
                  <dd>
                    {room.area} {ui.areaUnit}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-paper">{ui.cardCapacityLabel}</dt>
                  <dd>
                    {room.capacity} {ui.capacityUnit}
                  </dd>
                </div>
              </dl>

              <ul className="grid gap-1 text-xs text-brand-muted">
                {room.features.slice(0, 3).map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                <Link href={getLocalizedPath(locale, `/accommodation/${room.slug}`)} className="button-secondary text-sm">
                  {ui.detailsLabel}
                </Link>

                <Link
                  href={bookingHref}
                  className="button-primary text-sm"
                  target={bookingExternal ? "_blank" : undefined}
                  rel={bookingExternal ? "noopener noreferrer" : undefined}
                >
                  {ui.bookLabel}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
