// Small utility to inject and remove analytics scripts (Google Analytics gtag as example).
// Does not automatically enable analytics — call loadGtag only after user consent.

export function injectScript(id: string, src: string, inline?: string) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  if (src) script.src = src;
  if (inline) script.text = inline;
  script.async = true;
  document.head.appendChild(script);
}

export function removeScript(id: string) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (el) el.remove();
}

export function loadGtagMeasurement(measurementId: string) {
  if (!measurementId) return;
  // inject gtag.js
  injectScript('gtag-js', `https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  const inline = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true });`;
  injectScript('gtag-init', '', inline);
}

export function unloadGtag() {
  try {
    removeScript('gtag-js');
    removeScript('gtag-init');
    // remove gtag global
    if (typeof window !== 'undefined') {
      const w = window as unknown as { [k: string]: unknown };
      delete w.gtag;
      delete w.dataLayer;
    }
  } catch {
    // ignore
  }
}
