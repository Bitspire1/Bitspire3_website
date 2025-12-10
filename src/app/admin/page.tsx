// src/app/admin/page.tsx
import { redirect } from 'next/navigation';

export default function AdminIndex() {
  // Redirect to Tina CMS admin UI with hash routing
  redirect('/admin/index.html#/~/admin/pl');
}
