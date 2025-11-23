'use client';

import React, { useState, lazy, Suspense } from 'react';
import { tinaField } from 'tinacms/dist/react';

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formDataEncoded = new URLSearchParams({
        'form-name': 'contact',
        ...formData
      }).toString();

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataEncoded
      });
      
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Błąd wysyłania:', err);
      setError('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 px-4 bg-grid-pattern relative" data-tina-field={tinaField(data, 'brief')}>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Lewa strona - Brief (2 kolumny) */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Nagłówek */}
            <div className="mb-10">
              <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5">
                 <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">Start Project</span>
              </div>
              <h2 
                className="text-4xl lg:text-6xl font-bold text-white mb-6"
                data-tina-field={tinaField(data, 'title')}
              >
                Określ czego <span className="text-gradient">potrzebujesz</span>
              </h2>
              <p 
                className="text-xl text-slate-400 leading-relaxed max-w-2xl"
                data-tina-field={tinaField(data, 'description')}
              >
                {data?.description || 'Wypełnij brief i pomóż nam lepiej zrozumieć Twoje potrzeby. To pierwszy krok do realizacji Twojego projektu.'}
              </p>
            </div>

            {/* Taby */}
            <div className="flex flex-wrap gap-3 mb-8">
              {TAB_TYPES.map((tab) => (
                <button
                  key={tab.value}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 border
                    ${activeTab === tab.value 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                      : 'text-slate-400 bg-slate-900/50 border-slate-800 hover:border-blue-500/50 hover:text-white'}
                    grow sm:grow-0`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Formularz brief */}
            <div className="relative rounded-2xl glass-panel p-8 flex-1 min-h-[480px] overflow-y-auto">
              <Suspense fallback={
                <div className="flex items-center justify-center py-20 h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 text-sm uppercase tracking-wider">Ładowanie formularza...</p>
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
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                 </div>
                 <h3 className="text-xl font-bold text-white">Skontaktuj się</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {success ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-bold mb-2">Wiadomość wysłana!</p>
                    <p className="text-slate-400 text-sm">Odpowiemy wkrótce.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Imię i nazwisko"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn-tech-primary w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                    </button>
                  </>
                )}
              </form>
            </div>

            {/* Dane kontaktowe */}
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                 </div>
                 <h3 className="text-xl font-bold text-white">Dane kontaktowe</h3>
              </div>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Email</p>
                    <a 
                      href={`mailto:${data?.contact?.email || 'kontakt@bitspire.pl'}`}
                      className="text-white hover:text-blue-400 font-medium transition-colors"
                      data-tina-field={tinaField(data?.contact, 'email')}
                    >
                      {data?.contact?.email || 'kontakt@bitspire.pl'}
                    </a>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors text-slate-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Telefon</p>
                    <a 
                      href={`tel:${data?.contact?.phone || '+48778768363'}`}
                      className="text-white hover:text-blue-400 font-medium transition-colors"
                      data-tina-field={tinaField(data?.contact, 'phone')}
                    >
                      {data?.contact?.phone || '+48 778 768 363'}
                    </a>
                  </div>
                </div>

                {/* Adres */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Adres</p>
                    <div className="text-white text-sm">
                      <p className="font-medium" data-tina-field={tinaField(data?.contact, 'address')}>
                        {data?.contact?.address || 'Bitspire'}
                      </p>
                      <p className="text-slate-400" data-tina-field={tinaField(data?.contact, 'addressLine2')}>
                        {data?.contact?.addressLine2 || 'ul. Tuwima 22a'}
                      </p>
                      <p className="text-slate-400" data-tina-field={tinaField(data?.contact, 'city')}>
                        {data?.contact?.city || '76-200 Słupsk'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Szybka odpowiedź */}
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 mt-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div>
                   <p className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-0.5">Szybka odpowiedź</p>
                   <p className="text-slate-400 text-xs">
                     Odpowiadamy w ciągu 24h w dni robocze.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
