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
  const content = await fs.readFile(path.join(process.cwd(), "content", "pages", locale, fileName), "utf-8");
  const data = matter(content).data;
  
  return <LegalPage data={data as Record<string, unknown>} />;
}
