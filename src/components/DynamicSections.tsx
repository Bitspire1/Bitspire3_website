'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components that use browser APIs
const TechnologyDynamic = dynamic(() => import('@/components/sections/Technology'), {
  loading: () => <div className="py-12" />,
  ssr: false,
});

const OfferDynamic = dynamic(() => import('@/components/sections/Offer'), {
  loading: () => <div className="py-12" />,
  ssr: false,
});

const HowWeWorkDynamic = dynamic(() => import('@/components/sections/HowWeWork'), {
  loading: () => <div className="py-12" />,
});

const FAQDynamic = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="py-12" />,
});

const ContactDynamic = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="py-12" />,
});

// Export as dynamic for lazy loading (keep for backward compatibility)
export { TechnologyDynamic as Technology, OfferDynamic as Offer, HowWeWorkDynamic as HowWeWork, FAQDynamic as FAQ, ContactDynamic as Contact };

// Also export direct components for non-dynamic usage
export { default as TechnologyDirect } from '@/components/sections/Technology';
export { default as OfferDirect } from '@/components/sections/Offer';
export { default as HowWeWorkDirect } from '@/components/sections/HowWeWork';
export { default as FAQDirect } from '@/components/sections/FAQ';
export { default as ContactDirect } from '@/components/sections/Contact';
