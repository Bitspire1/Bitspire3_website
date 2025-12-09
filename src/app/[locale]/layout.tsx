import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/request';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CursorLightProvider } from '@/hooks/cursor-light';
import { CookieBanner } from '@/components/ui/CookieBanner';
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
  
  // Load header and footer data from filesystem
  const headerContent = await fs.readFile(path.join(process.cwd(), "content", "global", locale, "header.mdx"), "utf-8");
  const headerData = matter(headerContent).data;
  
  const footerContent = await fs.readFile(path.join(process.cwd(), "content", "global", locale, "footer.mdx"), "utf-8");
  const footerData = matter(footerContent).data;

  return (
    <>
      <link rel="dns-prefetch" href="https://content.tinajs.io" />
      <link rel="preconnect" href="https://content.tinajs.io" crossOrigin="anonymous" />
      <NextIntlClientProvider messages={messages}>
        <CursorLightProvider>
          <Header data={headerData} locale={locale} />
          {children}
          <Footer data={footerData} locale={locale} />
          <CookieBanner />
        </CursorLightProvider>
      </NextIntlClientProvider>
    </>
  );
}
