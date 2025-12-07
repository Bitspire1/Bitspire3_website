'use client';

import { SearchFilter } from './SearchFilter';

export function BlogSearch({
  allTags,
  onSearchChange,
  onTagsChange,
  locale,
}: {
  allTags: string[];
  onSearchChange: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  locale: string;
}) {
  return (
    <SearchFilter
      allTags={allTags}
      onSearchChange={onSearchChange}
      onTagsChange={onTagsChange}
      locale={locale}
      type="blog"
    />
  );
}
