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
  if (!data) {
    throw new Error('Home page content missing from TinaCMS');
  }

  const heroData = 'hero' in data ? data.hero : undefined;
  const technologyData = 'technology' in data ? data.technology : undefined;
  const offerData = 'offer' in data ? data.offer : undefined;
  const howWeWorkData = 'howWeWork' in data ? data.howWeWork : undefined;
  const faqData = 'faq' in data ? data.faq : undefined;
  const contactData = 'contact' in data ? data.contact : undefined;

  if (!heroData || !technologyData || !offerData || !howWeWorkData || !faqData || !contactData) {
    throw new Error('Home page sections missing in Tina content');
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        {/* Hero + Technology with continuous grid */}
        <div className="bg-grid-pattern">
          <Hero data={heroData as never} />
          <Technology data={technologyData as never} />
        </div>
        
        <div id="offer-section">
          <Offer data={offerData as never} />
        </div>
        
        {/* Jak pracujemy */}
        <HowWeWork data={howWeWorkData as never} />
        
        {/* Portfolio Highlights */}
        {portfolioProjects && portfolioProjects.length > 0 && (
          <PortfolioHighlights mode="direct" locale={locale} projects={portfolioProjects} />
        )}
        
        {/* FAQ */}
        <FAQ data={faqData as never} />
        
        {/* Contact */}
        <Contact data={contactData as never} />
      </main>
    </div>
  );
}
