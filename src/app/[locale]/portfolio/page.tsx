import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Background } from "@/components/background";
import { PortfolioListClient } from "@/components/portfolio/PortfolioListClient";

export const metadata = {
  title: "Portfolio",
  description: "Wybrane realizacje i projekty tworzone przez Bitspire.",
};

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const dir = path.join(process.cwd(), "content", "portfolio", locale);
  const files = await fs.readdir(dir).catch(() => [] as string[]);

  const posts = (await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        const dateValue = (data as Record<string, unknown>).date;
        const slug = file.replace(/\.mdx$/, "");

        return {
          ...data,
          title: String((data as Record<string, unknown>).title || ""),
          description: String((data as Record<string, unknown>).description || (data as Record<string, unknown>).excerpt || ""),
          excerpt: String((data as Record<string, unknown>).excerpt || ""),
          slug,
          _sys: {
            filename: slug,
            relativePath: `${locale}/${file}`,
          },
          dateMs: dateValue ? new Date(String(dateValue)).getTime() : 0,
        };
      })
  ))
    .sort((a, b) => b.dateMs - a.dateMs);

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <Background />
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <header className="mb-14 text-center">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              {locale === 'pl' ? 'Nasze prace' : 'Our Work'}
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{locale === 'pl' ? 'Nasze ' : 'Our '}</span>
            <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'pl' 
              ? 'Poniżej znajdziesz przykłady typów projektów jakie budujemy. Każdy z nich skupia się na wydajności, skalowalności oraz realnej wartości dla biznesu.'
              : 'Below you will find examples of the types of projects we build. Each focuses on performance, scalability, and real business value.'}
          </p>
        </header>

        <PortfolioListClient posts={posts} locale={locale} />

        {posts.length > 0 && (
          <div className="mt-20 text-center">
            <p className="text-slate-400 text-sm">
              {locale === 'pl' 
                ? 'Chcesz zobaczyć coś konkretnego? Napisz do nas – przygotujemy spersonalizowane case study.'
                : 'Want to see something specific? Contact us – we\'ll prepare a personalized case study.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

