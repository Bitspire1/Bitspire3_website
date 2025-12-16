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
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden" data-tina-field={tinaField(data, 'hero')}>
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Text */}
          <div className="text-center lg:text-left relative z-20">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/20 backdrop-blur-md shadow-lg shadow-blue-500/10">
              <span className="text-blue-300 text-sm font-bold tracking-wide uppercase drop-shadow-sm">Next-Gen Development</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
              <span data-tina-field={tinaField(data, 'title')}>
                {data?.title || 'Nowoczesne'}
              </span>
              {' '}
              <span className="text-gradient block mt-2" data-tina-field={tinaField(data, 'titleAccent')}>
                {data?.titleAccent || 'rozwiązania IT'}
              </span>
              <span data-tina-field={tinaField(data, 'titleEnd')}>
                {data?.titleEnd || 'dla Twojego biznesu'}
              </span>
            </h1>
            
            <p 
              className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {data?.subtitle || 'Tworzymy profesjonalne strony internetowe, aplikacje web i systemy, które przyciągają klientów i zwiększają Twoje zyski.'}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <CTAButton />
              <BriefButton />
            </div>
          </div>

          {/* Right Side - Visuals */}
          <div className="absolute inset-0 z-0 opacity-20 lg:opacity-100 lg:relative lg:inset-auto lg:z-auto lg:h-[600px] flex items-center justify-center pointer-events-none lg:pointer-events-auto">
            {data?.image ? (
              <div className="relative w-full h-full animate-float">
                 <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />
                 <Image
                   src={data.image}
                   alt="Hero illustration"
                   fill
                   className="object-contain drop-shadow-2xl"
                   data-tina-field={tinaField(data, 'image')}
                   priority
                 />
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Abstract Tech Orb Representation */}
                <div className="absolute w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] animate-pulse-glow" />
                <div className="relative w-[400px] h-[400px] border border-blue-500/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]" />
                </div>
                <div className="absolute w-[300px] h-[300px] border border-cyan-500/30 rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]" />
                </div>
                
                <div className="absolute z-10 glass-panel p-8 rounded-2xl max-w-xs animate-float">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-bold">High Performance</div>
                        <div className="text-slate-400 text-sm">Optimized for speed</div>
                      </div>
                   </div>
                   <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-blue-500 to-cyan-500 w-[90%]" />
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
