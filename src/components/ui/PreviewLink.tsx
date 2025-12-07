'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { isInPreviewMode, getLocaleFromPreviewPath, buildPreviewPath } from '@/lib/preview';

interface PreviewLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function PreviewLink({ href, children, className, onClick }: PreviewLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    
    // If in preview mode, use Next.js router
    if (isInPreviewMode(pathname)) {
      e.preventDefault();
      
      const locale = getLocaleFromPreviewPath(pathname);
      
      // Remove leading locale and trailing slash
      const cleanHref = href.replace(/^\/(pl|en)/, '').replace(/\/$/, '');
      
      let newPath = 'home';
      
      // Home page
      if (href === '/' || href === `/${locale}` || href === `/${locale}/`) {
        newPath = 'home';
      }
      // Portfolio listing - use portfolio.mdx page
      else if (cleanHref === '/portfolio') {
        newPath = 'portfolio';
      }
      // Portfolio post
      else if (cleanHref.startsWith('/portfolio/')) {
        newPath = cleanHref.substring(1); // portfolio/slug
      }
      // Blog listing - use blog.mdx page
      else if (cleanHref === '/blog') {
        newPath = 'blog';
      }
      // Blog post
      else if (cleanHref.startsWith('/blog/')) {
        newPath = cleanHref.substring(1); // blog/slug
      }
      // Other pages
      else if (cleanHref) {
        newPath = cleanHref.substring(1) || 'home';
      }
      
      // Use Next.js router to navigate within preview
      router.push(buildPreviewPath(locale, newPath));
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
