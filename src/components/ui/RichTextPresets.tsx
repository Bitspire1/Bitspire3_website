import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import React from 'react';

// Gradient component for rich-text
export const Gradient = ({ children }: { children: React.ReactNode }) => (
  <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#60a5fa,#22d3ee,#60a5fa)] bg-size-[200%] animate-[gradient-x_3s_ease_infinite]">
    {children}
  </span>
);

// Common rich-text components
export const richTextComponents = {
  Gradient,
};

// Style presets for different content types
interface RichTextPresetProps {
  content: TinaMarkdownContent;
  preset?: 'hero-title' | 'section-title' | 'subtitle' | 'description' | 'body';
  className?: string;
}

const presetStyles = {
  'hero-title': 'text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg',
  'section-title': 'text-3xl md:text-5xl font-bold text-white mb-4 text-center leading-tight',
  'subtitle': 'text-lg lg:text-xl text-slate-400 leading-relaxed',
  'description': 'text-lg text-slate-300 text-center leading-relaxed',
  'body': 'text-white prose prose-invert max-w-none',
};

export const RichText: React.FC<RichTextPresetProps> = ({ 
  content, 
  preset = 'body',
  className = '' 
}) => {
  const baseClassName = presetStyles[preset];
  const combinedClassName = `${baseClassName} ${className}`.trim();

  // Handle undefined or null content
  if (!content) {
    return null;
  }

  return (
    <div className={combinedClassName}>
      <TinaMarkdown content={content} components={richTextComponents} />
    </div>
  );
};
