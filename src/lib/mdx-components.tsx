import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';

// Type definitions for MDX component props
type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;
type ListProps = HTMLAttributes<HTMLUListElement | HTMLOListElement>;
type ListItemProps = HTMLAttributes<HTMLLIElement>;
type AnchorProps = HTMLAttributes<HTMLAnchorElement>;
type QuoteProps = HTMLAttributes<HTMLQuoteElement>;
type CodeProps = HTMLAttributes<HTMLElement> & { className?: string };
type PreProps = HTMLAttributes<HTMLPreElement>;
type ImgProps = ImgHTMLAttributes<HTMLImageElement>;
type TableProps = HTMLAttributes<HTMLTableElement>;
type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
type TableCellProps = HTMLAttributes<HTMLTableCellElement>;

/**
 * Shared MDX components for consistent styling across blog and portfolio pages
 */
export const mdxComponents: MDXComponents = {
  h1: (props: HeadingProps) => {
    return (
      <h1 
        className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent tracking-tight mt-12 mb-8 first:mt-0 relative group" 
        {...props} 
      >
        <span className="absolute -left-4 top-0 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">#</span>
        {props.children}
      </h1>
    );
  },
  h2: (props: HeadingProps) => {
    return (
      <h2 
        className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight mt-16 mb-6 pb-3 border-b border-slate-700/50 relative group" 
        {...props} 
      >
        <span className="absolute -left-4 top-0 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">##</span>
        {props.children}
      </h2>
    );
  },
  h3: (props: HeadingProps) => {
    return <h3 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight mt-12 mb-5" {...props} />;
  },
  h4: (props: HeadingProps) => {
    return <h4 className="text-xl md:text-2xl font-semibold text-slate-200 mt-8 mb-4" {...props} />;
  },
  h5: (props: HeadingProps) => {
    return <h5 className="text-lg md:text-xl font-semibold text-slate-300 mt-6 mb-3" {...props} />;
  },
  h6: (props: HeadingProps) => {
    return <h6 className="text-base md:text-lg font-semibold text-slate-400 mt-6 mb-3" {...props} />;
  },
  p: (props: ParagraphProps) => {
    return <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6" {...props} />;
  },
  ul: (props: ListProps) => {
    return <ul className="list-none ml-0 mb-8 space-y-3 text-slate-300" {...props} />;
  },
  ol: (props: ListProps) => {
    return <ol className="list-none ml-0 mb-8 space-y-3 text-slate-300 counter-reset-list" {...props} />;
  },
  li: (props: ListItemProps) => {
    return (
      <li className="text-slate-300 pl-8 relative before:content-['→'] before:absolute before:left-0 before:text-blue-400 before:font-bold" {...props} />
    );
  },
  a: (props: AnchorProps) => {
    return (
      <a 
        className="text-blue-400 hover:text-cyan-300 underline decoration-blue-500/30 hover:decoration-cyan-400/50 underline-offset-2 transition-all duration-200 font-medium" 
        {...props} 
      />
    );
  },
  strong: (props: HTMLAttributes<HTMLElement>) => {
    return <strong className="text-white font-bold" {...props} />;
  },
  em: (props: HTMLAttributes<HTMLElement>) => {
    return <em className="text-slate-200 italic" {...props} />;
  },
  blockquote: (props: QuoteProps) => {
    return (
      <blockquote 
        className="relative border-l-4 border-blue-500 bg-slate-800/40 backdrop-blur-sm py-6 px-8 my-8 rounded-r-xl text-slate-200 italic shadow-lg shadow-blue-500/5" 
        {...props} 
      />
    );
  },
  code: (props: CodeProps) => {
    const { children, className } = props;
    const isInline = !className;
    
    if (isInline) {
      return (
        <code 
          className="text-cyan-300 bg-slate-800/70 px-2 py-1 rounded-md text-sm font-mono border border-slate-700/50 shadow-sm" 
          {...props} 
        />
      );
    }
    
    return <code className="block text-sm font-mono" {...props}>{children}</code>;
  },
  pre: (props: PreProps) => {
    return (
      <pre 
        className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl overflow-x-auto mb-8 border border-slate-700/50 shadow-xl shadow-blue-500/5 text-slate-200 leading-relaxed" 
        {...props} 
      />
    );
  },
  img: (props: ImgProps) => {
    const { src, alt } = props;
    const imageSrc = (typeof src === 'string' ? src : '') || '';
    return (
      <span className="block my-10 rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-blue-500/10 group">
        <Image
          src={imageSrc}
          alt={alt || 'Article image'}
          width={1200}
          height={675}
          className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
        />
      </span>
    );
  },
  table: (props: TableProps) => {
    return (
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-700/50 shadow-xl shadow-blue-500/5">
        <table className="min-w-full divide-y divide-slate-700/50 bg-slate-800/30 backdrop-blur-sm" {...props} />
      </div>
    );
  },
  thead: (props: TableSectionProps) => {
    return <thead className="bg-slate-800/60" {...props} />;
  },
  tbody: (props: TableSectionProps) => {
    return <tbody className="divide-y divide-slate-700/30" {...props} />;
  },
  tr: (props: TableRowProps) => {
    return <tr className="hover:bg-slate-700/20 transition-colors" {...props} />;
  },
  th: (props: TableCellProps) => {
    return <th className="px-6 py-4 text-left text-sm font-bold text-slate-100 uppercase tracking-wider" {...props} />;
  },
  td: (props: TableCellProps) => {
    return <td className="px-6 py-4 text-base text-slate-300" {...props} />;
  },
  hr: () => {
    return (
      <hr className="my-12 border-0 h-px bg-linear-to-r from-transparent via-slate-600 to-transparent" />
    );
  },
  // Dodatkowe komponenty dla lepszego formatowania
  dl: (props: HTMLAttributes<HTMLDListElement>) => {
    return <dl className="my-8 space-y-4" {...props} />;
  },
  dt: (props: HTMLAttributes<HTMLElement>) => {
    return <dt className="text-lg font-semibold text-white mb-2" {...props} />;
  },
  dd: (props: HTMLAttributes<HTMLElement>) => {
    return <dd className="text-slate-300 ml-6 mb-4" {...props} />;
  },
};
