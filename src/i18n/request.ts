import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'pl';
  }

  return {
    locale,
    // Messages are loaded from MDX files in content/pages/{locale}/
    // No need for separate messages/*.json files
    messages: {}
  };
});
