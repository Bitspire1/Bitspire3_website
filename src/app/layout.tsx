import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CursorLightProvider } from "@/hooks/cursor-light";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsGate } from "@/components/AnalyticsGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitspire.pl"),
  title: {
    default: "Bitspire",
    template: "%s | Bitspire",
  },
  description:
    "Agencja Bitspire — tworzymy nowoczesne strony internetowe, sklepy i aplikacje. Projektujemy z naciskiem na wydajność, UX i konwersję.",
  alternates: {
    canonical: "/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Bitspire",
    description:
      "Agencja Bitspire — tworzymy nowoczesne strony internetowe, sklepy i aplikacje. Projektujemy z naciskiem na wydajność, UX i konwersję.",
    url: "/",
    siteName: "Bitspire",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/Bitspire logo main.svg",
        width: 1200,
        height: 630,
        alt: "Bitspire – nowoczesne strony internetowe i sklepy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitspire",
    description:
      "Agencja Bitspire — tworzymy nowoczesne strony internetowe, sklepy i aplikacje. Projektujemy z naciskiem na wydajność, UX i konwersję.",
    images: ["/Bitspire logo main.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="preload" href="/Docker.svg" as="image" />
        <link rel="preload" href="/Nextjs.svg" as="image" />
        <link rel="preload" href="/React.svg" as="image" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-slate-900">
        <CursorLightProvider>
          <Header />
          {children}
          <Footer />
          <CookieBanner />
          <AnalyticsGate />
        </CursorLightProvider>
      </body>
    </html>
  );
}
