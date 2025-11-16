'use client';

import React, { useState } from 'react';
import { CursorLightCard } from '../../hooks/cursor-light';
import { tinaField } from 'tinacms/dist/react';

interface Service {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
  features?: (string | null)[] | null;
  [key: string]: unknown;
}

interface OfferData {
  title?: string | null;
  subtitle?: string | null;
  services?: (Service | null)[] | null;
  [key: string]: unknown;
}

export const Offer: React.FC<{ data?: OfferData }> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<Service | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLearnMore = (item: Service) => {
    setSelectedItem(item);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const services = data?.services || [];

  return (
    <>
      <section className="py-20 px-4" data-tina-field={tinaField(data, 'offer')}>
        <div className="container mx-auto max-w-6xl">
          {/* Nagłówek */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              data-tina-field={tinaField(data, 'title')}
            >
              {data?.title || 'Nasza'} <span className="text-blue-400">Oferta</span>
            </h2>
            <p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {data?.subtitle || 'Odkryj pełen zakres naszych usług. Od prostych stron wizytówek po zaawansowane sklepy internetowe.'}
            </p>
          </div>

          {/* Siatka kart */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              if (!service) return null;
              
              return (
              <CursorLightCard key={index}>
                <div 
                  className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl h-full flex flex-col hover:border-blue-500 transition-all duration-300"
                  data-tina-field={tinaField(service)}
                >
                  <div className="mb-4">
                    <div className="text-4xl mb-3">{service.icon || '💼'}</div>
                    <h3 
                      className="text-2xl font-bold text-white mb-2"
                      data-tina-field={tinaField(service, 'title')}
                    >
                      {service.title || 'Service'}
                    </h3>
                  </div>
                  <p 
                    className="text-gray-300 mb-4 flex-grow"
                    data-tina-field={tinaField(service, 'description')}
                  >
                    {service.description || 'Description'}
                  </p>
                  <button
                    onClick={() => handleLearnMore(service)}
                    className="mt-auto bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors w-full"
                  >
                    Dowiedz się więcej
                  </button>
                </div>
              </CursorLightCard>
            );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            isModalVisible ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full p-8 transition-all duration-300 ${
              isModalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold text-white">{selectedItem.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-3xl leading-none"
                aria-label="Zamknij"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">{selectedItem.description}</p>
            
            {selectedItem.features && selectedItem.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-white mb-3">Funkcje:</h4>
                <ul className="space-y-2">
                  {selectedItem.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
