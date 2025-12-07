'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GenericListWithSearch, ListPost } from '@/components/lists/GenericListWithSearch';
import type { ListTranslations } from '@/components/lists/GenericListWithSearch';

interface BlogPost extends ListPost {
  author?: string | null;
  readTime?: number | null;
}

interface BlogListClientProps {
  posts: BlogPost[];
  locale: string;
}

const translations = {
  pl: {
    noItems: 'Brak artykułów pasujących do wybranych filtrów.',
    readMore: 'Czytaj więcej',
    readTime: (minutes: number) => `${minutes} min czytania`,
    by: 'przez',
    resultsCount: (count: number) => `Znaleziono ${count} ${count === 1 ? 'artykuł' : count < 5 ? 'artykuły' : 'artykułów'}`,
  },
  en: {
    noItems: 'No articles match the selected filters.',
    readMore: 'Read more',
    readTime: (minutes: number) => `${minutes} min read`,
    by: 'by',
    resultsCount: (count: number) => `Found ${count} article${count !== 1 ? 's' : ''}`,
  },
};

const renderBlogCard = (
  post: BlogPost,
  slug: string,
  locale: string,
  t: ListTranslations
) => {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString(
        locale === 'pl' ? 'pl-PL' : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )
    : '';

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-800/40 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Image */}
      {post.image && (
        <Link href={`/${locale}/blog/${slug}`}>
          <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title || 'Blog post image'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-400">
              {post.category}
            </span>
          )}
          {post.readTime && (
            <span className="text-xs text-slate-500">
              {t.readTime ? t.readTime(post.readTime) : ''}
            </span>
          )}
        </div>

        <Link href={`/${locale}/blog/${slug}`}>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors mb-3 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {formattedDate && (
          <time
            className="text-xs text-slate-400 mb-2 block"
            dateTime={post.date || undefined}
          >
            {formattedDate}{' '}
            {post.author && `• ${t.by || 'by'} ${post.author}`}
          </time>
        )}

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt || post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags
              .filter((tag): tag is string => !!tag)
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] md:text-xs px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50"
                >
                  {tag}
                </span>
              ))}
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={`/${locale}/blog/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
        >
          {t.readMore}
          <span className="group-hover:translate-x-1 transition-transform" aria-hidden>
            →
          </span>
        </Link>
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </article>
  );
};

export function BlogListClient({ posts, locale }: BlogListClientProps) {
  return (
    <GenericListWithSearch<BlogPost>
      posts={posts}
      locale={locale}
      type="blog"
      translations={translations}
      renderCard={renderBlogCard}
      gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      searchableFields={['title', 'description', 'excerpt', 'category', 'author']}
    />
  );
}