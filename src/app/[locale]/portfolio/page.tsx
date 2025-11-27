import React from "react";
import client from "@tina/__generated__/client";
import { Background } from "@/components/background";
import { PortfolioListClient } from "@/components/portfolio/PortfolioListClient";

export const metadata = {
  title: "Portfolio",
  description: "Wybrane realizacje i projekty tworzone przez Bitspire.",
};

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  try {
    // Fetch all portfolio posts for the current locale
    const portfolioConnection = await client.queries.portfolioConnection();
    
    // Filter posts by locale and remove null/undefined
    const posts = (portfolioConnection.data.portfolioConnection.edges || [])
      .map(edge => edge?.node)
      .filter((node): node is NonNullable<typeof node> => 
        node !== null && node !== undefined && node._sys.relativePath.startsWith(`${locale}/`)
      )
      .sort((a, b) => {
        // Sort by date, newest first
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });

    return (
      <div className="min-h-screen pt-24 relative overflow-hidden">
        <Background />
        <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
          <header className="mb-14 text-center">
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5">
              <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                {locale === 'pl' ? 'Nasze prace' : 'Our Work'}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-white">{locale === 'pl' ? 'Nasze ' : 'Our '}</span>
              <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {locale === 'pl' 
                ? 'Poniżej znajdziesz przykłady typów projektów jakie budujemy. Każdy z nich skupia się na wydajności, skalowalności oraz realnej wartości dla biznesu.'
                : 'Below you will find examples of the types of projects we build. Each focuses on performance, scalability, and real business value.'}
            </p>
          </header>

          <PortfolioListClient posts={posts} locale={locale} />

          {posts.length > 0 && (
            <div className="mt-20 text-center">
              <p className="text-slate-400 text-sm">
                {locale === 'pl' 
                  ? 'Chcesz zobaczyć coś konkretnego? Napisz do nas – przygotujemy spersonalizowane case study.'
                  : 'Want to see something specific? Contact us – we\'ll prepare a personalized case study.'}
              </p>
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading portfolio:', error);
    return (
      <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
        <Background />
        <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
          <p className="text-slate-400 text-center">
            {locale === 'pl' ? 'Wystąpił błąd podczas ładowania portfolio.' : 'An error occurred while loading the portfolio.'}
          </p>
        </main>
      </div>
    );
  }
}

