'use client';

import { useTina } from 'tinacms/dist/react';
import { client } from "@/tina/__generated__/client";
import React from "react";
import LegalPage from "@/components/sections/LegalPage";
import { getPageData } from "@/lib/content/loader";
import { getMdxFileName } from "@/i18n/routing";
import type { Locale } from "@/i18n/request";

export default async function RegulaminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const fileName = getMdxFileName('terms', locale as Locale);
  const pageData = await getPageData(locale, fileName.replace(/\.mdx$/, ''), "pages");

  const { data } = useTina({
    query: `query GetPage($relativePath: String!) { pages(relativePath: $relativePath) { _sys { relativePath } _values } }`,
    variables: { relativePath: `${locale}/${fileName}` },
    data: { pages: { _sys: { relativePath: `${locale}/${fileName}` }, _values: pageData } }
  });

  const liveData = (data.pages as any)?._values ?? pageData;
  
  return <LegalPage data={liveData as Record<string, unknown>} />;
}
