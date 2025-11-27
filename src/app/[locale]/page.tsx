import { Background } from "@/components/background";
import { Hero } from "@/components/sections/Hero";
import Technology from "@/components/sections/Technology";
import dynamic from "next/dynamic";
import client from "../../../tina/__generated__/client";

// Lazy load heavy components
const Offer = dynamic(() => import("@/components/sections/Offer").then(mod => ({ default: mod.Offer })), {
  loading: () => <div className="py-12" />,
});

const HowWeWork = dynamic(() => import("@/components/sections/HowWeWork"), {
  loading: () => <div className="py-12" />,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: () => <div className="py-12" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="py-12" />,
});

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
    <div className="min-h-screen pt-20 relative overflow-hidden">
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
