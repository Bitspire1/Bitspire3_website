'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTina } from 'tinacms/dist/react';
import client from "../../../../../tina/__generated__/client";
import LegalPage from "@/components/sections/LegalPage";
import { getMdxFileName } from "@/i18n/routing";
import type { Locale } from "@/i18n/request";

const query = `query GetPage($relativePath: String!) { pages(relativePath: $relativePath) { _sys { relativePath } _values } }`;

export default function PrivacyPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';
  const fileName = getMdxFileName('privacy', locale as Locale);

  const [initialData, setInitialData] = useState<any>({ pages: { _sys: { relativePath: `${locale}/${fileName}` }, _values: {} } });

  useEffect(() => {
    async function load() {
      try {
        const res = await client.queries.pages({ relativePath: `${locale}/${fileName}` });
        setInitialData({ pages: res.data.pages });
      } catch (e) {
        console.warn('[admin privacy] fetch failed', e);
      }
    }
    load();
  }, [locale, fileName]);

  const { data } = useTina({
    query,
    variables: { relativePath: `${locale}/${fileName}` },
    data: initialData,
  });

  const liveData = (data.pages as any)?._values ?? {};
  
  return <LegalPage data={liveData as Record<string, unknown>} />;
}
