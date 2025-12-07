import { Background } from "@/components/background";
import Brief from "@/components/sections/Brief";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// Load page data from filesystem (home.mdx frontmatter)
async function getPageData(locale: string) {
  const filePath = path.join(process.cwd(), "content", "pages", locale, "home.mdx");
  const raw = await fs.readFile(filePath, "utf8").catch((error) => {
    console.warn(`[brief] Missing home.mdx for ${locale}:`, error);
    return null;
  });

  if (!raw) {
    return null;
  }

  const { data } = matter(raw);
  return data as Record<string, unknown>;
}

export default async function BriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageData = await getPageData(locale);
  const briefData: Record<string, unknown> | null = pageData && typeof pageData === 'object' && 'brief' in pageData
    ? ((pageData as { brief?: Record<string, unknown> }).brief ?? null)
    : null;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        {briefData ? (
          <div id="brief-section">
            <Brief data={briefData as Record<string, unknown>} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
