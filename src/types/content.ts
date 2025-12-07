export interface ListPost {
  _sys: {
    filename: string;
    relativePath: string;
  };
  title: string;
  slug: string;
  description: string;
  excerpt?: string | null;
  date?: string | null;
  category?: string | null;
  tags?: (string | null)[] | null;
  image?: string | null;
  imageAlt?: string | null;
  [key: string]: unknown;
}

export interface ListTranslations {
  noItems: string;
  readMore: string;
  resultsCount: (count: number) => string;
  viewProject?: string;
  readTime?: (minutes: number) => string;
  by?: string;
  [key: string]: string | ((count: number) => string) | ((minutes: number) => string) | undefined;
}
