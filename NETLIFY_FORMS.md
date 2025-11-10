# Netlify Forms - Instrukcja

## Konfiguracja formularzy Netlify

Projekt został przekonfigurowany z Strapi na Netlify Forms. Wszystkie formularze są teraz obsługiwane natywnie przez Netlify.

### Formularze w projekcie:

1. **contact** - Formularz kontaktowy (Contact component)
2. **brief-website** - Brief dla strony internetowej
3. **brief-shop** - Brief dla sklepu internetowego
4. **brief-logo** - Brief dla logo
5. **brief-seo** - Brief dla SEO

### Jak to działa:

1. **Ukryte formularze HTML** - W `src/app/layout.tsx` znajdują się ukryte formularze HTML z atrybutami `data-netlify="true"`. Są one potrzebne, aby Netlify mógł wykryć formularze podczas budowania strony.

2. **Wysyłanie danych** - Komponenty React wysyłają dane jako `application/x-www-form-urlencoded` do endpoint'u `/` z ukrytym polem `form-name` identyfikującym formularz.

3. **Spam protection** - Formularz kontaktowy ma wbudowane pole honeypot (`bot-field`) dla podstawowej ochrony przed spamem.

### Po wdrożeniu na Netlify:

1. Przejdź do dashboard Netlify → twoja strona → Forms
2. Tam zobaczysz wszystkie zgłoszenia z formularzy
3. Możesz skonfigurować powiadomienia email o nowych zgłoszeniach
4. Możesz włączyć dodatkowe zabezpieczenia antyspamowe (reCAPTCHA)

### Testowanie lokalnie:

⚠️ **WAŻNE**: Netlify Forms działa tylko na środowisku produkcyjnym Netlify. 

Podczas lokalnego developmentu formularze będą próbowały wysyłać dane, ale nie będą one zapisywane. Aby przetestować:

1. Wdróż stronę na Netlify
2. Wypełnij formularz na wdrożonej stronie
3. Sprawdź zgłoszenia w dashboard Netlify

### Powiadomienia email:

1. W Netlify dashboard → Forms → Form notifications
2. Dodaj powiadomienie email
3. Wprowadź adres email, na który mają przychodzić zgłoszenia
4. Możesz użyć własnego szablonu wiadomości

### Eksport danych:

Zgłoszenia z formularzy możesz:
- Przeglądać w dashboard Netlify
- Eksportować jako CSV
- Integrować z Zapier, webhookami itp.

### Zmiany w kodzie:

Wszystkie wywołania do Strapi API zostały usunięte i zastąpione wysyłką do Netlify Forms:

- `src/components/contact.tsx` - formularz kontaktowy
- `src/components/brief.tsx` - brief strony
- `src/components/brief_shop.tsx` - brief sklepu
- `src/components/brief_logo.tsx` - brief logo
- `src/components/brief_seo.tsx` - brief SEO

### Troubleshooting:

Jeśli formularze nie działają po wdrożeniu:

1. Upewnij się, że ukryte formularze w `layout.tsx` mają wszystkie pola z komponentów
2. Sprawdź czy `form-name` w hidden input odpowiada nazwie formularza
3. Sprawdź logi wdrożenia na Netlify - powinny pokazać wykryte formularze
4. Upewnij się, że nie ma błędów w konsoli przeglądarki
