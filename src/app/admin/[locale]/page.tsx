'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { useTina } from 'tinacms/dist/react';
import client from "../../../../tina/__generated__/client";
import { Background } from "@/components/layout/background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { PortfolioHighlights } from "@/components/sections/Portfolio/PortfolioHighlights";

const pageQuery = `query Home($relativePath: String!) {
  pages(relativePath: $relativePath) { _values }
}`;

export default function Home() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';
  const messages = useMessages();

  const [initialPageData, setInitialPageData] = useState<any>({
    pages: { _values: {} },
    portfolioConnection: { edges: [] },
  });
  const [headerValues, setHeaderValues] = useState<any>({});
  const [footerValues, setFooterValues] = useState<any>({});

  useEffect(() => {
    async function load() {
      try {
        const [pageRes, headerRes, footerRes] = await Promise.all([
          client.queries.pages({ relativePath: `${locale}/home.mdx` }),
          client.queries.header({ relativePath: `${locale}/header.mdx` }),
          client.queries.footer({ relativePath: `${locale}/footer.mdx` }),
        ]);

        setInitialPageData({
          pages: pageRes.data.pages,
          portfolioConnection: { edges: [] },
        });
        setHeaderValues((headerRes.data.header as any)?._values ?? {});
        setFooterValues((footerRes.data.footer as any)?._values ?? {});
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

  const liveData = (pageData.pages as any)?._values ?? {};
  const portfolioHighlightsData = liveData && "portfolioHighlights" in liveData ? liveData.portfolioHighlights : null;
  
  const heroData = liveData && "hero" in liveData ? liveData.hero : undefined;
  const technologyData = liveData && "technology" in liveData ? liveData.technology : undefined;
  const offerData = liveData && "offer" in liveData ? liveData.offer : undefined;
  const howWeWorkData = liveData && "howWeWork" in liveData ? liveData.howWeWork : undefined;
  const faqData = liveData && "faq" in liveData ? liveData.faq : undefined;
  const contactData = liveData && "contact" in liveData ? liveData.contact : undefined;
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header data={headerValues} locale={locale} />
      <div className="min-h-screen pt-20 relative overflow-hidden">
        <Background />
        <main className="relative z-10">
          {heroData ? <Hero data={heroData as never} /> : null}
          {technologyData ? <Technology data={technologyData as never} /> : null}
          {offerData ? (
            <div id="offer-section">
              <Offer data={offerData as never} />
            </div>
          ) : null}
          {howWeWorkData ? <HowWeWork data={howWeWorkData as never} /> : null}
          {portfolioHighlightsData && portfolioHighlightsData.title && portfolioHighlightsData.description ? (
            <PortfolioHighlights mode="tina" tinaData={portfolioHighlightsData} />
          ) : null}
          {faqData ? <FAQ data={faqData as never} /> : null}
          {contactData ? <Contact data={contactData as never} /> : null}
        </main>
      </div>
      <Footer data={footerValues} locale={locale} strictValidation={false} />
    </NextIntlClientProvider>
  );
}
