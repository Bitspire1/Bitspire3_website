import type { Metadata } from "next";
import "./globals.css";

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
  return children;
}
