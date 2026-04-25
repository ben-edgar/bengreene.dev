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

## 1. Screenshots

### Source files
- **DadTrack:** `dad_track/artifacts/screenshots/raw/dadtrack/ios/iphone-16-pro-max/`
- **MomTrack:** `dad_track/artifacts/screenshots/raw/momtrack/ios/iphone-16-pro-max/`

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

---

## 2. Navigation

**File:** `src/components/Header.tsx` and `src/components/MobileMenu.tsx`

Add MomTrack link to `navLinks` after DadTrack:
```
Home · About · DadTrack · MomTrack · Feedback
```

---

## 3. Home Page (`src/app/page.tsx`)

### "Current Projects" section
Replace the existing "Current Project: DadTrack" section with a two-card **"Current Projects"** layout:

**DadTrack card:**
- Teal/blue palette (existing brand colors)
- Status badge: "Live on iOS & Android"
- CTAs: "Learn More" → `/dadtrack`, platform-detected store download button

**MomTrack card:**
- Rose/crimson palette (`#e8746e` → `#c4566a` → `#9e2b3c`)
- Status badge: "Now in Beta"
- CTA: "Join the Beta" → TestFlight URL `https://testflight.apple.com/join/nnmhT9Sw`
- Secondary: "Learn More" → `/momtrack`

### MobileShowcase section
Update screenshot list to use new DadTrack filenames. Show 3 screenshots: `01-home-feed`, `02-monthly-recap`, `07-cloud-all-synced` (highlights cloud backup).

The `MobileShowcase` component has two `motion.div` floating glow blobs hardcoded to `bg-teal-500/20` and `bg-purple-500/20`. Add an optional `accentColor` prop (`string`, Tailwind class or CSS color) that replaces those blob colors. When omitted, the component keeps its existing teal/purple defaults. The home page (DadTrack context) omits the prop; the MomTrack page passes rose colors.

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
| 1 | AI-Powered Daily Tips | `public/images/momtrack/01-home-feed.png` | 🤖 |
| 2 | Monthly AI Recaps | `public/images/momtrack/02-monthly-recap.png` | 📖 |
| 3 | Journal Entry Detail | `public/images/momtrack/03-journal-entry-detail.png` | 📝 |
| 4 | Advanced Search | `public/images/momtrack/04-search.png` | 🔍 |
| 5 | Journaling Streaks | `public/images/momtrack/05-streak.png` | 🔥 |
| 6 | Cloud Backup & Sync | `public/images/momtrack/06-cloud-pending.png` | ☁️ |
| 7 | All Synced | `public/images/momtrack/07-cloud-all-synced.png` | ✅ |

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

### Schema
`SoftwareApplication` JSON-LD, same shape as DadTrack, with MomTrack name/description and TestFlight URL.

---

## 6. Feedback Page (`src/app/feedback/page.tsx`)

### App selector
- Add `app` state: `'dadtrack' | 'momtrack'`, default `'dadtrack'`
- On mount, read `?app=` query param via `useSearchParams`; if value is `'momtrack'` or `'dadtrack'`, set state accordingly
- Render a pill toggle above the form:
  ```
  [ DadTrack ]  [ MomTrack ]
  ```
  DadTrack pill uses teal active color; MomTrack pill uses rose active color.

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

> **Manual setup required:** The Google Sheet backing the feedback form needs a new `app` column added before the new form is deployed. The column value will be either `dadtrack` or `momtrack`. This is outside the code change scope and must be done by the developer before going live.

---

## 7. Constants (`src/lib/constants.ts`)

Add MomTrack TestFlight constant:
```ts
export const MOMTRACK_TESTFLIGHT_URL = 'https://testflight.apple.com/join/nnmhT9Sw';
```

---

## Out of Scope

- MomTrack Android / Play Store listing (not published yet)
- MomTrack App Store listing (not published yet; TestFlight only)
- Updating the waitlist page (no waitlist for MomTrack)
- Updating the invite/partner-sharing flow for MomTrack
- Adding MomTrack to `storeCtas.ts` (no store URLs yet)
- `.gitignore` update for `.superpowers/` (separate housekeeping)
