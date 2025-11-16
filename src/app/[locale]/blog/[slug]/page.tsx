import React from "react";
import client from "@tina/__generated__/client";
import { Background } from "@/components/background";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Convert Tina's rich-text JSON to markdown
function convertTinaBodyToMarkdown(body: any): string {
  if (!body || !body.children) return '';
  
  let markdown = '';
  
  const processNode = (node: any): string => {
    if (!node) return '';
    
    if (node.type === 'text') {
      let text = node.text || '';
      if (node.bold) text = `**${text}**`;
      if (node.italic) text = `*${text}*`;
      if (node.code) text = `\`${text}\``;
      return text;
    }
    
    const children = node.children?.map(processNode).join('') || '';
    
    switch (node.type) {
      case 'h1': return `# ${children}\n\n`;
      case 'h2': return `## ${children}\n\n`;
      case 'h3': return `### ${children}\n\n`;
      case 'h4': return `#### ${children}\n\n`;
      case 'h5': return `##### ${children}\n\n`;
      case 'h6': return `###### ${children}\n\n`;
      case 'p': return `${children}\n\n`;
      case 'blockquote': return `> ${children}\n\n`;
      case 'ul': return `${children}\n`;
      case 'ol': return `${children}\n`;
      case 'li': return `- ${children}\n`;
      case 'code_block': 
        const language = node.lang || '';
        return `\`\`\`${language}\n${children}\n\`\`\`\n\n`;
      case 'hr': return `---\n\n`;
      case 'a':
        return `[${children}](${node.url || '#'})`;
      case 'img':
        return `![${node.alt || ''}](${node.url || ''})`;
      default: return children;
    }
  };
  
  body.children.forEach((node: any) => {
    markdown += processNode(node);
  });
  
  return markdown;
}

// Custom MDX components for styling
const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 mt-6" {...props} />,
  h4: (props: any) => <h4 className="text-xl md:text-2xl font-semibold text-slate-200 mb-3 mt-5" {...props} />,
  p: (props: any) => <p className="text-slate-300 leading-relaxed mb-4 text-base md:text-lg" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2 ml-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2 ml-4" {...props} />,
  li: (props: any) => <li className="text-slate-300 leading-relaxed" {...props} />,
  a: (props: any) => <a className="text-blue-400 hover:text-blue-300 underline transition-colors" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-slate-400 bg-slate-800/30" {...props} />
  ),
  code: (props: any) => {
    const { children, className } = props;
    const isInline = !className;
    
    if (isInline) {
      return <code className="bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded text-sm" {...props} />;
    }
    
    return (
      <code className="block bg-slate-800/50 p-4 rounded-lg overflow-x-auto text-sm my-4 border border-slate-700" {...props}>
        {children}
      </code>
    );
  },
  pre: (props: any) => <pre className="my-4" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  em: (props: any) => <em className="italic text-slate-200" {...props} />,
  hr: () => <hr className="my-8 border-slate-700" />,
};

export async function generateStaticParams() {
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
