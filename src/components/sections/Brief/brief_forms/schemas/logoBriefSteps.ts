import type { BriefStep } from '@/types';

export const LOGO_BRIEF_STEPS: BriefStep[] = [
  { label: "Nowe logo czy lifting obecnego?", required: true, options: ["Nowe logo", "Lifting obecnego"], key: "logoType" },
  { label: "Nazwa firmy / marki do umieszczenia w logo", required: true, type: "text", key: "brandName" },
  { label: "Hasło / tagline (jeśli ma się pojawić)", required: false, type: "text", key: "tagline" },
  { label: "Jakie wartości lub cechy ma wyrażać logo?", required: true, type: "textarea", key: "values" },
  { label: "Preferencje kolorystyczne", required: false, type: "text", key: "colors" },
  { label: "Preferencje co do stylu logo (np. minimalistyczne, klasyczne, nowoczesne)", required: false, type: "text", key: "style" },
  { label: "Czy logo ma zawierać symbol/grafikę czy być tylko typograficzne?", required: false, options: ["Symbol/grafika", "Tylko typografia", "Nie wiem"], key: "symbol" },
  { label: "Gdzie będzie używane logo? (np. strona www, druk, social media, gadżety)", required: false, type: "textarea", key: "usage" },
  { label: "Czy posiadasz inspiracje lub przykłady logo, które Ci się podobają?", required: false, type: "text", key: "inspirations" },
  { label: "Jaki jest orientacyjny budżet na projekt logo?", required: false, type: "text", key: "budget" },
  { label: "Podaj swoje dane kontaktowe (e-mail lub numer telefonu)", required: true, type: "text", key: "contact" }
];
