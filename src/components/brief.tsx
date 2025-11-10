"use client";
import React, { useState, Suspense, lazy, memo, useMemo } from "react";
import Contact from "./contact";
import { CursorLightCard } from "../hooks/cursor-light";
const BriefShop = lazy(() => import("./brief_shop"));
const BriefLogo = lazy(() => import("./brief_logo"));
const BriefSeo = lazy(() => import("./brief_seo"));

const STEPS = [
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
			"Czy treści strony mają być dostępne tylko w języku polskim? Jeśli nie, to w jakich innych językach?",
		required: false,
		type: "text",
		key: "languages",
	},
	{
		label: "Preferencje do konkretnych technologii?",
		required: false,
		options: ["Nie", "Inne"],
		key: "technology",
	},
	{
		label:
			"Czy posiadasz już hosting i domenę, czy potrzebujesz pomocy w ich wyborze i konfiguracji?",
		required: false,
		options: ["Posiadam", "Potrzebuję pomocy"],
		key: "hosting",
	},
	{
		label: "Czy strona ma być zabezpieczona certyfikatem SSL?",
		required: false,
		options: ["Tak", "Nie"],
		key: "ssl",
	},
	{
		label: "Jaki jest orientacyjny budżet na realizację projektu?",
		required: false,
		type: "text",
		key: "budget",
	},
	{
		label:
			"Czy przewidujesz dodatkowy budżet na utrzymanie strony po jej uruchomieniu?",
		required: false,
		options: ["Tak", "Nie"],
		key: "maintenanceBudget",
	},
	{
		label: "Podaj swoje dane kontaktowe (e-mail lub numer telefonu)",
		required: true,
		type: "text",
		key: "contact",
	},
];

const TAB_TYPES = [
	{ label: "Strona internetowa", value: "website" },
	{ label: "Sklep internetowy", value: "shop" },
	{ label: "Logo", value: "logo" },
	{ label: "Pozycjonowanie", value: "seo" },
];

const Brief: React.FC = () => {
	const [stepType, setStepType] = useState("website");

	return (
		<section className="w-full py-20 px-4 flex flex-col items-center justify-start">
			<div className="max-w-6xl xl:max-w-7xl w-full mx-auto">
				
				{/* Grid z briefem po lewej i kontaktem po prawej */}
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Brief - zajmuje 2 kolumny */}
					<div className="lg:col-span-2 flex flex-col h-full">
						{/* Nagłówek briefu - wyrównany do lewej */}
						<div className="text-left mb-12">
							<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
								Określ czego <span className="text-blue-400">potrzebujesz</span>
							</h2>
							<p className="text-xl text-gray-300 max-w-3xl">
								Wypełnij brief i pomóż nam lepiej zrozumieć Twoje potrzeby. To pierwszy krok do realizacji Twojego projektu.
							</p>
						</div>
						
						<div className="flex flex-wrap gap-3 gap-y-3 mb-8 w-full justify-start">
							{TAB_TYPES.map((tab) => (
								<CursorLightCard
									key={tab.value}
									className={`px-6 py-3 rounded-lg font-semibold text-lg border transition-all duration-200 shadow-lg cursor-pointer
						${stepType === tab.value 
							? "bg-blue-600 text-white border-blue-600" 
							: "text-blue-400 bg-slate-800/50 border-slate-700 hover:border-blue-400 hover:bg-slate-700/50"}
						w-full sm:w-auto`}
									onClick={() => setStepType(tab.value)}
								>
									{tab.label}
								</CursorLightCard>
							))}
						</div>
						
						<div className="relative rounded-2xl border border-slate-700 p-8 bg-slate-800/50 backdrop-blur-sm shadow-lg flex-1 min-h-[480px] overflow-y-auto">
							<Suspense
								fallback={
									<div className="text-white text-center py-12">Ładowanie…</div>
								}
							>
								{stepType === "website" && <MemoizedWebsiteBrief />}
								{stepType === "shop" && <BriefShop />}
								{stepType === "logo" && <BriefLogo />}
								{stepType === "seo" && <BriefSeo />}
							</Suspense>
						</div>
					</div>
					
					{/* Kontakt - zajmuje 1 kolumnę i jest wyżej */}
					<div id="contact-section" className="lg:col-span-1 lg:mt-0 mt-8 flex flex-col h-full">
						<Contact />
					</div>
				</div>
			</div>
		</section>
	);
};

