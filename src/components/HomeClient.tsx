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
  const heroData = data && 'hero' in data ? data.hero : undefined;
  const technologyData = data && 'technology' in data ? data.technology : undefined;
  const offerData = data && 'offer' in data ? data.offer : undefined;
  const howWeWorkData = data && 'howWeWork' in data ? data.howWeWork : undefined;
  const faqData = data && 'faq' in data ? data.faq : undefined;
  const contactData = data && 'contact' in data ? data.contact : undefined;

  const hasSections = Boolean(heroData || technologyData || offerData || howWeWorkData || faqData || contactData);
  const showMessage = !data || !hasSections;

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <Background />
      <main className="relative z-10">
        {showMessage ? (
          <div className="flex items-center justify-center text-center min-h-[40vh]">
            <p className="text-gray-400">
              {!data ? 'Home page content unavailable' : 'Page sections unavailable'}
            </p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}
