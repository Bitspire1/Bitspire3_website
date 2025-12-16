'use client';

import React, { ReactNode } from 'react';

interface TinaEditProviderProps {
  children: ReactNode;
}

/**
 * TinaEditProvider - włącza tryb edycji i łączy edytor ze stroną
 * Obsługuje stan edycji i konfiguruje CMS dla live preview
 * 
 * W TinaCMS v3.x tryb edycji jest włączony automatycznie przez useTina hook
 * i nie wymaga oddzielnego providera - wystarczy załadować dane przez client
 */
export const TinaEditProvider: React.FC<TinaEditProviderProps> = ({ children }) => {
  // W TinaCMS v3.x nie potrzebujemy manualnie tworzyć CMS instance
  // useTina hook w admin page automatycznie włącza tryb edycji
  // gdy wykryje że jest w kontekście TinaCMS
  return <>{children}</>;
};

export default TinaEditProvider;
