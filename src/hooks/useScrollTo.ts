'use client';

import { useCallback } from 'react';

export function useScrollTo(targetId: string) {
  return useCallback(() => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [targetId]);
}
