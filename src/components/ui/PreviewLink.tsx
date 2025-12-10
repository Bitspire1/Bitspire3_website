'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PreviewLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  // Accept a flexible mouse event type to accommodate different callers
  onClick?: (e: React.MouseEvent<any>) => void;
  'aria-label'?: string;
}

export function PreviewLink({ href, children, className, onClick, 'aria-label': ariaLabel }: PreviewLinkProps) {
  const pathname = usePathname();
  
  // Check if we're in admin/preview mode
  const isPreviewMode = pathname?.startsWith('/admin');
  
  // In preview mode, prevent navigation
  const handleClick = (e: React.MouseEvent<any>) => {
    if (isPreviewMode) {
      e.preventDefault();
    }
    onClick?.(e as any);
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
