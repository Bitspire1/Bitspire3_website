'use client';

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import Contact from "@/components/sections/Contact";
import { useAdminLink } from "@/hooks/useAdminLink";
import PageBackground from "@/components/layout/PageBackground";
import BlogHeader from "@/components/sections/blog/BlogHeader";
import BlogGrid from "@/components/sections/blog/BlogGrid";

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
        <PageBackground variant="blue">
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                <BlogHeader 
                    title={data?.title}
                    description={data?.description}
                />

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

                <BlogGrid 
                    posts={filteredPosts}
                    locale={locale}
                    translations={t}
                    getLink={getLink}
                />
            </main>

            <Contact data={data} />
        </PageBackground>
    );
}
