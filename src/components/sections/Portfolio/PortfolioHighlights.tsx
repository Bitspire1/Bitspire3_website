'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';

/**
 * Unified PortfolioHighlights component
 * Supports two modes:
 * 1. CMS-driven (Tina): Pass `tinaData` with title/description/projects and `mode="tina"`
 * 2. Direct projects: Pass `locale` and `projects` array with `mode="direct"`
 */

interface PortfolioProject {
  title: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  category?: string;
  date?: string;
  tags?: string[];
  featured?: boolean;
  [key: string]: unknown;
}

interface TinaHighlightsData {
  title?: string | null;
  description?: string | null;
  projects?: Array<PortfolioProject | null> | null;
  [key: string]: unknown;
}

interface DirectHighlightsProps {
  mode: 'direct';
  locale: string;
  projects: PortfolioProject[];
}

interface TinaHighlightsProps {
  mode: 'tina';
  tinaData: TinaHighlightsData;
}

type PortfolioHighlightsProps = DirectHighlightsProps | TinaHighlightsProps;

export function PortfolioHighlights(props: PortfolioHighlightsProps) {
  // Determine mode and extract data
  const isDirectMode = props.mode === 'direct';
  const locale = isDirectMode ? props.locale : 'pl';
  
  let projectsToDisplay: PortfolioProject[] = [];
  let title = '';
  let description = '';
  let tinaDataRef: TinaHighlightsData | undefined;

  if (isDirectMode) {
    // Direct mode: fetch top 3 from passed projects
    projectsToDisplay = props.projects.slice(0, 3);
    title = locale === 'pl' ? 'Wybranie projekty' : 'Featured Projects';
    description = locale === 'pl'
      ? 'Poznaj projekty, na których pracowaliśmy - od e-commerce po platformy edukacyjne i strony korporacyjne.'
      : 'Explore the projects we have built - from e-commerce to educational platforms and corporate websites.';
  } else {
    // Tina mode: featured projects from CMS
    tinaDataRef = props.tinaData;
    projectsToDisplay = (tinaDataRef.projects || [])
      .filter((p): p is PortfolioProject => p !== null && p.title && p.image);
    title = tinaDataRef.title || '';
    description = tinaDataRef.description || '';
  }

  // Don't render if no projects or missing title/description
  if (projectsToDisplay.length === 0 || !title || !description) {
    return null;
  }

  // Portfolio link helper
  const getProjectLink = (project: PortfolioProject) => {
    if (isDirectMode) {
      return `/${locale}/portfolio/${project.slug}`;
    } else {
      return `/portfolio/${project.slug}`;
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              {locale === 'pl' ? 'Nasze realizacje' : 'Our Work'}
            </span>
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            {...(tinaDataRef ? { 'data-tina-field': tinaField(tinaDataRef, 'title') } : {})}
          >
            <span className="text-gradient bg-linear-to-r from-blue-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            {...(tinaDataRef ? { 'data-tina-field': tinaField(tinaDataRef, 'description') } : {})}
          >
            {description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projectsToDisplay.map((project, idx) => (
            <Link
              key={project.slug || idx}
              href={getProjectLink(project)}
              className="group relative h-80 overflow-hidden rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              {...(tinaDataRef ? { 'data-tina-field': tinaField(tinaDataRef, 'projects', idx) } : {})}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />

              {/* Featured badge (Tina mode) */}
              {!isDirectMode && project.featured && (
                <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {locale === 'pl' ? 'Wyróżnione' : 'Featured'}
                </div>
              )}

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="mb-4">
                  {project.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 rounded-full mb-3">
                      {project.category}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-2">
                    {project.excerpt || project.description}
                  </p>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href={isDirectMode ? `/${locale}/portfolio` : '/portfolio'}
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-emerald-500 text-white text-base font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 group"
          >
            <span>
              {locale === 'pl' ? 'Zobacz wszystkie projekty' : 'View All Projects'}
            </span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
