import React from "react";
import client from "@tina/__generated__/client";
import { Background } from "@/components/background";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const metadata = {
  title: "Blog",
  description: "Artykuły, poradniki i najnowsze trendy w web development od zespołu Bitspire.",
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  try {
    // Fetch all blog posts for the current locale
    const blogConnection = await client.queries.blogConnection();
    
    // Filter posts by locale and remove null/undefined
    const posts = (blogConnection.data.blogConnection.edges || [])
      .map(edge => edge?.node)
      .filter((node): node is NonNullable<typeof node> => 
        node !== null && node !== undefined && node._sys.relativePath.startsWith(`${locale}/`)
      )
      .sort((a, b) => {
        // Sort by date, newest first
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });

    return (
      <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
        <Background />
        <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
          <header className="mb-14 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight">
              {locale === 'pl' ? 'Blog' : 'Blog'}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {locale === 'pl' 
                ? 'Praktyczne porady, najnowsze trendy i głęboka wiedza z zakresu web development. Dzielimy się doświadczeniem i best practices.'
                : 'Practical tips, latest trends, and in-depth knowledge about web development. We share our experience and best practices.'}
            </p>
          </header>

          <BlogListClient posts={posts} locale={locale} />

          {posts.length > 0 && (
            <div className="mt-20 text-center">
              <p className="text-slate-400 text-sm">
                {locale === 'pl' 
                  ? 'Chcesz być na bieżąco? Obserwuj nas w mediach społecznościowych.'
                  : 'Want to stay updated? Follow us on social media.'}
              </p>
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog:', error);
    return (
      <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
        <Background />
        <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
          <p className="text-slate-400 text-center">
            {locale === 'pl' ? 'Wystąpił błąd podczas ładowania bloga.' : 'An error occurred while loading the blog.'}
          </p>
        </main>
      </div>
    );
  }
}
