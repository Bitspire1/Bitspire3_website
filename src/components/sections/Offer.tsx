'use client';

import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { PreviewLink } from '../ui/PreviewLink';
import { CursorLightCard } from '@/hooks/cursor-light';

interface Service {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
  features?: (string | null)[] | null;
  link?: string | null;
  buttonText?: string | null;
  [key: string]: unknown;
}

interface OfferData {
  title?: string | null;
  titleAccent?: string | null;
  subtitle?: string | null;
  sectionLabel?: string | null;
  services?: (Service | null)[] | null;
  [key: string]: unknown;
}

const Offer: React.FC<{ data?: OfferData }> = ({ data }) => {
  // Graceful handling for editing mode
  const sectionLabel = data?.sectionLabel || 'SERVICES';
  const title = data?.title || 'Enter title...';
  const titleAccent = data?.titleAccent || 'Enter accent...';
  const subtitle = data?.subtitle || 'Enter subtitle...';
  const services = data?.services?.filter(s => s !== null) || [];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      const targetId = link.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" data-tina-field={tinaField(data, 'offer')}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-950/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase font-mono" data-tina-field={tinaField(data, 'sectionLabel')}>
              {sectionLabel}
            </span>
          </div>
          <h2 
            className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            <span data-tina-field={tinaField(data, 'title')}>{title}</span>{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400" data-tina-field={tinaField(data, 'titleAccent')}>
              {titleAccent}
            </span>
          </h2>
          <p 
            className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
            data-tina-field={tinaField(data, 'subtitle')}
          >
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            if (!service) return null;
            
            const link = service.link as string;
            const buttonText = service.buttonText as string;

            return (
              <CursorLightCard
                key={index}
                className="group relative rounded-xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm"
              >
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-600 group-hover:border-blue-500 transition-colors duration-300" />

                <div
                  className="h-full flex flex-col p-8"
                  data-tina-field={tinaField(service)}
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-6 relative inline-block">
                      <div className="w-16 h-16 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center text-3xl group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500">
                        {service.icon || '⚡'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-900 border-t border-l border-slate-800" />
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors font-mono"
                      data-tina-field={tinaField(service, 'title')}
                    >
                      {service.title || 'Enter service title...'}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="text-slate-400 text-sm mb-6 grow leading-relaxed"
                      data-tina-field={tinaField(service, 'description')}
                    >
                      {service.description || 'Enter service description...'}
                    </p>

                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <ul className="mb-6 space-y-3">
                        {service.features.map((feature, idx) => 
                          feature ? (
                            <li key={idx} className="flex items-start text-xs text-slate-300 group/item">
                              <span className="mr-2 mt-1 w-1 h-1 rounded-full bg-blue-500 group-hover/item:shadow-[0_0_5px_rgba(59,130,246,0.8)] transition-shadow" />
                              <span data-tina-field={tinaField(service, `features.${idx}`)}>{feature}</span>
                            </li>
                          ) : null
                        )}
                      </ul>
                    )}
                    
                    {/* CTA Button */}
                    <PreviewLink
                      href={link || '#'}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, link || '#')}
                      className="mt-auto w-full py-3 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] text-sm font-medium uppercase tracking-wider"
                    >
                      <span data-tina-field={tinaField(service, 'buttonText')}>
                        {buttonText || 'Initialize'}
                      </span>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </PreviewLink>
                  </div>
                </div>
              </CursorLightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offer;
