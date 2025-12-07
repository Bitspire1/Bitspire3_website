import type { BriefStep } from '@/types';

export const SEO_BRIEF_STEPS: BriefStep[] = [
  { label: "Czy strona jest już online?", required: true, options: ["Tak", "Nie"], key: "online" },
  { label: "Adres strony do pozycjonowania", required: true, type: "text", key: "url" },
  { label: "Jakie cele chcesz osiągnąć dzięki pozycjonowaniu? (np. wzrost ruchu, sprzedaż, rozpoznawalność marki)", required: true, type: "textarea", key: "goals" },
  { label: "Na jakie frazy/tematy chcesz się pozycjonować?", required: true, type: "textarea", key: "keywords" },
  { label: "Czy prowadzisz już działania SEO?", required: false, options: ["Tak", "Nie"], key: "existingSeo" },
  { label: "Czy masz preferencje co do rynku (np. Polska, zagranica)?", required: false, type: "text", key: "market" },
  { label: "Czy posiadasz blog lub planujesz go prowadzić?", required: false, options: ["Tak", "Nie"], key: "blog" },
  { label: "Czy posiadasz materiały do optymalizacji (teksty, zdjęcia)?", required: false, options: ["Tak", "Nie"], key: "materials" },
  { label: "Jaki jest orientacyjny budżet na działania SEO?", required: false, type: "text", key: "budget" },
  { label: "Podaj swoje dane kontaktowe (e-mail lub numer telefonu)", required: true, type: "text", key: "contact" }
];
