"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";

const STEPS = [
  { label: "Nowy sklep czy przebudowa?", required: true, options: ["Nowy sklep", "Przebudowa"], key: "shopType" },
  { label: "Jakie produkty chcesz sprzedawać?", required: true, type: "textarea", key: "products" },
  { label: "Ile produktów planujesz na start?", required: false, options: ["do10", "od11do50", "od51do200", "powyzej200"], key: "productCount" },
  { label: "Czy sklep ma obsługiwać różne warianty produktów (np. rozmiar, kolor)?", required: false, options: ["Tak", "Nie"], key: "variants" },
  { label: "Jakie metody płatności mają być dostępne?", required: false, type: "textarea", key: "payments" },
  { label: "Jakie metody dostawy mają być dostępne?", required: false, type: "textarea", key: "shipping" },
  { label: "Czy sklep ma mieć integracje z systemami zewnętrznymi (np. Allegro, hurtownie, ERP)?", required: false, options: ["Tak", "Nie", "Inne"], key: "integrations" },
  { label: "Czy potrzebujesz panelu administracyjnego do zarządzania zamówieniami i produktami?", required: false, options: ["Tak", "Nie"], key: "adminPanel" },
  { label: "Czy posiadasz już materiały graficzne (logo, zdjęcia produktów)?", required: false, options: ["Tak", "Nie"], key: "graphics" },
  { label: "Preferencje co do stylu graficznego sklepu?", required: false, type: "text", key: "style" },
  { label: "Czy sklep ma być dostępny w innych językach niż polski?", required: false, type: "text", key: "languages" },
  { label: "Jaki jest orientacyjny budżet na realizację sklepu?", required: false, type: "text", key: "budget" },
  { label: "Podaj swoje dane kontaktowe (e-mail lub numer telefonu)", required: true, type: "text", key: "contact" }
];


