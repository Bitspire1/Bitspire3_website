import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/request';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CursorLightProvider } from '@/hooks/cursor-light';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { AnalyticsGate } from '@/providers/AnalyticsGate';
import client from '../../../tina/__generated__/client';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Load Header and Footer data from TinaCMS
async function getHeaderFooterData(locale: string) {
  let headerData = null;
  let footerData = null;

  try {
    const headerResult = await client.queries.header({ 
      relativePath: `${locale}/header.mdx` 
    });
    headerData = headerResult?.data?.header;
  } catch (error) {
    console.error('Error loading header:', error);
  }

  try {
    const footerResult = await client.queries.footer({ 
      relativePath: `${locale}/footer.mdx` 
    });
    footerData = footerResult?.data?.footer;
  } catch (error) {
    console.error('Error loading footer:', error);
  }

  return { headerData, footerData };
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
