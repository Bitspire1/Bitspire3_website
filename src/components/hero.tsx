import React from "react";
import Image from "next/image";
import { CTAButton } from "@/assets/CTA__button";
import { BriefButton } from "@/assets/brief_button";

export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Lewa strona - tekst i przyciski */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Nowoczesne 
              <span className="text-blue-400 block">rozwiązania IT</span>
              dla Twojego biznesu
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Tworzymy profesjonalne strony internetowe, aplikacje web i systemy, 
              które przyciągają klientów i zwiększają Twoje zyski.
            </p>
            
            {/* Przyciski */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton />
              <BriefButton />
            </div>
          </div>
          
          {/* Prawa strona - obraz */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/laptop.svg"
                alt="Laptop z nowoczesnym interfejsem"
                width={600}
                height={400}
                className="w-full max-w-lg lg:max-w-xl"
                priority
              />
              
              {/* Dodatkowy efekt świetlny za laptopem */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
