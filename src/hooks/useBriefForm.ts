import { useState, useCallback } from 'react';

interface UseBriefFormProps {
  formName: 'brief-website' | 'brief-shop' | 'brief-logo' | 'brief-seo';
  requiredFields: string[];
}

interface UseBriefFormReturn {
  form: Record<string, string>;
  setForm: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  loading: boolean;
  success: boolean;
  error: string;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (extraData?: Record<string, string>) => Promise<void>;
}

export const useBriefForm = ({ formName, requiredFields }: UseBriefFormProps): UseBriefFormReturn => {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const encodeFormData = useCallback((data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }, []);

  const handleSubmit = useCallback(async (extraData?: Record<string, string>) => {
    const missing = requiredFields.filter((key) => !form[key] || form[key].trim() === "");
    if (missing.length > 0) {
      setError("Uzupełnij wszystkie wymagane pola oznaczone gwiazdką.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = {
        "form-name": formName,
        ...form,
        ...(extraData || {}),
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });

      setSuccess(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Błąd podczas wysyłania.");
      } else {
        setError("Błąd podczas wysyłania.");
      }
    } finally {
      setLoading(false);
    }
  }, [form, requiredFields, formName, encodeFormData]);

  return {
    form,
    setForm,
    loading,
    success,
    error,
    setSuccess,
    setError,
    handleSubmit,
  };
};
