import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Background } from "@/components/layout/background";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const homeContent = await fs.readFile(path.join(process.cwd(), "content", "pages", locale, "home.mdx"), "utf-8");
  const pageData = matter(homeContent).data;

  const heroData = pageData && "hero" in pageData ? pageData.hero : undefined;
  const technologyData = pageData && "technology" in pageData ? pageData.technology : undefined;

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <Background />
      <main className="relative z-10">
        {heroData ? <Hero data={heroData as never} /> : null}
        {technologyData ? <Technology data={technologyData as never} /> : null}
      </main>
    </div>
  );
}
