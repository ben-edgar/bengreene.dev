# Site Update: MomTrack Launch + Screenshot Refresh + Cloud Backup Copy

**Date:** 2026-04-24
**Branch:** add-momtrack

## Overview

Three coordinated updates to bengreene.dev:

1. **Screenshot refresh** — replace old DadTrack raw screenshots with new ones (covering cloud backup); add MomTrack screenshots.
2. **Cloud backup copy** — update DadTrack page copy to highlight cloud backup as a shipped feature.
3. **MomTrack launch** — add a `/momtrack` page, update the home page to show both apps, update nav, and update the feedback form to support both apps.

---

## Decisions Made

| Question | Decision |
|---|---|
| MomTrack site structure | Option A: separate `/momtrack` page, both apps in nav, home page updated |
| Feedback form | Single `/feedback` with app toggle; default DadTrack; supports `?app=momtrack` and `?app=dadtrack` |
| Screenshot framing | Reuse existing `MobileShowcase` CSS phone component; raw iOS screenshots fed in as props |
| MomTrack color palette | Rose→Crimson pulled from scarf in app icon: `#e8746e` → `#c4566a` → `#9e2b3c` |

---

## Review Updates Incorporated

This spec includes the implementation review feedback from 2026-04-24:

- `/feedback` must keep static export support by isolating `useSearchParams()` under a `Suspense` boundary.
- `MobileShowcase` should use explicit optional theme props instead of a generic `accentColor` string.
- `MobileShowcase` defaults must preserve all existing DadTrack behavior and visuals.
- Public image references in code must use `/images/...` paths, not `public/images/...` literals.
- Navigation updates must include the global footer (`SiteFooter`) as well as header/mobile nav.
- The 7-card feature grids must intentionally handle the odd final card.
- The implementation must preserve `output: "export"` compatibility and verify it with `pnpm build`.

---

## 1. Screenshots

### Source files
- **DadTrack:** `/Users/bengreene/workspace/dad_track/artifacts/screenshots/raw/dadtrack/ios/iphone-16-pro-max/`
- **MomTrack:** `/Users/bengreene/workspace/dad_track/artifacts/screenshots/raw/momtrack/ios/iphone-16-pro-max/`

### Destination
- Copy DadTrack screenshots → `bengreene.dev/public/images/dadtrack/` (replacing old files)
- Copy MomTrack screenshots → `bengreene.dev/public/images/momtrack/` (new directory)

### Files (same names, both flavors)
```
01-home-feed.png
02-monthly-recap.png
03-journal-entry-detail.png
04-search.png
05-streak.png
06-cloud-pending.png
07-cloud-all-synced.png
```

The old DadTrack screenshots (`1_homescreen_with_tip.png`, `2_monthly_recap.png`, `3_magazine_mode.png`, `4_regular_view.png`, `5_streak_celebration.png`, `6_tip_history.png`, `7_search.png`, `manage_mood_screen.png`) are no longer used and can be removed.

### Code references

When referencing these files from React/Next code, use `getAssetPath('/images/...')` paths:

```ts
getAssetPath('/images/dadtrack/01-home-feed.png')
getAssetPath('/images/momtrack/01-home-feed.png')
```

Do **not** use `public/images/...` as a runtime URL. Files in `public/` are served from the site root, and `getAssetPath` is required for the configured GitHub Pages `basePath`.

---

## 2. Navigation

**Files:**
- `src/components/Header.tsx`
- `src/components/MobileMenu.tsx`
- `src/components/SiteFooter.tsx`

Add MomTrack link to `navLinks` after DadTrack:
```
Home · About · DadTrack · MomTrack · Feedback
```

If the implementation touches nav in more than one file, consider extracting a shared `navLinks` constant to avoid drift. Do not do a larger nav refactor unless it stays small and reduces duplication.

---

## 3. Home Page (`src/app/page.tsx`)

### "Current Projects" section
Replace the existing "Current Project: DadTrack" section with a two-card **"Current Projects"** layout:

**DadTrack card:**
- Teal/blue palette (existing brand colors)
- Status badge: "Live on iOS & Android"
- CTAs:
  - "Learn More" → `/dadtrack`
  - One platform-detected primary store download button using `getPrimaryTrackedStoreCta(platform ?? 'other')`

**MomTrack card:**
- Rose/crimson palette (`#e8746e` → `#c4566a` → `#9e2b3c`)
- Status badge: "Now in Beta"
- CTA: "Join the Beta" → TestFlight URL `https://testflight.apple.com/join/nnmhT9Sw`
- Secondary: "Learn More" → `/momtrack`

### MobileShowcase section
Update screenshot list to use new DadTrack filenames. Show 3 screenshots: `01-home-feed`, `02-monthly-recap`, `07-cloud-all-synced` (highlights cloud backup).

