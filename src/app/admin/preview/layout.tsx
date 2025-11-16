'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useParams } from 'next/navigation';

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentLocale = (params?.locale as string) || 'pl';

  return (
    <NextIntlClientProvider locale={currentLocale} messages={{}}>
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
