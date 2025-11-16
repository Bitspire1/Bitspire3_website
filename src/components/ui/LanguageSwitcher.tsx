'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { GlobeIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/request';

const languageNames = {
  pl: 'Polski',
  en: 'English',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const isLocaleInPath = locales.some(loc => loc === segments[0]);
    
    const pathWithoutLocale = isLocaleInPath 
      ? '/' + segments.slice(1).join('/')
      : pathname;

    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Switch language"
        >
          <GlobeIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {languageNames[locale as keyof typeof languageNames]}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-slate-800 rounded-lg p-1 shadow-lg border border-slate-700"
          sideOffset={5}
        >
          {locales.map((loc) => (
            <DropdownMenu.Item
              key={loc}
              className={`
                px-3 py-2 text-sm rounded cursor-pointer outline-none
                ${locale === loc 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-slate-700'
                }
              `}
              onSelect={() => switchLanguage(loc)}
            >
              {languageNames[loc as keyof typeof languageNames]}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
