import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bitspire.pl';
  
  const buildEntriesFromDir = async (collection: 'blog' | 'portfolio') => {
    const collectionDir = path.join(process.cwd(), 'content', collection);
    const locales = await fs.readdir(collectionDir).catch(() => [] as string[]);

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
      const localeDir = path.join(collectionDir, locale);
      const stat = await fs.stat(localeDir);
      if (!stat.isDirectory()) continue;

      const files = await fs.readdir(localeDir);
      for (const file of files) {
        if (!file.endsWith('.mdx')) continue;
        const slug = file.replace(/\.mdx$/, '');
        const raw = await fs.readFile(path.join(localeDir, file), 'utf8');
        const { data } = matter(raw);
        const date = data.date ? new Date(String(data.date)) : new Date();

        entries.push({
          url: `${baseUrl}/${locale}/${collection}/${slug}`,
          lastModified: date,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }

    return entries;
  };

  const portfolioPosts = await buildEntriesFromDir('portfolio');
  const blogPosts = await buildEntriesFromDir('blog');

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...portfolioPosts,
    ...blogPosts,
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/polityka-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
