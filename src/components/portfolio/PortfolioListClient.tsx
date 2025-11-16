'use client';

import React, { useState, useMemo } from 'react';
import Link from "next/link";
import Image from "next/image";
import { PortfolioSearch } from "@/components/ui/PortfolioSearch";

interface PortfolioPost {
  _sys: {
    filename: string;
    relativePath: string;
  };
  title: string;
  slug: string;
  description: string;
  excerpt?: string | null;
  date: string;
  category?: string | null;
  tags?: (string | null)[] | null;
  image?: string | null;
  imageAlt?: string | null;
  link?: string | null;
  client?: string | null;
  year?: string | null;
}

interface PortfolioListClientProps {
  posts: PortfolioPost[];
  locale: string;
}

const translations = {
  pl: {
    noProjects: 'Brak projektów pasujących do wybranych filtrów.',
    readMore: 'Czytaj więcej',
    viewProject: 'Zobacz projekt',
    resultsCount: (count: number) => `Znaleziono ${count} ${count === 1 ? 'projekt' : count < 5 ? 'projekty' : 'projektów'}`,
  },
  en: {
    noProjects: 'No projects match the selected filters.',
    readMore: 'Read more',
    viewProject: 'View project',
    resultsCount: (count: number) => `Found ${count} project${count !== 1 ? 's' : ''}`,
  },
};

export function PortfolioListClient({ posts, locale }: PortfolioListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const t = translations[locale as keyof typeof translations] || translations.en;

  // Get all unique tags from all posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        if (tag) tagsSet.add(tag);
      });
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search filter
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.client?.toLowerCase().includes(searchQuery.toLowerCase());

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(selectedTag => 
          post.tags?.some(tag => tag === selectedTag)
        );

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  return (
    <>
      {/* Search and Filter */}
      <PortfolioSearch
        allTags={allTags}
        onSearchChange={setSearchQuery}
        onTagsChange={setSelectedTags}
        locale={locale}
      />

      {/* Results count */}
      {(searchQuery || selectedTags.length > 0) && (
        <div className="mb-6 text-center">
          <p className="text-sm text-slate-400">
            {t.resultsCount(filteredPosts.length)}
          </p>
        </div>
      )}

      {/* Portfolio Grid */}
      <section aria-label="Portfolio projects" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const slug = post._sys.filename;
            const formattedDate = post.date 
              ? new Date(post.date).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : '';

            return (
              <article
                key={post._sys.relativePath}
                className="group relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-800/40 backdrop-blur-sm shadow-xl ring-0 hover:ring-2 hover:ring-blue-500/40 transition"
              >
                {/* Image */}
                {post.image && (
                  <Link href={`/${locale}/portfolio/${slug}`}>
                    <div className="relative w-full aspect-[3/2] overflow-hidden bg-slate-900 flex items-center justify-center p-4 md:p-6">
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title || 'Project image'}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                        sizes="(max-width: 1024px) 100vw, 600px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/20 to-transparent" />
                    </div>
                  </Link>
                )}

                {/* Content */}
                <div className="p-8 md:p-10">
                  <header className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Link href={`/${locale}/portfolio/${slug}`}>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      {post.year && (
                        <span className="inline-flex items-center text-[10px] md:text-xs tracking-wider uppercase font-semibold bg-blue-600/90 text-white px-2.5 py-1 rounded-full shadow">
                          {post.year}
                        </span>
                      )}
                    </div>
                    
                    {formattedDate && (
                      <time className="text-xs text-slate-400 mb-3 block" dateTime={post.date || undefined}>
                        {formattedDate}
                      </time>
                    )}

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {post.excerpt || post.description}
                    </p>
                  </header>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                      {post.tags
                        .filter((tag): tag is string => !!tag)
                        .slice(0, 4)
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
                  )}

                  {/* Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/${locale}/portfolio/${slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 shadow-lg shadow-blue-600/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900"
                    >
                      {t.readMore}
                      <span aria-hidden>→</span>
                    </Link>
                    {post.link && (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-200 text-sm font-medium px-6 py-3 border border-slate-600/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900"
                      >
                        {t.viewProject}
                      </a>
                    )}
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
              </article>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">
              {t.noProjects}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
