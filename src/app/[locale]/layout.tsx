import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { locales, type Locale } from '@/i18n/request';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CursorLightProvider } from '@/hooks/cursor-light';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { AnalyticsGate } from '@/providers/AnalyticsGate';
import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Load Header and Footer data from filesystem
// Returns empty defaults if files missing to prevent 500 errors
async function getHeaderFooterData(locale: string) {
  const baseDir = path.join(process.cwd(), 'content', 'global', locale);
  const headerPath = path.join(baseDir, 'header.mdx');
  const footerPath = path.join(baseDir, 'footer.mdx');

  const defaultHeader: Record<string, unknown> = { logo: '', logoAlt: '', navigation: [], ctaButton: {} };
  const defaultFooter: Record<string, unknown> = { copyright: '' };

  try {
    const [headerRaw, footerRaw] = await Promise.all([
      fs.readFile(headerPath, 'utf8'),
      fs.readFile(footerPath, 'utf8'),
    ]);

    const headerData = matter(headerRaw).data || defaultHeader;
    const footerData = matter(footerRaw).data || defaultFooter;

    return { headerData, footerData };
  } catch (err) {
    console.warn('[layout] Failed to read header/footer, using defaults:', err);
    return { headerData: defaultHeader, footerData: defaultFooter };
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  // Load header and footer data
  const { headerData, footerData } = await getHeaderFooterData(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="dns-prefetch" href="https://content.tinajs.io" />
        <link rel="preconnect" href="https://content.tinajs.io" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-slate-900">
        <NextIntlClientProvider messages={messages}>
          <CursorLightProvider>
            <Header data={headerData} locale={locale} />
            {children}
            <Footer data={footerData} locale={locale} />
            <CookieBanner />
            <AnalyticsGate />
          </CursorLightProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
