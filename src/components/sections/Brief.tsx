'use client';

import React, { useState, lazy, Suspense } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { CursorLightCard } from '../../hooks/cursor-light';

// Lazy load formularze
const WebsiteBrief = lazy(() => import('@/components/brief_forms/WebsiteBrief'));
const ShopBrief = lazy(() => import('@/components/brief_forms/ShopBrief'));
const LogoBrief = lazy(() => import('@/components/brief_forms/LogoBrief'));
const SeoBrief = lazy(() => import('@/components/brief_forms/SeoBrief'));

interface ContactInfo {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  [key: string]: unknown;
}

interface BriefData {
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
  contact?: ContactInfo | null;
  [key: string]: unknown;
}

const TAB_TYPES = [
  { label: 'Strona internetowa', value: 'website' },
  { label: 'Sklep internetowy', value: 'shop' },
  { label: 'Logo', value: 'logo' },
  { label: 'Pozycjonowanie', value: 'seo' },
];

export default function Brief({ data }: { data?: BriefData }) {
  const [activeTab, setActiveTab] = useState('website');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 px-4 bg-slate-900" data-tina-field={tinaField(data, 'brief')}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Lewa strona - Brief (2 kolumny) */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Nagłówek */}
            <div className="mb-8">
              <h2 
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
                data-tina-field={tinaField(data, 'title')}
              >
                Określ czego <span className="text-blue-400">potrzebujesz</span>
              </h2>
              <p 
                className="text-xl text-gray-300"
                data-tina-field={tinaField(data, 'description')}
              >
                {data?.description || 'Wypełnij brief i pomóż nam lepiej zrozumieć Twoje potrzeby. To pierwszy krok do realizacji Twojego projektu.'}
              </p>
            </div>

            {/* Taby */}
            <div className="flex flex-wrap gap-3 mb-8">
              {TAB_TYPES.map((tab) => (
                <CursorLightCard
                  key={tab.value}
                  className={`px-6 py-3 rounded-lg font-semibold text-lg border transition-all duration-200 shadow-lg cursor-pointer
                    ${activeTab === tab.value 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'text-blue-400 bg-slate-800/50 border-slate-700 hover:border-blue-400 hover:bg-slate-700/50'}
                    w-full sm:w-auto`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </CursorLightCard>
              ))}
            </div>

            {/* Formularz brief */}
            <div className="relative rounded-2xl border border-slate-700 p-8 bg-slate-800/50 backdrop-blur-sm shadow-lg flex-1 min-h-[480px] overflow-y-auto">
              <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Ładowanie formularza...</p>
                  </div>
                </div>
              }>
                {activeTab === 'website' && <WebsiteBrief />}
                {activeTab === 'shop' && <ShopBrief />}
                {activeTab === 'logo' && <LogoBrief />}
                {activeTab === 'seo' && <SeoBrief />}
              </Suspense>
            </div>
          </div>

          {/* Prawa strona - Kontakt (1 kolumna) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Formularz kontaktowy */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">💬</span> Skontaktuj się
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Imię i nazwisko"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Adres email"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Twoja wiadomość..."
                    rows={4}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>

            {/* Dane kontaktowe */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-pink-400 flex items-center gap-2 mb-6">
                <span className="text-pink-400">📞</span> Dane kontaktowe
              </h3>
              
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a 
                      href={`mailto:${data?.contact?.email || 'kontakt@bitspire.pl'}`}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                      data-tina-field={tinaField(data?.contact, 'email')}
                    >
                      {data?.contact?.email || 'kontakt@bitspire.pl'}
                    </a>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Telefon</p>
                    <a 
                      href={`tel:${data?.contact?.phone || '+48778768363'}`}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                      data-tina-field={tinaField(data?.contact, 'phone')}
                    >
                      {data?.contact?.phone || '+48 778 768 363'}
                    </a>
                  </div>
                </div>

                {/* Adres */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Adres</p>
                    <div className="text-white text-sm">
                      <p className="font-medium" data-tina-field={tinaField(data?.contact, 'address')}>
                        {data?.contact?.address || 'Bitspire'}
                      </p>
                      <p data-tina-field={tinaField(data?.contact, 'addressLine2')}>
                        {data?.contact?.addressLine2 || 'ul. Tuwima 22a'}
                      </p>
                      <p data-tina-field={tinaField(data?.contact, 'city')}>
                        {data?.contact?.city || '76-200 Słupsk'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Szybka odpowiedź */}
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mt-6">
                <p className="text-yellow-400 flex items-center gap-2 font-semibold text-sm">
                  <span>💡</span>
                  <span>Szybka odpowiedź</span>
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Odpowiadamy w ciągu 24h w dni robocze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
