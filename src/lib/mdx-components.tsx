/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MDXComponents } from 'mdx/types';

/**
 * Shared MDX components for consistent styling across blog and portfolio pages
 */
export const mdxComponents: MDXComponents = {
  h1: (props: any) => {
    return <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mt-12 mb-6" {...props} />;
  },
  h2: (props: any) => {
    return <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent tracking-tight mt-12 mb-6" {...props} />;
  },
  h3: (props: any) => {
    return <h3 className="text-2xl md:text-3xl font-bold text-slate-200 tracking-tight mt-8 mb-4" {...props} />;
  },
  h4: (props: any) => {
    return <h4 className="text-xl md:text-2xl font-semibold text-slate-300 mt-6 mb-3" {...props} />;
  },
  p: (props: any) => {
    return <p className="text-slate-300 leading-relaxed mb-4" {...props} />;
  },
  ul: (props: any) => {
    return <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-slate-300" {...props} />;
  },
  ol: (props: any) => {
    return <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-slate-300" {...props} />;
  },
  li: (props: any) => {
    return <li className="text-slate-300 marker:text-blue-400" {...props} />;
  },
  a: (props: any) => {
    return <a className="text-blue-400 hover:text-blue-300 underline transition-colors" {...props} />;
  },
  strong: (props: any) => {
    return <strong className="text-slate-200 font-semibold" {...props} />;
  },
  em: (props: any) => {
    return <em className="text-slate-300 italic" {...props} />;
  },
  blockquote: (props: any) => {
    return <blockquote className="border-l-4 border-blue-500 bg-slate-800/30 py-4 px-6 my-6 rounded-r-lg text-slate-300 italic" {...props} />;
  },
  code: (props: any) => {
    const { children, className } = props;
    const isInline = !className;
    
    if (isInline) {
      return <code className="text-blue-300 bg-slate-800/50 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    }
    
    return <code className="block bg-slate-800/50 text-sm" {...props}>{children}</code>;
  },
  pre: (props: any) => {
    return <pre className="bg-slate-800/50 p-4 rounded-lg overflow-x-auto mb-6 border border-slate-700/50" {...props} />;
  },
  img: (props: any) => {
    return (
      <span className="block my-8 rounded-lg overflow-hidden border border-slate-700/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full h-auto" {...props} alt={props.alt || ''} />
      </span>
    );
  },
  table: (props: any) => {
    return (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-slate-700" {...props} />
      </div>
    );
  },
  th: (props: any) => {
    return <th className="px-4 py-2 text-left text-slate-200 font-semibold bg-slate-800/50" {...props} />;
  },
  td: (props: any) => {
    return <td className="px-4 py-2 text-slate-300 border-t border-slate-700/50" {...props} />;
  },
  hr: () => {
    return <hr className="my-8 border-slate-700" />;
  },
};
