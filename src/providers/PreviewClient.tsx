'use client';

import React from 'react';
import Image from 'next/image';
import { Background } from '@/components/background';
import { Hero } from '@/components/sections/Hero';
import Technology from '@/components/sections/Technology';
import { Offer } from '@/components/sections/Offer';
import Brief from '@/components/sections/Brief';
import Portfolio from '@/components/sections/Portfolio';
import LegalPage from '@/components/sections/LegalPage';
import { CursorLightProvider } from '@/hooks/cursor-light';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface PreviewClientProps {
  data: unknown;
  query: string;
  variables: Record<string, unknown>;
}

export default function PreviewClient({ data, query, variables }: PreviewClientProps) {
  // Use TinaCMS real-time editing
  const { data: liveData } = useTina({
    query,
    variables,
    data: data as object,
  });

  if (!liveData || typeof liveData !== 'object') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">Loading preview...</div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = liveData as any;

  // Check if it's a portfolio post
  if ('portfolio' in content && content.portfolio) {
    const post = content.portfolio;
    
    // Format date
    const formattedDate = post.date 
      ? new Date(post.date).toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '';

    return (
      <CursorLightProvider>
        <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
          <Background />
          
          {/* Preview Banner */}
          <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-slate-900 text-center py-2 font-semibold z-50">
            Preview Mode - Admin Panel
          </div>
          
          <article className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.category && (
                  <span className="text-xs uppercase tracking-wider font-semibold bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                    {post.category}
                  </span>
                )}
                {post.year && (
                  <span className="text-xs uppercase tracking-wider font-semibold bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                    {post.year}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mb-4">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-slate-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                {formattedDate && (
                  <time dateTime={post.date || undefined}>
                    {formattedDate}
                  </time>
                )}
                {post.client && (
                  <>
                    <span>•</span>
                    <span>Klient: {post.client}</span>
                  </>
                )}
              </div>
            </header>

            {/* Featured image */}
            {post.image && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-slate-700/50">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title || 'Project image'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map((tag: string | null) => tag && (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-wide bg-slate-800/70 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:bg-gradient-to-r prose-h2:from-blue-400 prose-h2:to-emerald-300 prose-h2:bg-clip-text prose-h2:text-transparent
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-slate-200
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
              prose-strong:text-slate-200 prose-strong:font-semibold
              prose-ul:text-slate-300
              prose-li:text-slate-300 prose-li:marker:text-blue-400
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-slate-800/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-code:text-blue-300 prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
            ">
              {post.body && (
                <TinaMarkdown content={post.body} />
              )}
            </div>

            {/* Project link */}
            {post.link && (
              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-8 py-4 shadow-lg shadow-blue-600/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900"
                >
                  Zobacz projekt
                  <span aria-hidden>→</span>
                </a>
              </div>
            )}
          </article>
        </div>
      </CursorLightProvider>
    );
  }

  // Check if it's a pages collection item
  if (!('pages' in content) || !content.pages) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">Loading preview...</div>
      </div>
    );
  }

  const page = content.pages;

  // Determine page type based on available fields
  const isHomePage = page.hero || page.technology || page.offer || page.brief;
  const isPortfolio = page.projects && Array.isArray(page.projects);
  const isLegalPage = page.sections && Array.isArray(page.sections);

  return (
    <CursorLightProvider>
      <div className="relative overflow-hidden">
        <Background />
        
        <main className="relative z-10">
          {isHomePage && (
            <>
              {page.hero && <Hero data={page.hero} />}
              <Technology />
              {page.offer && (
                <div id="offer-section">
                  <Offer data={page.offer} />
                </div>
              )}
              {page.brief && (
                <div id="brief-section">
                  <Brief data={page.brief} />
                </div>
              )}
            </>
          )}
          
          {isPortfolio && <Portfolio data={page} />}
          
          {isLegalPage && <LegalPage data={page} />}
        </main>
      </div>
    </CursorLightProvider>
  );
}
