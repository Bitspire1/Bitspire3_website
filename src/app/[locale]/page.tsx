import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { HomeClient } from "@/components/HomeClient";

// Load page data from filesystem frontmatter
async function getPageData(locale: string) {
  const filePath = path.join(process.cwd(), "content", "pages", locale, "home.mdx");
  const raw = await fs.readFile(filePath, "utf8");
  const { data } = matter(raw);

  if (!data) {
    throw new Error(`Missing home page data for locale: ${locale}`);
  }

  return data as Record<string, unknown>;
}

// Load portfolio projects for highlights from filesystem
async function getPortfolioProjects(locale: string) {
  const dir = path.join(process.cwd(), "content", "portfolio", locale);
  const entries = await fs.readdir(dir);

  const projects = await Promise.all(
    entries
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        const slug = file.replace(/\.mdx$/, "");

        return {
          title: String((data as Record<string, unknown>).title || ""),
          slug,
          excerpt: String((data as Record<string, unknown>).excerpt || ""),
          image: String((data as Record<string, unknown>).image || ""),
          imageAlt: String((data as Record<string, unknown>).imageAlt || (data as Record<string, unknown>).title || ""),
          category: String((data as Record<string, unknown>).category || ""),
          date: String((data as Record<string, unknown>).date || ""),
        };
      })
  );

  return projects;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageData = await getPageData(locale);
  const portfolioProjects = await getPortfolioProjects(locale);

  return <HomeClient data={pageData} portfolioProjects={portfolioProjects} locale={locale} />;
}
