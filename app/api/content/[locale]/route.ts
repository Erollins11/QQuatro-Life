import { NextResponse } from "next/server";

import { getLocalCmsContent } from "@/lib/cms";
import { isValidLocale } from "@/lib/i18n";
import { createTranslator, getMessages } from "@/lib/i18n";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const messages = await getMessages(locale);
  const t = createTranslator(messages);

  return NextResponse.json(getLocalCmsContent(t));
}