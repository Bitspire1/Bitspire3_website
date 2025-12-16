import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CursorLightProvider } from '@/components/features/Cursor-Light';
import { Background } from '@/components/layout/Background';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <CursorLightProvider>
            <Background />
            <Header />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
          </CursorLightProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
