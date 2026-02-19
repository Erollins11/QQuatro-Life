import type { Metadata } from "next";

import "./globals.css";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.hotelName} Gumbet`,
    template: `%s | ${siteConfig.hotelName}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="bg-brand-ink text-brand-paper antialiased">{children}</body>
    </html>
  );
}
