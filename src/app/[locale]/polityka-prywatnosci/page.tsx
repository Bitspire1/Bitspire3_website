import type { Metadata } from "next";
import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import LegalPage from "@/components/sections/LegalPage";
import { getMdxFileName } from "@/i18n/routing";
import type { Locale } from "@/i18n/request";

export const metadata: Metadata = {
  title: "Polityka prywatności Bitspire – ochrona danych i cookies",
  description:
    "Polityka prywatności Bitspire: administrator danych, cele i podstawy przetwarzania, pliki cookies, narzędzia analityczne, prawa użytkownika (RODO).",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Polityka prywatności Bitspire",
    description:
      "Informacje o przetwarzaniu danych osobowych, plikach cookies oraz prawach użytkowników w serwisie Bitspire.",
    url: "/polityka-prywatnosci",
    type: "article",
  },
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const fileName = getMdxFileName('privacy', locale as Locale);
  
  try {
    const filePath = path.join(process.cwd(), "content", "pages", locale, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return <LegalPage data={data as Record<string, unknown>} />;
  } catch (error) {
    console.warn(`[privacy] Failed to read ${fileName} for ${locale}:`, error);
    return <LegalPage data={undefined} />;
  }
}
