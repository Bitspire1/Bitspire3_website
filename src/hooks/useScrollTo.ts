'use client';

/**
 * Hook for smooth scrolling to an element by ID
 * @param elementId - The ID of the element to scroll to
 * @returns A callback function that performs the scroll
 */
export const useScrollTo = (elementId: string) => {
  return () => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
};
