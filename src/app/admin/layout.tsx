import { CursorLightProvider } from "@/hooks/cursor-light";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import AdminIntlWrapper from '@/components/logic/AdminIntlWrapper';
import '../globals.css';

export default function AdminLayout({ children, params }: { children: React.ReactNode; params?: any }) {
  const locale = params?.locale || 'pl';

  return (
    <CursorLightProvider>
      <AdminIntlWrapper locale={locale}>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </AdminIntlWrapper>
    </CursorLightProvider>
  );
}
