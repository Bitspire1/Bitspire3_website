import { CursorLightProvider } from "@/hooks/cursor-light";
import '../globals.css';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <CursorLightProvider>
      {children}
    </CursorLightProvider>
  );
}
