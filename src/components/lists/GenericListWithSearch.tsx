'use client';

import React, { useState, useMemo } from 'react';
import { SearchFilter } from '../ui/SearchFilter';
import type { ListPost, ListTranslations } from '@/types';
export type { ListPost, ListTranslations } from '@/types';

interface GenericListWithSearchProps<T extends ListPost> {
  posts: T[];
  locale: string;
  type: 'blog' | 'portfolio';
  translations: {
    pl: ListTranslations;
    en: ListTranslations;
  };
  renderCard: (post: T, slug: string, locale: string, t: ListTranslations) => React.ReactNode;
  gridClassName?: string;
  searchableFields: (keyof T)[];
}

/**
 * Generic list component with search and filtering
 * Consolidates common functionality for blog and portfolio lists
 */
export function GenericListWithSearch<T extends ListPost>({
  posts,
  locale,
  type,
  translations,
  renderCard,
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  searchableFields,
}: GenericListWithSearchProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const t = translations[locale as keyof typeof translations] || translations.en;

  // Get all unique tags from all posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        if (tag) tagsSet.add(tag);
      });
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        searchableFields.some((field) => {
          const value = post[field];
          return (
            typeof value === 'string' &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) =>
          post.tags?.some((tag) => tag === selectedTag)
        );

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags, searchableFields]);

  return (
    <>
      {/* Search and Filter */}
      <SearchFilter
        allTags={allTags}
        onSearchChange={setSearchQuery}
        onTagsChange={setSelectedTags}
        locale={locale}
        type={type}
      />

      {/* Results count */}
      {(searchQuery || selectedTags.length > 0) && (
        <div className="mb-6 text-center">
          <p className="text-sm text-slate-400">
            {t.resultsCount(filteredPosts.length)}
          </p>
        </div>
      )}

      {/* List Grid */}
      <section
        aria-label={type === 'blog' ? 'Blog posts' : 'Portfolio projects'}
        className={gridClassName}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const slug = post._sys.filename;
            return (
              <React.Fragment key={post._sys.relativePath}>
                {renderCard(post, slug, locale, t)}
              </React.Fragment>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">{t.noItems}</p>
          </div>
        )}
      </section>
    </>
  );
}