The `MobileShowcase` component currently hardcodes DadTrack copy and teal/purple accents:
- Heading: `"DadTrack in Action"`
- Title text: `text-teal-400`
- Active indicators: `bg-gradient-to-r from-teal-400 to-blue-500`
- Floating glow blobs: `bg-teal-500/20`, `bg-purple-500/20`
- Background decorations: `bg-teal-500/5`, `bg-purple-500/5`

Add backward-compatible optional props instead of a generic `accentColor` prop:

```ts
interface MobileShowcaseThemeClasses {
  text?: string;
  indicatorActive?: string;
  primaryGlow?: string;
  secondaryGlow?: string;
  backgroundPrimaryGlow?: string;
  backgroundSecondaryGlow?: string;
}

interface MobileShowcaseProps {
  screenshots: Screenshot[];
  deviceColor?: string;
  backgroundColor?: string;
  heading?: string;
  themeClasses?: MobileShowcaseThemeClasses;
}
```

Default behavior when omitted:
- `heading = 'DadTrack in Action'`
- `themeClasses.text = 'text-teal-400'`
- `themeClasses.indicatorActive = 'bg-gradient-to-r from-teal-400 to-blue-500'`
- `themeClasses.primaryGlow = 'bg-teal-500/20'`
- `themeClasses.secondaryGlow = 'bg-purple-500/20'`
- `themeClasses.backgroundPrimaryGlow = 'bg-teal-500/5'`
- `themeClasses.backgroundSecondaryGlow = 'bg-purple-500/5'`

MomTrack usage:

```tsx
<MobileShowcase
  heading="MomTrack in Action"
  screenshots={screenshots}
  themeClasses={{
    text: 'text-[#e8746e]',
    indicatorActive: 'bg-gradient-to-r from-[#e8746e] to-[#9e2b3c]',
    primaryGlow: 'bg-rose-500/20',
    secondaryGlow: 'bg-red-700/20',
    backgroundPrimaryGlow: 'bg-rose-500/5',
    backgroundSecondaryGlow: 'bg-red-700/5',
  }}
/>
```

Tailwind note: use full literal class strings as shown above. Do not construct dynamic Tailwind class names from partial strings, because Tailwind may not include them in the generated CSS.

---

## 4. `/dadtrack` Page (`src/app/dadtrack/page.tsx`)

### Feature cards
Replace 8 old feature cards with 7 new ones mapped to new screenshots:

| # | Title | Screenshot | Icon |
|---|---|---|---|
| 1 | AI-Powered Daily Tips | `01-home-feed.png` | 🤖 |
| 2 | Monthly AI Recaps | `02-monthly-recap.png` | 📖 |
| 3 | Journal Entry Detail | `03-journal-entry-detail.png` | 📝 |
| 4 | Advanced Search | `04-search.png` | 🔍 |
| 5 | Journaling Streaks | `05-streak.png` | 🔥 |
| 6 | Cloud Backup & Sync | `06-cloud-pending.png` | ☁️ |
| 7 | Restore & Sync | `07-cloud-all-synced.png` | ✅ |

Card 6 ("Cloud Backup & Sync") shows the in-progress backup state and describes the backup feature. Card 7 ("Restore & Sync") shows the all-synced state and describes restore on a new device + cross-device sync. Together they cover both sides of the cloud story without feeling redundant. Cards for Magazine Mode, Flexible View Modes, Tip History, and Custom Mood Tags are removed (screenshots no longer exist).

### Feature grid layout

The feature grid remains `grid grid-cols-1 md:grid-cols-2 gap-6`, but the 7th card must be handled intentionally so the final row does not look accidentally lopsided on desktop.

Suggested implementation: pass a conditional class to `StaggerItem` for the final odd card:

```tsx
<StaggerItem
  key={feature.title}
  className={
    index === features.length - 1 && features.length % 2 === 1
      ? 'md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]'
      : ''
  }
>
```

Apply the same layout treatment to `/momtrack`.

### "Why DadTrack Is Different" key points
Update the **"Your Data, Your Control"** card:
- **Old:** "Automatic nightly backups, cross-device migration, and complete data export. Your memories are always safe."
- **New:** "Optional cloud backup and sync keeps your memories safe. Restore everything on a new device, free up local photo storage, and export a complete backup anytime."

### Hero description
Add "cloud backup" to the feature list:
- **Old:** "Voice journaling, daily tips, monthly recaps, and streak celebrations—all designed to make memory-keeping effortless."
- **New:** "Voice journaling, daily tips, monthly recaps, cloud backup, and streak celebrations—all designed to make memory-keeping effortless."

