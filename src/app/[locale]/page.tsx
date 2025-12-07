import { HomeClient } from "@/components/HomeClient";
// Use relative path because tina/__generated__ is outside src/
import { client } from "../../../tina/__generated__/client";

// Load page data from TinaCMS
async function getPageData(locale: string) {
  try {
    const relativePath = `${locale}/home.mdx`;
    
    // Query pages collection with proper parameters
    const result = await client.queries.pages({
      relativePath,
    });

    if (!result?.data?.pages) {
      throw new Error(`Missing home page data for locale: ${locale}`);
    }

    return result.data.pages;
  } catch (error) {
    console.warn(`[page.tsx] Failed to load page data for locale "${locale}":`, error);
    throw error;
  }
}

// Load portfolio projects for highlights
async function getPortfolioProjects(locale: string) {
  try {
    const portfolioConnection = await client.queries.portfolioConnection();
    const edges = portfolioConnection?.data?.portfolioConnection?.edges;

    if (!edges) {
      throw new Error("Portfolio data is missing");
    }

    return edges
      .map(edge => edge?.node)
      .filter((node): node is NonNullable<typeof node> => 
        node !== null && node !== undefined && node._sys.relativePath.startsWith(`${locale}/`)
      )
      .map(node => ({
        title: node.title || '',
        slug: node._sys.filename,
        excerpt: node.excerpt || '',
        image: node.image || '',
        imageAlt: node.imageAlt || node.title || '',
        category: node.category || '',
        date: node.date || '',
      }));
  } catch (error) {
    console.warn(`[page.tsx] Failed to load portfolio data for locale "${locale}":`, error);
    throw error;
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageData = await getPageData(locale);
  const portfolioProjects = await getPortfolioProjects(locale);

  return <HomeClient data={pageData} portfolioProjects={portfolioProjects} locale={locale} />;
}
