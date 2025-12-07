import type { Metadata } from "next";
import React from "react";
import client from "@tina/__generated__/client";
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
    const pageData = await client.queries.pages({
      relativePath: `${locale}/${fileName}`,
    });

    return <LegalPage data={pageData.data.pages} />;
  } catch {
    // Failed to load terms
    return <LegalPage data={undefined} />;
  }
}
