"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookies";
import type { CookieCategory } from "@/lib/cookies";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  necessary: "Niezbędne",
  analytics: "Analityczne",
  personalization: "Personalizacyjne",
  marketing: "Marketing / Reklamowe",
};

export const CookieSettingsModal: React.FC<Props> = ({ open, onClose }) => {
  const { consent, setCategories, rejectAll, grantAll } = useCookieConsent();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFocusable = useRef<HTMLButtonElement | null>(null);
  const lastFocusable = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
      if (e.key === "Tab" && open && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // sync with open prop
  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
      setEntering(true);
      // flip to false on next frame to trigger transition
      const raf = requestAnimationFrame(() => setEntering(false));
      return () => cancelAnimationFrame(raf);
    }
    if (visible) {
      // run exit then hide
      setClosing(true);
      const t = setTimeout(() => { setVisible(false); setClosing(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [open, visible]);

  if (!visible) return null;

  const toggle = (key: Exclude<CookieCategory, "necessary"> | "necessary") => {
    if (!consent) return;
    if (key === "necessary") return; // cannot toggle
    const value = !consent[key as keyof typeof consent];
    setCategories([key as CookieCategory], value);
  };

  return (
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center p-4 transition-opacity duration-300 ${entering || closing ? 'opacity-0' : 'opacity-100'} bg-black/60 backdrop-blur-sm`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="cookie-settings-title"
      ref={dialogRef}
    >
      <div className={`w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 md:p-8 transform transition-all duration-300 ${entering || closing ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
        <h2 id="cookie-settings-title" className="text-2xl font-bold text-white mb-2">
          Ustawienia cookies
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Dostosuj zgody dla poszczególnych kategorii. Zmiany zapisują się natychmiast.
        </p>
        <ul className="space-y-4">
          {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((key) => (
            <li key={key} className="flex items-start justify-between gap-4 border border-slate-700 rounded-lg p-4 bg-slate-800/40">
              <div>
                <p className="font-medium text-white">{CATEGORY_LABELS[key]}</p>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  {key === "necessary" && "Podstawowe cookies wymagane do działania serwisu (nie można wyłączyć)."}
                  {key === "analytics" && "Pomagają analizować ruch i ulepszać serwis (anonimowe statystyki)."}
                  {key === "personalization" && "Zapamiętywanie preferencji i dostosowanie interfejsu."}
                  {key === "marketing" && "Pomiar skuteczności kampanii i dopasowanie treści reklamowych."}
                </p>
              </div>
              <button
                onClick={() => toggle(key as CookieCategory)}
                disabled={key === "necessary"}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
                  ${consent?.[key as keyof typeof consent] ? 'bg-blue-600 border-blue-600' : 'bg-slate-600 border-slate-500'}
                  ${key === 'necessary' ? 'opacity-60 cursor-not-allowed' : ''}`}
                aria-pressed={!!consent?.[key as keyof typeof consent]}
                aria-label={`Przełącz kategorię ${CATEGORY_LABELS[key]}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200
                    ${consent?.[key as keyof typeof consent] ? 'translate-x-7' : 'translate-x-0'}`}
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 justify-end mt-8">
          <button
            ref={firstFocusable}
            onClick={() => { rejectAll(); onClose(); }}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium text-slate-200 border border-slate-600"
          >
            Odrzuć wszystkie
          </button>
          <button
            onClick={() => { grantAll(); onClose(); }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white shadow"
          >
            Akceptuj wszystkie
          </button>
          <button
            ref={lastFocusable}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 border border-slate-600"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