const WebsiteBrief: React.FC = () => {
	const [step, setStep] = useState(0);
	const [form, setForm] = useState<{ [key: string]: string }>({});
	const current = STEPS[step];
	const percent = Math.round(((step + 1) / STEPS.length) * 100);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	// Validate all required fields for the Website brief
	const isFormValid = useMemo(() => {
		const requiredFields = STEPS.filter((s) => s.required).map((s) => s.key);
		return requiredFields.every((key) => form[key] && form[key].trim() !== "");
	}, [form]);

	const handleSelect = (option: string) => {
		if (current.key === "technology" && option === "Inne") {
			setForm({ ...form, [current.key]: "Inne:" });
		} else {
			setForm({ ...form, [current.key]: option });
		}
	};

	 // Helper to encode form data for Netlify
	 const encodeFormData = (data: Record<string, string>) => {
		 return Object.keys(data)
			 .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			 .join("&");
	 };

	 const handleSubmit = async () => {
		 // Validate required fields before sending
		 const requiredFields = STEPS.filter((s) => s.required).map((s) => s.key);
		 const missing = requiredFields.filter((key) => !form[key] || form[key].trim() === "");
		 if (missing.length > 0) {
			 setError("Uzupełnij wszystkie wymagane pola oznaczone gwiazdką.");
			 return;
		 }
		 setLoading(true);
		 setError("");
		 try {
			 console.log("Formularz website:", form);
			 
			 // Prepare data for Netlify Forms
			 const formData = {
				 "form-name": "brief-website",
				 ...form
			 };

			 await fetch("/", {
				 method: "POST",
				 headers: { "Content-Type": "application/x-www-form-urlencoded" },
				 body: encodeFormData(formData),
			 });

			 console.log("Brief wysłany pomyślnie");
			 setSuccess(true);
		 } catch (e: unknown) {
			 console.error("Błąd website:", e);
			 if (e instanceof Error) {
				 setError(e.message || "Błąd podczas wysyłania.");
			 } else {
				 setError("Błąd podczas wysyłania.");
			 }
		 } finally {
			 setLoading(false);
		 }
	 };

	return (
		<>
			<div className="mb-6">
				<div className="w-full h-6 bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
					<div
						className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
						style={{
							width: `${percent}%`,
							transition: "width 0.3s",
						}}
					>
						<span className="pl-3 text-white font-bold text-sm">
							{percent}%
						</span>
					</div>
				</div>
			</div>
			{success ? (
				<div className="p-6 bg-green-600 text-white rounded-xl text-center font-bold text-xl">
					Dziękujemy za przesłanie briefu! Skontaktujemy się z Tobą wkrótce.
				</div>
			) : (
				<>
					<div className="mb-8">
						<label className="block text-2xl md:text-3xl font-bold mb-4 text-white">
							{current.label}{" "}
							{current.required && (
								<span className="text-red-400">*</span>
							)}
						</label>
						{/* Force remount of inputs when step (field) changes to avoid uncontrolled -> controlled warnings */}
						<div key={current.key} className="flex flex-col gap-4 mt-2">
							{current.options &&
								current.options.map((option: string) => (
									<div key={option} className="flex flex-col">
										<label
											className={`flex items-center gap-4 cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 group hover:border-blue-400 hover:bg-blue-400/10 ${
												form[current.key] === option ||
												(option === "Inne" && form[current.key]?.startsWith("Inne:"))
													? "border-blue-400 bg-blue-400/20 shadow-lg"
													: "border-slate-600 bg-slate-800/30"
											}`}
										>
											<div className="relative">
												<input
													type="radio"
													name={`brief-${current.key}`}
													checked={Boolean(
														form[current.key] === option ||
														(option === "Inne" && form[current.key]?.startsWith("Inne:"))
													)}
													onChange={() => handleSelect(option)}
													className="sr-only"
												/>
												<div
													className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
														form[current.key] === option ||
														(option === "Inne" &&
															form[current.key]?.startsWith(
																"Inne:"
															))
															? "border-blue-400 bg-blue-400"
															: "border-gray-400 bg-transparent group-hover:border-blue-400"
													}`}
												>
													{(form[current.key] === option ||
														(option === "Inne" &&
															form[current.key]?.startsWith(
																"Inne:"
															))) && (
														<div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
													)}
												</div>
											</div>
											<span className="text-white text-lg font-medium flex-1">{option}</span>
										</label>
										{current.key === "technology" &&
											option === "Inne" &&
											(form[current.key] === "Inne" ||
												form[current.key]?.startsWith("Inne:")) && (
												<input
													className="w-full mt-4 p-4 rounded-xl bg-slate-800/50 border-2 border-blue-400 text-white text-lg placeholder-gray-400 focus:bg-slate-800/70 transition-all duration-200 backdrop-blur-sm"
													type="text"
													placeholder="Podaj preferowane technologie..."
													value={
														form[current.key]?.replace(
															"Inne:",
															""
														) || ""
													}
													onChange={(e) =>
														setForm({
															...form,
															[current.key]: `Inne:${e.target.value}`,
														})
													}
													autoFocus
												/>
											)}
									</div>
								))}
							{current.type === "textarea" && (
								<textarea
									className="w-full p-6 rounded-xl bg-slate-800/30 border-2 border-slate-600 text-white text-lg mt-2 placeholder-gray-400 focus:border-blue-400 focus:bg-slate-800/50 transition-all duration-200 resize-none backdrop-blur-sm"
									rows={4}
									value={form[current.key] || ""}
									onChange={(e) =>
										setForm({ ...form, [current.key]: e.target.value })
									}
									placeholder="Wpisz odpowiedź..."
								/>
							)}
							{current.type === "text" && (
								<input
									className="w-full p-6 rounded-xl bg-slate-800/30 border-2 border-slate-600 text-white text-lg mt-2 placeholder-gray-400 focus:border-blue-400 focus:bg-slate-800/50 transition-all duration-200 backdrop-blur-sm"
									type="text"
									value={form[current.key] || ""}
									onChange={(e) =>
										setForm({ ...form, [current.key]: e.target.value })
									}
									placeholder="Wpisz odpowiedź..."
								/>
							)}
						</div>
					</div>
					{error && (
						<div className="mb-4 text-red-400 font-bold text-center">
							{error}
						</div>
					)}
					<div className="flex flex-col sm:flex-row gap-4 mt-8">
						<button
							className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 border-2
				${step === 0 || loading 
					? "border-gray-500 bg-gray-600/30 text-gray-400 cursor-not-allowed" 
					: "border-blue-400 bg-blue-400/10 text-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 shadow-lg hover:shadow-blue-400/25"}`}
							onClick={() => setStep((s) => Math.max(0, s - 1))}
							disabled={step === 0 || loading}
						>
							← Wstecz
						</button>
						{step < STEPS.length - 1 ? (
							<button
								className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 border-2
				  ${
					!form[current.key] || loading
						? "border-gray-500 bg-gray-600/30 text-gray-400 cursor-not-allowed"
						: "border-blue-400 bg-blue-400/10 text-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 shadow-lg hover:shadow-blue-400/25"
				  }`}
								onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
								disabled={!form[current.key] || loading}
							>
								Dalej →
							</button>
						) : (
							<button
								className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 border-2
				  ${
					(!form[current.key] || !isFormValid) || loading
						? "border-gray-500 bg-gray-600/30 text-gray-400 cursor-not-allowed"
						: "border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 shadow-lg hover:shadow-green-500/25"
				  }`}
								onClick={handleSubmit}
								disabled={(!form[current.key] || !isFormValid) || loading}
							>
								{loading ? "Wysyłanie..." : "Wyślij brief"}
							</button>
						)}
					</div>
				</>
			)}
		</>
	);
};

// Memoize WebsiteBrief to avoid unnecessary re-renders
const MemoizedWebsiteBrief = memo(WebsiteBrief);

export default Brief;
