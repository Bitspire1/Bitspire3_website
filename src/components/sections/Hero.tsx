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
  return (
    <section className="relative py-20 lg:py-32" data-tina-field={tinaField(data, 'hero')}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Lewa strona - tekst i przyciski */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span data-tina-field={tinaField(data, 'title')}>
                {data?.title || 'Nowoczesne'}
              </span>
              {' '}
              <span className="text-blue-400 block" data-tina-field={tinaField(data, 'titleAccent')}>
                {data?.titleAccent || 'rozwiązania IT'}
              </span>
              <span data-tina-field={tinaField(data, 'titleEnd')}>
                {data?.titleEnd || 'dla Twojego biznesu'}
              </span>
            </h1>
            
            <p 
              className="text-xl text-gray-300 mb-8 max-w-2xl"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {data?.subtitle || 'Tworzymy profesjonalne strony internetowe, aplikacje web i systemy, które przyciągają klientów i zwiększają Twoje zyski.'}
            </p>
            
            {/* Przyciski */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton />
              <BriefButton />
            </div>
          </div>

          {/* Prawa strona - obrazek */}
          <div className="relative h-[400px] lg:h-[500px]">
            {data?.image ? (
              <Image
                src={data.image}
                alt="Hero illustration"
                fill
                className="object-contain"
                data-tina-field={tinaField(data, 'image')}
              />
            ) : (
              <Image
                src="/Ilustration.svg"
                alt="Ilustracja nowoczesnych rozwiązań IT - grafika przedstawiająca technologie webowe"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
