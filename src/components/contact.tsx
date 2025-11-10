"use client";

import React, { useState, useCallback } from "react";
import { CursorLightCard } from "../hooks/cursor-light";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // Memoize handlers for performance
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formularz kontaktowy:", form);

    try {
      // Netlify Forms automatycznie obsługuje FormData
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      console.log("Formularz wysłany pomyślnie");
      setSent(true);
    } catch (error) {
      console.error("Błąd:", error);
      alert("Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.");
    }
  }, [form]);

  return (
    <div className="space-y-6 h-full min-h-[480px] flex flex-col">
      {/* Formularz kontaktowy */}
      <CursorLightCard className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 flex-shrink-0">
        <h3 className="text-xl font-bold text-white mb-4">💬 Skontaktuj się</h3>
        
        {sent ? (
          <div className="p-4 bg-green-600 text-white rounded-xl text-center font-semibold text-sm">
            Dziękujemy za kontakt! Odpowiemy wkrótce.
          </div>
        ) : (
          <form 
            name="contact" 
            method="POST" 
            className="space-y-4" 
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Imię i nazwisko"
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 text-white border border-slate-600 focus:outline-none focus:border-blue-400 focus:bg-slate-800/70 transition-all duration-200 text-sm"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Adres email"
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 text-white border border-slate-600 focus:outline-none focus:border-blue-400 focus:bg-slate-800/70 transition-all duration-200 text-sm"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Twoja wiadomość..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 text-white border border-slate-600 focus:outline-none focus:border-blue-400 focus:bg-slate-800/70 transition-all duration-200 resize-none text-sm"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg font-semibold text-sm bg-blue-600 text-white shadow-lg transition-all duration-200 hover:bg-blue-500 hover:scale-105"
            >
              Wyślij wiadomość
            </button>
          </form>
        )}
      </CursorLightCard>

      {/* Dane kontaktowe */}
      <CursorLightCard className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4">📞 Dane kontaktowe</h3>
        
        <div className="space-y-4 flex-1">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.95a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Email</p>
              <a href="mailto:kontakt@bitspire.pl" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                kontakt@bitspire.pl
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Telefon</p>
              <a href="tel:+48778768363" className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                +48 778 768 363
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Adres</p>
              <p className="text-white text-sm">
                Bitspire<br />
                <span className="text-gray-300 text-xs">ul. Tuwina 22a<br />76-200 Słupsk</span>
              </p>
            </div>
          </div>
        </div>

        {/* Czas odpowiedzi - na dole */}
        <div className="mt-auto p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
          <p className="text-blue-400 font-semibold mb-1 text-sm">💡 Szybka odpowiedź</p>
          <p className="text-gray-300 text-xs">
            Odpowiadamy w ciągu 24h w dni robocze.
          </p>
        </div>
      </CursorLightCard>
    </div>
  );
};

export default Contact;