const ShopBrief: React.FC = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = useMemo(() => STEPS[step], [step]);
  const percent = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

  const handleSelect = useCallback((option: string) => {
    if (current.key === "integrations" && option === "Inne") {
      setForm((prev) => ({ ...prev, [current.key]: "Inne:" }));
    } else {
      setForm((prev) => ({ ...prev, [current.key]: option }));
    }
  }, [current.key]);

  const isFormValid = useMemo(() => {
    const requiredFields = STEPS.filter(step => step.required).map(step => step.key);
    return requiredFields.every(key => form[key] && form[key].trim() !== "");
  }, [form]);

  const encodeFormData = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = useCallback(async () => {
    const requiredFields = STEPS.filter(step => step.required).map(step => step.key);
    const missing = requiredFields.filter(key => !form[key] || form[key].trim() === "");
    if (missing.length > 0) {
      setError("Uzupełnij wszystkie wymagane pola oznaczone gwiazdką.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = {
        "form-name": "brief-shop",
        ...form
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });

      setSuccess(true);
    } catch (e: unknown) {
      console.error("Błąd sklepu:", e);
      if (e instanceof Error) {
        setError(e.message || "Błąd podczas wysyłania.");
      } else {
        setError("Błąd podczas wysyłania.");
      }
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    if (visible) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={rootRef}
      className={`transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] will-change-transform will-change-opacity h-full flex flex-col
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-mono text-blue-400">POSTĘP</span>
            <span className="text-xs font-mono text-blue-400">{percent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-900/50 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 relative" style={{width:`${percent}%`,transition:"width 0.5s cubic-bezier(0.4, 0, 0.2, 1)"}}>
            <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
      {success ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Brief wysłany pomyślnie!</h3>
            <p className="text-slate-400 max-w-md">
                Dziękujemy za poświęcony czas. Przeanalizujemy Twoje odpowiedzi i skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
        </div>
      ) : (
        <>
          <div className="flex-1 mb-8">
            <label className="block text-2xl md:text-3xl font-bold mb-6 text-white leading-tight">
              {current.label} {current.required && <span className="text-blue-500 text-lg align-top">*</span>}
            </label>
            <div key={current.key} className="flex flex-col gap-3 animate-fade-in-up">
              {current.options && current.options.map((option: string) => (
                <div key={option} className="flex flex-col">
                  <label className={`flex items-center gap-4 cursor-pointer p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                    form[current.key] === option || (option === "Inne" && form[current.key]?.startsWith("Inne:"))
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      : "border-slate-800 bg-slate-900/40 hover:border-blue-500/30 hover:bg-slate-800/60"
                  }`}>
                    <div className="relative z-10 flex items-center gap-4 w-full">
                        <div className="relative">
                            <input
                                type="radio"
                                name={`brief-shop-${current.key}`}
                                checked={Boolean(
                                form[current.key] === option || (option === "Inne" && form[current.key]?.startsWith("Inne:"))
                                )}
                                onChange={() => handleSelect(option)}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                                form[current.key] === option || (option === "Inne" && form[current.key]?.startsWith("Inne:"))
                                ? "border-blue-500 bg-blue-500"
                                : "border-slate-600 bg-transparent group-hover:border-blue-400"
                            }`}>
                                {(form[current.key] === option || (option === "Inne" && form[current.key]?.startsWith("Inne:"))) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </div>
                        </div>
                        <span className={`text-lg font-medium transition-colors ${
                            form[current.key] === option || (option === "Inne" && form[current.key]?.startsWith("Inne:"))
                            ? "text-white"
                            : "text-slate-400 group-hover:text-slate-200"
                        }`}>{option}</span>
                    </div>
                  </label>
                  {current.key === "integrations" && option === "Inne" && (form[current.key] === "Inne" || form[current.key]?.startsWith("Inne:")) && (
                    <input
                      className="w-full mt-3 p-4 rounded-xl bg-slate-900/80 border border-blue-500/50 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all animate-fade-in"
                      type="text"
                      placeholder="Podaj integracje..."
                      value={form[current.key]?.replace("Inne:","")||""}
                      onChange={e=>setForm({...form,[current.key]:`Inne:${e.target.value}`})}
                      autoFocus
                    />
                  )}
                </div>
              ))}
              {current.type === "textarea" && (
                <textarea
                  className="w-full p-5 rounded-xl bg-slate-900/50 border border-slate-700 text-white text-lg placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none min-h-[160px]"
                  rows={4}
                  value={form[current.key]||""}
                  onChange={e=>setForm({...form,[current.key]:e.target.value})}
                  placeholder="Wpisz tutaj..."
                />
              )}
              {current.type === "text" && (
                <input
                  className="w-full p-5 rounded-xl bg-slate-900/50 border border-slate-700 text-white text-lg placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  type="text"
                  value={form[current.key]||""}
                  onChange={e=>setForm({...form,[current.key]:e.target.value})}
                  placeholder="Wpisz tutaj..."
                />
              )}
            </div>
          </div>
          {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center text-sm font-medium animate-shake">{error}</div>}
          <div className="flex gap-4 pt-4 border-t border-slate-800/50 mt-auto">
            <button
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 border
                ${step === 0 || loading 
                  ? "border-slate-800 text-slate-600 cursor-not-allowed opacity-50" 
                  : "border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800"}`}
              onClick={()=>setStep(s=>Math.max(0,s-1))}
              disabled={step===0 || loading}
            >
              Wstecz
            </button>
            {step < STEPS.length - 1 ? (
              <button
                className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300
                  ${
                    !form[current.key] || loading
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "btn-tech-primary"
                  }`}
                onClick={()=>setStep(s=>Math.min(STEPS.length-1,s+1))}
                disabled={!form[current.key]||loading}
              >
                Dalej
              </button>
            ) : (
              <button
                className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300
                  ${
                    (!form[current.key] || !isFormValid) || loading
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  }`}
                onClick={handleSubmit}
                disabled={(!form[current.key] || !isFormValid) || loading}
              >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Wysyłanie...
                    </span>
                ) : "Wyślij brief"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopBrief;