### MobileShowcase on home page
Screenshots updated to new filenames (handled in Section 3 above).

---

## 5. `/momtrack` Page (new: `src/app/momtrack/page.tsx` + `layout.tsx`)

### Structure
Mirrors `/dadtrack/page.tsx` exactly, with MomTrack branding applied throughout.

### Color palette
All DadTrack teal references replaced with MomTrack rose/crimson:
- Primary accent: `#e8746e` (rose — used for text, borders, badge backgrounds)
- Gradient: `from-[#e8746e] via-[#c4566a] to-[#9e2b3c]`
- Glow blobs: rose-500/20, red-700/20

### Hero section
- Badge: "📱 The Mom Journaling App"
- Headline gradient: rose→crimson
- Status badge: "Now in Beta — iOS TestFlight" (amber/yellow, not green)
- Description: "The mom journaling app that helps you preserve precious moments through photos, mood tracking, and daily reflections. Built by a dad for his wife, and for moms everywhere."
- Primary CTA: "Join the Beta on TestFlight" → `https://testflight.apple.com/join/nnmhT9Sw`
- Secondary CTA: none (app not publicly available on stores yet)

### Feature cards
Same 7 cards as updated DadTrack (identical features, same screenshots from MomTrack flavor):

| # | Title | Screenshot | Icon |
|---|---|---|---|
| 1 | AI-Powered Daily Tips | `/images/momtrack/01-home-feed.png` | 🤖 |
| 2 | Monthly AI Recaps | `/images/momtrack/02-monthly-recap.png` | 📖 |
| 3 | Journal Entry Detail | `/images/momtrack/03-journal-entry-detail.png` | 📝 |
| 4 | Advanced Search | `/images/momtrack/04-search.png` | 🔍 |
| 5 | Journaling Streaks | `/images/momtrack/05-streak.png` | 🔥 |
| 6 | Cloud Backup & Sync | `/images/momtrack/06-cloud-pending.png` | ☁️ |
| 7 | Restore & Sync | `/images/momtrack/07-cloud-all-synced.png` | ✅ |

Use `getAssetPath('/images/momtrack/...')` in implementation.

### "Why MomTrack Is Different" key points
Same three points as DadTrack, copy adjusted:
- **Mom-Focused** (not Dad-Focused): "Built by a dad for his wife, and for moms everywhere. Speaks in your voice and emphasizes bonding and memory-keeping."
- **Low Effort, High Impact**: unchanged
- **Your Data, Your Control**: same updated cloud copy as DadTrack

### CTA section
- Headline: "Join the MomTrack Beta"
- Body: "MomTrack is currently in beta testing on iOS. Join via TestFlight and help shape the app."
- Primary button: "Join the Beta on TestFlight" → TestFlight URL
- Feedback link: "Have feedback?" → `/feedback?app=momtrack`

### Roadmap section
Keep identical to DadTrack (same upcoming features).

### Metadata / SEO (`layout.tsx`)
```
title: "MomTrack — Mom Journaling App"
description: "MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS."
```

Follow the existing page metadata pattern, including:
- `metadataBase: new URL(SITE_CANONICAL_URL)`
- `alternates.canonical = '/momtrack'`
- Open Graph title, description, URL, and image
- Twitter card title, description, and image

Use the existing site images unless a MomTrack-specific OG/Twitter asset is added in the same change.

### Schema
`SoftwareApplication` JSON-LD, same shape as DadTrack, with MomTrack name/description and TestFlight URL.

---

## 6. Feedback Page (`src/app/feedback/page.tsx`)

### Static rendering requirement

`useSearchParams()` must not be called directly in the top-level `/feedback` page without a `Suspense` boundary. In App Router static prerendering, reading search params without `Suspense` can trigger a build-time missing-boundary error or opt the whole route into client-side rendering.

Required structure:

- Keep `src/app/feedback/page.tsx` as a Server Component.
- Move the current client-side form UI into a child Client Component, for example `src/app/feedback/FeedbackContent.tsx`.
- Wrap that child in `<Suspense>` from `src/app/feedback/page.tsx`.
- Put `useSearchParams()` only inside the child Client Component.
- Do **not** use `connection()`, `dynamic = 'force-dynamic'`, server actions, cookies, headers, request-dependent route handlers, or API routes for this feature; this site must continue to work with `output: "export"`.

Pattern:

```tsx
// src/app/feedback/page.tsx
import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { FeedbackContent } from './FeedbackContent';

function FeedbackFallback() {
  return (
    <section className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      {/* Lightweight static skeleton/fallback matching the page shape */}
    </section>
  );
}

export default function FeedbackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative">
        <Suspense fallback={<FeedbackFallback />}>
          <FeedbackContent />
        </Suspense>
      </main>
    </div>
  );
}
```

