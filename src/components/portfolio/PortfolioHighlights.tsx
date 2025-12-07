'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PortfolioProject {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  date: string;
}

interface PortfolioHighlightsProps {
  locale: string;
  projects: PortfolioProject[];
}

export function PortfolioHighlights({ locale, projects }: PortfolioHighlightsProps) {
  // Display only the first 3 projects
  const highlightedProjects = projects.slice(0, 3);

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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient bg-linear-to-r from-blue-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent">
              {locale === 'pl' ? 'Wybranie projekty' : 'Featured Projects'}
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'pl'
              ? 'Poznaj projekty, na których pracowaliśmy - od e-commerce po platformy edukacyjne i strony korporacyjne.'
              : 'Explore the projects we have built - from e-commerce to educational platforms and corporate websites.'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {highlightedProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/${locale}/portfolio/${project.slug}`}
              className="group relative h-80 overflow-hidden rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-2">
                    {project.excerpt}
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
            href={`/${locale}/portfolio`}
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
