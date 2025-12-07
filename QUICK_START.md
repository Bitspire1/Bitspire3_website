# ⚡ Quick Start Guide - Uruchomienie po zmianach

## 🚀 Szybki Start (5 minut)

### 1. Uzupełnij zmienne środowiskowe
```bash
# Skopiuj przykładowy plik
cp .env.example .env.local

# Edytuj .env.local i uzupełnij:
# NEXT_PUBLIC_TINA_CLIENT_ID=twoj-client-id (z https://app.tina.io)
# TINA_TOKEN=twoj-token (z https://app.tina.io)
```

### 2. Zainstaluj nowe zależności
```bash
npm install
```

### 3. Uruchom testy
```bash
npm test
```
Powinieneś zobaczyć: ✅ 11 testów passed

### 4. Sprawdź TypeScript
```bash
npx tsc --noEmit
```
Powinno zakończyć się bez błędów

### 5. Uruchom dev server
```bash
npm run dev
```

---

## 📋 Checklist przed Deploymentem

- [ ] `.env.local` uzupełniony prawdziwymi wartościami
- [ ] `npm test` - wszystkie testy przechodzą
- [ ] `npx tsc --noEmit` - brak błędów TypeScript
- [ ] `npm run build` - build się wykonuje bez błędów
- [ ] Na platformie hostingowej (Vercel) dodane env vars:
  - `NEXT_PUBLIC_TINA_CLIENT_ID`
  - `TINA_TOKEN`
  - `NEXT_PUBLIC_GA_ID` (opcjonalnie)

---

## 🔧 Najważniejsze Zmiany

### ✅ Co zostało naprawione:
1. **Security**: Token TinaCMS zabezpieczony, CSP headers dodane
2. **TypeScript**: Strict checking włączony, wszystkie `any` zastąpione
3. **Quality**: Console.log usunięte, ErrorBoundary dodany
4. **Validation**: Zod dodany dla form validation
5. **Testing**: Vitest skonfigurowany z 11 testami
6. **Performance**: Optymalizacja obrazów, lepsze cachowanie

### ⚠️ Breaking Changes:
- **TypeScript errors będą blokować build** - to dobrze! Napraw je przed deploymentem
- **Musisz ustawić zmienne środowiskowe** - bez nich aplikacja nie wystartuje
- **TinaCMS token z .env** - nie możesz już używać hardcoded tokenu

---

## 🧪 Komendy Testowe

```bash
# Uruchom testy raz
npm test

# Watch mode (re-run przy zmianach)
npm run test:watch

# Coverage report
npm run test:coverage

# Sprawdź TypeScript
npx tsc --noEmit

# Lint
npm run lint
```

---

## 🐛 Troubleshooting

### Problem: "Missing environment variable: TINA_TOKEN"
**Rozwiązanie**: Upewnij się, że `.env.local` istnieje i zawiera `TINA_TOKEN=...`

### Problem: Build fails z błędami TypeScript
**Rozwiązanie**: To nowe zachowanie (włączono strict checking). Napraw błędy przed buildem:
```bash
npx tsc --noEmit  # Zobacz wszystkie błędy
```

### Problem: Testy nie działają
**Rozwiązanie**: 
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
npm test
```

### Problem: "Cannot find module '@/lib/env'"
**Rozwiązanie**: Plik powinien istnieć w `src/lib/env.ts`. Sprawdź czy został stworzony.

---

## 📚 Dokumentacja

- **Pełny raport**: `RAPORT_KONCOWY.md`
- **Szczegóły implementacji**: `IMPLEMENTATION_SUMMARY.md`
- **Env vars**: `.env.example`
- **Testy**: `tests/validation.test.ts`

---

## 🎯 Kolejne Kroki

Po uruchomieniu aplikacji:

1. **Dodaj ErrorBoundary do layout**:
```tsx
// src/app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
```

2. **Zastosuj walidację w formularzu kontaktowym**:
```tsx
// src/components/sections/Contact.tsx
import { contactFormSchema, validateForm } from '@/lib/validation';

const handleSubmit = (data) => {
  const result = validateForm(contactFormSchema, data);
  if (!result.success) {
    // Pokaż błędy
    setErrors(result.errors);
    return;
  }
  // Wyślij formularz
  sendForm(result.data);
};
```

---

## ✨ Nowe Funkcje

### ErrorBoundary
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary fallback={<div>Custom error UI</div>}>
  <YourComponent />
</ErrorBoundary>
```

### Form Validation
```tsx
import { contactFormSchema, validateForm } from '@/lib/validation';

const result = validateForm(contactFormSchema, formData);
if (result.success) {
  console.log('Valid data:', result.data);
} else {
  console.log('Errors:', result.errors);
}
```

### Environment Variables
```tsx
import { env } from '@/lib/env';

const clientId = env.NEXT_PUBLIC_TINA_CLIENT_ID; // Type-safe!
```

---

## 📞 Potrzebujesz Pomocy?

1. Sprawdź `RAPORT_KONCOWY.md` - szczegółowa dokumentacja
2. Zobacz przykłady w `tests/` - jak używać nowych funkcji
3. Przejrzyj komentarze w kodzie - wyjaśnienia zmian

---

**Status**: ✅ Gotowe do użycia  
**Wersja**: 1.0  
**Data**: 6 grudnia 2025
