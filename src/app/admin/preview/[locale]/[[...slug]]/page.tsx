import React from 'react';
import client from '@tina/__generated__/client';
import PreviewClient from '@/providers/PreviewClient';

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  
  // Determine the collection and file name based on slug
  // slug can be undefined, ['home'], ['portfolio'], ['portfolio', 'skladamy'], ['polityka-prywatnosci'], etc.
  let collection: 'pages' | 'portfolio' = 'pages';
  let fileName = 'home';
  
  if (slug && slug.length > 0) {
    if (slug[0] === 'portfolio' && slug.length > 1) {
      // Portfolio post preview
      collection = 'portfolio';
      fileName = slug[1];
    } else {
      // Regular page preview
      collection = 'pages';
      fileName = slug[0];
    }
  }
  
  const relativePath = `${locale}/${fileName}.mdx`;
  
  try {
    let result;
    
    if (collection === 'portfolio') {
      result = await client.queries.portfolio({ relativePath });
    } else {
      result = await client.queries.pages({ relativePath });
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
