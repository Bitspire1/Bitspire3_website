"use client";

import React, { useState, useCallback } from "react";
import { CursorLightCard } from "@/hooks/cursor-light";
import { tinaField } from 'tinacms/dist/react';
import { contactFormSchema } from "@/lib/validation";
import { ZodError } from 'zod';

export interface ContactFormData {
  title?: string | null;
  description?: string | null;
  successTitle?: string | null;
  successMessage?: string | null;
  nameLabel?: string | null;
  emailLabel?: string | null;
  messageLabel?: string | null;
  buttonText?: string | null;
  [key: string]: unknown;
}

interface ContactFormProps {
  data?: ContactFormData;
}

interface FormState {
  name: string;
  email: string;
  message: string;
  website: string;
  privacyAccepted: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data }) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    website: "",
    privacyAccepted: false,
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, type, value } = e.target;
      const fieldValue =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value;
      setForm((prev) => ({ ...prev, [name]: fieldValue }));
      // Clear error for this field on change
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      try {
        // Validate form data with Zod
        const validatedData = contactFormSchema.parse({
          name: form.name,
          email: form.email,
          message: form.message,
          website: form.website,
          privacyAccepted: form.privacyAccepted,
        });

        // Prepare data for Netlify Forms
        const formData = new URLSearchParams();
        formData.append("form-name", "contact");
        formData.append("name", validatedData.name);
        formData.append("email", validatedData.email);
        formData.append("message", validatedData.message);

        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });

        setSent(true);
      } catch (error) {
        // Handle validation or network errors
        if (error instanceof ZodError) {
          const newErrors: Record<string, string> = {};
          error.issues.forEach((issue) => {
            const field = issue.path[0];
            if (typeof field === "string") {
              newErrors[field] = issue.message;
            }
          });
          setErrors(newErrors);
        } else {
          alert(
            "Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie."
          );
        }
      }
    },
    [form]
  );

  return (
    <CursorLightCard className="glass-panel rounded-2xl p-8">
      {sent ? (
        <div className="py-12 text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <svg
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3
            className="text-2xl font-bold text-white mb-3"
            data-tina-field={tinaField(data, "successTitle")}
          >
            {data?.successTitle || "Dziękujemy za kontakt!"}
          </h3>
          <p
            className="text-slate-400"
            data-tina-field={tinaField(data, "successMessage")}
          >
            {data?.successMessage || "Odpowiemy wkrótce na Twoją wiadomość."}
          </p>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1"
                data-tina-field={tinaField(data, "nameLabel")}
              >
                {data?.nameLabel || "Imię i nazwisko"}
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jan Kowalski"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-slate-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1"
                data-tina-field={tinaField(data, "emailLabel")}
              >
                {data?.emailLabel || "Email"}
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jan@example.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-slate-600"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1"
              data-tina-field={tinaField(data, "messageLabel")}
            >
              {data?.messageLabel || "Wiadomość"}
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Opisz swój projekt..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-slate-600 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-tech-primary w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider"
            data-tina-field={tinaField(data, "buttonText")}
          >
            {data?.buttonText || "Wyślij wiadomość"}
          </button>
        </form>
      )}
    </CursorLightCard>
  );
};
