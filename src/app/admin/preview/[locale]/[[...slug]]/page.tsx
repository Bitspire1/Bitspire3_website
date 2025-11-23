import React from 'react';
import client from '@tina/__generated__/client';
import PreviewClient from '@/providers/PreviewClient';

// Force dynamic rendering - no caching for preview
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Load selected portfolio projects
async function getPortfolioProjects(selectedProjects: string[] | null | undefined) {
  if (!selectedProjects || !Array.isArray(selectedProjects)) {
    return [];
  }

  try {
    const projects = await Promise.all(
      selectedProjects.map(async (projectPath) => {
        try {
          const relativePath = `${projectPath}.mdx`;
          const result = await client.queries.portfolio({ relativePath });
          return result?.data?.portfolio || null;
        } catch (error) {
          console.error(`Error loading project ${projectPath}:`, error);
          return null;
        }
      })
    );

    return projects.filter(p => p !== null);
  } catch (error) {
    console.error('Error loading portfolio projects:', error);
    return [];
  }
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  
  // Determine the collection and file name based on slug
  // slug can be undefined, ['home'], ['portfolio'], ['portfolio', 'slug'], ['blog', 'slug'], etc.
  let collection: 'pages' | 'portfolio' | 'blog' = 'pages';
  let fileName = 'home';
  
  if (slug && slug.length > 0) {
    if (slug[0] === 'portfolio') {
      if (slug.length > 1) {
        // Portfolio post preview: /admin/preview/pl/portfolio/sklep-ecommerce
        collection = 'portfolio';
        fileName = slug[1];
      } else {
        // Portfolio listing page - use portfolio.mdx from pages collection
        collection = 'pages';
        fileName = 'portfolio';
      }
    } else if (slug[0] === 'blog') {
      if (slug.length > 1) {
        // Blog post preview: /admin/preview/pl/blog/jak-wybrac-technologie
        collection = 'blog';
        fileName = slug[1];
      } else {
        // Blog listing page - use blog.mdx from pages collection
        collection = 'pages';
        fileName = 'blog';
      }
    } else {
      // Regular page preview: /admin/preview/pl/home or /admin/preview/pl/polityka-prywatnosci
      collection = 'pages';
      fileName = slug[0];
    }
  }
  
  const relativePath = `${locale}/${fileName}.mdx`;
  
  try {
    let result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let portfolioProjects: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let blogPosts: any[] = [];
    
    if (collection === 'portfolio') {
      result = await client.queries.portfolio({ relativePath });
    } else if (collection === 'blog') {
      result = await client.queries.blog({ relativePath });
    } else {
      result = await client.queries.pages({ relativePath });
      
      // Load portfolio projects if this is a pages collection with selectedProjects
      if (result?.data?.pages && 'selectedProjects' in result.data.pages) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedProjects = (result.data.pages as any).selectedProjects;
        portfolioProjects = await getPortfolioProjects(selectedProjects);
      }
      
      // Load blog posts if this is the blog listing page
      if (fileName === 'blog') {
        try {
          const blogConnection = await client.queries.blogConnection();
          blogPosts = (blogConnection.data.blogConnection.edges || [])
            .map(edge => edge?.node)
            .filter((node): node is NonNullable<typeof node> => 
              node !== null && node !== undefined && node._sys.relativePath.startsWith(`${locale}/`)
            )
            .sort((a, b) => {
              const dateA = a.date ? new Date(a.date).getTime() : 0;
              const dateB = b.date ? new Date(b.date).getTime() : 0;
              return dateB - dateA;
            });
        } catch (error) {
          console.error('Error loading blog posts:', error);
        }
      }
    }
    
    if (!result?.data) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
          <div className="text-white">Page not found: {relativePath}</div>
        </div>
      );
    }

    return (
      <PreviewClient 
        data={result.data}
        query={result.query}
        variables={result.variables}
        portfolioProjects={portfolioProjects}
        blogPosts={blogPosts}
      />
    );
  } catch (error) {
    console.error('Error loading page data:', error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">
          <p>Error loading page: {relativePath}</p>
          <p className="text-sm text-red-400 mt-2">{String(error)}</p>
        </div>
      </div>
    );
  }
}
