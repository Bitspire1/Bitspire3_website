import React from "react";
import Image from "next/image";
import { Background } from "@/components/background";

export const metadata = {
  title: "Portfolio",
  description: "Wybrane realizacje i projekty tworzone przez Bitspire.",
};

import eduvantageImg from "./Images/EduVantage.webp";
import skladaMyImg from "./Images/SkładaMy.webp";

import type { StaticImageData } from "next/image";

interface FeaturedProject {
  title: string;
  slug?: string; // for future internal detail pages
  description: string;
  tags: string[];
  year: string;
  image: StaticImageData; // next/image static import
  imageAlt: string;
  link?: string; // external or internal
}

const FEATURED: FeaturedProject[] = [
  {
    title: "EduVantage – platforma edukacyjna",
    description:
      "Responsywna platforma z dynamicznym panelem, modułami kursów i naciskiem na wydajność (ISR / edge).",
    tags: ["Next.js", "CMS", "TypeScript", "Platforma"],
    year: "2025",
    image: eduvantageImg,
    imageAlt: "Zrzut ekranu platformy EduVantage: interfejs edukacyjny",
    link: "https://eduvantage.pl",
  },
  {
    title: "SkładaMy – konfigurator produktu",
    description:
      "Aplikacja z interaktywną konfiguracją, integracjami API i zoptymalizowanym buildem dla Core Web Vitals.",
    tags: ["Next.js", "UX", "Konfigurator", "Optymalizacja"],
    year: "2025",
    image: skladaMyImg,
    imageAlt: "Zrzut ekranu serwisu SkładaMy przedstawiający interfejs konfiguratora",
    link: "https://skladamy.com.pl",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
      <Background />
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <header className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight">
            Nasze realizacje
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Poniżej znajdziesz przykłady typów projektów jakie budujemy. Każdy z nich
            skupia się na wydajności, skalowalności oraz realnej wartości dla biznesu.
          </p>
        </header>
        <section aria-label="Wybrane projekty" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED.map((project, idx) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-800/40 backdrop-blur-sm shadow-xl ring-0 hover:ring-2 hover:ring-blue-500/40 transition"
            >
              {/* Image wrapper */}
              <div className="relative w-full aspect-[3/2] md:aspect-[3/2] overflow-hidden bg-slate-900 flex items-center justify-center p-4 md:p-6">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  placeholder="blur"
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/20 to-transparent" />
                {/* Removed mini chips overlay to avoid covering image headers */}
              </div>
              {/* Content */}
              <div className="p-8 md:p-10">
                <header className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                      {project.title}
                    </h2>
                    {/* Year moved into card content */}
                    <span className="inline-flex items-center text-[10px] md:text-xs tracking-wider uppercase font-semibold bg-blue-600/90 text-white px-2.5 py-1 rounded-full shadow">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </header>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologie / cechy">
                  {project.tags
                    .filter((tag) => !["TypeScript", "Platforma", "Optymalizacja", "UX", "Konfigurator"].includes(tag))
                    .map((tag) => {
                      const base = "text-[11px] md:text-xs uppercase tracking-wide rounded-full px-3 py-1 font-medium shadow-sm bg-gradient-to-r";
                      const cls =
                        tag === "CMS"
                          ? `${base} from-purple-600 to-fuchsia-500 text-white`
                          : tag === "Next.js"
                          ? `${base} from-black to-neutral-900 text-white`
                          : `${base} from-blue-600 to-blue-500 text-white`;
                      return (
                        <li key={tag} className={cls}>
                          {tag}
                        </li>
                      );
                    })}
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={project.link || "#"}
                    target={project.link?.startsWith("http") ? "_blank" : undefined}
                    rel={project.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 shadow-lg shadow-blue-600/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900"
                  >
                    Zobacz projekt
                    <span aria-hidden>→</span>
                  </a>
                  <a
                    href="#kontakt" // placeholder
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-200 text-sm font-medium px-6 py-3 border border-slate-600/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900"
                  >
                    Napisz do nas
                  </a>
                </div>
              </div>
              {/* Accent gradient line */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
            </article>
          ))}
        </section>
        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm">
            Chcesz zobaczyć coś konkretnego? <span className="text-blue-400">Napisz do nas</span> – przygotujemy spersonalizowane case study.
          </p>
        </div>
      </main>
    </div>
  );
}
