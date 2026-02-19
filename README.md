# OTEL_ADI - Bodrum Hotel Website (Next.js)

Premium, SEO-friendly, bilingual (TR/EN) hotel website built with Next.js App Router and TypeScript.

## Tech Stack

- Next.js (App Router)
- TypeScript (`strict`)
- Tailwind CSS v4
- Data-driven content model (`data/`)
- Locale routing (`/[locale]` -> `tr`, `en`) with translation files (`messages/`)

## Quick Start

```bash
npm i
npm run dev
```

Open: `http://localhost:3000`

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

- `BOOKING_URL`: If set, all reservation buttons open this external booking URL.
- If `BOOKING_URL` is empty, reservation buttons point to `/{locale}/book` fallback page.
- `NEXT_PUBLIC_BASE_URL`: Optional canonical domain for metadata/sitemap/robots.

## Project Structure

```text
app/
  [locale]/
    accommodation/
    dining/
    experiences/
    wellness/
    offers/
    events/
    gallery/
    contact/
    book/
    tour/
    kvkk/
    privacy/
    cookies/
  components/
  sitemap.ts
  robots.ts
config/
data/
lib/
messages/
public/placeholders/
```

## Notes

- No copyrighted stock assets are used.
- Placeholder visuals are local SVG files in `public/placeholders/`.
- Forms are client-validated placeholders (no backend submission in MVP).
- Season banner and Phase-2 upsell sections are config/data-ready.
