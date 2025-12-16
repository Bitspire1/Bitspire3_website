'use client';

import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { CursorLightCard } from '../../hooks/cursor-light';

interface ProcessStep {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
  duration?: string | null;
  [key: string]: unknown;
}

interface HowWeWorkProps {
  data?: {
    title?: string | null;
    titleAccent?: string | null;
    subtitle?: string | null;
    steps?: ProcessStep[] | null;
    ctaTitle?: string | null;
    ctaDescription?: string | null;
    ctaButton?: string | null;
  };
}

const HowWeWork: React.FC<HowWeWorkProps> = ({ data }) => {
  // Graceful handling for editing mode
  const title = data?.title || 'Enter title...';
  const titleAccent = data?.titleAccent || '';
  const subtitle = data?.subtitle || 'Enter description...';
  const steps = data?.steps?.filter(step => step !== null) || [];
  const ctaTitle = data?.ctaTitle || 'Ready to start?';
  const ctaDescription = data?.ctaDescription || 'Begin your project today';
  const ctaButton = data?.ctaButton || 'Start Now';

  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case 'clipboard':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        );
      case 'design':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        );
      case 'code':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        );
      case 'test':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case 'rocket':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        );
      case 'support':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        );
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="how-we-work">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-950/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase font-mono">PROCESS</span>
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

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-cyan-500 to-blue-500 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div className="flex-1 w-full">
                  <CursorLightCard className="group relative rounded-xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
                    
                    <div className="p-8">
                      <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                          {/* Icon */}
                          <div className="w-16 h-16 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500">
                            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              {getIcon(step?.icon)}
                            </svg>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-mono" data-tina-field={tinaField(step, 'title')}>
                                {step?.title || 'Enter title...'}
                              </h3>
                              {step?.duration && (
                                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium" data-tina-field={tinaField(step, 'duration')}>
                                  {step.duration}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-400 leading-relaxed text-base" data-tina-field={tinaField(step, 'description')}>
                              {step?.description || 'Enter description...'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CursorLightCard>
                </div>

                {/* Step number */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/50 relative z-10">
                    {index + 1}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 animate-pulse-slow opacity-50 blur-md" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <CursorLightCard className="group relative rounded-xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm max-w-2xl mx-auto">
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
            
            <div className="p-8">
              <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4" data-tina-field={tinaField(data, 'ctaTitle')}>
                  {ctaTitle}
                </h3>
                <p className="text-slate-400 mb-6 text-lg" data-tina-field={tinaField(data, 'ctaDescription')}>
                  {ctaDescription}
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
          </CursorLightCard>
        </div>
      </div>
    </section>
  );
};

export { HowWeWork };
export default HowWeWork;
