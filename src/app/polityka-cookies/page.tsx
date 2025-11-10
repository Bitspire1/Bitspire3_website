import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Polityka cookies Bitspire – pliki cookies i zgody",
  description: "Polityka cookies Bitspire: rodzaje plików cookies, cele, podstawy prawne, jak wyłączyć cookies oraz zarządzać zgodą.",
  alternates: { canonical: "/polityka-cookies" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Polityka cookies Bitspire",
    description: "Informacje o tym jak Bitspire wykorzystuje pliki cookies i jak zarządzać zgodą.",
    url: "/polityka-cookies",
    type: "article",
  },
};

const LAST_UPDATE = "2025-09-24";

export default function PolitykaCookiesPage() {
  const DOMAIN = "https://example.com"; // TODO: real domain
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
        name: "Polityka cookies Bitspire",
        url: `${DOMAIN}/polityka-cookies`,
        inLanguage: "pl-PL",
        dateModified: LAST_UPDATE,
        description: "Polityka cookies Bitspire: rodzaje, cele, podstawy prawne oraz sposób zarządzania zgodą.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Strona główna", item: DOMAIN },
            { "@type": "ListItem", position: 2, name: "Polityka cookies", item: `${DOMAIN}/polityka-cookies` },
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
          Niniejsza polityka cookies (&quot;Polityka cookies&quot;) wyjaśnia w jaki sposób serwis Bitspire wykorzystuje pliki cookies i pokrewne technologie (localStorage, tagi skryptowe). Dokument ma charakter informacyjny i nie zastępuje polityki prywatności.
        </p>
      ),
    },
    {
      id: "definicje",
      title: "2. Definicje",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Cookies</strong> – niewielkie pliki tekstowe zapisywane w przeglądarce użytkownika.</li>
          <li><strong>Sesyjne</strong> – usuwane po zamknięciu przeglądarki.</li>
          <li><strong>Stałe</strong> – przechowywane przez określony czas lub do ręcznego usunięcia.</li>
          <li><strong>Technologie pokrewne</strong> – localStorage, pixel, tag, skrypt analityczny.</li>
          <li><strong>Zgoda</strong> – dobrowolne, świadome działanie użytkownika umożliwiające aktywację wybranych kategorii.</li>
        </ul>
      ),
    },
    {
      id: "rodzaje",
      title: "3. Rodzaje stosowanych plików cookies",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Niezbędne</strong> – obsługa podstawowych funkcji (nawigacja, bezpieczeństwo formularzy). Nie wymagają zgody.</li>
          <li><strong>Analityczne</strong> – zbieranie zanonimizowanych danych o ruchu i interakcjach w celu ulepszenia działania.</li>
          <li><strong>Personalizacyjne</strong> – zapamiętywanie preferencji (np. wybrana wersja językowa, interfejs).</li>
          <li><strong>Marketing / reklamowe</strong> – pomiar skuteczności kampanii, dopasowanie treści reklam.</li>
        </ul>
      ),
    },
    {
      id: "cele",
      title: "4. Cele wykorzystania",
      content: (
        <p>
          Cookies pomagają zapewnić bezpieczeństwo, mierzyć wydajność, ulepszać doświadczenie użytkownika oraz – w przypadku zgody – prowadzić analitykę i działania marketingowe.
        </p>
      ),
    },
    {
      id: "podstawy-prawne",
      title: "5. Podstawy prawne",
      content: (
        <p>
          Podstawą dla cookies niezbędnych jest uzasadniony interes Administratora (zapewnienie funkcjonalności). Dla pozostałych kategorii podstawą jest zgoda użytkownika (art. 6 ust. 1 lit. a RODO), którą można w każdej chwili wycofać bez wpływu na zgodność z przetwarzaniem dokonanym przed wycofaniem.
        </p>
      ),
    },
    {
      id: "zarzadzanie-zgoda",
      title: "6. Zarządzanie zgodą",
      content: (
        <p>
          Zgody można udzielić lub odwołać poprzez banner cookies lub sekcję „Ustawienia cookies” w stopce. Zmiana zapisywana jest natychmiast. Wycofanie zgody nie usuwa technicznie wszystkich plików – można skasować je ręcznie w przeglądarce.
        </p>
      ),
    },
    {
      id: "wylaczenie-przegladarka",
      title: "7. Jak wyłączyć cookies w przeglądarce",
      content: (
        <p>
          Popularne przeglądarki (Chrome, Firefox, Safari, Edge) umożliwiają: blokowanie wszystkich cookies, blokowanie zewnętrznych, czyszczenie historii, tryb prywatny. Instrukcje znajdują się w sekcjach pomocy producentów. Wyłączenie cookies potrzebnych może ograniczyć funkcjonalność serwisu.
        </p>
      ),
    },
    {
      id: "okres-przechowywania",
      title: "8. Okres przechowywania",
      content: (
        <p>
          Czas życia cookies zależy od kategorii i celu: sesyjne (do zamknięcia przeglądarki), stałe (do kilku miesięcy / roku) lub do odwołania zgody. Szczegóły konfiguracji narzędzi dostępne są na żądanie.
        </p>
      ),
    },
    {
      id: "prawa",
      title: "9. Prawa użytkownika",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Dostęp do danych i informacji o celach.</li>
          <li>Sprostowanie i ograniczenie przetwarzania.</li>
          <li>Usunięcie (gdzie zasadne) oraz sprzeciw wobec marketingu.</li>
          <li>Cofnięcie zgody dla kategorii niezbędnych do marketingu/analityki.</li>
          <li>Skarga do PUODO.</li>
        </ul>
      ),
    },
    {
      id: "kontakt",
      title: "10. Kontakt",
      content: (
        <p>
          W sprawach cookies i prywatności: <a href="mailto:bitspireone@proton.me" className="text-blue-400 underline">bitspireone@proton.me</a>.
        </p>
      ),
    },
    {
      id: "zmiany",
      title: "11. Zmiany dokumentu",
      content: (
        <p>
          Aktualizacje wynikające z rozwoju technologicznego lub zmian prawa publikujemy na tej stronie z nową datą. Dalsze korzystanie z serwisu oznacza akceptację zmian.
        </p>
      ),
    },
    {
      id: "data",
      title: "12. Data obowiązywania",
      content: <p>Polityka obowiązuje od: {LAST_UPDATE}.</p>,
    },
  ];

  return (
    <main className="relative px-4 pt-28 pb-24 min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="md:sticky md:top-28 h-max hidden md:block">
          <nav aria-label="Spis treści" className="space-y-4 bg-slate-800/40 border border-slate-700 rounded-xl p-5 backdrop-blur-sm">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Spis treści</h2>
            <ol className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block text-slate-300 hover:text-white transition-colors leading-snug">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="space-y-10">
          <header className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 shadow-lg backdrop-blur-md">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Polityka cookies <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Bitspire</span>
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
                <div className="text-slate-300 text-sm md:text-base space-y-4">{section.content}</div>
                <hr className="my-8 border-slate-700/60 last:hidden" />
              </section>
            ))}
            <p className="mt-4 text-xs text-slate-500">
              Dokument informacyjny – nie stanowi porady prawnej. Zalecana konsultacja z prawnikiem przed komercyjnym wdrożeniem.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
