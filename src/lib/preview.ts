/**
 * Preview mode utilities for handling routing in Tina CMS preview
 */

/**
 * Check if current pathname is in preview mode
 * @param pathname - Current pathname from usePathname hook
 * @returns True if in preview mode
 */
export const isInPreviewMode = (pathname: string): boolean => {
  return pathname?.startsWith('/admin/preview') ?? false;
};

/**
 * Extract locale from preview pathname
 * @param pathname - Current pathname from usePathname hook
 * @returns Locale code (e.g., 'pl', 'en') or default 'pl'
 */
export const getLocaleFromPreviewPath = (pathname: string): string => {
  const localeMatch = pathname?.match(/\/admin\/preview\/([^\/]+)/);
  return localeMatch?.[1] || 'pl';
};

/**
 * Extract current path from preview pathname
 * @param pathname - Current pathname from usePathname hook
 * @returns Current path (e.g., 'home', 'portfolio/slug', 'blog')
 */
export const getPathFromPreviewPathname = (pathname: string): string => {
  const pathMatch = pathname?.match(/\/admin\/preview\/[^\/]+\/(.+)/);
  return pathMatch?.[1] || 'home';
};

/**
 * Build preview mode path
 * @param locale - Locale code
 * @param path - Path within preview (e.g., 'home', 'portfolio/slug')
 * @returns Full preview path (e.g., '/admin/preview/pl/home')
 */
export const buildPreviewPath = (locale: string, path: string): string => {
  return `/admin/preview/${locale}/${path}`;
};
