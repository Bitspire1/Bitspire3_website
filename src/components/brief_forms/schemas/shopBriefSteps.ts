import type { BriefStep } from '@/types';

export const SHOP_BRIEF_STEPS: BriefStep[] = [
  { label: "Nowy sklep czy przebudowa?", required: true, options: ["Nowy sklep", "Przebudowa"], key: "shopType" },
  { label: "Jakie produkty chcesz sprzedawać?", required: true, type: "textarea", key: "products" },
  { label: "Ile produktów planujesz na start?", required: false, options: ["do10", "od11do50", "od51do200", "powyzej200"], key: "productCount" },
  { label: "Czy sklep ma obsługiwać różne warianty produktów (np. rozmiar, kolor)?", required: false, options: ["Tak", "Nie"], key: "variants" },
  { label: "Jakie metody płatności mają być dostępne?", required: false, type: "textarea", key: "payments" },
  { label: "Jakie metody dostawy mają być dostępne?", required: false, type: "textarea", key: "shipping" },
  { label: "Czy sklep ma mieć integracje z systemami zewnętrznymi (np. Allegro, hurtownie, ERP)?", required: false, options: ["Tak", "Nie", "Inne"], key: "integrations" },
  { label: "Czy potrzebujesz panelu administracyjnego do zarządzania zamówieniami i produktami?", required: false, options: ["Tak", "Nie"], key: "adminPanel" },
  { label: "Czy posiadasz już materiały graficzne (logo, zdjęcia produktów)?", required: false, options: ["Tak", "Nie"], key: "graphics" },
  { label: "Preferencje co do stylu graficznego sklepu?", required: false, type: "text", key: "style" },
  { label: "Czy sklep ma być dostępny w innych językach niż polski?", required: false, type: "text", key: "languages" },
  { label: "Jaki jest orientacyjny budżet na realizację sklepu?", required: false, type: "text", key: "budget" },
  { label: "Podaj swoje dane kontaktowe (e-mail lub numer telefonu)", required: true, type: "text", key: "contact" }
];
