"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
  labels: Record<Locale, string>;
  ariaLabel: string;
};

function replaceLocale(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  return `/${targetLocale}/${segments.join("/")}`;
}

export default function LocaleSwitcher({ locale, labels, ariaLabel }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-brand-line bg-brand-card/70 p-1" aria-label={ariaLabel}>
      {locales.map((item) => {
        const isActive = item === locale;
        const href = replaceLocale(pathname, item);

        return (
          <Link
            key={item}
            href={href}
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
              isActive ? "bg-brand-sand text-brand-ink" : "text-brand-muted hover:text-brand-paper",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {labels[item]}
          </Link>
        );
      })}
    </div>
  );
}
