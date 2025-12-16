'use client';

import { pageRegistry, isValidSlug } from "@/lib/pageRegistry";
import client from "../../../../../tina/__generated__/client";
import { useTina } from 'tinacms/dist/react';
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string[];
    }>;
}

/**
 * Admin Preview Page - używa useTina do live editing w CMS
 * 
 * Różnice względem production page:
 * 1. 'use client' - client component
 * 2. useTina() hook - live preview zmian
 * 3. Brak generateStaticParams - dynamic route
 * 4. Preview banner na górze
 */
export default function AdminPreviewPage(props: PageProps) {
    const params = use(props.params);
    const { locale, slug: slugArray } = params;
    const fullSlug = slugArray?.join('/') || 'home';
    const pageSlug = slugArray?.[0] || 'home';

    const [initialData, setInitialData] = useState<{
        data: unknown;
        query: string;
        variables: Record<string, unknown>;
    } | null>(null);
    const [query, setQuery] = useState<string>('');
    const [variables, setVariables] = useState<Record<string, unknown> | null>(null);
    const [contentType, setContentType] = useState<'page' | 'blog' | 'portfolio'>('page');
    const [loading, setLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        async function fetchData() {
            try {
                // CASE 1: Blog post - blog/[slug]
                if (fullSlug.startsWith('blog/') && slugArray?.length === 2) {
                    const postSlug = slugArray[1];
                    const relativePath = `${locale}/${postSlug}.mdx`;
                    
                    const result = await client.queries.blog({
                        relativePath,
                    });

                    setContentType('blog');
                    setInitialData(result);
                    setQuery(result.query);
                    setVariables(result.variables);
                    setLoading(false);
                    return;
                }

                // CASE 2: Portfolio item - portfolio/[slug]
                if (fullSlug.startsWith('portfolio/') && slugArray?.length === 2) {
                    const itemSlug = slugArray[1];
                    const relativePath = `${locale}/${itemSlug}.mdx`;
                    
                    const result = await client.queries.portfolio({
                        relativePath,
                    });

                    setContentType('portfolio');
                    setInitialData(result);
                    setQuery(result.query);
                    setVariables(result.variables);
                    setLoading(false);
                    return;
                }

                // CASE 3: Regular page
                if (!isValidSlug(pageSlug)) {
                    notFound();
                }

                const relativePath = `${locale}/${pageSlug}.mdx`;
                const result = await client.queries.pages({
                    relativePath,
                });

                setContentType('page');
                setInitialData(result);
                setQuery(result.query);
                setVariables(result.variables);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data for preview:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [fullSlug, locale, pageSlug, slugArray]);

    // Show loading state
    if (loading || !initialData) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 text-sm uppercase tracking-wider">Loading preview...</p>
                </div>
            </div>
        );
    }

    // Now render with useTina
    return <PreviewContent 
        initialData={initialData}
        query={query}
        variables={variables || {}}
        contentType={contentType}
        pageSlug={pageSlug}
        locale={locale}
    />;
}

/**
 * Separate component for useTina hook
 */
function PreviewContent({
    initialData,
    query,
    variables,
    contentType,
    pageSlug,
    locale,
}: {
    initialData: {
        data: unknown;
        query: string;
        variables: Record<string, unknown>;
    };
    query: string;
    variables: Record<string, unknown>;
    contentType: 'page' | 'blog' | 'portfolio';
    pageSlug: string;
    locale: string;
}) {
    // Use TinaCMS real-time editing
    const { data: liveData } = useTina({
        query,
        variables,
        data: initialData.data as object,
    }) as { data: Record<string, any> }; // eslint-disable-line @typescript-eslint/no-explicit-any

    // Preview Banner
    const PreviewBanner = () => (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-slate-900 text-center py-2 px-4 font-bold z-9999 text-sm shadow-lg">
            🎨 LIVE PREVIEW MODE - TinaCMS Visual Editor - Changes are saved in real-time
        </div>
    );

    // CASE 1: Blog post preview
    if (contentType === 'blog') {
        const post = liveData.blog;
        
        return (
            <>
                <PreviewBanner />
                <div className="min-h-screen bg-grid-pattern pt-32 pb-32">
                    <article className="max-w-4xl mx-auto px-6">
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500"></div>
                                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                                    Blog Preview
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            {post.date && (
                                <time className="text-sm text-slate-400 block mb-4">
                                    {new Date(post.date).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            )}
                            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                                {post.description}
                            </p>
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Body - TODO: Add TinaMarkdown */}
                        <div className="prose prose-invert max-w-none">
                            {/* {post.body && <TinaMarkdown content={post.body} />} */}
                            <p className="text-slate-400">Blog content will be rendered here with TinaMarkdown</p>
                        </div>
                    </article>
                </div>
            </>
        );
    }

    // CASE 2: Portfolio item preview
    if (contentType === 'portfolio') {
        const item = liveData.portfolio;
        
        return (
            <>
                <PreviewBanner />
                <div className="min-h-screen bg-grid-pattern pt-32 pb-32">
                    <article className="max-w-4xl mx-auto px-6">
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500"></div>
                                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                                    Portfolio Preview
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {item.title}
                            </h1>
                            {item.year && (
                                <span className="inline-block text-sm text-slate-400 mb-4">
                                    {item.year}
                                </span>
                            )}
                            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {item.tags.map((tag: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Body - TODO: Add TinaMarkdown */}
                        <div className="prose prose-invert max-w-none">
                            <p className="text-slate-400">Portfolio content will be rendered here with TinaMarkdown</p>
                        </div>
                    </article>
                </div>
            </>
        );
    }

    // CASE 3: Regular page preview
    const Wrapper = pageRegistry[pageSlug];
    if (!Wrapper) {
        return (
            <>
                <PreviewBanner />
                <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
                        <p className="text-slate-400">The page &ldquo;{pageSlug}&rdquo; doesn&apos;t exist in pageRegistry</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <PreviewBanner />
            <div className="pt-12">
                <Wrapper data={liveData.pages} />
            </div>
        </>
    );
}
