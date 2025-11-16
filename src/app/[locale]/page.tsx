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

  // Fallback data when Tina CMS is not available
  const fallbackData = {
    hero: {
      title: locale === 'pl' ? 'Bitspire - Tworzenie stron internetowych' : 'Bitspire - Web Development',
      subtitle: locale === 'pl' 
        ? 'Profesjonalne strony internetowe i sklepy online' 
        : 'Professional websites and online stores',
      description: locale === 'pl'
        ? 'Tworzymy nowoczesne, responsywne strony internetowe i sklepy e-commerce.'
        : 'We create modern, responsive websites and e-commerce stores.',
    },
    offer: null,
    brief: null,
  };

  const data = pageData || fallbackData;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        {data?.hero && <Hero data={data.hero} />}
        <Technology />
        {data?.offer && (
          <div id="offer-section">
            <Offer data={data.offer} />
          </div>
        )}
        {data?.brief && (
          <div id="brief-section">
            <Brief data={data.brief} />
          </div>
        )}
      </main>
    </div>
  );
}
