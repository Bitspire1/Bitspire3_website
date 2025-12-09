import client from '../../../tina/__generated__/client';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type ContentType = 'pages' | 'blog' | 'portfolio';

export interface PageData {
  [key: string]: unknown;
}

export interface ProjectData {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  date: string;
  [key: string]: unknown;
}

export interface BlogPostData extends ProjectData {
  description: string;
  _sys: {
    filename: string;
    relativePath: string;
  };
  dateMs: number;
}

/**
 * Load page/blog/portfolio content using TinaCMS client
 */
export async function getPageData(locale: string, slug: string, contentType: ContentType = 'pages'): Promise<PageData | null> {
  try {
    const relativePath = `${locale}/${slug}.mdx`;
    
    // Try TinaCMS first
    try {
      if (contentType === 'pages') {
        const result = await client.queries.pages({ relativePath });
        return result.data.pages as PageData;
      } else if (contentType === 'blog') {
        const result = await client.queries.blog({ relativePath });
        return result.data.blog as PageData;
      } else if (contentType === 'portfolio') {
        const result = await client.queries.portfolio({ relativePath });
        return result.data.portfolio as PageData;
      }
    } catch (tinaError) {
      console.warn(`[getPageData] TinaCMS failed, falling back to filesystem:`, tinaError);
      
      // Fallback to filesystem
      const contentPath = path.join(process.cwd(), 'content', contentType, locale, `${slug}.mdx`);
      const raw = await fs.readFile(contentPath, 'utf8');
      const { data } = matter(raw);
      return data as PageData;
    }
    
    return null;
  } catch (error) {
    console.warn(`[getPageData] Failed to load ${contentType}/${locale}/${slug}:`, error);
    return null;
  }
}

/**
 * Load header data using TinaCMS client
 */
export async function getHeaderData(locale: string): Promise<PageData> {
  try {
    const relativePath = `${locale}/header.mdx`;
    
    // Try TinaCMS first
    try {
      const result = await client.queries.header({ relativePath });
      return result.data.header as PageData;
    } catch (tinaError) {
      console.warn(`[getHeaderData] TinaCMS failed, falling back to filesystem:`, tinaError);
      
      // Fallback to filesystem
      const filePath = path.join(process.cwd(), 'content', 'global', locale, 'header.mdx');
      const raw = await fs.readFile(filePath, 'utf8');
      const { data } = matter(raw);
      return data as PageData;
    }
  } catch (error) {
    console.warn(`[getHeaderData] Failed to load header/${locale}:`, error);
    return { logo: '', logoAlt: '', navigation: [], ctaButton: {} };
  }
}

/**
 * Load footer data using TinaCMS client
 */
export async function getFooterData(locale: string): Promise<PageData> {
  try {
    const relativePath = `${locale}/footer.mdx`;
    
    // Try TinaCMS first
    try {
      const result = await client.queries.footer({ relativePath });
      return result.data.footer as PageData;
    } catch (tinaError) {
      console.warn(`[getFooterData] TinaCMS failed, falling back to filesystem:`, tinaError);
      
      // Fallback to filesystem
      const filePath = path.join(process.cwd(), 'content', 'global', locale, 'footer.mdx');
      const raw = await fs.readFile(filePath, 'utf8');
      const { data } = matter(raw);
      return data as PageData;
    }
  } catch (error) {
    console.warn(`[getFooterData] Failed to load footer/${locale}:`, error);
    return { copyright: '' };
  }
}

/**
 * Load all portfolio projects for a locale using TinaCMS client
 */
