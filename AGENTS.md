# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Project Overview

This is a static personal portfolio and product website for Ben Greene, built with **Next.js 16** and deployed to **GitHub Pages**. The site promotes DadTrack (a dad-focused mobile journaling app) alongside Ben's professional background.

**Tech Stack:**
- Next.js 16 (App Router) with React 19 and TypeScript
- TailwindCSS v4 for styling
- React Compiler enabled for automatic optimization
- Static Site Generation (SSG) — all pages pre-rendered at build time, no server-side functions

## Common Commands

```bash
pnpm install          # Install dependencies
pnpm dev             # Start development server (localhost:3000)
pnpm build           # Build static site for production
pnpm lint            # Run ESLint
```

**Deployment:** The build process outputs to the `out/` folder, which is ready for GitHub Pages. Next.js is configured with `output: "export"` and unoptimized images to ensure compatibility with static hosting.

## Architecture & Key Decisions

### Static Site Generation
All pages are pre-rendered at build time. This means:
- No API routes or server-side functions needed
- Images must be unoptimized (`next.config.ts` has `images: { unoptimized: true }`)
- All content must be available at build time
- Query parameters and dynamic client-side data are supported via browser JavaScript only

### Project Structure
- `src/` — Components, utilities, and layout files
- `public/` — Static assets (images, icons, etc.)
- `out/` — Generated static HTML (created after `pnpm build`)
- **Path alias:** `@/*` resolves to `src/*` for clean imports

### React Compiler
The React Compiler (`reactCompiler: true` in `next.config.ts`) automatically memoizes components where beneficial. This improves performance without manual optimization.

### Styling
TailwindCSS v4 with PostCSS. Dark mode support should be implemented using Tailwind's `dark:` variant system.

## Page Structure

Based on `setup-docs/setup-instructions.md`, the site includes:

- **`/`** — Home/landing page
  - Hero section promoting DadTrack
  - App overview and CTAs (waitlist signup, feedback)
  - Screenshot carousel/mockup section

- **`/about`** — About Ben Greene
  - Professional summary and experience
  - Personal note on DadTrack motivation
  - Tech expertise section

- **`/dadtrack`** — DadTrack product page
  - Key features with icons/bullets
  - Visual mockups and demonstrations
  - "Why it's different" section
  - Roadmap/coming soon
  - CTAs (waitlist, feedback)

- **`/waitlist`** — Waitlist signup
  - Simple form (Name, Email, Optional Comment)
  - Encouragement text

- **Footer** — Global across all pages
  - Navigation links
  - Contact information (email, optional social links)

## Important Implementation Notes

### SEO & Metadata
Each page requires:
- Proper `<title>` tags
- Meta descriptions
- Open Graph tags (for social sharing)
- Use Next.js Metadata API in layout/page files

### Responsive Design
Target desktop, tablet, and mobile. Use TailwindCSS responsive prefixes (`md:`, `lg:`, etc.).

### Dark Mode
Implement dark mode toggle in settings/header. Store preference in localStorage. Use Tailwind's `dark:` variant for styles.

### Performance & Animation
- Prioritize speed and clarity over animations
- Minimal animations only where they enhance UX
- Test build size with `pnpm build` and verify GitHub Pages deployment

### GitHub Pages Deployment
The `out/` folder is the deployment target. Ensure:
- No trailing slashes in internal links (or configure accordingly)
- Relative paths for any static assets
- All external images/fonts load reliably

### Content Sources
Refer to `setup-docs/` for detailed content requirements:
- `setup-instructions.md` — Page structure and requirements
- `APP_FEATURES.md` — DadTrack feature details (for product page)
- `ben-greene-resume.md` — Professional background (for about page)
