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
  // Match only internationalized pathnames, exclude static files, API routes, and admin
  // Admin has its own routing and TinaCMS interface
  matcher: [
    '/((?!api|_next|_vercel|admin|favicon.ico|.*\\.[^/]+$).*)',
  ]
};
