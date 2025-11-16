# Netlify Deployment Guide

## Quick Setup

### 1. Netlify Build Settings

The `netlify.toml` is already configured with correct settings:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Plugin**: `@netlify/plugin-nextjs`

### 2. Environment Variables (IMPORTANT!)

Go to **Site settings → Build & deploy → Environment** in Netlify and add:

#### Required for Tina CMS:
```
NEXT_PUBLIC_TINA_CLIENT_ID=a40ff8b9-0082-4d76-bcf4-65199fb84432
NEXT_PUBLIC_TINA_CLIENT_URL=https://content.tinajs.io/content/a40ff8b9-0082-4d76-bcf4-65199fb84432/github/main
```

#### Optional (for private repos or write access):
```
TINA_TOKEN=<your-readonly-token-from-tina-cloud>
```

**Note**: If you don't set these variables, the build will still succeed using filesystem fallback (reads from `content/` folder directly), but won't fetch latest content from Tina Cloud.

### 3. Build Process

The build handles missing CMS gracefully:
- ✅ Tries to fetch from Tina Cloud (if env vars set)
- ✅ Falls back to local `content/` folder if CMS unreachable
- ✅ Build continues even if some fetches fail
- ✅ All pages are generated from committed MDX files

## Troubleshooting

### ECONNREFUSED errors during build
These are normal if Tina Cloud URL is not configured. The build will use filesystem fallback automatically.

### "Failed to load resource: 404" in browser
If you see 404 errors for `.css` or `.js` files, ensure:
- Publish directory is set to `.next` (not `out`)
- `@netlify/plugin-nextjs` is installed
- No conflicting build plugins

### CMS content not updating
Make sure `NEXT_PUBLIC_TINA_CLIENT_URL` points to your Tina Cloud endpoint and includes the correct branch (e.g., `/github/main`).

## Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your Tina Cloud credentials
3. Run `npm run dev`

For local CMS (without Tina Cloud):
```bash
npx tinacms dev -c "npm run dev"
```

## Architecture

- **Framework**: Next.js 15.5.4 with App Router
- **CMS**: Tina CMS (optional, filesystem fallback available)
- **Deployment**: Netlify with Next.js plugin
- **Content**: MDX files in `content/` directory
- **Styling**: Tailwind CSS
- **i18n**: next-intl (Polish & English)
