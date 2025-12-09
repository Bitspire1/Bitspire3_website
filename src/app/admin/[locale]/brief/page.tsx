'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTina } from 'tinacms/dist/react';
import client from "../../../../../tina/__generated__/client";
import { Background } from "@/components/layout/background";
import Brief from "@/components/sections/Brief";

const query = `query GetPage($relativePath: String!) { pages(relativePath: $relativePath) { _sys { relativePath } _values } }`;

export default function BriefPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';

  const [initialData, setInitialData] = useState<any>({ pages: { _sys: { relativePath: `${locale}/home.mdx` }, _values: {} } });

  useEffect(() => {
    async function load() {
      try {
        const res = await client.queries.pages({ relativePath: `${locale}/home.mdx` });
        setInitialData({ pages: res.data.pages });
      } catch (e) {
        console.warn('[admin brief] fetch failed', e);
      }
    }
    load();
  }, [locale]);
  
  const { data } = useTina({
    query,
    variables: { relativePath: `${locale}/home.mdx` },
    data: initialData,
  });

  const liveData = (data.pages as any)?._values ?? {};
  const liveBriefData: Record<string, unknown> | null = liveData && typeof liveData === 'object' && 'brief' in liveData
    ? ((liveData as { brief?: Record<string, unknown> }).brief ?? null)
    : null;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        {liveBriefData ? (
          <div id="brief-section">
            <Brief data={liveBriefData as Record<string, unknown>} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
