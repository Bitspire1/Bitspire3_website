import { Background } from "@/components/background";
import { Hero } from "@/components/sections/Hero";
import Technology from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import PortfolioHighlights from "@/components/sections/PortfolioHighlights";
import HowWeWork from "@/components/sections/HowWeWork";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
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

// Load selected portfolio projects
async function getPortfolioProjects(selectedProjects: string[] | null | undefined) {
  if (!selectedProjects || !Array.isArray(selectedProjects)) {
    return [];
  }

  try {
    const projects = await Promise.all(
      selectedProjects.map(async (projectPath) => {
        try {
          // projectPath format: "pl/sklep-ecommerce" or "en/ecommerce-store"
          const relativePath = `${projectPath}.mdx`;
          const result = await client.queries.portfolio({ relativePath });
          return result?.data?.portfolio || null;
        } catch (error) {
          console.error(`Error loading project ${projectPath}:`, error);
          return null;
        }
      })
    );

    return projects.filter(p => p !== null);
  } catch (error) {
    console.error('Error loading portfolio projects:', error);
    return [];
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
  
  // Load portfolio projects based on selectedProjects
  const selectedProjectPaths = (data && 'selectedProjects' in data ? (data as Record<string, unknown>).selectedProjects : null) as string[] | null;
  const portfolioProjects = await getPortfolioProjects(selectedProjectPaths);

  return (
    <div className="min-h-screen bg-slate-900 pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        {/* Hero + Technology with continuous grid */}
        <div className="bg-grid-pattern">
          {data && 'hero' in data && <Hero data={data.hero as never} />}
          {data && 'technology' in data && <Technology data={data.technology as never} />}
        </div>
        
        {Boolean(data && 'offer' in data) && (
          <div id="offer-section">
            <Offer data={data.offer as never} />
          </div>
        )}
        
        {/* Wyróżnione projekty */}
        {data && 'portfolioHighlights' in data && portfolioProjects && portfolioProjects.length > 0 && (
          <div id="portfolio-section">
            <PortfolioHighlights data={{ 
              projects: portfolioProjects as never[], 
              title: (data.portfolioHighlights && typeof data.portfolioHighlights === 'object' && 'title' in data.portfolioHighlights ? (data.portfolioHighlights as Record<string, unknown>).title : null) as string | null,
              description: (data.portfolioHighlights && typeof data.portfolioHighlights === 'object' && 'description' in data.portfolioHighlights ? (data.portfolioHighlights as Record<string, unknown>).description : null) as string | null
            }} />
          </div>
        )}
        
        {/* Jak pracujemy */}
        {data && 'howWeWork' in data && <HowWeWork data={data.howWeWork as never} />}
        
        {/* FAQ */}
        {data && 'faq' in data && <FAQ data={data.faq as never} />}
        
        {/* Contact */}
        {data && 'contact' in data && <Contact data={data.contact as never} />}
      </main>
    </div>
  );
}
