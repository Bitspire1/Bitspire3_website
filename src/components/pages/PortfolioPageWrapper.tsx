'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import Contact from "@/components/sections/Contact";
import { tinaField } from 'tinacms/dist/react';

interface PortfolioProject {
    title?: string | null;
    description?: string | null;
    tags?: (string | null)[] | null;
    year?: string | null;
    image?: string | null;
    imageAlt?: string | null;
    link?: string | null;
}

interface PortfolioPageData {
    [key: string]: unknown;
    title?: string;
    description?: string;
    sectionLabel?: string;
    projects?: PortfolioProject[];
    locale?: string;
}

interface PortfolioPageWrapperProps {
    data: PortfolioPageData;
}

const translations = {
    pl: {
        noProjects: 'Brak projektów.',
        viewProject: 'Zobacz projekt',
        year: 'Rok',
    },
    en: {
        noProjects: 'No projects found.',
        viewProject: 'View project',
        year: 'Year',
    },
};

export default function PortfolioPageWrapper({ data }: PortfolioPageWrapperProps) {
    const projects = data?.projects || [];
    const locale = (data?.locale as string) || 'pl';
    const t = translations[locale as keyof typeof translations] || translations.en;

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tagsSet = new Set<string>();
        projects.forEach(project => {
            project.tags?.forEach(tag => {
                if (tag) tagsSet.add(tag);
            });
        });
        return Array.from(tagsSet).sort();
    }, [projects]);

    // Filter projects based on search and tags
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            // Search filter
            const matchesSearch = !searchQuery || 
                project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchQuery.toLowerCase());

            // Tags filter
            const matchesTags = selectedTags.length === 0 ||
                selectedTags.some(tag => project.tags?.some(projectTag => projectTag === tag));

            return matchesSearch && matchesTags;
        });
    }, [projects, searchQuery, selectedTags]);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
            
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Header */}
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-cyan-200 text-xs font-bold tracking-widest uppercase font-mono" data-tina-field={tinaField(data, 'sectionLabel')}>
                            {data?.sectionLabel || 'Portfolio'}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" data-tina-field={tinaField(data, 'title')}>
                        <span className="relative inline-block">
                            {data?.title || 'Nasze'}
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-cyan-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                        {' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">Realizacje</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed" data-tina-field={tinaField(data, 'description')}>
                        {data?.description || 'Projekty, które stworzyliśmy'}
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
                            type="portfolio"
                        />
                    </div>
                )}

                {/* Portfolio Grid */}
                <section aria-label="Portfolio projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, idx) => {
                            if (!project?.title) return null;

                            return (
                                <article
                                    key={idx}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                                >
                                    {/* Image */}
                                    {project.image && (
                                        <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                                            <div className="absolute inset-0 bg-linear-to-br from-cyan-600/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                            <Image
                                                src={project.image}
                                                alt={project.imageAlt || project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                priority={idx < 3}
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Year Badge */}
                                        {project.year && (
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                                                    {project.year}
                                                </span>
                                            </div>
                                        )}

                                        <h2 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300 mb-3 line-clamp-2" data-tina-field={tinaField(data, `projects.${idx}.title`)}>
                                            {project.title}
                                        </h2>

                                        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3" data-tina-field={tinaField(data, `projects.${idx}.description`)}>
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        {project.tags && project.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags
                                                    .filter((tag): tag is string => !!tag)
                                                    .slice(0, 3)
                                                    .map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}

                                        {/* View Project Link */}
                                        {project.link && (
                                            <Link
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                                                data-tina-field={tinaField(data, `projects.${idx}.link`)}
                                            >
                                                {t.viewProject}
                                                <span className="group-hover/link:translate-x-1 transition-transform" aria-hidden>→</span>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Accent line */}
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-cyan-500 to-blue-400 group-hover:w-full transition-all duration-500" />
                                </article>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 mb-4">
                                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-lg">{t.noProjects}</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Contact Section */}
            <Contact data={data} />
        </div>
    );
}
