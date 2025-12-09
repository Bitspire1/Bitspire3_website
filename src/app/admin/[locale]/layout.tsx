"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTina } from "tinacms/dist/react";
import "../../globals.css";
import { CursorLightProvider } from "@/hooks/cursor-light";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type LayoutProps = {
	children: React.ReactNode;
};

const headerQuery = `query Header($relativePath: String!) { header(relativePath: $relativePath) { _values } }`;
const footerQuery = `query Footer($relativePath: String!) { footer(relativePath: $relativePath) { _values } }`;

export default function AdminLocaleLayout({ children }: LayoutProps) {
	const params = useParams();
	const locale = (params?.locale as string) || "pl";

	const [initialHeader, setInitialHeader] = useState<any>({ header: { _values: {} } });
	const [initialFooter, setInitialFooter] = useState<any>({ footer: { _values: {} } });

	useEffect(() => {
		// Initialize with empty data, TinaCMS will fetch from GraphQL
	}, [locale]);

	const { data: headerData } = useTina({
		query: headerQuery,
		variables: { relativePath: `${locale}/header.mdx` },
		data: initialHeader,
	});

	const { data: footerData } = useTina({
		query: footerQuery,
		variables: { relativePath: `${locale}/footer.mdx` },
		data: initialFooter,
	});

	const headerValues = (headerData.header as any)?._values ?? {};
	const footerValues = (footerData.footer as any)?._values ?? {};

	return (
		<CursorLightProvider>
			<Header data={headerValues} locale={locale} />
			{children}
			<Footer data={footerValues} locale={locale} strictValidation={false} />
		</CursorLightProvider>
	);
}
