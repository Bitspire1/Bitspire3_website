'use client';

import React from 'react';
import { tinaField } from 'tinacms/dist/react';

interface PortfolioHighlightsData {
  title?: string | null;
  description?: string | null;
  [key: string]: unknown;
}

export const PortfolioHighlights: React.FC<{ data?: PortfolioHighlightsData }> = ({ data }) => {
  if (!data) {
    throw new Error('Portfolio highlights content missing from TinaCMS');
  }

  if (!data.title || !data.description) {
    throw new Error('Portfolio highlights title/description missing in Tina content');
  }

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              Nasze realizacje
            </span>
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            data-tina-field={tinaField(data, 'title')}
          >
            <span className="text-gradient bg-linear-to-r from-blue-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            data-tina-field={tinaField(data, 'description')}
          >
            {data.description}
          </p>
        </div>

        {/* Placeholder info - projects will be loaded dynamically later */}
        <div className="text-center text-slate-500 text-sm">
          <p>Portfolio projects section - to be implemented with dynamic project loading</p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHighlights;
