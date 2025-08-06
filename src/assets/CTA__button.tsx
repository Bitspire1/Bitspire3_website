"use client";
import React from "react";

const scrollToContact = () => {
  const contactElement = document.getElementById('contact-section');
  if (contactElement) {
    contactElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export const CTAButton: React.FC<{
  href?: string;
  className?: string;
}> = ({ className = "" }) => (
  <button
    onClick={scrollToContact}
    className={`
      px-10 py-4
      inline-flex items-center justify-center gap-3
      rounded-xl
      bg-blue-600
      text-white font-semibold text-xl
      shadow-lg
      border border-blue-700/60
      transition-all duration-150
      hover:bg-white hover:text-blue-700 hover:shadow-xl hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
      active:scale-98
      ${className}
    `}
    aria-label="Skontaktuj się z nami - przejdź do sekcji kontakt"
  >
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.4.6 7.1 6.1a1 1 0 0 0 1.3 0l7.1-6.1M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>Skontaktuj się z nami</span>
  </button>
);
