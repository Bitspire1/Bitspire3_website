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
    titleAccent?: string | null;
    subtitle?: string | null;
    questions?: FAQItem[] | null;
    ctaQuestion?: string | null;
    ctaButton?: string | null;
  };
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Graceful handling for editing mode
  const title = data?.title || 'Enter title...';
  const titleAccent = data?.titleAccent || '';
  const subtitle = data?.subtitle || 'Enter description...';
  const questions = data?.questions?.filter(item => item !== null) || [];
  const ctaQuestion = data?.ctaQuestion || 'Have more questions?';
  const ctaButton = data?.ctaButton || 'Contact Us';

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="faq">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-950/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase font-mono">FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            <span data-tina-field={tinaField(data, 'title')}>{title}</span>
            {' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-400" data-tina-field={tinaField(data, 'titleAccent')}>
              {titleAccent}
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed" data-tina-field={tinaField(data, 'subtitle')}>
            {subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((item, index) => (
            <CursorLightCard
              key={index}
              className="group relative rounded-xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm"
            >
              {/* Tech Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />

              <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-8 flex items-center justify-between gap-4"
                >
                  <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors pr-4 font-mono" data-tina-field={tinaField(item, 'question')}>
                    {item?.question || 'Enter question...'}
                  </span>

                  <div className={`shrink-0 w-10 h-10 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'rotate-180 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}`}>
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
                  <div className="px-8 pb-8 pt-0">
                    <div className="w-full h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent mb-6" />
                    <p className="text-slate-400 leading-relaxed text-base" data-tina-field={tinaField(item, 'answer')}>
                      {item?.answer || 'Enter answer...'}
                    </p>
                  </div>
                </div>
              </div>
            </CursorLightCard>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6 text-lg" data-tina-field={tinaField(data, 'ctaQuestion')}>
            {ctaQuestion}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 btn-tech-primary px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider"
            data-tina-field={tinaField(data, 'ctaButton')}
          >
            {ctaButton}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export { FAQ };
export default FAQ;
