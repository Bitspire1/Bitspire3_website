import Link from "next/link";
import Image from "next/image";

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
    const posts = data?.posts || [];
    const locale = data?.locale || 'pl';
    const t = translations[locale as keyof typeof translations] || translations.en;

    return (
        <div className="min-h-screen bg-grid-pattern pt-24 pb-32 relative overflow-hidden">
            <main className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <header className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500"></div>
                        <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                            Blog
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        {data?.title || 'Blog'}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
                        {data?.description || 'Najnowsze artykuły i poradniki'}
                    </p>
                </header>

                {/* Blog Grid */}
                <section aria-label="Blog posts" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => {
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
                                    className="group relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-800/40 backdrop-blur-sm shadow-xl ring-0 hover:ring-2 hover:ring-blue-500/40 transition"
                                >
                                    {/* Image */}
                                    {post.image && (
                                        <Link href={`/${locale}/blog/${slug}`}>
                                            <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                                                <Image
                                                    src={post.image}
                                                    alt={post.imageAlt || post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-tr from-slate-950/70 via-slate-900/20 to-transparent" />
                                            </div>
                                        </Link>
                                    )}

                                    {/* Content */}
                                    <div className="p-8 md:p-10">
                                        <header className="max-w-4xl">
                                            <Link href={`/${locale}/blog/${slug}`}>
                                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors mb-3">
                                                    {post.title}
                                                </h2>
                                            </Link>

                                            <time className="text-xs text-slate-400 mb-3 block" dateTime={post.date}>
                                                {formattedDate}
                                            </time>

                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                                                {post.excerpt || post.description}
                                            </p>
                                        </header>

                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                                                {post.tags
                                                    .filter((tag): tag is string => !!tag)
                                                    .slice(0, 4)
                                                    .map((tag) => (
                                                        <li
                                                            key={tag}
                                                            className="text-xs uppercase tracking-wide rounded-full px-3 py-1 font-medium bg-blue-600/20 text-blue-300 border border-blue-500/30"
                                                        >
                                                            {tag}
                                                        </li>
                                                    ))}
                                            </ul>
                                        )}

                                        {/* Read More Button */}
                                        <div className="mt-8">
                                            <Link
                                                href={`/${locale}/blog/${slug}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 shadow-lg shadow-blue-600/30 transition"
                                            >
                                                {t.readMore}
                                                <span aria-hidden>→</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Accent line */}
                                    <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-400" />
                                </article>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-slate-400 text-lg">{t.noArticles}</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
