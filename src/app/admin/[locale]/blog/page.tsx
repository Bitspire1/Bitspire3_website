'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTina } from 'tinacms/dist/react';
import client from "../../../../../tina/__generated__/client";
import { Background } from "@/components/layout/background";
import { BlogListClient } from "@/components/sections/Blog/BlogListClient";

const query = `query GetBlog { blogConnection { edges { node { _sys { filename relativePath } title slug excerpt description image imageAlt category date } } } }`;

export default function BlogPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pl';

  const [initialData, setInitialData] = useState<any>({ blogConnection: { edges: [] } });

  useEffect(() => {
    async function load() {
      try {
        const res = await client.queries.blogConnection();
        setInitialData({ blogConnection: res.data.blogConnection });
      } catch (e) {
        console.warn('[admin blog] fetch failed', e);
      }
    }
    load();
  }, [locale]);

  const { data } = useTina({
    query,
    variables: {},
    data: initialData,
  });

  const liveData = (data.blogConnection as any)?.edges || [];

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <Background />
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <header className="mb-14 text-center">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              {locale === 'pl' ? 'Wiedza' : 'Knowledge'}
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{locale === 'pl' ? 'Nasz ' : 'Our '}</span>
            <span className="text-gradient">Blog</span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'pl' 
              ? 'Praktyczne porady, najnowsze trendy i głęboka wiedza z zakresu web development. Dzielimy się doświadczeniem i best practices.'
              : 'Practical tips, latest trends, and in-depth knowledge about web development. We share our experience and best practices.'}
          </p>
        </header>

        <BlogListClient posts={liveData.map((edge: any) => edge.node)} locale={locale} />

        {liveData.length > 0 && (
          <div className="mt-20 text-center">
            <p className="text-slate-400 text-sm">
              {locale === 'pl' 
                ? 'Chcesz być na bieżąco? Obserwuj nas w mediach społecznościowych.'
                : 'Want to stay updated? Follow us on social media.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
