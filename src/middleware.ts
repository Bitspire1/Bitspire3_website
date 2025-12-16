import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'pl',
  
  // Don't redirect if locale is in pathname
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames, exclude static files and API routes
  // Admin routes need locale handling too, so we DON'T exclude them
  matcher: [
    '/((?!api|_next|_vercel|favicon.ico|.*\\.[^/]+$).*)',
  ]
};
