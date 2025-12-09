import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Background } from "@/components/layout/background";
import { Hero } from "@/components/sections/Hero";
import { Technology } from "@/components/sections/Technology";
import { Offer } from "@/components/sections/Offer";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { PortfolioHighlights } from "@/components/sections/Portfolio/PortfolioHighlights";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const homeContent = await fs.readFile(path.join(process.cwd(), "content", "pages", locale, "home.mdx"), "utf-8");
  const pageData = matter(homeContent).data;
  
  const portfolioDir = path.join(process.cwd(), "content", "portfolio", locale);
  const portfolioFiles = await fs.readdir(portfolioDir);
  const portfolioProjects = await Promise.all(
    portfolioFiles.filter(f => f.endsWith(".mdx")).slice(0, 3).map(async (file) => {
      const content = await fs.readFile(path.join(portfolioDir, file), "utf-8");
      const { data } = matter(content);
      return { ...data, slug: file.replace(".mdx", "") };
    })
  );

  const heroData = pageData && "hero" in pageData ? pageData.hero : undefined;
  const technologyData = pageData && "technology" in pageData ? pageData.technology : undefined;
  const offerData = pageData && "offer" in pageData ? pageData.offer : undefined;
  const howWeWorkData = pageData && "howWeWork" in pageData ? pageData.howWeWork : undefined;
  const faqData = pageData && "faq" in pageData ? pageData.faq : undefined;
  const contactData = pageData && "contact" in pageData ? pageData.contact : undefined;

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <Background />
      <main className="relative z-10">
        {heroData ? <Hero data={heroData as never} /> : null}
        {technologyData ? <Technology data={technologyData as never} /> : null}
        {offerData ? (
          <div id="offer-section">
            <Offer data={offerData as never} />
          </div>
        ) : null}
        {howWeWorkData ? <HowWeWork data={howWeWorkData as never} /> : null}
        {portfolioProjects && portfolioProjects.length > 0 ? (
          <PortfolioHighlights mode="direct" locale={locale} projects={portfolioProjects as any} />
        ) : null}
        {faqData ? <FAQ data={faqData as never} /> : null}
        {contactData ? <Contact data={contactData as never} /> : null}
      </main>
    </div>
  );
}
