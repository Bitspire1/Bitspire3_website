"use client";

import React from "react";
import { tinaField } from 'tinacms/dist/react';
import { ContactForm, ContactFormData } from "@/components/forms/ContactForm";

interface ContactData extends ContactFormData {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  contactDataTitle?: string | null;
  [key: string]: unknown;
}

const Contact: React.FC<{ data?: ContactData }> = ({ data }) => {

  if (!data) {
    throw new Error('Contact content missing from TinaCMS');
  }

  const { title, description, contactDataTitle, email, phone, address, addressLine2, city } = data;

  if (!title || !description || !contactDataTitle || !email || !phone || !address || !addressLine2 || !city) {
    throw new Error('Contact fields missing in Tina content');
  }

  return (
    <section className="py-12 px-4 bg-slate-900/20" id="contact">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <div className="w-16 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500 mb-4 mx-auto"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" data-tina-field={tinaField(data, 'title')}>
            {title}
          </h2>
          <p className="text-slate-300 text-base" data-tina-field={tinaField(data, 'description')}>
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Formularz kontaktowy */}
          <ContactForm data={data} />

          {/* Dane kontaktowe */}
          <div className="glass-panel rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-white" data-tina-field={tinaField(data, 'contactDataTitle')}>
                 {contactDataTitle}
               </h3>
            </div>
            
            <div className="space-y-6 flex-1">
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
                    href={`mailto:${email}`}
                    className="text-white hover:text-blue-400 font-medium transition-colors"
                    data-tina-field={tinaField(data, 'email')}
                  >
                    {email}
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
                    href={`tel:${phone}`}
                    className="text-white hover:text-blue-400 font-medium transition-colors"
                    data-tina-field={tinaField(data, 'phone')}
                  >
                    {phone}
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
                    <p className="font-medium" data-tina-field={tinaField(data, 'address')}>
                      {address}
                    </p>
                    <p className="text-slate-400" data-tina-field={tinaField(data, 'addressLine2')}>
                      {addressLine2}
                    </p>
                    <p className="text-slate-400" data-tina-field={tinaField(data, 'city')}>
                      {city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Szybka odpowiedź - na dole */}
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
    </section>
  );
};

export default Contact;
