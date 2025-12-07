'use client';

import React from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTA__button';
import { BriefButton } from '@/components/ui/brief_button';
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
  if (!data) {
    throw new Error('Hero content missing from TinaCMS');
  }

  const { title, titleAccent, titleEnd, subtitle, image } = data;

  if (!title || !titleAccent || !titleEnd || !subtitle) {
    throw new Error('Hero fields missing in Tina content');
  }

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
                {title}
              </span>
              {' '}
              <span className="text-gradient block mt-2" data-tina-field={tinaField(data, 'titleAccent')}>
                {titleAccent}
              </span>
              <span data-tina-field={tinaField(data, 'titleEnd')}>
                {titleEnd}
              </span>
            </h1>
            
            <p 
              className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {subtitle}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <CTAButton />
              <BriefButton />
            </div>
          </div>

          {/* Right Side - Visuals */}
          <div className="absolute inset-0 z-0 opacity-20 lg:opacity-100 lg:relative lg:inset-auto lg:z-auto lg:h-[600px] flex items-center justify-center pointer-events-none lg:pointer-events-auto">
            {image ? (
              <div className="relative w-full h-full animate-float">
                 <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />
                 <Image
                   src={image}
                   alt="Hero illustration"
                   fill
                   className="object-contain drop-shadow-2xl"
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
