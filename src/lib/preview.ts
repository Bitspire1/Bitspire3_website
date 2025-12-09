export function isInPreviewMode(pathname: string): boolean {
  return pathname.includes('/admin/');
}

export function getLocaleFromPreviewPath(pathname: string): string {
  const match = pathname.match(/\/admin\/([a-z]{2})/);
  return match?.[1] || 'en';
}

export function getPathFromPreviewPathname(pathname: string): string {
  return pathname.replace(/\/admin\/[a-z]{2}/, '').replace(/^\/$/, '/home');
}

export function buildPreviewPath(locale: string, slug: string): string {
  return `/admin/${locale}/${slug}`;
}
