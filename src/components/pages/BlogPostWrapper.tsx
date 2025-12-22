'use client';

import Link from "next/link";
import Image from "next/image";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useAdminLink } from "@/hooks/useAdminLink";

interface BlogPostData {
    title: string;
    description: string;
    date: string;
    author: string;
    category?: string | null;
    tags?: (string | null)[] | null;
    image?: string | null;
    imageAlt?: string | null;
    readTime?: number | null;
    body: any;
    locale?: string;
}

interface BlogPostWrapperProps {
    data: BlogPostData;
}

const translations = {
    pl: {
        by: 'przez',
        readTime: (minutes: number) => `${minutes} min czytania`,
        backToBlog: 'Powrót do bloga',
        publishedOn: 'Opublikowano',
    },
    en: {
        by: 'by',
        readTime: (minutes: number) => `${minutes} min read`,
        backToBlog: 'Back to blog',
        publishedOn: 'Published on',
    },
};

export default function BlogPostWrapper({ data }: BlogPostWrapperProps) {
    const { getLink } = useAdminLink();
    const locale = data?.locale || 'pl';
    const t = translations[locale as keyof typeof translations] || translations.en;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
            
            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
                {/* Back to blog link */}
                <Link 
                    href={getLink('/blog')}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
                >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t.backToBlog}
                </Link>

                {/* Article Header */}
                <article>
                    {/* Category & Read Time */}
                    <div className="flex items-center gap-4 mb-4">
                        {data.category && (
                            <span className="px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                                {data.category}
                            </span>
                        )}
                        {data.readTime && (
                            <span className="text-sm text-slate-400">
                                {t.readTime(data.readTime)}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {data.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-slate-300 mb-6">
                        {data.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-700/50">
                        <span>{t.by} {data.author}</span>
                        <span>•</span>
                        <span>{formatDate(data.date)}</span>
                    </div>

                    {/* Featured Image */}
                    {data.image && (
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12 shadow-2xl">
                            <Image
                                src={data.image}
                                alt={data.imageAlt || data.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Article Content - Rich Text with Styling */}
                    <article className="max-w-none">
                        <TinaMarkdown content={data.body} />
                    </article>

                    {/* Tags */}
                    {data.tags && data.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-700/50">
                            <div className="flex flex-wrap gap-2">
                                {data.tags.filter(tag => tag).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-sm text-slate-400 bg-slate-800/50 rounded-full border border-slate-700/50 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>
        </div>
    );
}
