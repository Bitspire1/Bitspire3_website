"use client";
import React from 'react';
import Image from 'next/image';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { PreviewLink } from './ui/PreviewLink';

export const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo i opis */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo/Bitspire logo main.svg"
                alt="Bitspire"
                className="h-10 w-auto"
                width={120}
                height={40}
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Tworzymy nowoczesne strony internetowe, sklepy online i aplikacje. 
              Pomagamy firmom rozwijać się w świecie cyfrowym.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61578556904045"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/bitspire_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/bitspire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/bitspire1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nawigacja */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Nawigacja</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Strona główna
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('offer-section')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Oferta
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('brief-section')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Brief
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact-section')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaEnvelope className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                <a 
                  href="mailto:kontakt@bitspire.pl" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  kontakt@bitspire.pl
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                <a 
                  href="tel:+48778768363" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +48 778 768 363
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p>Bitspire</p>
                  <p>ul. Tuwima 22a</p>
                  <p>76-200 Słupsk</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Dolny pasek */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Bitspire. Wszystkie prawa zastrzeżone.
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm justify-center md:justify-end">
            <PreviewLink href="/polityka-prywatnosci/" className="text-gray-400 hover:text-white transition-colors">
              Polityka prywatności
            </PreviewLink>
            <PreviewLink href="/polityka-cookies/" className="text-gray-400 hover:text-white transition-colors">
              Polityka cookies
            </PreviewLink>
            <PreviewLink href="/regulamin/" className="text-gray-400 hover:text-white transition-colors">
              Regulamin
            </PreviewLink>
            {/* Deklaracja dostępności usunięta */}
            <button
              onClick={() => {
                const evt = new CustomEvent("open-cookie-settings");
                window.dispatchEvent(evt);
              }}
              className="text-gray-400 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
            >
              Ustawienia cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
