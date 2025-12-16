import Portfolio from "@/components/sections/portfolio/Portfolio";

interface PortfolioProject {
    title?: string | null;
    description?: string | null;
    tags?: (string | null)[] | null;
    year?: string | null;
    image?: string | null;
    imageAlt?: string | null;
    link?: string | null;
}

interface PortfolioPageData {
    [key: string]: unknown;
    title?: string;
    description?: string;
    sectionLabel?: string;
    projects?: PortfolioProject[];
}

interface PortfolioPageWrapperProps {
    data: PortfolioPageData;
}

export default function PortfolioPageWrapper({ data }: PortfolioPageWrapperProps) {
    return (
        <Portfolio data={data} />
    );
}
