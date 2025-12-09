'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTina } from 'tinacms/dist/react';
import client from "../../../../../tina/__generated__/client";
import { Background } from "@/components/layout/background";
import { PortfolioListClient } from "@/components/sections/Portfolio/PortfolioListClient";

const query = `query GetPortfolio { portfolioConnection { edges { node { _sys { filename relativePath } title slug excerpt image imageAlt category date } } } }`;

export default function PortfolioPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';

  const [initialData, setInitialData] = useState<any>({ portfolioConnection: { edges: [] } });

  useEffect(() => {
    async function load() {
      try {
        const res = await client.queries.portfolioConnection();
        setInitialData({ portfolioConnection: res.data.portfolioConnection });
      } catch (e) {
        console.warn('[admin portfolio] fetch failed', e);
      }
    }
    load();
  }, [locale]);

  const { data } = useTina({
    query,
    variables: {},
    data: initialData,
  });

  const liveData = (data.portfolioConnection as any)?.edges || [];

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

        <PortfolioListClient posts={liveData.map((edge: any) => edge.node)} locale={locale} />

        {liveData.length > 0 && (
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
}
