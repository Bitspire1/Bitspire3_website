// src/app/admin/page.tsx
'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function AdminIndex() {
  useEffect(() => {
    // Redirect to default locale admin page
    window.location.href = '/admin/pl';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirecting to Visual Editor...</p>
      </div>
    </div>
  );
}
