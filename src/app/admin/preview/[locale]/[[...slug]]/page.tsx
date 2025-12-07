import React from 'react';

// Force dynamic rendering - no caching for preview
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 px-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-2xl font-semibold text-white">Preview not available in static build</h1>
        <p className="text-slate-300">
          Tina visual preview is disabled in this build to keep local and CI builds independent from the Tina SDK.
        </p>
        <p className="text-slate-400 text-sm">
          Requested: <code className="bg-slate-800 px-2 py-1 rounded border border-slate-700">/admin/preview/{locale}/{slug?.join('/') || 'home'}</code>
        </p>
        <p className="text-slate-500 text-xs">
          To edit content visually, run the Tina dev server locally where the SDK can connect to the content API.
        </p>
      </div>
    </div>
  );
}
