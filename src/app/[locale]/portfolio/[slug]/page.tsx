import React from "react";
import client from "@tina/__generated__/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Background } from "@/components/background";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PortfolioPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// MDX Components for custom styling
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mt-12 mb-6" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mt-12 mb-6" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl md:text-3xl font-bold text-slate-200 tracking-tight mt-8 mb-4" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl md:text-2xl font-semibold text-slate-300 mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-slate-300 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-slate-300" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-slate-300" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-slate-300 marker:text-blue-400" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-400 hover:text-blue-300 underline transition-colors" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-slate-200 font-semibold" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-slate-300 italic" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-blue-500 bg-slate-800/30 py-4 px-6 my-6 rounded-r-lg text-slate-300 italic" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="text-blue-300 bg-slate-800/50 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto mb-6 border border-slate-700/50" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-8 rounded-lg overflow-hidden border border-slate-700/50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-full h-auto" {...props} alt={props.alt || ''} />
    </span>
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-slate-700" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2 text-left text-slate-200 font-semibold bg-slate-800/50" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 text-slate-300 border-t border-slate-700/50" {...props} />
  ),
};

// Helper function to convert Tina body to markdown string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertTinaBodyToMarkdown(body: any): string {
  if (typeof body === 'string') return body;
  
  if (!body || !body.children || !Array.isArray(body.children)) {
    return '';
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processNode = (node: any): string => {
    if (!node) return '';
    
    // Text node
    if (node.type === 'text') {
      let text = node.text || '';
      if (node.bold) text = `**${text}**`;
      if (node.italic) text = `*${text}*`;
      if (node.code) text = `\`${text}\``;
      return text;
    }
    
    // Process children
    const children = node.children?.map(processNode).join('') || '';
    
    // Element nodes
    switch (node.type) {
      case 'h1':
        return `\n# ${children}\n`;
      case 'h2':
        return `\n## ${children}\n`;
      case 'h3':
        return `\n### ${children}\n`;
      case 'h4':
        return `\n#### ${children}\n`;
      case 'h5':
        return `\n##### ${children}\n`;
      case 'h6':
        return `\n###### ${children}\n`;
      case 'p':
        return `\n${children}\n`;
      case 'blockquote':
        return `\n> ${children}\n`;
      case 'ul':
        return `\n${children}\n`;
      case 'ol':
        return `\n${children}\n`;
      case 'li':
        return `- ${children}\n`;
      case 'a':
        return `[${children}](${node.url || '#'})`;
      case 'img':
        return `\n![${node.alt || ''}](${node.url || ''})\n`;
      case 'code_block':
        return `\n\`\`\`${node.lang || ''}\n${children}\n\`\`\`\n`;
      case 'hr':
        return '\n---\n';
      default:
        return children;
    }
  };
  
  return body.children.map(processNode).join('');
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

            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mb-4">
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
          <div className="mdx-content">
            {post.body && typeof post.body === 'object' && 'children' in post.body ? (
              <MDXRemote 
                source={convertTinaBodyToMarkdown(post.body)}
                components={mdxComponents}
              />
            ) : null}
          </div>

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
