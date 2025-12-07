'use client';

import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchFilterProps {
  allTags: string[];
  onSearchChange: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  locale: string;
  type: 'blog' | 'portfolio';
}

interface TranslationStrings {
  searchPlaceholder: string;
  clearSearch: string;
  filterByTech: string;
  clearFilters: string;
  showLess: string;
  showMore: (count: number) => string;
  activeFilters: string;
  removeFilter: (tag: string) => string;
}

type Translations = {
  blog: {
    pl: TranslationStrings;
    en: TranslationStrings;
  };
  portfolio: {
    pl: TranslationStrings;
    en: TranslationStrings;
  };
};

const translations: Translations = {
  blog: {
    pl: {
      searchPlaceholder: 'Szukaj artykułów...',
      clearSearch: 'Wyczyść wyszukiwanie',
      filterByTech: 'Filtruj po tagach',
      clearFilters: 'Wyczyść filtry',
      showLess: 'Pokaż mniej',
      showMore: (count: number) => `+${count} więcej`,
      activeFilters: 'Aktywne filtry:',
      removeFilter: (tag: string) => `Usuń filtr ${tag}`,
    },
    en: {
      searchPlaceholder: 'Search articles...',
      clearSearch: 'Clear search',
      filterByTech: 'Filter by tags',
      clearFilters: 'Clear filters',
      showLess: 'Show less',
      showMore: (count: number) => `+${count} more`,
      activeFilters: 'Active filters:',
      removeFilter: (tag: string) => `Remove filter ${tag}`,
    },
  },
  portfolio: {
    pl: {
      searchPlaceholder: 'Szukaj projektów...',
      clearSearch: 'Wyczyść wyszukiwanie',
      filterByTech: 'Filtruj po technologiach',
      clearFilters: 'Wyczyść filtry',
      showLess: 'Pokaż mniej',
      showMore: (count: number) => `+${count} więcej`,
      activeFilters: 'Aktywne filtry:',
      removeFilter: (tag: string) => `Usuń filtr ${tag}`,
    },
    en: {
      searchPlaceholder: 'Search projects...',
      clearSearch: 'Clear search',
      filterByTech: 'Filter by technology',
      clearFilters: 'Clear filters',
      showLess: 'Show less',
      showMore: (count: number) => `+${count} more`,
      activeFilters: 'Active filters:',
      removeFilter: (tag: string) => `Remove filter ${tag}`,
    },
  },
};

export function SearchFilter({
  allTags,
  onSearchChange,
  onTagsChange,
  locale,
  type,
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const typeTranslations =
    translations[type][locale as keyof (typeof translations)[typeof type]] ||
    translations[type].en;

  // Limit tags displayed initially
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 8);
  const hiddenTagsCount = Math.max(0, allTags.length - 8);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    onTagsChange(newTags);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearchChange('');
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
    onSearchChange('');
    onTagsChange([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="mb-12 space-y-6">
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={typeTranslations.searchPlaceholder}
            className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label={typeTranslations.clearSearch}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm font-medium text-slate-400">
              {typeTranslations.filterByTech}
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors self-start sm:self-auto"
              >
                {typeTranslations.clearFilters}
              </button>
            )}
          </div>

          {/* Tags Pills */}
          <div className="flex flex-wrap gap-2">
            {displayedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-slate-200'
                }`}
                aria-pressed={selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}

            {/* Show More/Less button */}
            {allTags.length > 8 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showAllTags
                  ? typeTranslations.showLess
                  : typeTranslations.showMore(hiddenTagsCount)}
              </button>
            )}
          </div>

          {/* Active filters display */}
          {selectedTags.length > 0 && (
            <div className="pt-4 border-t border-slate-700/50">
              <p className="text-xs text-slate-500 mb-2">
                {typeTranslations.activeFilters}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-xs text-blue-300 hover:bg-blue-500/30 transition-all"
                    aria-label={typeTranslations.removeFilter(tag)}
                  >
                    {tag}
                    <FaTimes className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
