import type { Metadata } from "next";
import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import LegalPage from "@/components/sections/LegalPage";
import { getMdxFileName } from "@/i18n/routing";
import type { Locale } from "@/i18n/request";

export const metadata: Metadata = {
  title: "Regulamin serwisu Bitspire – zasady korzystania",
  description:
    "Regulamin serwisu Bitspire: zasady korzystania, definicje, prawa użytkowników, odpowiedzialność, reklamacje, dane osobowe i kontakt.",
  alternates: { canonical: "/regulamin" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Regulamin serwisu Bitspire",
    description:
      "Zasady i warunki korzystania z serwisu Bitspire – przejrzyste informacje dla użytkowników.",
    url: "/regulamin",
    type: "article",
  },
};

export default async function RegulaminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const fileName = getMdxFileName('terms', locale as Locale);
  
  try {
    const filePath = path.join(process.cwd(), "content", "pages", locale, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return <LegalPage data={data as Record<string, unknown>} />;
  } catch (error) {
    console.warn(`[regulamin] Failed to read ${fileName} for ${locale}:`, error);
    return <LegalPage data={undefined} />;
  }
}
