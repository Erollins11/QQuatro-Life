# AGENTS.md

## Project Standards

- Framework: Next.js App Router + TypeScript.
- Styling: Tailwind CSS only (single approach, no mixed CSS modules).
- i18n: All user-facing strings must come from `messages/tr.json` and `messages/en.json`.
- Content model: Keep structured records in `data/` (rooms, restaurants, offers, gallery items).
- Booking CTA behavior:
  - Use `BOOKING_URL` when available.
  - Fallback to `/{locale}/book` when not configured.
- Accessibility baseline:
  - Keyboard reachable links/buttons.
  - `aria-label` where needed.
  - Form labels + inline validation messages with `aria-invalid`.
- Performance:
  - Use `next/image` for page images.
  - Keep JS minimal; only interactive filtering/forms are client components.
- SEO:
  - Per-page metadata + OpenGraph.
  - JSON-LD for Hotel/Organization on home page.
  - Keep `app/sitemap.ts` and `app/robots.ts` up to date.
- Legal footer pages must exist:
  - `/{locale}/kvkk`
  - `/{locale}/privacy`
  - `/{locale}/cookies`

## Validation Commands

Run after meaningful changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Editing Guidance

- Prefer updating reusable components in `app/components/` before duplicating markup.
- If adding new routes, update:
  - navigation links (`app/components/SiteHeader.tsx`)
  - sitemap (`app/sitemap.ts`)
  - translations (`messages/*.json`)
- Keep placeholder assets under `public/placeholders/`.
