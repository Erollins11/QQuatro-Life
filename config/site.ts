import type { Locale } from "@/lib/i18n";

export const siteConfig = {
  hotelName: "OTEL_ADI",
  location: "Bodrum, Turkiye",
  brandTone: "boutique" as const,
  description:
    "Bodrum sahilinde premium konaklama, rafine gastronomi ve yalın lüks deneyimi.",
  phone: "+90 252 000 00 00",
  email: "hello@oteladi.com",
  whatsappNumber: "+905320000000",
  address: "Yalikavak Mahallesi, Sahil Caddesi No:12, Bodrum / Mugla",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
  seasonBanner: {
    enabled: true,
    openingDate: "2026-04-15",
    closingDate: "2026-10-31",
  },
  defaultLocale: "tr" as Locale,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://example.com",
};

export function getWhatsAppLink(message: string): string {
  const text = encodeURIComponent(message);
  const phone = siteConfig.whatsappNumber.replace(/[^\d+]/g, "");
  return `https://wa.me/${phone.replace("+", "")}?text=${text}`;
}

export function getBookingLink(locale: Locale): { href: string; isExternal: boolean } {
  const bookingUrl = process.env.BOOKING_URL;

  if (bookingUrl && bookingUrl.trim().length > 0) {
    return { href: bookingUrl, isExternal: true };
  }

  return { href: `/${locale}/book`, isExternal: false };
}
