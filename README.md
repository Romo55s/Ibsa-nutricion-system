# IBSA Nutricion Web

Landing page and event site for **IBSA Nutricion**, built with React + Vite.

## Tech Stack

- React 18
- TypeScript
- Vite 6
- React Router
- Tailwind CSS
- GSAP + Lenis (animations and smooth scrolling)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

The app runs locally on `http://localhost:5173`.

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production bundle into `dist/`
- `npm run preview` - Preview the production build locally
- `npm run format` - Format source/config files with Prettier
- `npm run generate:pdf` - Regenerate the breakfast guide PDF into `public/` (requires Chrome; see below)

## Breakfast guide PDF (static)

The guide download is a **static file** served from `public/` (same filename as `guideMeta.pdfFileName` in `src/data/breakfastGuideContent.ts`), not a serverless renderer. That avoids runtime Chromium on Vercel.

From the project root, regenerate the PDF after content or image changes:

```bash
npm run generate:pdf
```

Images and the logo are read from `public/` and embedded in the HTML (no dev server needed). Commit the updated PDF under `public/` before deploying.

Requires **Google Chrome** installed (`puppeteer-core` uses the `chrome` channel).

## Project Structure

- `src/pages/` - Route pages (`Home`, `EventPage`)
- `src/sections/` - Home page content sections
- `src/components/` - Reusable UI components
- `public/` - Static assets and SEO files (`robots.txt`, `sitemap.xml`, `llms.txt`)

## SEO and Discovery

The project includes:

- Metadata and structured data in `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`

Current canonical domain is configured as:

- `https://ibsanutricion.com/`

If the domain changes, update URLs in `index.html`, `robots.txt`, and `sitemap.xml`.

## Deployment

Recommended target: **Vercel**.

Build settings:

- Build command: `npm run build`
- Output directory: `dist`

You can deploy with Vercel CLI:

```bash
vercel login
vercel link --repo
vercel deploy -y --no-wait
```
