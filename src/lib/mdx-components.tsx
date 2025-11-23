/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

/**
 * Shared MDX components for consistent styling across blog and portfolio pages
 */
export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mt-12 mb-6" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mt-12 mb-6" {...props} />
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
  code: (props: any) => {
    const { children, className } = props;
    const isInline = !className;
    
    if (isInline) {
      return <code className="text-blue-300 bg-slate-800/50 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    }
    
    return (
      <code className="block bg-slate-800/50 text-sm" {...props}>
        {children}
      </code>
    );
  },
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
  hr: () => <hr className="my-8 border-slate-700" />,
};
