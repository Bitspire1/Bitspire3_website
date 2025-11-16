"use client";
import React from "react";

const scrollToBrief = () => {
  const briefElement = document.getElementById('brief-section');
  if (briefElement) {
    briefElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export const BriefButton: React.FC<{
  href?: string;
  className?: string;
}> = ({ className = "" }) => (
  <button
    onClick={scrollToBrief}
    className={`
      px-10 py-4
      inline-flex items-center justify-center gap-3
      rounded-xl
      bg-neutral-100
      text-blue-700 font-semibold text-xl
      shadow-lg
      border border-neutral-200
      transition-all duration-150
      hover:bg-blue-700 hover:text-neutral-100 hover:shadow-xl hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
      active:scale-98
      ${className}
    `}
    aria-label="Wypełnij brief projektowy - przejdź do formularza brief"
  >
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 7h6M9 11h6M9 15h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    <span>Wypełnij brief</span>
  </button>
);
