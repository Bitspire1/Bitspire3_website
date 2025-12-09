import type { BriefStep } from '@/types';

export const WEBSITE_BRIEF_STEPS: BriefStep[] = [
	{
		label: "Nowy projekt czy przebudowa?",
		required: true,
		options: ["Nowy projekt", "Przebudowa"],
		key: "projectType",
	},
	{
		label:
			"Jakie są główne cele strony? (np. sprzedaż produktów, prezentacja usług, blog, portfolio)",
		required: true,
		type: "textarea",
		key: "mainGoal",
	},
	{
		label:
			"Czy strona ma być dostosowana do urządzeń mobilnych (responsywność)?",
		required: true,
		options: ["Tak", "Nie"],
		key: "responsive",
	},
	{
		label:
			"Jakie funkcje ma posiadać strona? (np. formularz kontaktowy, sklep internetowy, system rezerwacji, integracja z mediami społecznościowymi, mapy...)",
		required: false,
		type: "textarea",
		key: "features",
	},
	{
		label:
			"Czy potrzebne są dodatkowe funkcjonalności, takie jak panel administracyjny do zarządzania treścią? (CMS)",
		required: false,
		options: ["Tak", "Nie"],
		key: "cms",
	},
	{
		label:
			"Czy posiadasz już materiały graficzne (np. logo, zdjęcia, kolorystykę)?",
		required: false,
		options: ["Tak", "Nie"],
		key: "graphics",
	},
	{
		label:
			"Czy oczekujesz unikalnego projektu graficznego, czy możesz zaakceptować gotowy szablon?",
		required: false,
		options: ["Unikalny projekt", "Gotowy szablon"],
		key: "designType",
	},
	{
		label: "Preferencje co do stylu graficznego (np. minimalistyczny, nowoczesny, klasyczny)",
		required: false,
		type: "text",
		key: "style",
	},
	{
		label: "Linki do stron-inspiracji (jeśli są)",
		required: false,
		type: "text",
		key: "inspirationLinks",
	},
	{
		label:
			"Czy dostarczysz gotowe treści (teksty, zdjęcia, filmy), czy potrzebujesz pomocy w ich stworzeniu?",
		required: false,
		options: ["Dostarczę treści", "Potrzebuję pomocy"],
		key: "contentDelivery",
	},
	{
		label: "Ile podstron planujesz?",
		required: false,
		options: ["0-5", "6-10", "11-20", ">20"],
		key: "subpages",
	},
	{
		label:
			"Czy planujesz integracje z systemami zewnętrznymi (np. CRM, mail marketing, analytics)?",
		required: false,
		options: ["Tak", "Nie"],
		key: "integrations",
	},
	{
		label: "Jakie technologie preferujesz?",
		required: false,
		type: "text",
		key: "technology",
	},
	{
		label: "Jaki jest orientacyjny budżet na realizację strony?",
		required: false,
		type: "text",
		key: "budget",
	},
	{
		label: "Jaki jest orientacyjny termin realizacji?",
		required: false,
		options: ["Pilnie (1-2 tygodnie)", "Normalnie (1-3 miesiące)", "Bez pośpiechu (3+ miesiące)"],
		key: "deadline",
	},
	{
		label: "Podaj swoje dane kontaktowe (e-mail lub numer telefonu)",
		required: true,
		type: "text",
		key: "contact",
	},
];
