import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Background } from "@/components/layout/background";
import Brief from "@/components/sections/Brief";

export default async function BriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const homeContent = await fs.readFile(path.join(process.cwd(), "content", "pages", locale, "home.mdx"), "utf-8");
  const pageData = matter(homeContent).data;
  
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
