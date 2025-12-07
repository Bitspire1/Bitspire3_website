'use client';

import React, { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { CursorLightCard } from '../../hooks/cursor-light';

interface FAQItem {
  question?: string | null;
  answer?: string | null;
  [key: string]: unknown;
}

interface FAQProps {
  data?: {
    title?: string | null;
    description?: string | null;
    items?: FAQItem[] | null;
    ctaQuestion?: string | null;
    ctaButton?: string | null;
  };
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!data) {
    throw new Error('FAQ content missing from TinaCMS');
  }

  if (!data.items || data.items.length === 0) {
    throw new Error('FAQ items missing in Tina content');
  }

  if (!data.title || !data.description) {
    throw new Error('FAQ title/description missing in Tina content');
  }

  const items = data.items;

  items.forEach((item, index) => {
    if (!item?.question || !item?.answer) {
      throw new Error(`FAQ item ${index} is missing question or answer in Tina content`);
    }
  });

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 bg-slate-900/40 relative overflow-hidden" id="faq">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500 mb-4 mx-auto"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" data-tina-field={tinaField(data, 'title')}>
            {data.title}
          </h2>
          <p className="text-slate-300 text-base" data-tina-field={tinaField(data, 'description')}>
            {data.description}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <CursorLightCard
              key={index}
              className="relative backdrop-blur-sm bg-slate-800/30 border border-slate-700/40 rounded-xl overflow-hidden hover:border-blue-500/50 hover:bg-slate-800/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4"
                >
                  <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors pr-4" data-tina-field={tinaField(item, 'question')}>
                    {item?.question}
                  </span>
                  
                  <div className={`shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'rotate-180 bg-blue-500/20' : ''}`}>
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="w-full h-px bg-linear-to-r from-transparent via-slate-700 to-transparent mb-4" />
                    <p className="text-slate-400 leading-relaxed" data-tina-field={tinaField(item, 'answer')}>
                      {item?.answer}
                    </p>
                  </div>
                </div>
              </div>
            </CursorLightCard>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4" data-tina-field={tinaField(data, 'ctaQuestion')}>
            {data?.ctaQuestion}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 btn-tech-primary px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
            data-tina-field={tinaField(data, 'ctaButton')}
          >
            {data?.ctaButton}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
