import React from "react";
import client from "@tina/__generated__/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Background } from "@/components/background";
import { convertTinaBodyToMarkdown } from "@/lib/tina-utils";
import { markdownToHtml } from "@/lib/markdown-to-html";
import fs from 'fs';
import path from 'path';

interface PortfolioPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const portfolioConnection = await client.queries.portfolioConnection();
    const posts = portfolioConnection.data.portfolioConnection.edges || [];

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
    // If fetching the portfolioConnection fails during build, log a warning and fallback to reading local files.
    console.error('generateStaticParams: Failed to fetch portfolioConnection for static params:', error);
    // Fallback: read from local content/portfolio folder
    try {
      const contentDir = path.join(process.cwd(), 'content', 'portfolio');
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

export default async function PortfolioPostPage({ params }: PortfolioPostPageProps) {
  const { locale, slug } = await params;
  
  try {
    const postData = await client.queries.portfolio({
      relativePath: `${locale}/${slug}.mdx`,
    });

    const post = postData.data.portfolio;
    
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
        
        <article className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
          {/* Back button */}
          <Link 
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <span>←</span>
            <span>{locale === 'pl' ? 'Powrót do portfolio' : 'Back to portfolio'}</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <span className="text-xs uppercase tracking-wider font-semibold bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                  {post.category}
                </span>
              )}
              {post.year && (
                <span className="text-xs uppercase tracking-wider font-semibold bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                  {post.year}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              {formattedDate && (
                <time dateTime={post.date || undefined}>
                  {formattedDate}
                </time>
              )}
              {post.client && (
                <>
                  <span>•</span>
                  <span>{locale === 'pl' ? 'Klient' : 'Client'}: {post.client}</span>
                </>
              )}
            </div>
          </header>

          {/* Featured image */}
          {post.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-slate-700/50">
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
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag: string | null) => tag && (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-wide bg-slate-800/70 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:bg-linear-to-r prose-h1:from-blue-400 prose-h1:to-emerald-300 prose-h1:bg-clip-text prose-h1:text-transparent
              prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:bg-linear-to-r prose-h2:from-blue-400 prose-h2:to-emerald-300 prose-h2:bg-clip-text prose-h2:text-transparent
              prose-h3:text-2xl prose-h3:text-slate-200
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-slate-200
              prose-code:text-blue-300 prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700/50
              prose-ul:list-disc prose-li:text-slate-300
              prose-img:rounded-lg prose-img:border prose-img:border-slate-700/50
            "
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Project link */}
          {post.link && (
            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-8 py-4 shadow-lg shadow-blue-600/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900"
              >
                {locale === 'pl' ? 'Zobacz projekt' : 'View Project'}
                <span aria-hidden>→</span>
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
  } catch (error) {
    console.error('Error loading portfolio post:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: PortfolioPostPageProps) {
  const { locale, slug } = await params;
  
  try {
    const postData = await client.queries.portfolio({
      relativePath: `${locale}/${slug}.mdx`,
    });

    const post = postData.data.portfolio;

    return {
      title: post.title || 'Portfolio',
      description: post.description || post.excerpt || '',
      openGraph: post.image ? {
        images: [post.image],
      } : undefined,
    };
  } catch {
    return {
      title: 'Portfolio',
    };
  }
}
