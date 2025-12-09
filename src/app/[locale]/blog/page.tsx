import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Background } from "@/components/layout/background";
import { BlogListClient } from "@/components/sections/Blog/BlogListClient";

export const metadata = {
  title: "Blog",
  description: "Artykuły, poradniki i najnowsze trendy w web development od zespołu Bitspire.",
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const blogDir = path.join(process.cwd(), "content", "blog", locale);
  const files = await fs.readdir(blogDir);
  const posts = await Promise.all(
    files.filter(f => f.endsWith(".mdx")).map(async (file) => {
      const content = await fs.readFile(path.join(blogDir, file), "utf-8");
      const { data } = matter(content);
      return { ...data, slug: file.replace(".mdx", ""), _sys: { filename: file.replace(".mdx", ""), relativePath: `${locale}/${file}` } };
    })
  );

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
