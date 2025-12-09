'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookie-consent');
    if (!consent) {
      setShow(true);
    }

    // Listen for custom event to show settings
    const handleOpenSettings = () => setShow(true);
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const acceptCookies = () => {
    setCookie('cookie-consent', 'accepted', { maxAge: 60 * 60 * 24 * 365 });
    setShow(false);
  };

  const rejectCookies = () => {
    setCookie('cookie-consent', 'rejected', { maxAge: 60 * 60 * 24 * 365 });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-6">
        <h3 className="text-white font-semibold mb-2">Pliki cookie</h3>
        <p className="text-slate-300 text-sm mb-4">
          Używamy plików cookie, aby poprawić wrażenia użytkownika. Kontynuując przeglądanie, wyrażasz zgodę na używanie plików cookie.
        </p>
        <div className="flex gap-3">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition"
          >
            Akceptuję
          </button>
          <button
            onClick={rejectCookies}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition"
          >
            Odrzuć
          </button>
        </div>
      </div>
    </div>
  );
}
