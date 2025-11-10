import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Regulamin serwisu Bitspire – zasady korzystania",
  description:
    "Regulamin serwisu Bitspire: zasady korzystania, definicje, prawa użytkowników, odpowiedzialność, reklamacje, dane osobowe i kontakt.",
  alternates: { canonical: "/regulamin" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Regulamin serwisu Bitspire",
    description:
      "Zasady i warunki korzystania z serwisu Bitspire – przejrzyste informacje dla użytkowników.",
    url: "/regulamin",
    type: "article",
  },
};

const LAST_UPDATE = "2025-09-24";

export default function RegulaminPage() {
  const DOMAIN = "https://example.com"; // TODO: replace with production domain
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Regulamin serwisu Bitspire",
    url: `${DOMAIN}/regulamin`,
    inLanguage: "pl-PL",
    dateModified: LAST_UPDATE,
    description: "Regulamin serwisu Bitspire określający zasady korzystania, odpowiedzialność i procedury reklamacyjne.",
  };

  const sections: { id: string; title: string; content: React.ReactNode }[] = [
    {
      id: "postanowienia-ogolne",
      title: "1. Postanowienia ogólne",
      content: (
        <p>
          Niniejszy Regulamin (&quot;Regulamin&quot;) określa zasady korzystania z serwisu internetowego Bitspire (&quot;Serwis&quot;) prowadzonego przez Bitspire (&quot;Administrator&quot;). Korzystając z Serwisu akceptujesz warunki Regulaminu.
        </p>
      ),
    },
    {
      id: "definicje",
      title: "2. Definicje",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Serwis</strong> – witryna Administratora prezentująca ofertę oraz umożliwiająca kontakt.</li>
          <li><strong>Użytkownik</strong> – osoba lub podmiot korzystający z Serwisu.</li>
          <li><strong>Brief</strong> – formularz opisujący potrzeby projektowe wysyłany do Administratora.</li>
          <li><strong>Usługi</strong> – działania świadczone przez Administratora (np. projektowanie, wdrożenia, SEO, konsultacje).</li>
          <li><strong>Dane</strong> – informacje przekazane przez Użytkownika poprzez formularze.</li>
        </ul>
      ),
    },
    {
      id: "charakter-zakres",
      title: "3. Charakter i zakres Serwisu",
      content: (
        <p>
          Serwis ma charakter informacyjno–prezentacyjny. Materiały nie stanowią oferty w rozumieniu Kodeksu cywilnego (chyba że oznaczono inaczej) – są zaproszeniem do współpracy.
        </p>
      ),
    },
    {
      id: "warunki-korzystania",
      title: "4. Warunki korzystania",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Zakaz dostarczania treści bezprawnych lub naruszających prawa osób trzecich.</li>
          <li>Podawaj dane prawdziwe i aktualne.</li>
          <li>Administrator może czasowo ograniczyć dostęp z przyczyn technicznych lub bezpieczeństwa.</li>
          <li>Zakaz prób ingerencji w kod, bezpieczeństwo lub stabilność Serwisu.</li>
        </ul>
      ),
    },
    {
      id: "formularze",
      title: "5. Formularze i briefy",
      content: (
        <p>
          Dane przesłane w formularzach służą analizie potrzeb i przygotowaniu oferty. Użytkownik oświadcza, że ma prawa do przekazywanych treści oraz że nie naruszają one praw osób trzecich.
        </p>
      ),
    },
    {
      id: "platnosci",
      title: "6. Płatności i umowy",
      content: (
        <p>
          Warunki (zakres, harmonogram, wynagrodzenie) ustalane są indywidualnie w umowie lub korespondencji. Do jej zawarcia żadna ze stron nie jest zobowiązana do świadczeń.
        </p>
      ),
    },
    {
      id: "prawa-autorskie",
      title: "7. Prawa autorskie",
      content: (
        <p>
          Układ strony, grafiki, teksty, kod źródłowy i logotypy są chronione. Kopiowanie lub dalsze rozpowszechnianie bez zgody Administratora jest zabronione chyba że wskazano inaczej.
        </p>
      ),
    },
    {
      id: "odpowiedzialnosc",
      title: "8. Odpowiedzialność",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Administrator dąży do stabilnego i bezpiecznego działania Serwisu.</li>
          <li>Nie gwarantuje nieprzerwanego dostępu ani całkowitej bezbłędności.</li>
          <li>Nie odpowiada za skutki siły wyższej, awarie zewnętrznych systemów ani działania Użytkowników.</li>
        </ul>
      ),
    },
    {
      id: "reklamacje",
      title: "9. Reklamacje",
      content: (
        <p>
          Uwagi dotyczące działania Serwisu można zgłaszać na adres e‑mail z sekcji kontakt. Reklamacja powinna zawierać opis problemu i dane kontaktowe. Odpowiedź nastąpi w rozsądnym terminie.
        </p>
      ),
    },
    {
      id: "dane-osobowe",
      title: "10. Dane osobowe",
      content: (
        <p>
          Dane osobowe przetwarzane są zgodnie z przepisami oraz przyszłą Polityką Prywatności. Przysługują prawa: dostęp, sprostowanie, ograniczenie, usunięcie – o ile prawo na to pozwala.
        </p>
      ),
    },
    {
      id: "newsletter",
      title: "11. Newsletter",
      content: (
        <p>
          Subskrypcja (jeśli dostępna) wymaga zgody i można ją zakończyć poprzez link rezygnacji w wiadomości.
        </p>
      ),
    },
    {
      id: "zmiany",
      title: "12. Zmiany Regulaminu",
      content: (
        <p>
          Zmiany mogą wynikać z aktualizacji prawa, technologii lub organizacji. Nowa treść publikowana jest wraz z datą. Dalsze korzystanie = akceptacja.
        </p>
      ),
    },
    {
      id: "postanowienia-koncowe",
      title: "13. Postanowienia końcowe",
      content: (
        <p>
          W sprawach nieuregulowanych stosuje się prawo polskie. Właściwy miejscowo jest sąd siedziby Administratora (chyba że przepisy bezwzględnie stanowią inaczej).
        </p>
      ),
    },
    {
      id: "kontakt",
      title: "14. Kontakt",
      content: (
        <p>
          Zapytania: <a href="mailto:bitspireone@proton.me" className="text-blue-400 underline">bitspireone@proton.me</a>.
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
              Regulamin serwisu <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Bitspire</span>
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
              Dokument informacyjny – nie stanowi porady prawnej. Zaleca się konsultację z prawnikiem przed komercyjnym wykorzystaniem.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
