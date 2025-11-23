// src/app/admin/page.tsx
'use client';

import { useEffect } from 'react';

export default function AdminIndex() {
  useEffect(() => {
    // Redirect to TinaCMS admin with preview mode
    window.location.href = '/admin/index.html#/~/admin/preview/pl/home';
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
