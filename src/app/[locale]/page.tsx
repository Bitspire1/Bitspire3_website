import { redirect } from 'next/navigation';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Redirect do /[locale]/home który jest obsługiwany przez [...slug]
  redirect(`/${locale}/home`);
}
