'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/request';

const flagMap = {
  pl: '/flags/pl.svg',
  en: '/flags/gb.svg',
};

interface LanguageSwitcherProps {
  labels?: {
    switchToPolish?: string;
    switchToEnglish?: string;
  };
}

export function LanguageSwitcher({ labels }: LanguageSwitcherProps = {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Determine current locale from pathname for admin mode, otherwise use useLocale
  const getCurrentLocale = (): string => {
    const isAdmin = pathname.startsWith('/admin/');
    
    if (isAdmin) {
      // Extract locale from pathname: /admin/pl/home -> 'pl'
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length >= 2) {
        return segments[1]; // admin, [locale], path...
      }
    }
    
    return locale;
  };

  const currentLocale = getCurrentLocale();
  const otherLocale = currentLocale === 'pl' ? 'en' : 'pl';

  const switchLanguage = (newLocale: string) => {
    // Check if we're in TinaCMS admin mode
    const isAdmin = pathname.startsWith('/admin/');
    
    if (isAdmin) {
      // Extract current path structure: /admin/pl/home -> ['admin', 'pl', 'home']
      const segments = pathname.split('/').filter(Boolean);
      
      // segments[0] = 'admin', segments[1] = current locale, segments[2+] = path
      const pathSegments = segments.slice(2); // everything after locale
      const newPath = `/admin/${newLocale}/${pathSegments.join('/')}`;
      
      router.push(newPath);
      router.refresh();
      return;
    }
    
    // Normal mode (production): Remove current locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const isLocaleInPath = locales.some(loc => loc === segments[0]);
    
    const pathWithoutLocale = isLocaleInPath 
      ? '/' + segments.slice(1).join('/')
      : pathname;

    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    router.refresh();
  };

  const ariaLabel = otherLocale === 'pl' 
    ? (labels?.switchToPolish || 'Switch to Polski')
    : (labels?.switchToEnglish || 'Switch to English');

  return (
    <button
      onClick={() => switchLanguage(otherLocale)}
      className="group relative w-10 h-10 rounded-lg overflow-hidden border-2 border-slate-600/40 hover:border-blue-400/60 bg-slate-800/40 hover:bg-slate-700/60 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110"
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Image
        src={flagMap[otherLocale as keyof typeof flagMap]}
        alt={otherLocale === 'pl' ? 'Polski' : 'English'}
        width={24}
        height={24}
        className="w-6 h-6 object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300"
      />
    </button>
  );
}
