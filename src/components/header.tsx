"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 animate-slide-in-down`}
    >
      <div
        className={`
          bg-gray-900/70 border border-gray-700 text-white
          max-w-screen-2xl mx-auto rounded-xl shadow-xl
          overflow-hidden
          transition-[max-height] duration-500 ease-in-out
          ${open ? 'max-h-[100vh]' : 'max-h-16 md:max-h-full'}
        `}
      >
    {/* górny pasek */}
  <div className="px-4 md:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* left: logo + optional center nav */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center shrink-0 -translate-y-[0px] motion-safe:transition-transform"
              aria-label="Przejdź do strony głównej"
            >
              <Image
                src="/Bitspire logo main.svg"
                alt="Bitspire - strona główna"
                className="h-8 sm:h-10 w-auto max-h-10 max-w-[140px] object-contain"
                width={120}
                height={40}
                priority
                sizes="140px"
              />
            </Link>

            <nav className="hidden md:flex ml-2 space-x-6" aria-label="Główna nawigacja">
              <a
                href="/portfolio/"
                className="ml-10 text-sm font-medium text-slate-300 hover:text-white hover:underline underline-offset-4 decoration-blue-400/60 transition"
              >
                Portfolio
              </a>
            </nav>
          </div>

          {/* right: CTA + social icons (desktop) and hamburger stays at the end for mobile */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center space-x-6" aria-label="Linki do mediów społecznościowych">
                <a
                  href="https://www.facebook.com/profile.php?id=61578556904045"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition text-3xl sm:text-4xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1"
                  aria-label="Odwiedź naszą stronę na Facebooku (otwiera w nowym oknie)"
                >
                  <FaFacebookF aria-hidden="true" />
                </a>
                <a
                  href="https://instagram.com/bitspire_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition text-3xl sm:text-4xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1"
                  aria-label="Odwiedź nasz profil na Instagramie (otwiera w nowym oknie)"
                >
                  <FaInstagram aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com/company/bitspire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-600 transition text-3xl sm:text-4xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1"
                  aria-label="Odwiedź nasz profil na LinkedIn (otwiera w nowym oknie)"
                >
                  <FaLinkedinIn aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/bitspire1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition text-3xl sm:text-4xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1"
                  aria-label="Odwiedź nasze repozytoria na GitHub (otwiera w nowym oknie)"
                >
                  <FaGithub aria-hidden="true" />
                </a>
              </div>

              <button
                onClick={() => {
                  const offerElement = document.getElementById('offer-section');
                  if (offerElement) {
                    offerElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition"
                aria-label="Przejdź do sekcji oferty"
              >
                Zapytaj o ofertę
              </button>
            </div>

            {/* hamburger for mobile */}
            <button
              onClick={() => setOpen((o) => !o)}
              className={`md:hidden focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg h-10 w-10 flex items-center justify-center transition-colors translate-y-[1px] motion-safe:transition-transform ${open ? 'bg-transparent' : 'bg-transparent'}`}
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg
                className={`w-5 h-5 text-white transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                focusable="false"
                role="img"
                aria-labelledby="menu-icon-title"
              >
                <title id="menu-icon-title">{open ? 'Zamknij menu' : 'Otwórz menu'}</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* mobilne menu */}
        <nav
          id="mobile-menu"
          className={`md:hidden flex flex-col px-4 md:px-6 pb-4 divide-y divide-white/30 transition-all duration-300 ease-in-out origin-top ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
          aria-label="Menu mobilne"
          aria-hidden={!open}
        >
          <div className="flex flex-col gap-6 py-4" aria-label="Menu mobilne linki">
            <a
              href="/portfolio/"
              onClick={() => setOpen(false)}
              className="text-lg font-semibold text-slate-200 hover:text-white hover:underline underline-offset-4 decoration-blue-400/60 transition"
            >
              Portfolio
            </a>
            <div className="flex justify-center items-center gap-8" aria-label="Linki do mediów społecznościowych">
              <a href="https://www.facebook.com/profile.php?id=61578556904045" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1" aria-label="Facebook">
                <FaFacebookF aria-hidden="true" />
              </a>
              <a href="https://instagram.com/bitspire_" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition text-3xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1" aria-label="Instagram">
                <FaInstagram aria-hidden="true" />
              </a>
              <a href="https://linkedin.com/company/bitspire" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 transition text-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1" aria-label="LinkedIn">
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a href="https://github.com/bitspire1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition text-3xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md p-1" aria-label="GitHub">
                <FaGithub aria-hidden="true" />
              </a>
            </div>
            <button
              onClick={() => {
                const offerElement = document.getElementById('offer-section');
                if (offerElement) offerElement.scrollIntoView({ behavior: 'smooth' });
                setOpen(false);
              }}
              className="mt-2 flex justify-center items-center py-3 w-full rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 bg-blue-600 hover:bg-blue-500 text-white"
              aria-label="Przejdź do sekcji oferty"
            >
              Zapytaj o ofertę
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
