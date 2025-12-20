'use client';

import React from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/buttons/CTA__button';
import { BriefButton } from '@/components/ui/buttons/brief_button';
import { tinaField } from 'tinacms/dist/react';

interface HeroData {
  title?: string | null;
  titleAccent?: string | null;
  titleEnd?: string | null;
  subtitle?: string | null;
  ctaButton?: string | null;
  briefButton?: string | null;
  image?: string | null;
  [key: string]: unknown; // For TinaCMS fields
}

export const Hero: React.FC<{ data?: HeroData }> = ({ data }) => {
  // Graceful handling for editing mode - don't throw errors when fields are empty
  const title = data?.title || '';
  const titleAccent = data?.titleAccent || '';
  const titleEnd = data?.titleEnd || '';
  const subtitle = data?.subtitle || '';
  const image = data?.image || null;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Cybernetic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Spotlight Effect - Enhanced */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Text */}
          <div className="text-center lg:text-left relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-200 text-xs font-bold tracking-widest uppercase drop-shadow-sm font-mono">System Online</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
              <span data-tina-field={tinaField(data, 'title')} className="relative inline-block">
                {title || 'Nowoczesne'}
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
              {' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#60a5fa,#22d3ee,#60a5fa)] bg-size-[200%] animate-[gradient-x_3s_ease_infinite] block mt-2 pb-2" data-tina-field={tinaField(data, 'titleAccent')}>
                {titleAccent || 'rozwiązania IT'}
              </span>
              <span data-tina-field={tinaField(data, 'titleEnd')}>
                {titleEnd || 'dla Twojego biznesu'}
              </span>
            </h1>
            
            <p 
              className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed border-l-2 border-blue-500/30 pl-6"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {subtitle || 'Tworzymy profesjonalne strony internetowe, aplikacje web i systemy, które przyciągają klientów i zwiększają Twoje zyski.'}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <CTAButton />
              <BriefButton />
            </div>
          </div>

          {/* Right Side - Visuals */}
          <div className="relative lg:h-150 flex items-center justify-center perspective-[1000px]">
            {image ? (
              <div className="relative w-full h-full animate-float transform-3d">
                 {/* Cybernetic Rings */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
                 
                 <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(59,130,246,0.1),rgba(6,182,212,0.1))] rounded-3xl blur-3xl -z-10" />
                 <Image
                   src={image}
                   alt="Hero illustration"
                   fill
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   className="object-contain filter-[drop-shadow(0_0_50px_rgba(59,130,246,0.3))]"
                   data-tina-field={tinaField(data, 'image')}
                   priority
                 />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
