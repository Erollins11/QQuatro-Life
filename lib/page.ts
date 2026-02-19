import { notFound } from "next/navigation";

import { createTranslator, getMessages, isValidLocale, type Locale } from "@/lib/i18n";

export async function resolveLocale(
  paramsPromise: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await paramsPromise;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function getI18n(locale: Locale) {
  const messages = await getMessages(locale);
  return {
    messages,
    t: createTranslator(messages),
  };
}
