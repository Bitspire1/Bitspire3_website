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
  
  // Fetch all blog posts for the current locale
  const blogConnection = await client.queries.blogConnection();
  const edges = blogConnection?.data?.blogConnection?.edges;

  if (!edges) {
    throw new Error("Blog data is missing");
  }
  
  // Filter posts by locale and remove null/undefined
  const posts = edges
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
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <Background />
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <header className="mb-14 text-center">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              {locale === 'pl' ? 'Wiedza' : 'Knowledge'}
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{locale === 'pl' ? 'Nasz ' : 'Our '}</span>
            <span className="text-gradient">Blog</span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
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
}
