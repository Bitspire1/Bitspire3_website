"use client";
import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookies";
import { loadGtagMeasurement, unloadGtag } from "@/lib/analytics";

export const AnalyticsGate: React.FC = () => {
  const { consent, ready } = useCookieConsent();

  useEffect(() => {
    if (!ready) return;
  const w = typeof window !== 'undefined' ? (window as unknown as { NEXT_PUBLIC_GA_ID?: string }) : undefined;
  const gaId = process.env.NEXT_PUBLIC_GA_ID || w?.NEXT_PUBLIC_GA_ID;
    if (consent && consent.analytics && gaId) {
      loadGtagMeasurement(gaId);
    } else {
      unloadGtag();
    }
  }, [consent, ready]);

  return null;
};
