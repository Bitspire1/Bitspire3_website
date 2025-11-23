import { Background } from "@/components/background";
import Brief from "@/components/sections/Brief";
import client from "../../../../tina/__generated__/client";

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
    return null;
  }
}

export default async function BriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageData = await getPageData(locale);

  const fallbackData = {
    brief: {
      title: locale === 'pl' ? 'Brief projektowy' : 'Project Brief',
      description: locale === 'pl' 
        ? 'Wypełnij brief, aby określić zakres Twojego projektu'
        : 'Fill out the brief to define your project scope',
    }
  };

  const data = pageData || fallbackData;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        {data?.brief && (
          <div id="brief-section">
            <Brief data={data.brief} />
          </div>
        )}
      </main>
    </div>
  );
}
