import LegalPage from "@/components/sections/LegalPage";

interface LegalSection {
    id?: string | null;
    title?: string | null;
    content?: string | null;
}

interface LegalPageData {
    [key: string]: unknown;
    title?: string;
    titleAccent?: string;
    lastUpdate?: string;
    sections?: LegalSection[];
}

interface LegalPageWrapperProps {
    data: LegalPageData;
}

export default function LegalPageWrapper({ data }: LegalPageWrapperProps) {
    return (
        <LegalPage data={data} />
    );
}
