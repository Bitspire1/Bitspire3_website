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
      btn-tech-secondary
      px-8 py-4
      inline-flex items-center justify-center gap-3
      rounded-lg
      font-medium text-lg
      ${className}
    `}
    aria-label="Wypełnij brief projektowy - przejdź do formularza brief"
  >
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 7h6M9 11h6M9 15h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    <span>Wypełnij brief</span>
  </button>
);
