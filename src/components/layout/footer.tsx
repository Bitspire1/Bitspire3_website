"use client";
import React, { memo } from 'react';
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

interface FooterProps {
  data?: {
    companyName?: string | null;
    description?: string | null;
    contact?: {
      email?: string | null;
      phone?: string | null;
      location?: string | null;
    } | null;
    navigation?: Array<{ label?: string | null; href?: string | null } | null> | null;
    socialMedia?: Array<{
      platform?: string | null;
      url?: string | null;
      icon?: string | null;
    } | null> | null;
    copyright?: string | null;
    legalLinks?: Array<{ label?: string | null; href?: string | null } | null> | null;
    cookieSettingsText?: string | null;
  } | null;
  locale?: string;
}

const FooterContent: React.FC<FooterProps> = ({ data, locale }) => {
  // Graceful fallback for missing data
  if (!data) {
    return (
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-screen-2xl mx-auto px-4 text-center text-gray-400 text-sm">
          Footer data unavailable
        </div>
      </footer>
    );
  }

  const companyName = data.companyName || 'Company';
  const description = data.description || '';
  const contact = {
    email: data.contact?.email,
    phone: data.contact?.phone,
    location: data.contact?.location,
  };

  const navigation = data.navigation?.filter((item): item is { label: string; href: string } =>
    item !== null && typeof item.label === 'string' && typeof item.href === 'string'
  ) || [];

  const socialMedia = data.socialMedia?.filter((item): item is { platform: string; url: string; icon?: string | null } => 
    item !== null && typeof item.platform === 'string' && typeof item.url === 'string'
  ) || [];

  const legalLinks = data.legalLinks?.filter((item): item is { label: string; href: string } =>
    item !== null && typeof item.label === 'string' && typeof item.href === 'string'
  ) || [];

  const cookieSettingsText = data.cookieSettingsText;
  const copyrightText = data.copyright;

  if (!legalLinks.length) {
    throw new Error('Footer legal links missing in Tina content');
  }

  if (!cookieSettingsText) {
    throw new Error('Footer cookie settings text missing in Tina content');
  }

  if (!copyrightText) {
    throw new Error('Footer copyright missing in Tina content');
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo i opis */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo/Bitspire logo main.svg"
                alt={companyName}
                className="h-10 w-auto"
                width={120}
                height={40}
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {description}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => {
                const getSocialIcon = (icon?: string | null) => {
                  switch (icon?.toLowerCase()) {
                    case 'facebook': return <FaFacebookF className="w-5 h-5" />;
                    case 'instagram': return <FaInstagram className="w-5 h-5" />;
                    case 'linkedin': return <FaLinkedinIn className="w-5 h-5" />;
                    case 'github': return <FaGithub className="w-5 h-5" />;
                    default: return <FaEnvelope className="w-5 h-5" />;
                  }
                };
                
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-slate-800"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nawigacja */}
          {navigation.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                {locale === 'en' ? 'Navigation' : 'Nawigacja'}
              </h3>
              <ul className="space-y-2">
                {navigation.map((item, index) => (
                  <li key={index}>
                    <PreviewLink
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </PreviewLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              {locale === 'en' ? 'Contact' : 'Kontakt'}
            </h3>
            <ul className="space-y-3">
              {contact.email && (
                <li className="flex items-center">
                  <FaEnvelope className="w-4 h-4 text-blue-400 mr-3 shrink-0" />
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li className="flex items-center">
                  <FaPhone className="w-4 h-4 text-blue-400 mr-3 shrink-0" />
                  <a 
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.location && (
                <li className="flex items-start">
                  <FaMapMarkerAlt className="w-4 h-4 text-blue-400 mr-3 shrink-0 mt-0.5" />
                  <div className="text-gray-300 text-sm">
                    <p>{contact.location}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Dolny pasek */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {copyrightText?.replace('{year}', new Date().getFullYear().toString())}
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm justify-center md:justify-end">
            {legalLinks.map((link, index) => (
              <PreviewLink 
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </PreviewLink>
            ))}
            <button
              onClick={() => {
                const evt = new CustomEvent("open-cookie-settings");
                window.dispatchEvent(evt);
              }}
              className="text-gray-400 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
            >
              {cookieSettingsText}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterContent);
export default Footer;
