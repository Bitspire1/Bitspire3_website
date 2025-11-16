# Portfolio Blog - Dokumentacja

## Struktura

Portfolio zostało przebudowane z pojedynczej strony na system blogowy z osobnymi wpisami.

### Struktura folderów

```
content/
├── portfolio/
│   ├── pl/
│   │   ├── skladamy.mdx
│   │   └── eduvantage.mdx
│   └── en/
│       ├── skladamy.mdx
│       └── eduvantage.mdx
└── pages/
    ├── pl/
    └── en/
```

### Routing

- **Lista portfolio**: `/portfolio` lub `/en/portfolio`
- **Pojedynczy wpis**: `/portfolio/skladamy` lub `/en/portfolio/skladamy`
- **Admin panel**: `/admin` (edycja przez Tina CMS)

## Dodawanie nowego wpisu

### 1. Przez Tina CMS (zalecane)

1. Przejdź do `/admin`
2. Wybierz "Portfolio" z menu
3. Kliknij "Create New"
4. Wypełnij formularz:
   - **Title**: Tytuł projektu
   - **Slug**: URL-friendly nazwa (np. `moj-projekt`)
   - **Description**: Meta opis (SEO)
   - **Excerpt**: Krótki opis do wyświetlenia na liście
   - **Date**: Data publikacji
   - **Category**: Kategoria (np. "E-commerce", "Edukacja")
   - **Tags**: Tagi technologii (np. "Next.js", "TypeScript")
   - **Image**: Główny obraz projektu
   - **Image Alt**: Alternatywny tekst dla obrazu
   - **Link**: Link do live projektu
   - **Client**: Nazwa klienta
   - **Year**: Rok realizacji
   - **Body**: Treść wpisu (Markdown)

### 2. Ręcznie (przez pliki)

Stwórz nowy plik w `content/portfolio/pl/nazwa-projektu.mdx`:

```mdx
---
title: 'Nazwa Projektu'
slug: 'nazwa-projektu'
description: 'Opis meta dla SEO'
excerpt: 'Krótki opis projektu wyświetlany na liście'
date: '2025-01-15'
category: 'E-commerce'
tags:
  - 'Next.js'
  - 'TypeScript'
  - 'Tailwind CSS'
image: '/portfolio/nazwa-projektu.webp'
imageAlt: 'Opis obrazu'
link: 'https://projekt.pl'
client: 'Nazwa Klienta'
year: '2025'
---

## O projekcie

Treść w formacie Markdown...

## Wyzwania

- Punkt 1
- Punkt 2

## Rozwiązanie

### Podtytuł

Więcej treści...

## Wyniki

- ✅ Wynik 1
- ✅ Wynik 2
```

Stwórz odpowiednią wersję angielską w `content/portfolio/en/project-name.mdx`.

## Formatowanie treści

Wpisy portfolio używają **Markdown** z dodatkowymi możliwościami:

### Nagłówki

```markdown
## Główny nagłówek (H2)
### Podtytuł (H3)
```

### Listy

```markdown
- Punkt nienumerowany
- Kolejny punkt

1. Punkt numerowany
2. Kolejny punkt
```

### Wyróżnienia

```markdown
**Pogrubiony tekst**
*Kursywa*
`Kod inline`
```

### Cytaty

```markdown
> To jest cytat
> 
> **— Autor cytatu**
```

### Linki

```markdown
[Tekst linku](https://example.com)
```

### Obrazy

```markdown
![Alt text](/portfolio/obraz.webp)
```

## Stylizacja

Wpisy portfolio mają automatyczne style dla:

- ✅ Nagłówki z gradientem (H2)
- ✅ Podtytuły w jasnym kolorze (H3)
- ✅ Listy z niebieskimi markerami
- ✅ Cytaty z lewym obramowaniem
- ✅ Kod z tłem
- ✅ Linki w kolorze niebieskim

## Optymalizacja obrazów

### Zalecane rozmiary:

- **Główny obraz**: 1200x675px (aspect ratio 16:9)
- **Format**: WebP lub AVIF
- **Kompresja**: 80-85% jakości

### Umieszczanie obrazów:

1. Dodaj obraz do `/public/portfolio/`
2. W frontmatter użyj: `image: '/portfolio/nazwa-obrazu.webp'`
3. Dodaj alt text: `imageAlt: 'Opis obrazu'`

## SEO

Każdy wpis automatycznie generuje:

- ✅ Meta title
- ✅ Meta description
- ✅ Open Graph images
- ✅ Sitemap entries
- ✅ Structured data (w przyszłości)

## Wielojęzyczność

Każdy wpis musi mieć wersję w obu językach:

- `/content/portfolio/pl/projekt.mdx` (wersja polska)
- `/content/portfolio/en/project.mdx` (wersja angielska)

**Slug może być różny** dla różnych języków, ale pola `slug` w frontmatter powinny odpowiadać nazwie pliku.

## Przykłady

Sprawdź istniejące wpisy:

- `content/portfolio/pl/skladamy.mdx`
- `content/portfolio/pl/eduvantage.mdx`
- `content/portfolio/en/skladamy.mdx`
- `content/portfolio/en/eduvantage.mdx`

## Troubleshooting

### Wpis nie wyświetla się na liście

1. Sprawdź czy plik jest w odpowiednim folderze (`pl/` lub `en/`)
2. Upewnij się, że frontmatter ma wszystkie wymagane pola (`title`, `slug`, `description`, `date`)
3. Sprawdź format daty (YYYY-MM-DD)

### Obrazy się nie ładują

1. Upewnij się, że obraz jest w `/public/portfolio/`
2. Ścieżka w frontmatter powinna zaczynać się od `/` (np. `/portfolio/obraz.webp`)
3. Sprawdź czy nazwa pliku nie zawiera spacji

### Markdown nie renderuje się poprawnie

1. Upewnij się, że używasz TinaMarkdown (automatycznie w komponentach)
2. Sprawdź czy nie ma błędów składni w Markdown
3. Pozostaw pustą linię między elementami (nagłówki, listy, paragrafy)

## Aktualizacja schematu Tina

Po zmianach w schemacie (`tina/config.ts`), uruchom:

```bash
npm run dev
```

Tina automatycznie wygeneruje nowe typy.
