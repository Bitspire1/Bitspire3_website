'use client';

import React, { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';

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

  const defaultItems: FAQItem[] = [
    {
      question: 'Ile czasu zajmuje realizacja projektu?',
      answer: 'Czas realizacji zależy od skomplikowania projektu. Standardowa strona internetowa to 2-4 tygodnie, sklep internetowy 4-8 tygodni, a bardziej zaawansowane aplikacje mogą wymagać 2-3 miesięcy.'
    },
    {
      question: 'Czy zapewniacie wsparcie po zakończeniu projektu?',
      answer: 'Tak! Oferujemy pakiety wsparcia technicznego, które obejmują aktualizacje, naprawy błędów, optymalizację oraz pomoc w rozwoju strony. Możemy również przeszkolić Twój zespół w zakresie zarządzania treścią.'
    },
    {
      question: 'Jakie technologie wykorzystujecie?',
      answer: 'Pracujemy z najnowszymi technologiami: Next.js, React, TypeScript, Node.js, TailwindCSS. Dla e-commerce wykorzystujemy Shopify, WooCommerce lub rozwiązania custom. Dostosowujemy technologie do potrzeb projektu.'
    },
    {
      question: 'Czy mogę zobaczyć projekt w trakcie realizacji?',
      answer: 'Oczywiście! Podczas realizacji regularnie prezentujemy postępy prac. Otrzymasz dostęp do wersji testowej strony, gdzie będziesz mógł na bieżąco śledzić rozwój projektu i zgłaszać uwagi.'
    },
    {
      question: 'Jakie są koszty realizacji projektu?',
      answer: 'Koszt zależy od zakresu i złożoności projektu. Proste strony wizytówkowe zaczynają się od 3000 zł, sklepy internetowe od 8000 zł. Po wypełnieniu briefu przygotujemy szczegółową wycenę dostosowaną do Twoich potrzeb.'
    },
    {
      question: 'Czy strona będzie responsywna?',
      answer: 'Zdecydowanie tak! Wszystkie nasze projekty są w pełni responsywne i dostosowane do urządzeń mobilnych, tabletów i komputerów. Dbamy o optymalne doświadczenie użytkownika na każdym urządzeniu.'
    }
  ];

  const items = data?.items && data.items.length > 0 ? data.items : defaultItems;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-slate-900/40 relative overflow-hidden" id="faq">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 mb-6 mx-auto"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" data-tina-field={tinaField(data, 'title')}>
            {data?.title || 'Najczęściej zadawane pytania'}
          </h2>
          <p className="text-slate-400 text-lg" data-tina-field={tinaField(data, 'description')}>
            {data?.description || 'Odpowiedzi na pytania, które często nam zadajecie'}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 group"
              >
                <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors pr-4" data-tina-field={tinaField(item, 'question')}>
                  {item?.question || 'Pytanie'}
                </span>
                
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'rotate-180 bg-blue-500/20' : ''}`}>
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
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-4" />
                  <p className="text-slate-400 leading-relaxed" data-tina-field={tinaField(item, 'answer')}>
                    {item?.answer || 'Odpowiedź'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4" data-tina-field={tinaField(data, 'ctaQuestion')}>
            {data?.ctaQuestion || 'Nie znalazłeś odpowiedzi na swoje pytanie?'}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 btn-tech-primary px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
            data-tina-field={tinaField(data, 'ctaButton')}
          >
            {data?.ctaButton || 'Skontaktuj się z nami'}
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
