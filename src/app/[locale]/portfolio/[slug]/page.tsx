import React from "react";
import { promises as fs } from "fs";
import path from "path";
import client from "@tina/__generated__/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Background } from "@/components/background";
import { convertTinaBodyToMarkdown } from "@/lib/tina-utils";
import { markdownToHtml } from "@/lib/markdown-to-html";

interface PortfolioPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Read portfolio files from content/ directory to generate static params
// Avoids 403 Forbidden errors with read-only tokens during build
async function getPortfolioSlugs() {
  try {
    const contentDir = path.join(process.cwd(), "content", "portfolio");
    const locales = await fs.readdir(contentDir);
    
    const params: { locale: string; slug: string }[] = [];
    
    for (const locale of locales) {
      const localeDir = path.join(contentDir, locale);
      const stat = await fs.stat(localeDir);
      
      if (!stat.isDirectory()) continue;
      
      const files = await fs.readdir(localeDir);
      for (const file of files) {
        if (file.endsWith(".mdx")) {
          const slug = file.replace(/\.mdx$/, "");
          params.push({ locale, slug });
        }
      }
    }
    
    return params;
  } catch (error) {
    console.warn("[portfolio/[slug]] Failed to read portfolio files from filesystem:", error);
    return [];
  }
}

export async function generateStaticParams() {
  // Read from filesystem (no token required, faster, more reliable)
  return await getPortfolioSlugs();
}

export default async function PortfolioPostPage({ params }: PortfolioPostPageProps) {
  const { locale, slug } = await params;
  
  // On Windows, Tina indexes files with backslashes
  const separator = process.platform === 'win32' ? '\\' : '/';
  const postData = await client.queries.portfolio({
    relativePath: `${locale}${separator}${slug}.mdx`,
  });

  const post = postData?.data?.portfolio;
  
  if (!post) {
    notFound();
  }

  // Format date
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';
  
  // Convert markdown to HTML
  const markdownContent = post.body && typeof post.body === 'object' && 'children' in post.body 
    ? convertTinaBodyToMarkdown(post.body) 
    : '';
  const htmlContent = await markdownToHtml(markdownContent);

  return (
    <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
      <Background />
      
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <article className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        {/* Back button */}
        <Link 
          href={`/${locale}/portfolio`}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{locale === 'pl' ? 'Powrót do portfolio' : 'Back to portfolio'}</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && (
              <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full backdrop-blur-sm">
                {post.category}
              </span>
            )}
            {post.year && (
              <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                {post.year}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 border-t border-slate-800 pt-6">
            {formattedDate && (
              <time dateTime={post.date || undefined} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </time>
            )}
            {post.client && (
              <>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {post.client}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Featured image */}
        {post.image && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 to-emerald-500/10 rounded-3xl blur-2xl -z-10" />
            <Image
              src={post.image}
              alt={post.imageAlt || post.title || 'Project image'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12">
            {post.tags.map((tag: string | null) => tag && (
              <span
                key={tag}
                className="px-4 py-2 text-sm bg-slate-800/50 text-slate-300 rounded-full border border-blue-500/20 hover:border-blue-500/40 hover:bg-slate-800/70 transition-all cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:mb-6 prose-headings:mt-8
            prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:text-gradient prose-h1:from-blue-400 prose-h1:to-emerald-300
            prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:text-gradient prose-h2:from-blue-400 prose-h2:to-emerald-300
            prose-h3:text-2xl prose-h3:text-white
            prose-h4:text-xl prose-h4:text-slate-200
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-blue-400 prose-a:no-underline prose-a:transition-colors hover:prose-a:text-emerald-300 hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-slate-200
            prose-code:text-emerald-300 prose-code:bg-slate-800/70 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:border prose-code:border-blue-500/20
            prose-pre:bg-slate-800/70 prose-pre:border prose-pre:border-blue-500/30 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-ul:list-disc prose-ul:ml-6 prose-li:text-slate-300 prose-li:mb-2
            prose-ol:list-decimal prose-ol:ml-6
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-300
            prose-img:rounded-xl prose-img:border prose-img:border-blue-500/20 prose-img:shadow-[0_0_30px_rgba(59,130,246,0.1)]
            prose-hr:border-slate-800 prose-hr:my-12
            prose-table:border prose-table:border-slate-800 prose-table:rounded-lg
            prose-th:bg-slate-800/50 prose-th:text-white prose-th:font-semibold
            prose-td:text-slate-300 prose-td:border-slate-800
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Project link */}
        {post.link && (
          <div className="mt-16 pt-8 border-t border-slate-800/50">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-emerald-500 text-white text-base font-semibold px-8 py-4 shadow-lg shadow-blue-600/30 transition-all hover:shadow-blue-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900 group"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {locale === 'pl' ? 'Zobacz projekt' : 'View Project'}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}

        {/* Back to portfolio */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <Link 
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <span>←</span>
            <span>{locale === 'pl' ? 'Zobacz więcej projektów' : 'See more projects'}</span>
          </Link>
        </div>
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: PortfolioPostPageProps) {
  const { locale, slug } = await params;
  const postData = await client.queries.portfolio({
    relativePath: `${locale}/${slug}.mdx`,
  });

  const post = postData?.data?.portfolio;

  if (!post) {
    notFound();
  }

  return {
    title: post.title || 'Portfolio',
    description: post.description || post.excerpt || '',
    openGraph: post.image ? {
      images: [post.image],
    } : undefined,
  };
}
