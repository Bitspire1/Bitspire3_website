import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/request";
import "../../globals.css";


type LayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function AdminLocaleLayout({ children, params }: LayoutProps) {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages} locale={locale}>
			{children}
		</NextIntlClientProvider>
	);
}
