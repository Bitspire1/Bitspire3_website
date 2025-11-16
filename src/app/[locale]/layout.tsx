import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/request';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CursorLightProvider } from '@/hooks/cursor-light';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { AnalyticsGate } from '@/providers/AnalyticsGate';
import '../globals.css';

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
    <html lang={locale}>
      <head>
        <link rel="preload" href="/Docker.svg" as="image" />
        <link rel="preload" href="/Nextjs.svg" as="image" />
        <link rel="preload" href="/React.svg" as="image" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-slate-900">
        <NextIntlClientProvider messages={messages}>
          <CursorLightProvider>
            <Header />
            {children}
            <Footer />
            <CookieBanner />
            <AnalyticsGate />
          </CursorLightProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
