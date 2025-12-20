import { pageRegistry, isValidSlug } from "@/lib/pageRegistry";
import client from "../../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string[];
    }>;
}

/**
 * generateStaticParams - generuje wszystkie statyczne ścieżki dla:
 * 1. Pages (home, blog, portfolio, brief, legal pages)
 * 2. Blog posts (blog/[slug])
 * 3. Portfolio items (portfolio/[slug])
 * 
 * Kluczowe: używamy TinaCMS client.queries zamiast filesystem
 */
export async function generateStaticParams() {
    const params: Array<{ locale: string; slug: string[] }> = [];
    const locales = ['pl', 'en'];

    for (const locale of locales) {
        // 1. PAGES - wszystkie strony z pageRegistry
        // Dla każdej strony z registry tworzymy parametry
        const pageList = await client.queries.pagesConnection();
        const localePages = pageList.data.pagesConnection.edges
            ?.filter(edge => {
                const path = edge?.node?._sys?.relativePath || '';
                return path.startsWith(`${locale}/`);
            })
            .map(edge => {
                const path = edge?.node?._sys?.relativePath || '';
                const slug = path.replace(`${locale}/`, '').replace('.mdx', '');
                return slug;
            })
            .filter(slug => isValidSlug(slug)) || [];

        // Dodaj strony (włącznie z home)
        for (const slug of localePages) {
            params.push({
                locale,
                slug: [slug]
            });
        }

        // 2. BLOG POSTS - wszystkie artykuły jako blog/[slug]
        try {
            const blogList = await client.queries.blogConnection();
            const blogPosts = blogList.data.blogConnection.edges
                ?.filter(edge => {
                    const path = edge?.node?._sys?.relativePath || '';
                    return path.startsWith(`${locale}/`);
                })
                .map(edge => {
                    const filename = edge?.node?._sys?.filename || '';
                    return filename.replace('.mdx', '');
                }) || [];

            for (const slug of blogPosts) {
                params.push({
                    locale,
                    slug: ['blog', slug]
                });
            }
        } catch (error) {
            console.warn('No blog posts found or error fetching blog:', error);
        }

        // 3. PORTFOLIO ITEMS - wszystkie projekty jako portfolio/[slug]
        try {
            const portfolioList = await client.queries.portfolioConnection();
            const portfolioItems = portfolioList.data.portfolioConnection.edges
                ?.filter(edge => {
                    const path = edge?.node?._sys?.relativePath || '';
                    return path.startsWith(`${locale}/`);
                })
                .map(edge => {
                    const filename = edge?.node?._sys?.filename || '';
                    return filename.replace('.mdx', '');
                }) || [];

            for (const slug of portfolioItems) {
                params.push({
                    locale,
                    slug: ['portfolio', slug]
                });
            }
        } catch (error) {
            console.warn('No portfolio items found or error fetching portfolio:', error);
        }
    }

    return params;
}

/**
 * Metadata generation dla SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug: slugArray } = await params;
    const slug = slugArray?.join('/') || 'home';

    try {
        // Dla blog i portfolio pobierz metadata z odpowiednich kolekcji
        if (slug.startsWith('blog/')) {
            const postSlug = slug.replace('blog/', '');
            const result = await client.queries.blog({
                relativePath: `${locale}/${postSlug}.mdx`,
            });
            return {
                title: result.data.blog.title || 'Blog',
                description: result.data.blog.description || result.data.blog.excerpt || '',
            };
        }

        if (slug.startsWith('portfolio/')) {
            const itemSlug = slug.replace('portfolio/', '');
            const result = await client.queries.portfolio({
                relativePath: `${locale}/${itemSlug}.mdx`,
            });
            return {
                title: result.data.portfolio.title || 'Portfolio',
                description: result.data.portfolio.description || result.data.portfolio.excerpt || '',
            };
        }

        // Dla zwykłych stron
        const pageSlug = slugArray?.[0] || 'home';
        const result = await client.queries.pages({
            relativePath: `${locale}/${pageSlug}.mdx`,
        });

        return {
            title: result.data.pages.title || 'Bitspire',
            description: result.data.pages.description || 'Nowoczesne rozwiązania IT',
        };
    } catch {
        return {
            title: 'Bitspire',
            description: 'Nowoczesne rozwiązania IT',
        };
    }
}

/**
 * Main Page Component
 * Renderuje odpowiedni wrapper na podstawie slug
 */
