"use client";
import React, { useState } from "react";
import { CursorLightCard } from "../hooks/cursor-light";

interface OfferItem {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  features: string[];
  shortDescription: string;
  catchyFeatures: string[];
}

const offerData: OfferItem[] = [
  {
    id: "onepage",
    title: "OnePage",
    shortDescription: "Elegancka strona wizytówka w 48h",
    description: "Nowoczesna strona wizytówka na jednej podstronie. Idealne rozwiązanie dla freelancerów, małych firm i startupów, które chcą zaprezentować swoją ofertę w przejrzysty sposób.",
    targetAudience: "Freelancerzy, małe firmy, startupy",
    features: ["Responsywny design", "Szybkie ładowanie", "SEO friendly", "Formularz kontaktowy"],
    catchyFeatures: ["✨ Gotowa w 48h", "📱 100% responsywna", "🚀 Błyskawiczne ładowanie", "💼 Profesjonalny wygląd", "📧 Integracja z emailem"]
  },
  {
    id: "sklep",
    title: "Sklep Internetowy",
    shortDescription: "Sprzedawaj online już dziś",
    description: "Kompleksowa platforma e-commerce z systemem płatności, zarządzaniem produktami i analityką sprzedaży. Zwiększ swoje zyski dzięki profesjonalnemu sklepowi online.",
    targetAudience: "Przedsiębiorcy, detaliści, marki",
    features: ["System płatności", "Zarządzanie produktami", "Analityka sprzedaży", "Integracje z kurierami"],
    catchyFeatures: ["💳 Płatności online", "📦 Automatyczne faktury", "📊 Raporty sprzedaży", "🚚 Integracja z kurierami", "🛡️ Bezpieczne transakcje"]
  },
  {
    id: "blog",
    title: "Blog/Portal",
    shortDescription: "Buduj swoją społeczność",
    description: "Profesjonalny portal informacyjny lub blog z systemem zarządzania treścią. Buduj swoją społeczność i dziel się wiedzą z czytelnikami na całym świecie.",
    targetAudience: "Blogerzy, media, eksperci branżowi",
    features: ["CMS panel", "Komentarze", "Newsletter", "Optymalizacja SEO"],
    catchyFeatures: ["✍️ Łatwy edytor treści", "💬 System komentarzy", "📧 Newsletter", "🔍 Optymalizacja SEO", "👥 Panel społeczności"]
  },
  {
    id: "landing",
    title: "Landing Page",
    shortDescription: "Maksymalna konwersja gwarantowana",
    description: "Wysoko konwertująca strona docelowa dla kampanii marketingowych. Zaprojektowana do maksymalizacji konwersji i generowania leadów dla Twojego biznesu.",
    targetAudience: "Marketerzy, agencje, firmy B2B",
    features: ["Wysokie konwersje", "A/B testing", "Integracje z CRM", "Analityka"],
    catchyFeatures: ["📈 Konwersja powyżej 15%", "🎯 A/B testing", "🔗 Integracja z CRM", "📊 Szczegółowa analityka", "⚡ Szybkie wdrożenie"]
  },
  {
    id: "logo",
    title: "Logo",
    shortDescription: "Twoja marka w 24h",
    description: "Unikalne logo i identyfikacja wizualna marki. Stwórz profesjonalny wizerunek swojej firmy z logiem, który zapadnie w pamięć klientów.",
    targetAudience: "Nowe firmy, rebranding, startupy",
    features: ["Unikalne projekty", "Wiele wariantów", "Pełna dokumentacja", "Pliki źródłowe"],
    catchyFeatures: ["🎨 3 koncepcje do wyboru", "📁 Wszystkie formaty", "🔄 Nieograniczone poprawki", "📋 Księga znaku", "⚡ Express w 24h"]
  },
  {
    id: "sem",
    title: "SEM",
    shortDescription: "Widoczność w Google od zaraz",
    description: "Search Engine Marketing - kompleksowe zarządzanie kampaniami Google Ads i optymalizacja dla wyszukiwarek. Zwiększ widoczność swojej firmy w internecie.",
    targetAudience: "Firmy każdej wielkości",
    features: ["Google Ads", "Optymalizacja SEO", "Analiza konkurencji", "Raporty"],
    catchyFeatures: ["🎯 Kampanie Google Ads", "📈 Wzrost ruchu o 300%", "💰 ROI powyżej 400%", "📊 Miesięczne raporty", "🏆 Pozycja #1 w Google"]
  }
];

export const Offer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<OfferItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLearnMore = (item: OfferItem) => {
    setSelectedItem(item);
    // Małe opóźnienie żeby modal się ładnie wyświetlił
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    // Opóźnienie żeby animacja się skończyła przed usunięciem modala
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Nagłówek */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Nasza <span className="text-blue-400">Oferta</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Odkryj pełen zakres naszych usług. Od prostych stron wizytówek po zaawansowane sklepy internetowe.
            </p>
          </div>

          {/* Siatka kafelków */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerData.map((item) => (
              <CursorLightCard
                key={item.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
                         transition-all duration-300 hover:bg-slate-700/50 hover:border-blue-400/50
                         hover:scale-105 cursor-pointer group"
                onClick={() => handleLearnMore(item)}
              >
                {/* Tytuł kafelka */}
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {item.title}
                </h3>

                {/* Przycisk "Dowiedz się więcej" */}
                <button
                  onClick={() => handleLearnMore(item)}
                  className="w-full px-6 py-3 border border-blue-600/50 text-blue-400 rounded-xl 
                           hover:bg-blue-600/10 transition-all duration-200 font-medium"
                >
                  Dowiedz się więcej
                </button>
              </CursorLightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4
                     transition-all duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeModal}
        >
          <div 
            className={`bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto
                       transition-all duration-300 transform ${isModalVisible 
                         ? 'scale-100 opacity-100 translate-y-0' 
                         : 'scale-75 opacity-0 translate-y-8'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nagłówek modala */}
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-3xl font-bold text-white">{selectedItem.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Zawartość modala */}
            <div className="p-6 space-y-6">
              <p className="text-gray-300 leading-relaxed text-lg">
                {selectedItem.description}
              </p>
              
              <div>
                <h4 className="text-blue-400 font-semibold mb-3 text-xl">Dla kogo:</h4>
                <p className="text-gray-300">{selectedItem.targetAudience}</p>
              </div>

              <div>
                <h4 className="text-blue-400 font-semibold mb-3 text-xl">Co dokładnie dostajesz:</h4>
                <ul className="text-gray-300 space-y-2">
                  {selectedItem.catchyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-blue-400 mr-3 text-lg">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-blue-400 font-semibold mb-3 text-xl">Funkcjonalności techniczne:</h4>
                <ul className="text-gray-300 space-y-2">
                  {selectedItem.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-400 mr-3 text-lg">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Przyciski akcji */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200
                           bg-gray-600 text-white hover:bg-gray-500"
                >
                  Zamknij
                </button>
                <button
                  onClick={() => {
                    const contactElement = document.getElementById('contact-section');
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    closeModal();
                  }}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200
                           bg-blue-600 text-white hover:bg-blue-500"
                >
                  Skontaktuj się
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
