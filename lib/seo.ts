import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";

export function absoluteUrl(path: string): string {
  return `${siteConfig.baseUrl}${path}`;
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const localizedPath = getLocalizedPath(locale, path ?? "");

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(localizedPath),
      languages: {
        tr: absoluteUrl(getLocalizedPath("tr", path ?? "")),
        en: absoluteUrl(getLocalizedPath("en", path ?? "")),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: absoluteUrl(localizedPath),
      siteName: siteConfig.hotelName,
      images: [
        {
          url: absoluteUrl(media.homeHero),
          width: 1600,
          height: 1000,
          alt: `${siteConfig.hotelName} Bodrum`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(media.homeHero)],
    },
  };
}

export function buildHotelJsonLd(locale: Locale) {
  const localizedUrl = absoluteUrl(getLocalizedPath(locale));

  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteConfig.hotelName,
    url: localizedUrl,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl(media.homeHero),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Bodrum",
      addressRegion: "Mugla",
      addressCountry: "TR",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private Beach", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fitness", value: true },
    ],
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.hotelName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(media.homeHero),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["tr", "en"],
    },
    sameAs: siteConfig.socialLinks.map((item) => item.href),
  };
}