'use client';

import { useTina } from 'tinacms/dist/react';
import { client } from "@/tina/__generated__/client";
import { Background } from "@/components/layout/background";
import Brief from "@/components/sections/Brief/Brief";
import { getPageData } from "@/lib/content/loader";

export default async function BriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageData = await getPageData(locale, "home", "pages");
  const briefData: Record<string, unknown> | null = pageData && typeof pageData === 'object' && 'brief' in pageData
    ? ((pageData as { brief?: Record<string, unknown> }).brief ?? null)
    : null;

  const { data } = useTina({
    query: `query GetPage($relativePath: String!) { pages(relativePath: $relativePath) { _sys { relativePath } _values } }`,
    variables: { relativePath: `${locale}/home.mdx` },
    data: { pages: { _sys: { relativePath: `${locale}/home.mdx` }, _values: pageData } }
  });

  const liveData = (data.pages as any)?._values ?? pageData;
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
