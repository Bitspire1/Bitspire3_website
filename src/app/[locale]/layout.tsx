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

  return (
    <>
      <link rel="dns-prefetch" href="https://content.tinajs.io" />
      <link rel="preconnect" href="https://content.tinajs.io" crossOrigin="anonymous" />
      <NextIntlClientProvider messages={messages}>
        <CursorLightProvider>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
          <CookieBanner />
        </CursorLightProvider>
      </NextIntlClientProvider>
    </>
  );
}
