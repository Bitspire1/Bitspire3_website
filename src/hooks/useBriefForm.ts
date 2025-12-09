import { useState, useCallback } from 'react';

interface UseBriefFormProps {
  formName: string;
  requiredFields: string[];
}

interface UseBriefFormReturn {
  form: Record<string, string>;
  setForm: (value: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => void;
  loading: boolean;
  success: boolean;
  error: string | null;
  handleSubmit: () => Promise<void>;
}

export const useBriefForm = ({ formName, requiredFields }: UseBriefFormProps): UseBriefFormReturn => {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formName }),
      });
      if (response.ok) {
        setSuccess(true);
        setForm({});
      } else {
        setError('Submission failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [form, formName]);

  return { form, setForm, loading, success, error, handleSubmit };
};
