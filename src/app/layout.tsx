import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CursorLightProvider } from '@/components/features/Cursor-Light';
import { Background } from '@/components/layout/Background';
import './globals.css';

export const metadata = {
  title: 'Bitspire - Tworzenie stron internetowych',
  description: 'Profesjonalne strony internetowe i sklepy online',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  // Pobierz locale z params (będzie ustawione przez middleware)
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale || 'pl'} suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
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
