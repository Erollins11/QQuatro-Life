"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { GalleryCategory } from "@/data/types";

type GalleryViewModel = {
  slug: string;
  title: string;
  shortDescription: string;
  category: GalleryCategory;
  image: string;
};

type GalleryFilterGridProps = {
  items: GalleryViewModel[];
  labels: {
    all: string;
    hotel: string;
    rooms: string;
    dining: string;
    beach: string;
    spa: string;
  };
};

const categoryOrder: GalleryCategory[] = ["hotel", "rooms", "dining", "beach", "spa"];

export default function GalleryFilterGrid({ items, labels }: GalleryFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | GalleryCategory>("all");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={[
            "rounded-full border px-4 py-2 text-sm font-semibold transition",
            activeCategory === "all"
              ? "border-brand-sand bg-brand-sand text-brand-ink"
              : "border-brand-line bg-brand-card text-brand-muted hover:text-brand-paper",
          ].join(" ")}
        >
          {labels.all}
        </button>

        {categoryOrder.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={[
              "rounded-full border px-4 py-2 text-sm font-semibold capitalize transition",
              activeCategory === category
                ? "border-brand-sand bg-brand-sand text-brand-ink"
                : "border-brand-line bg-brand-card text-brand-muted hover:text-brand-paper",
            ].join(" ")}
          >
            {labels[category]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article key={item.slug} className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-56 w-full">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <h3 className="text-xl text-brand-paper">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{item.shortDescription}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
