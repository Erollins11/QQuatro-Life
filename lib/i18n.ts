export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeLabels: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
};

export type MessageValue = string | { [key: string]: MessageValue };
export type Messages = Record<string, MessageValue>;

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function getMessages(locale: Locale): Promise<Messages> {
  if (locale === "tr") {
    return (await import("@/messages/tr.json")).default as Messages;
  }

  return (await import("@/messages/en.json")).default as Messages;
}

function getNestedValue(messages: Messages, key: string): string | undefined {
  const parts = key.split(".");
  let current: MessageValue | undefined = messages;

  for (const part of parts) {
    if (typeof current !== "object" || current === null || !(part in current)) {
      return undefined;
    }

    current = current[part];
  }

  return typeof current === "string" ? current : undefined;
}

export function createTranslator(messages: Messages) {
  return (key: string, values?: Record<string, string | number>) => {
    const template = getNestedValue(messages, key) ?? key;

    if (!values) {
      return template;
    }

    return Object.entries(values).reduce((output, [name, value]) => {
      return output.replaceAll(`{${name}}`, String(value));
    }, template);
  };
}

export function getLocalizedPath(locale: Locale, path = ""): string {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