This mirrors the existing `/invite` implementation pattern.

### App selector
- Add `app` state: `'dadtrack' | 'momtrack'`, default `'dadtrack'`
- On mount, read `?app=` query param via `useSearchParams`; if value is `'momtrack'` or `'dadtrack'`, set state accordingly
- Render a pill toggle above the form:
  ```
  [ DadTrack ]  [ MomTrack ]
  ```
  DadTrack pill uses teal active color; MomTrack pill uses rose active color.

Suggested local type:

```ts
type FeedbackApp = 'dadtrack' | 'momtrack';
```

Use a small parser/helper so the query-param behavior is easy to test:

```ts
function parseFeedbackAppParam(value: string | null): FeedbackApp {
  return value === 'momtrack' || value === 'dadtrack' ? value : 'dadtrack';
}
```

### Dynamic copy
| Element | DadTrack | MomTrack |
|---|---|---|
| Page subtitle | "Help us build the best dad journaling app" | "Help us shape MomTrack" |
| Body text | "Your thoughts and ideas shape DadTrack." | "MomTrack is in beta — your feedback directly shapes what we build." |
| Submit button gradient | teal→blue (existing) | rose→crimson |

### Form submission
Pass `app` as a new field in the `submitToGoogleSheet` payload:
```ts
{ name, email, comment, type: 'feedback', app: 'dadtrack' | 'momtrack' }
```
`submitToGoogleSheet` type signature extended accordingly.

`submitToGoogleSheet` already allows additional string fields through its index signature, but the implementation should still make the supported payload explicit enough that `app` is not just an untyped accident. A minimal acceptable update:

```ts
type FormSubmissionPayload = {
  name: string;
  email: string;
  comment?: string;
  platform?: string;
  type?: string;
  app?: 'dadtrack' | 'momtrack';
  [key: string]: string | undefined;
};
```

> **Manual setup required:** The Google Sheet backing the feedback form needs a new `app` column added before the new form is deployed. The column value will be either `dadtrack` or `momtrack`. This is outside the code change scope and must be done by the developer before going live.

---

## 7. Constants (`src/lib/constants.ts`)

Add MomTrack TestFlight constant:
```ts
export const MOMTRACK_TESTFLIGHT_URL = 'https://testflight.apple.com/join/nnmhT9Sw';
```

Do not add MomTrack to `src/lib/storeCtas.ts`; MomTrack has no public App Store or Google Play URL yet. DadTrack store helpers remain DadTrack-only.

The repository currently separates pure CTA data in `src/lib/storeCtas.ts` from browser platform detection in `src/lib/storeLinks.ts`. Keep that split intact unless a small refactor is needed for clarity.

---

## 8. Static Export Constraints

The site uses `output: "export"` in `next.config.ts`. This change must remain fully static-export compatible.

Allowed:
- Static App Router pages and layouts.
- Client Components for browser-only interactivity.
- Browser-side form submission to the existing `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` endpoint.
- `next/image` with the existing `images: { unoptimized: true }` config.
- Static local assets in `public/`, referenced with `getAssetPath('/images/...')`.

Do not add:
- API routes or request-dependent route handlers.
- Server Actions.
- Cookies, headers, rewrites, redirects, or `connection()`.
- Dynamic rendering flags such as `dynamic = 'force-dynamic'`.
- Dynamic routes without `generateStaticParams()`.
- Default Next image optimization.

If route handlers are ever needed later, only static `GET` handlers are compatible with export; this feature does not need them.

---

## 9. Tests and Verification

Add or update focused tests where practical:

- Feedback app selection:
  - defaults to DadTrack when no query param is present
  - selects MomTrack for `?app=momtrack`
  - selects DadTrack for `?app=dadtrack`
  - falls back to DadTrack for unknown values
- Feedback submission payload includes `app: 'dadtrack' | 'momtrack'`.
- `MobileShowcase` defaults remain backward-compatible:
  - default heading remains `"DadTrack in Action"`
  - default accent classes remain teal/purple
- `MobileShowcase` accepts MomTrack theme props and renders the MomTrack heading/classes.

Required verification before handoff:

```bash
pnpm lint
pnpm test
pnpm build
```

`pnpm build` is the static-export gate and must pass before considering the implementation complete.

---

## Out of Scope

- MomTrack Android / Play Store listing (not published yet)
- MomTrack App Store listing (not published yet; TestFlight only)
- Updating the waitlist page (no waitlist for MomTrack)
- Updating the invite/partner-sharing flow for MomTrack
- Adding MomTrack to `storeCtas.ts` (no store URLs yet)
- `.gitignore` update for `.superpowers/` (separate housekeeping)
