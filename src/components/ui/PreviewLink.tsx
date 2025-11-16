'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface PreviewLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function PreviewLink({ href, children, className, onClick }: PreviewLinkProps) {
  const pathname = usePathname();
  const isPreview = pathname?.startsWith('/admin/preview');

  const handleClick = () => {
    if (onClick) onClick();
  };

  // If we're in preview mode, transform the link
  const transformedHref = React.useMemo(() => {
    if (!isPreview) return href;

    const localeMatch = pathname?.match(/\/admin\/preview\/([^\/]+)/);
    const locale = localeMatch?.[1] || 'pl';

    if (href === '/' || href === `/${locale}` || href === `/${locale}/`) {
      return `/admin/preview/${locale}/home`;
    }

    // Remove leading locale and trailing slash
    const cleanHref = href.replace(/^\/(pl|en)/, '').replace(/\/$/, '');
    
    if (cleanHref === '/portfolio') return `/admin/preview/${locale}/portfolio`;
    if (cleanHref === '/polityka-prywatnosci') return `/admin/preview/${locale}/polityka-prywatnosci`;
    if (cleanHref === '/polityka-cookies') return `/admin/preview/${locale}/polityka-cookies`;
    if (cleanHref === '/regulamin') return `/admin/preview/${locale}/regulamin`;
    if (cleanHref === '/privacy-policy') return `/admin/preview/${locale}/privacy-policy`;
    if (cleanHref === '/cookies-policy') return `/admin/preview/${locale}/cookies-policy`;
    if (cleanHref === '/terms') return `/admin/preview/${locale}/terms`;

    if (href.startsWith('/#') || href.startsWith(`/${locale}#`)) {
      const hash = href.split('#')[1];
      return `/admin/preview/${locale}/home#${hash}`;
    }

    return href;
  }, [href, isPreview, pathname]);

  return (
    <Link href={transformedHref} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
