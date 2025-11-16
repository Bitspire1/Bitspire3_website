'use client';

import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface BlogSearchProps {
  allTags: string[];
  onSearchChange: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  locale: string;
}

const translations = {
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
};

export function BlogSearch({ allTags, onSearchChange, onTagsChange, locale }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const t = translations[locale as keyof typeof translations] || translations.en;

  // Limit tags displayed initially
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 8);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
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
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label={t.clearSearch}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              {t.filterByTech}
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                {t.clearFilters}
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {displayedTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              const baseClasses = "px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer";
              const selectedClasses = isSelected
                ? "bg-blue-600 text-white border-2 border-blue-400 shadow-lg shadow-blue-600/30"
                : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800";
              
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`${baseClasses} ${selectedClasses}`}
                  aria-pressed={isSelected}
                >
                  {tag}
                </button>
              );
            })}
            
            {allTags.length > 8 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-400 hover:text-slate-200 border border-slate-600/50 hover:border-slate-500 transition-all"
              >
                {showAllTags ? t.showLess : t.showMore(allTags.length - 8)}
              </button>
            )}
          </div>

          {/* Selected tags summary */}
          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-400">{t.activeFilters}</span>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-full text-xs"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="hover:text-blue-100 transition-colors"
                      aria-label={t.removeFilter(tag)}
                    >
                      <FaTimes className="text-[10px]" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
