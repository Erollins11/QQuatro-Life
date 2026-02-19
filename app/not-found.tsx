import Link from "next/link";

import { defaultLocale } from "@/lib/i18n";

export default function GlobalNotFound() {
  return (
    <main className="page-shell section-spacing flex min-h-[60vh] items-center justify-center">
      <div className="glass-card rounded-2xl p-8 text-center">
        <h1 className="text-4xl text-brand-paper">404</h1>
        <Link href={`/${defaultLocale}`} className="button-primary mt-5 inline-flex">
          ←
        </Link>
      </div>
    </main>
  );
}
