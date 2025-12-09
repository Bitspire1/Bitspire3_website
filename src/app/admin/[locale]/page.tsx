'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTina } from 'tinacms/dist/react';
import client from "../../../../tina/__generated__/client";
import { Background } from "@/components/layout/background";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { PortfolioHighlights } from "@/components/sections/Portfolio/PortfolioHighlights";

const query = `query Home($relativePath: String!) {
  pages(relativePath: $relativePath) { _values }
  portfolioConnection(first: 3) {
    edges {
      node {
        _sys { filename relativePath }
        title
        slug
        excerpt
        image
        imageAlt
        category
        date
      }
    }
  }
}`;

export default function Home() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';

  const [initialData, setInitialData] = useState<any>({ pages: { _values: {} }, portfolioConnection: { edges: [] } });

  useEffect(() => {
    async function load() {
      try {
        const portfolioRes = await client.queries.portfolioConnection({ first: 3 });
        setInitialData({
          pages: { _values: {} },
          portfolioConnection: portfolioRes.data.portfolioConnection,
        });
      } catch (e) {
        console.warn('[admin home] portfolio fetch failed', e);
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
  const heroData = liveData && "hero" in liveData ? liveData.hero : undefined;
  const technologyData = liveData && "technology" in liveData ? liveData.technology : undefined;
  const offerData = liveData && "offer" in liveData ? liveData.offer : undefined;
  const howWeWorkData = liveData && "howWeWork" in liveData ? liveData.howWeWork : undefined;
  const faqData = liveData && "faq" in liveData ? liveData.faq : undefined;
  const contactData = liveData && "contact" in liveData ? liveData.contact : undefined;
  const portfolioProjects = (data?.portfolioConnection?.edges || []).map((edge: any) => edge.node);

  return (
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
        {portfolioProjects && portfolioProjects.length > 0 ? (
          <PortfolioHighlights mode="direct" locale={locale} projects={portfolioProjects} />
        ) : null}
        {faqData ? <FAQ data={faqData as never} /> : null}
        {contactData ? <Contact data={contactData as never} /> : null}
      </main>
    </div>
  );
}
