'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components that use browser APIs
export const Technology = dynamic(() => import('@/components/sections/Technology'), {
  loading: () => <div className="py-12" />,
  ssr: false,
});

export const Offer = dynamic(() => import('@/components/sections/Offer'), {
  loading: () => <div className="py-12" />,
  ssr: false,
});

export const HowWeWork = dynamic(() => import('@/components/sections/HowWeWork'), {
  loading: () => <div className="py-12" />,
});

export const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="py-12" />,
});

export const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="py-12" />,
});
