import './globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin layout without duplicate html/body tags
  // Root layout handles the HTML structure
  return <>{children}</>;
}
