import { PreviewClient } from './PreviewClient';
import { getPageData, getHeaderData, getFooterData, getPortfolioProjects, getBlogPosts } from '@/lib/content/loader';
import { notFound, redirect } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/request';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PreviewPageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { locale, slug } = await params;

  // Guard: if someone hits old /admin/preview/... path, redirect to new flat /admin/:locale/:slug
  if (locale === 'preview') {
    const [realLocale, ...rest] = slug ?? [];
    const safeLocale = locales.includes(realLocale as Locale) ? realLocale : 'pl';
    const newSlugPath = rest.length > 0 ? rest.join('/') : 'home';
    redirect(`/admin/${safeLocale}/${newSlugPath}`);
  }

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const slugPath = slug?.join('/') || 'home';

  // Determine content type
  let contentType: 'pages' | 'blog' | 'portfolio' = 'pages';
  if (slugPath.startsWith('blog/')) {
    contentType = 'blog';
  } else if (slugPath.startsWith('portfolio/')) {
    contentType = 'portfolio';
  }

  // Extract slug without prefix
  const cleanSlug = slugPath === 'home' ? 'home' : slugPath.split('/').pop() || 'home';

  // Load data using the new loader
  const pageData = await getPageData(locale, cleanSlug, contentType);
  const headerData = await getHeaderData(locale);
  const footerData = await getFooterData(locale);
  const messages = await getMessages();

  // Load related data based on content type
  let portfolioProjects = undefined;
  let blogPosts = undefined;

  if (slugPath === 'home') {
    portfolioProjects = await getPortfolioProjects(locale);
  } else if (contentType === 'blog') {
    blogPosts = await getBlogPosts(locale);
  } else if (contentType === 'portfolio') {
    portfolioProjects = await getPortfolioProjects(locale);
  }

  if (!pageData) {
    notFound();
  }

  return (
    <PreviewClient
      locale={locale}
      slugPath={slugPath}
      initialData={pageData}
      initialContent=""
      contentType={contentType}
      portfolioProjects={portfolioProjects}
      blogPosts={blogPosts}
      headerData={headerData}
      footerData={footerData}
      messages={messages}
    />
  );
}
