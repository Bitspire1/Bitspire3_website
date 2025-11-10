import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Polityka prywatności Bitspire – ochrona danych i cookies",
  description:
    "Polityka prywatności Bitspire: administrator danych, cele i podstawy przetwarzania, pliki cookies, narzędzia analityczne, prawa użytkownika (RODO).",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Polityka prywatności Bitspire",
    description:
      "Informacje o przetwarzaniu danych osobowych, plikach cookies oraz prawach użytkowników w serwisie Bitspire.",
    url: "/polityka-prywatnosci",
    type: "article",
  },
};

const LAST_UPDATE = "2025-09-24";

export default function PrivacyPolicyPage() {
  const DOMAIN = "https://example.com"; // TODO: update to production domain

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
        name: "Polityka prywatności Bitspire",
        url: `${DOMAIN}/polityka-prywatnosci`,
        inLanguage: "pl-PL",
        dateModified: LAST_UPDATE,
        description:
          "Polityka prywatności Bitspire – informacje o administratorze danych, podstawach przetwarzania, cookies i prawach użytkownika.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Strona główna", item: DOMAIN },
            { "@type": "ListItem", position: 2, name: "Polityka prywatności", item: `${DOMAIN}/polityka-prywatnosci` },
          ],
        },
        potentialAction: {
          "@type": "ContactAction",
          target: `${DOMAIN}/#contact-section`,
          name: "Skontaktuj się z administratorem danych",
        },
      },
    ],
  };

  const sections: { id: string; title: string; content: React.ReactNode }[] = [
    {
      id: "informacje-ogolne",
      title: "1. Informacje ogólne",
      content: (
        <p>
          Niniejsza Polityka prywatności (&quot;Polityka&quot;) wyjaśnia zasady przetwarzania danych osobowych i używania plików cookies w serwisie Bitspire (&quot;Serwis&quot;). Celem dokumentu jest zapewnienie przejrzystości zgodnie z RODO / GDPR.
        </p>
      ),
    },
    {
      id: "administrator",
      title: "2. Administrator danych",
      content: (
        <p>
          Administratorem danych jest Bitspire (&quot;Administrator&quot;). Kontakt: <a href="mailto:bitspireone@proton.me" className="text-blue-400 underline">bitspireone@proton.me</a>. W sprawach danych osobowych można pisać na ten adres.
        </p>
      ),
    },
    {
      id: "zakres-danych",
      title: "3. Zakres zbieranych danych",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Dane identyfikacyjne podane w briefach (np. imię, firma – jeśli występuje).</li>
          <li>Dane kontaktowe: e‑mail, numer telefonu.</li>
          <li>Dane opisowe projektu (charakterystyka, wymagania, budżet, preferencje technologiczne).</li>
          <li>Meta‑dane techniczne: adres IP (dla celów bezpieczeństwa), przybliżona lokalizacja, typ przeglądarki.</li>
          <li>Anonimowe dane analityczne (np. zdarzenia w narzędziach analitycznych).</li>
        </ul>
      ),
    },
    {
      id: "zrodla",
      title: "4. Źródła danych",
      content: (
        <p>
          Dane pochodzą bezpośrednio od Użytkownika (formularze, korespondencja) lub z narzędzi analitycznych i logów serwera (zdarzenia techniczne, zabezpieczenia anty‑spamowe).
        </p>
      ),
    },
    {
      id: "cele-podstawy",
      title: "5. Cele i podstawy prawne przetwarzania",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Obsługa zapytań i briefów</strong> – art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) oraz lit. f (uzasadniony interes).</li>
          <li><strong>Utrzymanie bezpieczeństwa i zapobieganie nadużyciom</strong> – art. 6 ust. 1 lit. f.</li>
          <li><strong>Analityka ruchu / ulepszanie Serwisu</strong> – art. 6 ust. 1 lit. f (usprawnianie usług).</li>
          <li><strong>Archiwizacja korespondencji</strong> – art. 6 ust. 1 lit. f (obrona przed roszczeniami).</li>
          <li><strong>Działania marketingowe własne (informacyjne)</strong> – art. 6 ust. 1 lit. f; gdy wymagane – zgoda art. 6 ust. 1 lit. a.</li>
        </ul>
      ),
    },
    {
      id: "cookies",
      title: "6. Pliki cookies i technologie śledzące",
      content: (
        <p>
          Serwis może używać plików cookies niezbędnych (sesyjnych) do zapewnienia podstawowych funkcji oraz – jeśli wdrożone – analitycznych i funkcjonalnych. W ustawieniach przeglądarki można usunąć lub zablokować cookies. Stosowane technologie mogą obejmować zapis localStorage lub narzędzia tag management.
        </p>
      ),
    },
    {
      id: "narzedzia",
      title: "7. Narzędzia zewnętrzne i marketing",
      content: (
        <p>
          Jeśli wdrożone, Serwis może integrować narzędzia takie jak systemy analityczne, czat lub monitoring wydajności. Dane są pseudonimizowane tam gdzie to możliwe. Konfiguracja ogranicza zakres danych do niezbędnego minimum.
        </p>
      ),
    },
    {
      id: "okres-przechowywania",
      title: "8. Okres przechowywania danych",
      content: (
        <p>
          Dane przechowujemy przez okres realizacji komunikacji / negocjacji, a następnie maksymalnie do czasu przedawnienia potencjalnych roszczeń (co do zasady do 6 lat) chyba że przepisy wymagają dłużej lub Użytkownik wcześniej skutecznie zażąda usunięcia (o ile nie zachodzi inna podstawa prawna dalszego przetwarzania).
        </p>
      ),
    },
    {
      id: "prawa-uzytkownika",
      title: "9. Prawa użytkownika",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Dostęp do danych (art. 15 RODO).</li>
          <li>Sprostowanie (art. 16) i uzupełnienie.</li>
          <li>Usunięcie – prawo do bycia zapomnianym (art. 17) jeśli brak dalszej podstawy.</li>
          <li>Ograniczenie przetwarzania (art. 18).</li>
          <li>Przenoszenie danych (art. 20) jeśli podstawą jest zgoda lub umowa i przetwarzanie automatyczne.</li>
          <li>Sprzeciw wobec przetwarzania opartego na uzasadnionym interesie (art. 21).</li>
          <li>Cofnięcie zgody – jeśli przetwarzanie odbywa się na jej podstawie – w dowolnym momencie.</li>
          <li>Skarga do PUODO (Prezes Urzędu Ochrony Danych Osobowych).</li>
        </ul>
      ),
    },
    {
      id: "odbiorcy",
      title: "10. Odbiorcy danych",
      content: (
        <p>
          Dane mogą być powierzane dostawcom hostingu, narzędzi mailingowych, systemów bezpieczeństwa lub analityki – wyłącznie w zakresie niezbędnym do świadczenia usług i na podstawie umów powierzenia zapewniających odpowiednie zabezpieczenia.
        </p>
      ),
    },
    {
      id: "transfer-poza-eog",
      title: "11. Transfer poza EOG",
      content: (
        <p>
          Jeśli dostawcy usług mają siedziby poza EOG – transfer odbywa się w oparciu o mechanizmy legalizujące (m.in. standardowe klauzule umowne) lub decyzje stwierdzające odpowiedni stopień ochrony.
        </p>
      ),
    },
    {
      id: "zabezpieczenia",
      title: "12. Zabezpieczenia",
      content: (
        <p>
          Stosujemy m.in. kontrolę dostępu, szyfrowanie transmisji (HTTPS), aktualizacje komponentów, minimalizację uprawnień oraz monitoring błędów.
        </p>
      ),
    },
    {
      id: "profilowanie",
      title: "13. Zautomatyzowane decyzje / profilowanie",
      content: (
        <p>
          Serwis obecnie nie wykorzystuje profilowania ani zautomatyzowanego podejmowania decyzji wywołującego skutki prawne. W razie zmiany – dokument zostanie zaktualizowany.
        </p>
      ),
    },
    {
      id: "zmiany-polityki",
      title: "14. Zmiany Polityki",
      content: (
        <p>
          Aktualizacje mogą wynikać z rozwoju Serwisu lub zmian prawa. Nowa wersja publikuje się z aktualną datą na tej stronie. Korzystanie po zmianach oznacza akceptację.
        </p>
      ),
    },
    {
      id: "kontakt",
      title: "15. Kontakt w sprawach danych",
      content: (
        <p>
          Realizacja praw: <a href="mailto:bitspireone@proton.me" className="text-blue-400 underline">bitspireone@proton.me</a> (w treści wskaż prawo, którego żądanie dotyczy).
        </p>
      ),
    },
    {
      id: "data-obowiazywania",
      title: "16. Data obowiązywania",
      content: <p>Niniejsza Polityka obowiązuje od: {LAST_UPDATE}.</p>,
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
              Polityka prywatności <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Bitspire</span>
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
              Dokument informacyjny przygotowany w celu spełnienia obowiązków transparentności RODO. Nie stanowi porady prawnej.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
