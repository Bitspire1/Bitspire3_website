'use client';

import React from 'react';
import Image from 'next/image';
import { PreviewLink } from '../../features/PreviewLink';

interface Article {
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  date?: string;
  readTime?: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug: string;
  locale: string;
  type?: 'blog' | 'portfolio';
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ 
  articles, 
  currentSlug, 
  locale,
  type = 'blog'
}) => {
  // Filter out current article and limit to 3
  const filteredArticles = articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, 3);

  if (filteredArticles.length === 0) {
    return null;
  }

  const sectionTitle = type === 'blog' 
    ? (locale === 'pl' ? 'Powiązane artykuły' : 'Related Articles')
    : (locale === 'pl' ? 'Inne projekty' : 'Other Projects');

  return (
    <section className="py-16 px-4 bg-slate-900/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {sectionTitle}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <PreviewLink
              key={article.slug}
              href={`/${locale}/${type}/${article.slug}`}
              className="group block"
            >
              <article className="relative backdrop-blur-sm bg-slate-800/30 border border-slate-700/40 rounded-xl overflow-hidden hover:border-blue-500/50 hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Image */}
                  {article.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {article.date && (
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        {article.readTime && (
                          <>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </>
                        )}
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="flex items-center text-blue-400 text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                      <span>{locale === 'pl' ? 'Czytaj więcej' : 'Read more'}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </PreviewLink>
          ))}
        </div>
      </div>
    </section>
  );
};
