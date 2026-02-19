# Quatro Life - Bodrum Hotel Website (Next.js)

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
- `CMS_PROVIDER`: `local` or `headless`.
- `CMS_BASE_URL`: Required for `headless`; content is fetched from `CMS_BASE_URL/content/{locale}`.
- `CMS_API_TOKEN`: Optional bearer token for headless CMS requests.
- `HOME_HERO_VIDEO_URL`: Optional hero video URL.
- `GALLERY_VIDEO_URL`: Optional gallery video URL (YouTube or direct video link).

## CMS Integration

- Default mode is `local` and uses `data/*` + `messages/*`.
- Headless mode merges remote payload on top of local fallback content.
- API payload example is available at `data/cms-content-example.json`.
- Local reference endpoint for payload shape:
  - `GET /api/content/tr`
  - `GET /api/content/en`

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
