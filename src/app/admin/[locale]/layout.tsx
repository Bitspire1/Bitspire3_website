"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTina } from "tinacms/dist/react";
import client from "../../../../tina/__generated__/client";
import "../../globals.css";

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
		async function load() {
			try {
				const [headerRes, footerRes] = await Promise.all([
					client.queries.header({ relativePath: `${locale}/header.mdx` }),
					client.queries.footer({ relativePath: `${locale}/footer.mdx` }),
				]);
				setInitialHeader({ header: headerRes.data.header });
				setInitialFooter({ footer: footerRes.data.footer });
			} catch (e) {
				console.warn("[admin layout] header/footer fetch failed", e);
			}
		}
		load();
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

	return <>{children}</>;
}
