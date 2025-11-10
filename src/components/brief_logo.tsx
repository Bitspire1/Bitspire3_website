"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";

const STEPS = [
  { label: "Nowe logo czy lifting obecnego?", required: true, options: ["Nowe logo", "Lifting obecnego"], key: "logoType" },
  { label: "Nazwa firmy / marki do umieszczenia w logo", required: true, type: "text", key: "brandName" },
  { label: "Hasło / tagline (jeśli ma się pojawić)", required: false, type: "text", key: "tagline" },
  { label: "Jakie wartości lub cechy ma wyrażać logo?", required: true, type: "textarea", key: "values" },
  { label: "Preferencje kolorystyczne", required: false, type: "text", key: "colors" },
  { label: "Preferencje co do stylu logo (np. minimalistyczne, klasyczne, nowoczesne)", required: false, type: "text", key: "style" },
  { label: "Czy logo ma zawierać symbol/grafikę czy być tylko typograficzne?", required: false, options: ["Symbol/grafika", "Tylko typografia", "Nie wiem"], key: "symbol" },
  { label: "Gdzie będzie używane logo? (np. strona www, druk, social media, gadżety)", required: false, type: "textarea", key: "usage" },
  { label: "Czy posiadasz inspiracje lub przykłady logo, które Ci się podobają?", required: false, type: "text", key: "inspirations" },
  { label: "Jaki jest orientacyjny budżet na projekt logo?", required: false, type: "text", key: "budget" },
  { label: "Podaj swoje dane kontaktowe (e-mail lub numer telefonu)", required: true, type: "text", key: "contact" }
];


