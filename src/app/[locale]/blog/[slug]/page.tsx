import React from "react";
import client from "@tina/__generated__/client";
import { Background } from "@/components/background";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';
import { convertTinaBodyToMarkdown } from "@/lib/tina-utils";
import { mdxComponents } from "@/lib/mdx-components";

export async function generateStaticParams() {
  try {
    const blogConnection = await client.queries.blogConnection();
    const posts = blogConnection.data.blogConnection.edges || [];

    return posts
      .map(edge => edge?.node)
      .filter(node => node !== null && node !== undefined)
      .map(node => {
        const pathParts = node._sys.relativePath.split('/');
        return {
          locale: pathParts[0],
          slug: node._sys.filename,
        };
      });
  } catch (error) {
    // If fetching the blogConnection fails during build, log a warning and fallback to reading local files.
    console.error('generateStaticParams: Failed to fetch blogConnection for static params:', error);
    // Fallback: read from local content/blog folder
    try {
      const contentDir = path.join(process.cwd(), 'content', 'blog');
      if (!fs.existsSync(contentDir)) return [];

      const locales = fs.readdirSync(contentDir).filter((f: string) => fs.statSync(path.join(contentDir, f)).isDirectory());
      const params: Array<{ locale: string; slug: string }> = [];
      locales.forEach((loc: string) => {
        const files = fs.readdirSync(path.join(contentDir, loc)).filter((f: string) => f.endsWith('.mdx'));
        files.forEach((file: string) => {
          params.push({ locale: loc, slug: file.replace(/\.mdx$/, '') });
        });
      });
      return params;
    } catch (fsError) {
      console.error('generateStaticParams: Failed to build static params from local files:', fsError);
      return [];
    }
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  
  try {
    const response = await client.queries.blog({
      relativePath: `${locale}/${slug}.mdx`,
    });

    if (!response.data.blog) {
      notFound();
    }

    const post = response.data.blog;
    const markdownContent = post.body ? convertTinaBodyToMarkdown(post.body) : '';
    
    const formattedDate = post.date 
      ? new Date(post.date).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '';

    return (
      <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
        <Background />
        <article className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm">
            <Link 
              href={`/${locale}/blog`}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← {locale === 'pl' ? 'Powrót do bloga' : 'Back to blog'}
            </Link>
          </nav>

          {/* Header */}
          <header className="mb-10">
            {post.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full">
                  {post.category}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-slate-400 leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 border-t border-b border-slate-800 py-4">
              {formattedDate && (
                <time dateTime={post.date || undefined}>
                  {formattedDate}
                </time>
              )}
              {post.author && (
                <>
                  <span>•</span>
                  <span>{locale === 'pl' ? 'przez' : 'by'} {post.author}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>
                    {post.readTime} {locale === 'pl' ? 'min czytania' : 'min read'}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden border border-slate-800">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title || 'Blog post image'}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <MDXRemote source={markdownContent} components={mdxComponents} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-800">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {locale === 'pl' ? 'Tagi' : 'Tags'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags
                  .filter((tag): tag is string => !!tag)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm bg-slate-800/50 text-slate-300 rounded-full border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-16 text-center">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/30"
            >
              {locale === 'pl' ? 'Zobacz więcej artykułów' : 'Read more articles'}
            </Link>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}