export default async function Page(props: PageProps) {
    const params = await props.params;
    const { locale, slug: slugArray } = params;
    
    // Jeśli slug jest pusty lub undefined, traktuj jako 'home'
    const fullSlug = (slugArray && slugArray.length > 0) ? slugArray.join('/') : 'home';
    const pageSlug = (slugArray && slugArray.length > 0) ? slugArray[0] : 'home';

    // CASE 1: Blog post - blog/[slug]
    if (fullSlug.startsWith('blog/') && slugArray?.length === 2) {
        const postSlug = slugArray[1];
        
        try {
            const result = await client.queries.blog({
                relativePath: `${locale}/${postSlug}.mdx`,
            });

            // Blog używa tej samej strony co blog listing ale z innymi danymi
            // TODO: Trzeba będzie stworzyć BlogPostWrapper dla pojedynczego artykułu
            return (
                <div className="min-h-screen bg-grid-pattern pt-24 pb-32">
                    <article className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {result.data.blog.title}
                        </h1>
                        <p className="text-slate-400 mb-8">
                            {result.data.blog.description}
                        </p>
                        {/* TODO: Render MDX body */}
                    </article>
                </div>
            );
        } catch (error) {
            console.error('Blog post not found:', error);
            notFound();
        }
    }

    // CASE 2: Portfolio item - portfolio/[slug]
    if (fullSlug.startsWith('portfolio/') && slugArray?.length === 2) {
        const itemSlug = slugArray[1];
        
        try {
            const result = await client.queries.portfolio({
                relativePath: `${locale}/${itemSlug}.mdx`,
            });

            // Portfolio item page
            // TODO: Trzeba będzie stworzyć PortfolioItemWrapper
            return (
                <div className="min-h-screen bg-grid-pattern pt-24 pb-32">
                    <article className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {result.data.portfolio.title}
                        </h1>
                        <p className="text-slate-400 mb-8">
                            {result.data.portfolio.description}
                        </p>
                        {/* TODO: Render MDX body */}
                    </article>
                </div>
            );
        } catch (error) {
            console.error('Portfolio item not found:', error);
            notFound();
        }
    }

    // CASE 3: Regular pages z pageRegistry
    const Wrapper = pageRegistry[pageSlug];
    if (!Wrapper) {
        console.error('No wrapper found for page:', pageSlug);
        notFound();
    }

    try {
        const result = await client.queries.pages({
            relativePath: `${locale}/${pageSlug}.mdx`,
        });

        // Sprawdź czy data istnieje przed przekazaniem
        if (!result?.data?.pages) {
            console.error('No data returned for page:', pageSlug);
            notFound();
        }

        // Specjalna obsługa dla strony blog - pobierz wszystkie posty
        if (pageSlug === 'blog') {
            try {
                const blogConnection = await client.queries.blogConnection();
                const blogPosts = (blogConnection.data.blogConnection.edges || [])
                    .map(edge => edge?.node)
                    .filter((node): node is NonNullable<typeof node> => 
                        node !== null && node !== undefined && node._sys.relativePath.startsWith(`${locale}/`)
                    )
                    .sort((a, b) => {
                        const dateA = a.date ? new Date(a.date).getTime() : 0;
                        const dateB = b.date ? new Date(b.date).getTime() : 0;
                        return dateB - dateA;
                    });

                return <Wrapper data={{ ...result.data.pages, posts: blogPosts, locale }} />;
            } catch (error) {
                console.error('Error loading blog posts:', error);
                return <Wrapper data={{ ...result.data?.pages, posts: [], locale }} />;
            }
        }

        // Specjalna obsługa dla strony portfolio - pobierz wszystkie projekty
        if (pageSlug === 'portfolio') {
            try {
                const portfolioConnection = await client.queries.portfolioConnection();
                const portfolioProjects = (portfolioConnection.data.portfolioConnection.edges || [])
                    .map(edge => edge?.node)
                    .filter((node): node is NonNullable<typeof node> => 
                        node !== null && node !== undefined && node._sys.relativePath.startsWith(`${locale}/`)
                    )
                    .sort((a, b) => {
                        const dateA = a.date ? new Date(a.date).getTime() : 0;
                        const dateB = b.date ? new Date(b.date).getTime() : 0;
                        return dateB - dateA;
                    });

                return <Wrapper data={{ ...result.data.pages, projects: portfolioProjects, locale }} />;
            } catch (error) {
                console.error('Error loading portfolio projects:', error);
                return <Wrapper data={{ ...result.data?.pages, projects: [], locale }} />;
            }
        }

        // Przekaż dane jako prop data
        return <Wrapper data={result.data.pages} />;
    } catch (error) {
        console.error('Page not found:', pageSlug, error);
        notFound();
    }
}
