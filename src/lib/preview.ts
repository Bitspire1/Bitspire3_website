/**
 * Utility functions for preview/admin mode path handling
 */

export function isInPreviewMode(pathname: string): boolean {
  return pathname.startsWith('/admin');
}

export function getPathFromPreviewPathname(pathname: string): string {
  // Extract path from /admin/{locale}/{path}
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'admin' && segments.length > 2) {
    return segments.slice(2).join('/');
  }
  return segments[segments.length - 1] || 'home';
}

export function buildPreviewPath(locale: string, path: string): string {
  return `/admin/${locale}/${path}`;
}
