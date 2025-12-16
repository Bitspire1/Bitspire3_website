import Brief from "@/components/sections/Brief";
import Contact from "@/components/sections/Contact";

interface ContactPageData {
    [key: string]: unknown;
    brief?: {
        title?: string;
        description?: string;
        buttonText?: string;
        contact?: {
            email?: string;
            phone?: string;
            address?: string;
            addressLine2?: string;
            city?: string;
        };
    };
    contact?: {
        title?: string;
        description?: string;
        email?: string;
        phone?: string;
        address?: string;
    };
}

interface ContactPageWrapperProps {
    data: ContactPageData;
}

export default function ContactPageWrapper({ data }: ContactPageWrapperProps) {
    return (
        <>
            <Brief data={data?.brief} />
            <Contact data={data?.contact} />
        </>
    );
}