export async function getPortfolioProjects(locale: string): Promise<ProjectData[]> {
  try {
    // Try TinaCMS first
    try {
      const result = await client.queries.portfolioConnection();
      const edges = result.data.portfolioConnection.edges || [];

      const projects = edges
        .filter((edge: any) => edge.node._sys.relativePath.startsWith(`${locale}/`))
        .map((edge: any) => {
          const node = edge.node;
          const slug = node._sys.filename;

          return {
            title: String(node.title || ''),
            slug,
            excerpt: String(node.excerpt || ''),
            image: String(node.image || ''),
            imageAlt: String(node.imageAlt || node.title || ''),
            category: String(node.category || ''),
            date: String(node.date || ''),
          };
        });

      return projects;
    } catch (tinaError) {
      console.warn(`[getPortfolioProjects] TinaCMS failed, falling back to filesystem:`, tinaError);
      
      // Fallback to filesystem
      const dir = path.join(process.cwd(), 'content', 'portfolio', locale);
      const entries = await fs.readdir(dir);

      const projects = await Promise.all(
        entries
          .filter((file) => file.endsWith('.mdx'))
          .map(async (file) => {
            const raw = await fs.readFile(path.join(dir, file), 'utf8');
            const { data } = matter(raw);
            const slug = file.replace(/\.mdx$/, '');

            return {
              title: String(data.title || ''),
              slug,
              excerpt: String(data.excerpt || ''),
              image: String(data.image || ''),
              imageAlt: String(data.imageAlt || data.title || ''),
              category: String(data.category || ''),
              date: String(data.date || ''),
            };
          })
      );

      return projects;
    }
  } catch (error) {
    console.warn(`[getPortfolioProjects] Failed to load portfolio projects:`, error);
    return [];
  }
}

/**
 * Load all blog posts for a locale using TinaCMS client
 */
export async function getBlogPosts(locale: string): Promise<BlogPostData[]> {
  try {
    // Try TinaCMS first
    try {
      const result = await client.queries.blogConnection();
      const edges = result.data.blogConnection.edges || [];

      const posts = edges
        .filter((edge: any) => edge.node._sys.relativePath.startsWith(`${locale}/`))
        .map((edge: any) => {
          const node = edge.node;
          const slug = node._sys.filename;
          const dateValue = node.date;

          return {
            ...node,
            title: String(node.title || ''),
            description: String(node.description || node.excerpt || ''),
            excerpt: String(node.excerpt || ''),
            slug,
            image: String(node.image || ''),
            imageAlt: String(node.imageAlt || node.title || ''),
            category: String(node.category || ''),
            date: String(node.date || ''),
            _sys: {
              filename: slug,
              relativePath: node._sys.relativePath,
            },
            dateMs: dateValue ? new Date(String(dateValue)).getTime() : 0,
          } as BlogPostData;
        });

      return posts.sort((a, b) => b.dateMs - a.dateMs);
    } catch (tinaError) {
      console.warn(`[getBlogPosts] TinaCMS failed, falling back to filesystem:`, tinaError);
      
      // Fallback to filesystem
      const dir = path.join(process.cwd(), 'content', 'blog', locale);
      const entries = await fs.readdir(dir).catch(() => [] as string[]);

      const posts = await Promise.all(
        entries
          .filter((file) => file.endsWith('.mdx'))
          .map(async (file) => {
            const raw = await fs.readFile(path.join(dir, file), 'utf8');
            const { data } = matter(raw);
            const dateValue = (data as Record<string, unknown>).date;
            const slug = file.replace(/\.mdx$/, '');

            return {
              ...data,
              title: String((data as Record<string, unknown>).title || ''),
              description: String((data as Record<string, unknown>).description || (data as Record<string, unknown>).excerpt || ''),
              excerpt: String((data as Record<string, unknown>).excerpt || ''),
              slug,
              image: String((data as Record<string, unknown>).image || ''),
              imageAlt: String((data as Record<string, unknown>).imageAlt || (data as Record<string, unknown>).title || ''),
              category: String((data as Record<string, unknown>).category || ''),
              date: String((data as Record<string, unknown>).date || ''),
              _sys: {
                filename: slug,
                relativePath: `${locale}/${file}`,
              },
              dateMs: dateValue ? new Date(String(dateValue)).getTime() : 0,
            } as BlogPostData;
          })
      );

      return posts.sort((a, b) => b.dateMs - a.dateMs);
    }
  } catch (error) {
    console.warn(`[getBlogPosts] Failed to load blog posts:`, error);
    return [];
  }
}
