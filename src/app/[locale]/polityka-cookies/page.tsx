import type { Metadata } from "next";
import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import LegalPage from "@/components/sections/LegalPage";
import { getMdxFileName } from "@/i18n/routing";
import type { Locale } from "@/i18n/request";

export const metadata: Metadata = {
  title: "Polityka cookies Bitspire – pliki cookies i zgody",
  description: "Polityka cookies Bitspire: rodzaje plików cookies, cele, podstawy prawne, jak wyłączyć cookies oraz zarządzać zgodą.",
  alternates: { canonical: "/polityka-cookies" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Polityka cookies Bitspire",
    description: "Informacje o tym jak Bitspire wykorzystuje pliki cookies i jak zarządzać zgodą.",
    url: "/polityka-cookies",
    type: "article",
  },
};

export default async function PolitykaCookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const fileName = getMdxFileName('cookies', locale as Locale);
  
  try {
    const filePath = path.join(process.cwd(), "content", "pages", locale, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return <LegalPage data={data as Record<string, unknown>} />;
  } catch (error) {
    console.warn(`[cookies] Failed to read ${fileName} for ${locale}:`, error);
    return <LegalPage data={undefined} />;
  }
}
