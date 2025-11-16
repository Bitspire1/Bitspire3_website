import { Background } from "@/components/background";
import { Hero } from "@/components/sections/Hero";
import Technology from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import Brief from "@/components/sections/Brief";
import client from "../../../tina/__generated__/client";

// Load page data from TinaCMS
async function getPageData(locale: string) {
  try {
    const relativePath = `${locale}/home.mdx`;
    
    const result = await client.queries.pages({
      relativePath: relativePath
    });

    if (!result?.data?.pages) {
      throw new Error('No data returned from TinaCMS');
    }

    return result.data.pages;
  } catch (error) {
    console.error('Error loading page data from TinaCMS:', error);
    // Return null to use fallback
    return null;
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageData = await getPageData(locale);

  return (
    <div className="min-h-screen bg-slate-900 pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        {pageData?.hero && <Hero data={pageData.hero} />}
        <Technology />
        {pageData?.offer && (
          <div id="offer-section">
            <Offer data={pageData.offer} />
          </div>
        )}
        {pageData?.brief && (
          <div id="brief-section">
            <Brief data={pageData.brief} />
          </div>
        )}
      </main>
    </div>
  );
}
