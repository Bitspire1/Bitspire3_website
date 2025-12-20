"use client";
import { useState, useCallback, useMemo } from "react";

interface BriefStep {
  label: string;
  required: boolean;
  options?: string[];
  type?: 'text' | 'textarea';
  key: string;
}

interface UseBriefFormOptions {
  steps: BriefStep[];
  briefType: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useBriefForm(options: UseBriefFormOptions) {
  const { steps, briefType, onSuccess, onError } = options;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const current = useMemo(() => steps[step], [steps, step]);
  const percent = useMemo(
    () => Math.round(((step + 1) / steps.length) * 100),
    [step, steps.length]
  );

  const isFormValid = useMemo(() => {
    const requiredFields = steps.filter((s) => s.required).map((s) => s.key);
    return requiredFields.every((key) => form[key] && form[key].trim() !== "");
  }, [form, steps]);

  const handleSelect = useCallback(
    (option: string) => {
      if (
        (current.key === "technology" || current.key === "integrations") &&
        option === "Inne"
      ) {
        setForm((prev) => ({ ...prev, [current.key]: "Inne:" }));
      } else {
        setForm((prev) => ({ ...prev, [current.key]: option }));
      }
    },
    [current.key]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setForm((prev) => ({ ...prev, [current.key]: value }));
    },
    [current.key]
  );

  const handleOtherInputChange = useCallback(
    (value: string) => {
      setForm((prev) => ({ ...prev, [current.key]: `Inne:${value}` }));
    },
    [current.key]
  );

  const nextStep = useCallback(() => {
    if (step < steps.length - 1 && form[current.key]) {
      setStep((s) => Math.min(steps.length - 1, s + 1));
      setError("");
    }
  }, [step, steps.length, form, current.key]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
    setError("");
  }, []);

  const encodeFormData = useCallback((data: Record<string, string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }, []);

  const handleSubmit = useCallback(async () => {
    const requiredFields = steps.filter((s) => s.required).map((s) => s.key);
    const missing = requiredFields.filter(
      (key) => !form[key] || form[key].trim() === ""
    );
    
    if (missing.length > 0) {
      setError("Uzupełnij wszystkie wymagane pola oznaczone gwiazdką.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = {
        "form-name": `brief-${briefType}`,
        ...form,
      };

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania briefu");
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (e: unknown) {
      const errorMessage = e instanceof Error
        ? e.message
        : "Błąd podczas wysyłania.";
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [form, steps, briefType, encodeFormData, onSuccess, onError]);

  const reset = useCallback(() => {
    setStep(0);
    setForm({});
    setLoading(false);
    setSuccess(false);
    setError("");
  }, []);

  return {
    step,
    form,
    loading,
    success,
    error,
    current,
    percent,
    isFormValid,
    handleSelect,
    handleInputChange,
    handleOtherInputChange,
    nextStep,
    prevStep,
    handleSubmit,
    reset,
    setError,
    isLastStep: step === steps.length - 1,
    isFirstStep: step === 0,
  };
}
