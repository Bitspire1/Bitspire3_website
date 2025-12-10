import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Background } from "@/components/layout/background";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import { PortfolioHighlights } from "@/components/sections/PortfolioHighlights";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const homeContent = await fs.readFile(path.join(process.cwd(), "content", "pages", locale, "home.mdx"), "utf-8");
  const pageData = matter(homeContent).data;

  const heroData = pageData && "hero" in pageData ? pageData.hero : undefined;
  const technologyData = pageData && "technology" in pageData ? pageData.technology : undefined;
  const offerData = pageData && "offer" in pageData ? pageData.offer : undefined;
  const portfolioHighlightsData = pageData && "portfolioHighlights" in pageData ? pageData.portfolioHighlights : undefined;

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <Background />
      <main className="relative z-10">
        {heroData ? <Hero data={heroData as never} /> : null}
        {technologyData ? <Technology data={technologyData as never} /> : null}
        {offerData ? <Offer data={offerData as never} /> : null}
        {portfolioHighlightsData ? <PortfolioHighlights data={portfolioHighlightsData as never} /> : null}
      </main>
    </div>
  );
}
