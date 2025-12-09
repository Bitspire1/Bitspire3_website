'use client';

import { useTina } from 'tinacms/dist/react';
import { Background } from "@/components/layout/background";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { PortfolioHighlights } from "@/components/sections/Portfolio/PortfolioHighlights";
import { getPageData, getPortfolioProjects } from "@/lib/content/loader";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageData = await getPageData(locale, "home", "pages");
  const portfolioProjects = await getPortfolioProjects(locale);

  const { data } = useTina({
    query: `query GetPage($relativePath: String!) { pages(relativePath: $relativePath) { _sys { relativePath } _values } }`,
    variables: { relativePath: `${locale}/home.mdx` },
    data: { pages: { _sys: { relativePath: `${locale}/home.mdx` }, _values: pageData } }
  });

  const liveData = (data.pages as any)?._values ?? pageData;
  const heroData = liveData && "hero" in liveData ? liveData.hero : undefined;
  const technologyData = liveData && "technology" in liveData ? liveData.technology : undefined;
  const offerData = liveData && "offer" in liveData ? liveData.offer : undefined;
  const howWeWorkData = liveData && "howWeWork" in liveData ? liveData.howWeWork : undefined;
  const faqData = liveData && "faq" in liveData ? liveData.faq : undefined;
  const contactData = liveData && "contact" in liveData ? liveData.contact : undefined;

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
          <PortfolioHighlights mode="direct" locale={locale} projects={portfolioProjects as any} />
        ) : null}
        {faqData ? <FAQ data={faqData as never} /> : null}
        {contactData ? <Contact data={contactData as never} /> : null}
      </main>
    </div>
  );
}