const BriefLogoComponent: React.FC = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  // Animation state
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only recalculate current step and percent when step/form changes
  const current = useMemo(() => STEPS[step], [step]);
  const percent = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

  // Memoize handleSelect for performance
  const handleSelect = useCallback((option: string) => {
    setForm((prev) => ({ ...prev, [current.key]: option }));
  }, [current.key]);

  // Validate all required fields
  const isFormValid = useMemo(() => {
    const requiredFields = STEPS.filter(step => step.required).map(step => step.key);
    return requiredFields.every(key => form[key] && form[key].trim() !== "");
  }, [form]);

  // Helper to encode form data for Netlify
  const encodeFormData = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError("");
    console.log("Formularz logo:", form);
    try {
      // Prepare data for Netlify Forms
      const formData = {
        "form-name": "brief-logo",
        "bot-field": "", // honeypot
        ...form
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });
      
      console.log("Brief logo wysłany pomyślnie");
      setSuccess(true);
    } catch (e: unknown) {
      console.error("Błąd logo:", e);
      if (e instanceof Error) {
        setError(e.message || "Błąd podczas wysyłania.");
      } else {
        setError("Błąd podczas wysyłania.");
      }
    } finally {
      setLoading(false);
    }
  }, [form]);

  // Intersection Observer for one-time animation
  useEffect(() => {
    if (visible) return; // already triggered
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
      className={`transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] will-change-transform will-change-opacity
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="mb-6">
        <div className="w-full h-6 bg-[#181824] rounded-lg overflow-hidden border border-[#41B0E5]">
          <div className="h-full bg-gradient-to-r from-[#41B0E5] via-[#3B82F6] to-[#9333EA]" style={{width:`${percent}%`,transition:"width 0.3s"}}>
            <span className="pl-3 text-white font-bold text-sm">{percent}%</span>
          </div>
        </div>
      </div>
      {success ? (
        <div className="p-6 bg-green-700 text-white rounded-xl text-center font-bold text-xl">Dziękujemy za przesłanie briefu! Skontaktujemy się z Tobą.</div>
      ) : (
        <>
          <div className="mb-8">
            <label className="block text-2xl md:text-3xl font-extrabold font-rajdhani mb-4 text-white">
              {current.label} {current.required && <span className="text-[#ff2e3c]">*</span>}
            </label>
            {/* Force remount of inputs when step changes to avoid uncontrolled -> controlled warnings */}
            <div key={current.key} className="flex flex-col gap-4 mt-2">
              {current.options && current.options.map((option: string) => (
                <label key={option} className={`flex items-center gap-4 cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 group hover:border-[#41B0E5] hover:bg-[#41B0E5]/10 ${
                  form[current.key] === option
                    ? "border-[#41B0E5] bg-[#41B0E5]/20 shadow-lg"
                    : "border-gray-600 bg-transparent"
                }`}>
                  <div className="relative">
                    <input
                      type="radio"
                      name={`brief-logo-${current.key}`}
                      checked={Boolean(form[current.key] === option)}
                      onChange={() => handleSelect(option)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      form[current.key] === option
                        ? "border-[#41B0E5] bg-[#41B0E5]"
                        : "border-gray-400 bg-transparent group-hover:border-[#41B0E5]"
                    }`}>
                      {form[current.key] === option && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-white text-lg font-medium flex-1">{option}</span>
                </label>
              ))}
              {current.type === "textarea" && (
                <textarea
                  className="w-full p-6 rounded-xl bg-[#23236F]/30 border-2 border-gray-600 text-white text-lg mt-2 placeholder-gray-400 focus:border-[#41B0E5] focus:bg-[#23236F]/50 transition-all duration-200 resize-none backdrop-blur-sm"
                  rows={4}
                  value={form[current.key]||""}
                  onChange={e=>setForm({...form,[current.key]:e.target.value})}
                  placeholder="Wpisz odpowiedź..."
                />
              )}
              {current.type === "text" && (
                <input
                  className="w-full p-6 rounded-xl bg-[#23236F]/30 border-2 border-gray-600 text-white text-lg mt-2 placeholder-gray-400 focus:border-[#41B0E5] focus:bg-[#23236F]/50 transition-all duration-200 backdrop-blur-sm"
                  type="text"
                  value={form[current.key]||""}
                  onChange={e=>setForm({...form,[current.key]:e.target.value})}
                  placeholder="Wpisz odpowiedź..."
                />
              )}
            </div>
          </div>
          {error && <div className="mb-4 text-red-500 font-bold text-center">{error}</div>}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 border-2
                ${step === 0 || loading 
                  ? "border-gray-500 bg-gray-600/30 text-gray-400 cursor-not-allowed" 
                  : "border-[#41B0E5] bg-[#41B0E5]/10 text-[#41B0E5] hover:bg-[#41B0E5] hover:text-white hover:scale-105 shadow-lg hover:shadow-[#41B0E5]/25"}`}
              onClick={()=>setStep(s=>Math.max(0,s-1))}
              disabled={step===0 || loading}
            >
              ← Wstecz
            </button>
            {step < STEPS.length - 1 ? (
              <button
                className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 border-2
                  ${
                    !form[current.key] || loading
                      ? "border-gray-500 bg-gray-600/30 text-gray-400 cursor-not-allowed"
                      : "border-[#41B0E5] bg-[#41B0E5]/10 text-[#41B0E5] hover:bg-[#41B0E5] hover:text-white hover:scale-105 shadow-lg hover:shadow-[#41B0E5]/25"
                  }`}
                onClick={()=>setStep(s=>Math.min(STEPS.length-1,s+1))}
                disabled={!form[current.key]||loading}
              >
                Dalej →
              </button>
            ) : (
              <button
                className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 border-2
                  ${
                    (!form[current.key] || !isFormValid) || loading
                      ? "border-gray-500 bg-gray-600/30 text-gray-400 cursor-not-allowed"
                      : "border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 shadow-lg hover:shadow-green-500/25"
                  }`}
                onClick={handleSubmit}
                disabled={(!form[current.key] || !isFormValid) || loading}
              >
                {loading ? 'Wysyłanie...' : 'Wyślij'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(BriefLogoComponent);
