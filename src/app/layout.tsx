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
          
          {/* Hidden forms for Netlify Forms detection */}
          <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
            <input type="hidden" name="form-name" value="contact" />
            <input type="text" name="name" />
            <input type="email" name="email" />
            <textarea name="message"></textarea>
          </form>

          <form name="brief-website" data-netlify="true" hidden>
            <input type="hidden" name="form-name" value="brief-website" />
            <input type="text" name="projectType" />
            <textarea name="mainGoal"></textarea>
            <input type="text" name="responsive" />
            <textarea name="features"></textarea>
            <input type="text" name="cms" />
            <input type="text" name="graphics" />
            <input type="text" name="designType" />
            <input type="text" name="style" />
            <input type="text" name="inspirationLinks" />
            <input type="text" name="contentDelivery" />
            <input type="text" name="subpages" />
            <input type="text" name="languages" />
            <input type="text" name="technology" />
            <input type="text" name="hosting" />
            <input type="text" name="ssl" />
            <input type="text" name="budget" />
            <input type="text" name="maintenanceBudget" />
            <input type="text" name="contact" />
          </form>

          <form name="brief-shop" data-netlify="true" hidden>
            <input type="hidden" name="form-name" value="brief-shop" />
            <input type="text" name="shopType" />
            <textarea name="products"></textarea>
            <input type="text" name="productCount" />
            <input type="text" name="variants" />
            <textarea name="payments"></textarea>
            <textarea name="shipping"></textarea>
            <input type="text" name="integrations" />
            <input type="text" name="adminPanel" />
            <input type="text" name="graphics" />
            <input type="text" name="style" />
            <input type="text" name="languages" />
            <input type="text" name="budget" />
            <input type="text" name="contact" />
          </form>

          <form name="brief-logo" data-netlify="true" hidden>
            <input type="hidden" name="form-name" value="brief-logo" />
            <input type="text" name="logoType" />
            <input type="text" name="brandName" />
            <input type="text" name="tagline" />
            <textarea name="values"></textarea>
            <input type="text" name="colors" />
            <input type="text" name="style" />
            <input type="text" name="symbol" />
            <textarea name="usage"></textarea>
            <input type="text" name="inspirations" />
            <input type="text" name="budget" />
            <input type="text" name="contact" />
          </form>

          <form name="brief-seo" data-netlify="true" hidden>
            <input type="hidden" name="form-name" value="brief-seo" />
            <input type="text" name="online" />
            <input type="text" name="url" />
            <textarea name="goals"></textarea>
            <textarea name="keywords"></textarea>
            <input type="text" name="existingSeo" />
            <input type="text" name="market" />
            <input type="text" name="blog" />
            <input type="text" name="materials" />
            <input type="text" name="budget" />
            <input type="text" name="contact" />
          </form>
        </CursorLightProvider>
      </body>
    </html>
  );
}
