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
