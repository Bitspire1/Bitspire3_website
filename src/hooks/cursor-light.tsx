'use client';

import { createContext, useContext, ReactNode } from 'react';

const CursorLightContext = createContext<undefined>(undefined);

export function CursorLightProvider({ children }: { children: ReactNode }) {
  // Simplified provider - you can add cursor light effects here if needed
  return (
    <CursorLightContext.Provider value={undefined}>
      {children}
    </CursorLightContext.Provider>
  );
}

export function useCursorLight() {
  return useContext(CursorLightContext);
}

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

// Simple wrapper component used for hover/card effects in the UI.
// Restores the originally-expected export `CursorLightCard` used by Offer.
export function CursorLightCard({ children, className, onClick }: CardProps) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
