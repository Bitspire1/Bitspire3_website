'use client';

import React from 'react';
import { Background } from '@/components/background';
import { Hero } from '@/components/sections/Hero';
import { Technology, Offer, HowWeWork, FAQ, Contact } from '@/components/DynamicSections';
import { PortfolioHighlights } from '@/components/portfolio/PortfolioHighlights';

interface HomeClientProps {
  data: Partial<Record<string, unknown>> | null;
  portfolioProjects?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    imageAlt: string;
    category: string;
    date: string;
  }>;
  locale: string;
}

export function HomeClient({ data, portfolioProjects = [], locale }: HomeClientProps) {
  // Graceful fallback for missing data
  if (!data) {
    return (
      <div className="min-h-screen pt-20 relative overflow-hidden flex items-center justify-center">
        <Background />
        <main className="relative z-10 text-center">
          <p className="text-gray-400">Home page content unavailable</p>
        </main>
      </div>
    );
  }

  const heroData = 'hero' in data ? data.hero : undefined;
  const technologyData = 'technology' in data ? data.technology : undefined;
  const offerData = 'offer' in data ? data.offer : undefined;
  const howWeWorkData = 'howWeWork' in data ? data.howWeWork : undefined;
  const faqData = 'faq' in data ? data.faq : undefined;
  const contactData = 'contact' in data ? data.contact : undefined;

  const hasSections = Boolean(heroData || technologyData || offerData || howWeWorkData || faqData || contactData);

  if (!hasSections) {
    return (
      <div className="min-h-screen pt-20 relative overflow-hidden flex items-center justify-center">
        <Background />
        <main className="relative z-10 text-center">
          <p className="text-gray-400">Page sections unavailable</p>
        </main>
      </div>
    );
  }

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
