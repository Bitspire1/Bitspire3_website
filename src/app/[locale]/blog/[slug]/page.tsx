import React from "react";
import client from "@tina/__generated__/client";
import { Background } from "@/components/background";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { convertTinaBodyToMarkdown } from "@/lib/tina-utils";
import { markdownToHtml } from "@/lib/markdown-to-html";
import { RelatedArticles } from "@/components/blog/RelatedArticles";

export async function generateStaticParams() {
  const blogConnection = await client.queries.blogConnection();
  const edges = blogConnection?.data?.blogConnection?.edges;

  if (!edges) {
    throw new Error("Blog params are missing");
  }

  return edges
    .map(edge => edge?.node)
    .filter((node): node is NonNullable<typeof node> => !!node && !!node._sys?.relativePath && !!node._sys?.filename)
    .map((node) => node._sys.relativePath.split('/'))
    .filter((parts) => Array.isArray(parts) && typeof parts[0] === 'string' && parts[0].length > 0)
    .map((parts) => ({
      locale: parts[0],
      slug: parts[parts.length - 1]?.replace(/\.mdx$/, '') || '',
    }))
    .filter((p) => p.locale && p.slug);
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  
  // On Windows, Tina indexes files with backslashes
  const separator = process.platform === 'win32' ? '\\' : '/';
  const response = await client.queries.blog({
    relativePath: `${locale}${separator}${slug}.mdx`,
  });

  const post = response?.data?.blog;

  if (!post) {
    notFound();
  }

  const markdownContent = post.body ? convertTinaBodyToMarkdown(post.body) : '';
  const htmlContent = await markdownToHtml(markdownContent);
  
  const formattedDate = post.date 
    ? new Date(post.date).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  // Fetch all blog posts for related articles
  const blogConnection = await client.queries.blogConnection();
  const relatedEdges = blogConnection?.data?.blogConnection?.edges;

  if (!relatedEdges) {
    throw new Error("Related blog posts are missing");
  }

  const allPosts: Array<{ title: string; slug: string; excerpt?: string; image?: string; date?: string; readTime?: string }> = relatedEdges
    .map(edge => edge?.node)
    .filter(node => node !== null && node !== undefined)
    .filter(node => node._sys.relativePath.startsWith(`${locale}/`))
    .map(node => ({
      title: node.title || '',
      slug: node._sys.filename,
      excerpt: node.excerpt || undefined,
      image: node.image || undefined,
      date: node.date || undefined,
      readTime: node.readTime ? String(node.readTime) : undefined,
    }));

  return (
    <div className="min-h-screen bg-slate-900 pt-24 relative overflow-hidden">
      <Background />
      
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <article className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <Link 
            href={`/${locale}/blog`}
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {locale === 'pl' ? 'Powrót do bloga' : 'Back to blog'}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          {post.category && (
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          )}
          
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
            {post.author && (
              <>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author}
                </span>
              </>
            )}
            {post.readTime && (
              <>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime} {locale === 'pl' ? 'min' : 'min'}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full aspect-video mb-16 rounded-2xl overflow-hidden border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 to-emerald-500/10 rounded-3xl blur-2xl -z-10" />
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

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800/50">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L3 14.67V21h6.33l10.06-10.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {locale === 'pl' ? 'Tagi' : 'Tags'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag: string | null) => tag && (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm bg-slate-800/50 text-slate-300 rounded-full border border-blue-500/20 hover:border-blue-500/40 hover:bg-slate-800/70 transition-all cursor-default"
                >
                  #{tag}
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

      {/* Related Articles */}
      {allPosts.length > 0 && (
        <RelatedArticles 
          articles={allPosts}
          currentSlug={slug}
          locale={locale}
          type="blog"
        />
      )}
    </div>
  );
}
