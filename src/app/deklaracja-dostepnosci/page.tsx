import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Deklaracja dostępności Bitspire – dostępność cyfrowa",
  description:
    "Deklaracja dostępności serwisu Bitspire: status zgodności, ułatwienia, niedostępności, dane kontaktowe i procedura zgłaszania problemów.",
  alternates: { canonical: "/deklaracja-dostepnosci" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Deklaracja dostępności Bitspire",
    description:
      "Informacje o dostępności cyfrowej serwisu Bitspire – standardy WCAG, ułatwienia, kontakt i tryb wnioskowo-skargowy.",
    url: "/deklaracja-dostepnosci",
    type: "article",
  },
};

const LAST_UPDATE = "2025-10-03";

export default function AccessibilityStatementPage() {
  const DOMAIN = "https://bitspire.pl";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Bitspire",
        url: DOMAIN,
        logo: `${DOMAIN}/Bitspire logo main.svg`,
      },
      {
        "@type": "WebPage",
        name: "Deklaracja dostępności Bitspire",
        url: `${DOMAIN}/deklaracja-dostepnosci`,
        inLanguage: "pl-PL",
        dateModified: LAST_UPDATE,
        description:
          "Deklaracja dostępności serwisu Bitspire – status zgodności WCAG, dostępne ułatwienia, ograniczenia i kontakt.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Strona główna", item: DOMAIN },
            { "@type": "ListItem", position: 2, name: "Deklaracja dostępności", item: `${DOMAIN}/deklaracja-dostepnosci` },
          ],
        },
      },
    ],
  };

  const sections: { id: string; title: string; content: React.ReactNode }[] = [
    {
      id: "wprowadzenie",
      title: "1. Wprowadzenie",
      content: (
        <p>
          Bitspire zobowiązuje się zapewnić dostępność swojej witryny internetowej zgodnie z przepisami oraz dobrymi praktykami
          wynikającymi ze standardu WCAG 2.1 na poziomie AA. Niniejszy dokument opisuje status zgodności, dostępne ułatwienia oraz
          sposób zgłaszania problemów z dostępnością.
        </p>
      ),
    },
    {
      id: "status-zgodnosci",
      title: "2. Status zgodności",
      content: (
        <p>
          Serwis jest w <strong>dużym stopniu zgodny</strong> ze standardem WCAG 2.1 AA. Prowadzimy ciągłe prace utrzymaniowe i
          doskonalące, aby poprawiać doświadczenie wszystkich użytkowników, w tym osób z niepełnosprawnościami.
        </p>
      ),
    },
    {
      id: "ulatwienia",
      title: "3. Zastosowane ułatwienia",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Semantyczna struktura dokumentu, nagłówki i spójny porządek treści.</li>
          <li>Wysoki kontrast i czytelna typografia w trybie domyślnym.</li>
          <li>Nawigacja klawiaturą – fokus jest widoczny, a linki i przyciski są dostępne.</li>
          <li>Teksty alternatywne dla obrazów informacyjnych.</li>
          <li>Responsywny interfejs – poprawne działanie na urządzeniach mobilnych i desktopowych.</li>
        </ul>
      ),
    },
    {
      id: "niedostepnosci",
      title: "4. Treści niedostępne i możliwe ograniczenia",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Niektóre elementy graficzne mogą nie mieć pełnych opisów alternatywnych – sukcesywnie uzupełniamy.</li>
          <li>Materiały zewnętrzne osadzane (np. mapy, wideo) mogą mieć ograniczoną dostępność wynikającą z platform dostawców.</li>
          <li>Historyczne treści promocyjne mogą nie spełniać w pełni wymogów kontrastu.</li>
        </ul>
      ),
    },
    {
      id: "skroty-klawiaturowe",
      title: "5. Nawigacja i skróty klawiaturowe",
      content: (
        <p>
          Serwis można przeglądać z użyciem klawiatury. Zalecane klawisze: Tab / Shift+Tab – przemieszczanie fokusu; Enter – aktywacja; Esc – zamykanie okien modalnych.
        </p>
      ),
    },
    {
      id: "informacje-zwrotne",
      title: "6. Informacje zwrotne i kontakt",
      content: (
        <p>
          W przypadku problemów z dostępnością skontaktuj się z nami: <a href="mailto:bitspireone@proton.me" className="text-blue-400 underline">bitspireone@proton.me</a>.
          Prosimy opisać trudność, adres podstrony oraz używaną przeglądarkę/urządzenie.
        </p>
      ),
    },
    {
      id: "procedura",
      title: "7. Procedura wnioskowo–skargowa",
      content: (
        <p>
          Każdą zgłoszoną uwagę analizujemy i podejmujemy działania naprawcze w rozsądnym terminie. Jeśli nie będziemy w stanie
          zapewnić dostępności, zaproponujemy alternatywny sposób dostępu do informacji.
        </p>
      ),
    },
    {
      id: "data-sporzadzenia",
      title: "8. Data sporządzenia deklaracji",
      content: (
        <p>
          Deklarację sporządzono dnia: {LAST_UPDATE}. Dokument podlega okresowym przeglądom i aktualizacjom.
        </p>
      ),
    },
  ];

  return (
    <main className="relative px-4 pt-28 pb-24 min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar / Spis treści */}
        <aside className="md:sticky md:top-28 h-max hidden md:block">
          <nav aria-label="Spis treści" className="space-y-4 bg-slate-800/40 border border-slate-700 rounded-xl p-5 backdrop-blur-sm">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Spis treści</h2>
            <ol className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-slate-300 hover:text-white transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        {/* Main content card */}
        <div className="space-y-10">
          <header className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 shadow-lg backdrop-blur-md">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Deklaracja dostępności <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Bitspire</span>
            </h1>
            <p className="mt-3 text-sm text-slate-400">Data ostatniej aktualizacji: {LAST_UPDATE}</p>
          </header>
          <article className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 shadow-xl backdrop-blur-md leading-relaxed">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="group text-xl md:text-2xl font-semibold mt-2 mb-4 text-white flex items-center gap-2">
                  <span>{section.title}</span>
                  <a
                    href={`#${section.id}`}
                    aria-label={`Bezpośredni link: ${section.title}`}
                    className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-300 transition text-sm"
                  >
                    #
                  </a>
                </h2>
                <div className="text-slate-300 text-sm md:text-base space-y-4">
                  {section.content}
                </div>
                <hr className="my-8 border-slate-700/60 last:hidden" />
              </section>
            ))}
            <p className="mt-4 text-xs text-slate-500">
              Dokładamy starań, aby treści były dostępne dla jak najszerszej grupy odbiorców. Jeśli widzisz obszar do poprawy – napisz do nas.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
