'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { useTina, tinaField } from 'tinacms/dist/react';
import client from "../../../../tina/__generated__/client";
import { Background } from "@/components/layout/background";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";

const pageQuery = `query Home($relativePath: String!) {
  pages(relativePath: $relativePath) {
    _sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    title
    description
    hero {
      title
      titleAccent
      titleEnd
      subtitle
      ctaButton
      briefButton
      image
    }
    technology {
      title
      description
      items {
        name
        icon
        useBrightness
      }
    }
  }
}`;

export default function Home() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';
  const messages = useMessages();

  const [initialPageData, setInitialPageData] = useState<any>({
    pages: { _values: {} },
  });

  useEffect(() => {
    async function load() {
      try {
        const pageRes = await client.queries.pages({ relativePath: `${locale}/home.mdx` });

        setInitialPageData({
          pages: pageRes.data.pages,
        });
      } catch (e) {
        console.warn('[admin home] data fetch failed', e);
      }
    }
    load();
  }, [locale]);

  const { data: pageData } = useTina({
    query: pageQuery,
    variables: { relativePath: `${locale}/home.mdx` },
    data: initialPageData,
  });

  const pagesData = pageData.pages as any;
  const heroData = pagesData?.hero;
  const technologyData = pagesData?.technology;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="min-h-screen pt-20 relative overflow-hidden">
        <Background />
        <main className="relative z-10">
          {heroData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'hero')}>
              <Hero data={heroData as never} />
            </div>
          ) : null}
          {technologyData ? (
            <div data-tina-field={tinaField(pageData.pages as any, 'technology')}>
              <Technology data={technologyData as never} />
            </div>
          ) : null}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
