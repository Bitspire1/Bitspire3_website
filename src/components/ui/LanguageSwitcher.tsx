'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/request';
import { isInPreviewMode, getPathFromPreviewPathname, buildPreviewPath } from '@/lib/preview';

const flagMap = {
  pl: '/flags/pl.svg',
  en: '/flags/gb.svg',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Check if we're in preview mode
    if (isInPreviewMode(pathname)) {
      // Extract current path from pathname: /admin/pl/home -> home
      const currentPath = getPathFromPreviewPathname(pathname);
      
      // Use Next.js router to change only the locale, keeping the path
      router.push(buildPreviewPath(newLocale, currentPath));
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
  };

  const otherLocale = locale === 'pl' ? 'en' : 'pl';

  return (
    <button
      onClick={() => switchLanguage(otherLocale)}
      className="group relative w-10 h-10 rounded-lg overflow-hidden border-2 border-slate-600/40 hover:border-blue-400/60 bg-slate-800/40 hover:bg-slate-700/60 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110"
      aria-label={`Switch to ${otherLocale === 'pl' ? 'Polski' : 'English'}`}
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
