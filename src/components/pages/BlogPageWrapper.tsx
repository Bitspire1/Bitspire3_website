'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import Contact from "@/components/sections/Contact";
import { useAdminLink } from "@/hooks/useAdminLink";

interface BlogPost {
    _sys: {
        filename: string;
        relativePath: string;
    };
    title: string;
    slug: string;
    description: string;
    excerpt?: string | null;
    date: string;
    author: string;
    category?: string | null;
    tags?: (string | null)[] | null;
    image?: string | null;
    imageAlt?: string | null;
    readTime?: number | null;
}

interface BlogPageData {
    [key: string]: unknown;
    posts?: BlogPost[];
    locale?: string;
    title?: string;
    description?: string;
}

interface BlogPageWrapperProps {
    data: BlogPageData;
}

const translations = {
    pl: {
        noArticles: 'Brak artykułów.',
        readMore: 'Czytaj więcej',
        readTime: (minutes: number) => `${minutes} min czytania`,
        by: 'przez',
    },
    en: {
        noArticles: 'No articles found.',
        readMore: 'Read more',
        readTime: (minutes: number) => `${minutes} min read`,
        by: 'by',
    },
};

export default function BlogPageWrapper({ data }: BlogPageWrapperProps) {
    const { getLink } = useAdminLink();
    const posts = data?.posts || [];
    const locale = data?.locale || 'pl';
    const t = translations[locale as keyof typeof translations] || translations.en;

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tagsSet = new Set<string>();
        posts.forEach(post => {
            post.tags?.forEach(tag => {
                if (tag) tagsSet.add(tag);
            });
        });
        return Array.from(tagsSet).sort();
    }, [posts]);

    // Filter posts based on search and tags
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            // Search filter
            const matchesSearch = !searchQuery || 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

            // Tags filter
            const matchesTags = selectedTags.length === 0 ||
                selectedTags.some(tag => post.tags?.some(postTag => postTag === tag));

            return matchesSearch && matchesTags;
        });
    }, [posts, searchQuery, selectedTags]);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
            
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Header */}
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-200 text-xs font-bold tracking-widest uppercase font-mono">Blog</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        <span className="relative inline-block">
                            {data?.title || 'Blog'}
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {data?.description || 'Najnowsze artykuły i poradniki'}
                    </p>
                </header>

                {/* Search Bar */}
                {allTags.length > 0 && (
                    <div className="mb-12">
                        <SearchBar
                            allTags={allTags}
                            onSearchChange={setSearchQuery}
                            onTagsChange={setSelectedTags}
                            locale={locale}
                            type="blog"
                        />
                    </div>
                )}

                {/* Blog Grid */}
                <section aria-label="Blog posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => {
                            const slug = post._sys.filename;
                            const formattedDate = new Date(post.date).toLocaleDateString(
                                locale === 'pl' ? 'pl-PL' : 'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }
                            );

                            return (
                                <article
                                    key={post._sys.relativePath}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                >
                                    {/* Image */}
                                    {post.image && (
                                        <Link href={getLink(`/blog/${slug}`)}>
                                            <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                                                <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                                <Image
                                                    src={post.image}
                                                    alt={post.imageAlt || post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            </div>
                                        </Link>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Date and Read Time */}
                                        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                                            <time dateTime={post.date}>
                                                {formattedDate}
                                            </time>
                                            {post.readTime && (
                                                <>
                                                    <span>•</span>
                                                    <span>{t.readTime(post.readTime)}</span>
                                                </>
                                            )}
                                        </div>

                                        <Link href={getLink(`/blog/${slug}`)}>
                                            <h2 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 mb-3 line-clamp-2">
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {post.excerpt || post.description}
                                        </p>

                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags
                                                    .filter((tag): tag is string => !!tag)
                                                    .slice(0, 3)
                                                    .map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}

                                        {/* Read More Link */}
                                        <Link
                                            href={`/${locale}/blog/${slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
                                        >
                                            {t.readMore}
                                            <span className="group-hover/link:translate-x-1 transition-transform" aria-hidden>→</span>
                                        </Link>
                                    </div>

                                    {/* Accent line */}
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500" />
                                </article>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 mb-4">
                                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-lg">{t.noArticles}</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Contact Section */}
            <Contact data={data} />
        </div>
    );
}
