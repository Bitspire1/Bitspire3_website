'use client';

import React from 'react';
import { tinaField } from 'tinacms/dist/react';

interface Section {
  __typename?: string;
  id?: string | null;
  title?: string | null;
  content?: string | null;
}

interface LegalPageData {
  __typename?: string;
  title?: string | null;
  lastUpdate?: string | null;
  sections?: (Section | null)[] | null;
  [key: string]: unknown;
}

// Simple markdown-like parser for our limited use case
function parseContent(content: string) {
  return content
    .split('\n\n')
    .map((paragraph, idx) => {
      // Bold text
      const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
      
      return (
        <p 
          key={idx} 
          className="mb-4" 
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
}

export default function LegalPage({ data }: { data?: LegalPageData }) {
  // Filter out null values from sections array
  const sections = (data?.sections || []).filter((s): s is Section => s !== null);

  return (
    <main className="relative px-4 pt-28 pb-24 min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar - Spis treści */}
        {sections.length > 0 && (
          <aside className="md:sticky md:top-28 h-max hidden md:block">
            <nav 
              aria-label="Spis treści" 
              className="space-y-4 bg-slate-800/40 border border-slate-700 rounded-xl p-5 backdrop-blur-sm"
            >
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400">
                Spis treści
              </h2>
              <ol className="space-y-2 text-sm">
                {sections.map((s) => (
                  s?.id && s?.title && (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-slate-300 hover:text-white transition-colors leading-snug"
                      >
                        {s.title}
                      </a>
                    </li>
                  )
                ))}
              </ol>
            </nav>
          </aside>
        )}

        {/* Main content */}
        <div className="space-y-10">
          {/* Header */}
          <header className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 shadow-lg backdrop-blur-md">
            <h1 
              className="text-3xl md:text-4xl font-bold tracking-tight text-white"
              data-tina-field={tinaField(data, 'title')}
            >
              {data?.title || 'Document'}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Bitspire
              </span>
            </h1>
            {data?.lastUpdate && (
              <p 
                className="mt-3 text-sm text-slate-400"
                data-tina-field={tinaField(data, 'lastUpdate')}
              >
                Data ostatniej aktualizacji: {data.lastUpdate}
              </p>
            )}
          </header>

          {/* Content */}
          <article className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 shadow-xl backdrop-blur-md leading-relaxed">
            {sections.length > 0 ? (
              sections.map((section, idx) => (
                section?.id && section?.title && section?.content && (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 
                      className="group text-xl md:text-2xl font-semibold mt-2 mb-4 text-white flex items-center gap-2"
                      data-tina-field={tinaField(data, `sections.${idx}.title`)}
                    >
                      <span>{section.title}</span>
                      <a
                        href={`#${section.id}`}
                        aria-label={`Bezpośredni link: ${section.title}`}
                        className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-blue-300 transition text-sm"
                      >
                        #
                      </a>
                    </h2>
                    <div 
                      className="text-slate-300 text-sm md:text-base space-y-4"
                      data-tina-field={tinaField(data, `sections.${idx}.content`)}
                    >
                      {parseContent(section.content)}
                    </div>
                    <hr className="my-8 border-slate-700/60 last:hidden" />
                  </section>
                )
              ))
            ) : (
              <p className="text-slate-400">Brak sekcji do wyświetlenia.</p>
            )}
            <p className="mt-4 text-xs text-slate-500">
              Dokument informacyjny – nie stanowi porady prawnej.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
