# MomTrack Launch and Screenshot Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh DadTrack screenshots and cloud-backup copy, add a MomTrack product page, and update navigation/home/feedback flows while preserving Next.js static export.

**Architecture:** Keep route pages static-export compatible and push browser-only behavior into Client Components. Add small shared data modules for product content and navigation so DadTrack and MomTrack stay consistent without duplicating feature lists. Preserve current visual patterns, extending `MobileShowcase` through optional theme props with DadTrack defaults.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, TailwindCSS v4, Vitest, static export with `output: "export"`.

---

## File Structure

Create:
- `src/lib/navigation.ts` - shared header/mobile/footer nav links.
- `src/lib/navigation.test.ts` - verifies nav order includes MomTrack.
- `src/lib/productContent.ts` - shared screenshot, feature, key-point, roadmap, and grid-layout data.
- `src/lib/productContent.test.ts` - verifies product content contracts and asset paths.
- `src/components/MobileShowcase.test.tsx` - verifies default and MomTrack themed rendering contracts.
- `src/app/dadtrack/page.test.tsx` - verifies DadTrack new screenshots/copy and removed old features.
- `src/app/momtrack/layout.tsx` - MomTrack metadata.
- `src/app/momtrack/page.tsx` - MomTrack product page.
- `src/app/momtrack/page.test.tsx` - verifies MomTrack route contracts.
- `src/app/page.test.tsx` - verifies home page current projects and showcase screenshots.
- `src/app/feedback/feedbackApp.ts` - feedback app type, query-param parser, copy map, payload builder.
- `src/app/feedback/feedbackApp.test.ts` - pure tests for query parsing and payload shape.
- `src/app/feedback/FeedbackContent.tsx` - client form UI using `useSearchParams`.
- `src/app/feedback/page.test.tsx` - verifies Suspense fallback static route shell.

Modify:
- `src/lib/constants.ts` - add MomTrack TestFlight URL.
- `src/lib/formSubmit.ts` - make supported form payload fields explicit.
- `src/components/Header.tsx` - import shared nav links.
- `src/components/MobileMenu.tsx` - import shared nav links.
- `src/components/SiteFooter.tsx` - import shared nav links.
- `src/components/MobileShowcase.tsx` - add heading/theme props with DadTrack defaults.
- `src/app/dadtrack/page.tsx` - use shared new features, cloud copy, odd-grid layout.
- `src/app/page.tsx` - add Current Projects cards and new home showcase screenshots.
- `src/app/feedback/page.tsx` - convert to Server Component with Suspense boundary.
- `public/images/dadtrack/*.png` - replace old DadTrack screenshots.
- `public/images/momtrack/*.png` - add MomTrack screenshots.

Static export constraints:
- Do not add API routes, Server Actions, cookies, headers, rewrites, redirects, `connection()`, or dynamic rendering flags.
- Keep image references rooted at `/images/...` and wrapped with `getAssetPath()`.
- `pnpm build` is the export compatibility gate.

---

### Task 1: Assets, Constants, Shared Navigation, and Product Content

**Files:**
- Create: `src/lib/navigation.ts`
- Create: `src/lib/navigation.test.ts`
- Create: `src/lib/productContent.ts`
- Create: `src/lib/productContent.test.ts`
- Modify: `src/lib/constants.ts`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/MobileMenu.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `public/images/dadtrack/*.png`
- Create: `public/images/momtrack/*.png`

- [ ] **Step 1: Write failing shared-content tests**

Create `src/lib/navigation.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import { navLinks } from './navigation';

describe('navigation links', () => {
  it('lists MomTrack after DadTrack across shared site navigation', () => {
    expect(navLinks).toEqual([
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/dadtrack', label: 'DadTrack' },
      { href: '/momtrack', label: 'MomTrack' },
      { href: '/feedback', label: 'Feedback' },
    ]);
  });
});
```

Create `src/lib/productContent.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import {
  DADTRACK_FEATURES,
  DADTRACK_HOME_SHOWCASE_SCREENSHOTS,
  MOMTRACK_FEATURES,
  MOMTRACK_PAGE_THEME,
  PRODUCT_ROADMAP,
  getOddFinalGridItemClass,
} from './productContent';
import { MOMTRACK_TESTFLIGHT_URL } from './constants';

describe('product content', () => {
  it('defines the MomTrack TestFlight URL', () => {
    expect(MOMTRACK_TESTFLIGHT_URL).toBe('https://testflight.apple.com/join/nnmhT9Sw');
  });

  it('uses seven DadTrack features with the cloud backup screenshots', () => {
    expect(DADTRACK_FEATURES.map((feature) => feature.title)).toEqual([
      'AI-Powered Daily Tips',
      'Monthly AI Recaps',
      'Journal Entry Detail',
      'Advanced Search',
      'Journaling Streaks',
      'Cloud Backup & Sync',
      'Restore & Sync',
    ]);
    expect(DADTRACK_FEATURES.map((feature) => feature.image)).toEqual([
      '/images/dadtrack/01-home-feed.png',
      '/images/dadtrack/02-monthly-recap.png',
      '/images/dadtrack/03-journal-entry-detail.png',
      '/images/dadtrack/04-search.png',
      '/images/dadtrack/05-streak.png',
      '/images/dadtrack/06-cloud-pending.png',
      '/images/dadtrack/07-cloud-all-synced.png',
    ]);
  });

  it('uses seven MomTrack features with MomTrack asset paths', () => {
    expect(MOMTRACK_FEATURES).toHaveLength(7);
    expect(MOMTRACK_FEATURES[0].image).toBe('/images/momtrack/01-home-feed.png');
    expect(MOMTRACK_FEATURES[6].title).toBe('Restore & Sync');
    expect(MOMTRACK_FEATURES[6].image).toBe('/images/momtrack/07-cloud-all-synced.png');
  });

  it('defines the three DadTrack home showcase screenshots', () => {
    expect(DADTRACK_HOME_SHOWCASE_SCREENSHOTS.map((screenshot) => screenshot.src)).toEqual([
      '/images/dadtrack/01-home-feed.png',
      '/images/dadtrack/02-monthly-recap.png',
      '/images/dadtrack/07-cloud-all-synced.png',
    ]);
  });

  it('keeps roadmap content shared for both product pages', () => {
    expect(PRODUCT_ROADMAP).toHaveLength(4);
    expect(PRODUCT_ROADMAP[0].milestone).toBe('Milestone Tracker');
    expect(PRODUCT_ROADMAP[3].items).toContain('Selective entry sharing');
  });

  it('centers the final odd card only when a two-column feature grid has an odd item count', () => {
    expect(getOddFinalGridItemClass(6, 7)).toBe('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
    expect(getOddFinalGridItemClass(5, 7)).toBe('');
    expect(getOddFinalGridItemClass(5, 6)).toBe('');
  });

  it('defines literal Tailwind classes for the MomTrack showcase theme', () => {
    expect(MOMTRACK_PAGE_THEME.showcaseThemeClasses).toEqual({
      text: 'text-[#e8746e]',
      indicatorActive: 'bg-gradient-to-r from-[#e8746e] to-[#9e2b3c]',
      primaryGlow: 'bg-rose-500/20',
      secondaryGlow: 'bg-red-700/20',
      backgroundPrimaryGlow: 'bg-rose-500/5',
      backgroundSecondaryGlow: 'bg-red-700/5',
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
pnpm test src/lib/navigation.test.ts src/lib/productContent.test.ts
```

Expected: FAIL because `src/lib/navigation.ts`, `src/lib/productContent.ts`, and `MOMTRACK_TESTFLIGHT_URL` do not exist yet.

- [ ] **Step 3: Copy new screenshot assets**

Run:

```bash
mkdir -p public/images/dadtrack public/images/momtrack
rm -f public/images/dadtrack/*.png
cp /Users/bengreene/workspace/dad_track/artifacts/screenshots/raw/dadtrack/ios/iphone-16-pro-max/*.png public/images/dadtrack/
cp /Users/bengreene/workspace/dad_track/artifacts/screenshots/raw/momtrack/ios/iphone-16-pro-max/*.png public/images/momtrack/
find public/images/dadtrack public/images/momtrack -maxdepth 1 -type f -name '*.png' | sort
```

Expected output includes exactly these 14 files:

```text
public/images/dadtrack/01-home-feed.png
public/images/dadtrack/02-monthly-recap.png
public/images/dadtrack/03-journal-entry-detail.png
public/images/dadtrack/04-search.png
public/images/dadtrack/05-streak.png
public/images/dadtrack/06-cloud-pending.png
public/images/dadtrack/07-cloud-all-synced.png
public/images/momtrack/01-home-feed.png
public/images/momtrack/02-monthly-recap.png
public/images/momtrack/03-journal-entry-detail.png
public/images/momtrack/04-search.png
public/images/momtrack/05-streak.png
public/images/momtrack/06-cloud-pending.png
public/images/momtrack/07-cloud-all-synced.png
```

- [ ] **Step 4: Add constants, navigation, and product content**

Add this export to `src/lib/constants.ts` after the DadTrack store URLs:

```ts
export const MOMTRACK_TESTFLIGHT_URL = 'https://testflight.apple.com/join/nnmhT9Sw';
```

Create `src/lib/navigation.ts`:

```ts
export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/dadtrack', label: 'DadTrack' },
  { href: '/momtrack', label: 'MomTrack' },
  { href: '/feedback', label: 'Feedback' },
];
```

Create `src/lib/productContent.ts`:

```ts
import { MOMTRACK_TESTFLIGHT_URL } from './constants';

export type ProductFeature = {
  title: string;
  description: string;
  image: string;
  icon: string;
};

export type ProductKeyPoint = {
  title: string;
  description: string;
};

export type ProductRoadmapSection = {
  milestone: string;
  items: string[];
};

export type ShowcaseScreenshot = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

export type ProductShowcaseThemeClasses = {
  text: string;
  indicatorActive: string;
  primaryGlow: string;
  secondaryGlow: string;
  backgroundPrimaryGlow: string;
  backgroundSecondaryGlow: string;
};

export type ProductPageTheme = {
  accentText: string;
  accentBorder: string;
  accentHoverBorder: string;
  gradientText: string;
  bulletText: string;
  ambientPrimary: string;
  ambientSecondary: string;
  ambientTertiary: string;
  showcaseThemeClasses: ProductShowcaseThemeClasses;
};

export const DADTRACK_FEATURES: ProductFeature[] = [
  {
    title: 'AI-Powered Daily Tips',
    description:
      'Get personalized, age-appropriate parenting tips powered by AI. Tips appear at the top of your timeline each day, ready to save or dismiss.',
    image: '/images/dadtrack/01-home-feed.png',
    icon: '🤖',
  },
  {
    title: 'Monthly AI Recaps',
    description:
      'Each month, DadTrack generates a narrative summary of your journaling journey with photo highlights and references to your entries.',
    image: '/images/dadtrack/02-monthly-recap.png',
    icon: '📖',
  },
  {
    title: 'Journal Entry Detail',
    description:
      'Open a memory to revisit the photo, notes, mood, and context that made that moment worth saving.',
    image: '/images/dadtrack/03-journal-entry-detail.png',
    icon: '📝',
  },
  {
    title: 'Advanced Search',
    description:
      'Find any memory instantly by searching text, date ranges, mood tags, children, or photo-backed entries.',
    image: '/images/dadtrack/04-search.png',
    icon: '🔍',
  },
  {
    title: 'Journaling Streaks',
    description:
      'Build a consistent memory-keeping habit with streak tracking, milestone moments, and celebration states.',
    image: '/images/dadtrack/05-streak.png',
    icon: '🔥',
  },
  {
    title: 'Cloud Backup & Sync',
    description:
      'Optional cloud backup protects your memories and gives you a clear view of pending backup progress.',
    image: '/images/dadtrack/06-cloud-pending.png',
    icon: '☁️',
  },
  {
    title: 'Restore & Sync',
    description:
      'Restore everything on a new device, sync across devices, free up local photo storage, and export a complete backup anytime.',
    image: '/images/dadtrack/07-cloud-all-synced.png',
    icon: '✅',
  },
];

export const MOMTRACK_FEATURES: ProductFeature[] = [
  {
    title: 'AI-Powered Daily Tips',
    description:
      'Get personalized, age-appropriate parenting tips powered by AI. Tips appear at the top of your timeline each day, ready to save or dismiss.',
    image: '/images/momtrack/01-home-feed.png',
    icon: '🤖',
  },
  {
    title: 'Monthly AI Recaps',
    description:
      'Each month, MomTrack generates a narrative summary of your journaling journey with photo highlights and references to your entries.',
    image: '/images/momtrack/02-monthly-recap.png',
    icon: '📖',
  },
  {
    title: 'Journal Entry Detail',
    description:
      'Open a memory to revisit the photo, notes, mood, and context that made that moment worth saving.',
    image: '/images/momtrack/03-journal-entry-detail.png',
    icon: '📝',
  },
  {
    title: 'Advanced Search',
    description:
      'Find any memory instantly by searching text, date ranges, mood tags, children, or photo-backed entries.',
    image: '/images/momtrack/04-search.png',
    icon: '🔍',
  },
  {
    title: 'Journaling Streaks',
    description:
      'Build a consistent memory-keeping habit with streak tracking, milestone moments, and celebration states.',
    image: '/images/momtrack/05-streak.png',
    icon: '🔥',
  },
  {
    title: 'Cloud Backup & Sync',
    description:
      'Optional cloud backup protects your memories and gives you a clear view of pending backup progress.',
    image: '/images/momtrack/06-cloud-pending.png',
    icon: '☁️',
  },
  {
    title: 'Restore & Sync',
    description:
      'Restore everything on a new device, sync across devices, free up local photo storage, and export a complete backup anytime.',
    image: '/images/momtrack/07-cloud-all-synced.png',
    icon: '✅',
  },
];

export const DADTRACK_HOME_SHOWCASE_SCREENSHOTS: ShowcaseScreenshot[] = [
  {
    src: '/images/dadtrack/01-home-feed.png',
    alt: 'DadTrack home feed with AI tip',
    title: 'AI-Powered Daily Tips',
    description: 'Get personalized parenting tips powered by AI, right in your timeline.',
  },
  {
    src: '/images/dadtrack/02-monthly-recap.png',
    alt: 'DadTrack monthly recap',
    title: 'Monthly AI Recaps',
    description: 'Beautiful narrative summaries of your journaling journey each month.',
  },
  {
    src: '/images/dadtrack/07-cloud-all-synced.png',
    alt: 'DadTrack cloud backup all synced',
    title: 'Cloud Backup & Sync',
    description: 'Keep memories backed up, restorable, and synced across devices.',
  },
];

export const DADTRACK_KEY_POINTS: ProductKeyPoint[] = [
  {
    title: 'Dad-Focused',
    description: 'Built for dads, by a dad. Speaks in your voice and emphasizes bonding and memory-keeping.',
  },
  {
    title: 'Low Effort, High Impact',
    description: 'Snap a photo, dictate with voice, jot a feeling. Over time, build a rich memory archive effortlessly.',
  },
  {
    title: 'Your Data, Your Control',
    description:
      'Optional cloud backup and sync keeps your memories safe. Restore everything on a new device, free up local photo storage, and export a complete backup anytime.',
  },
];

export const MOMTRACK_KEY_POINTS: ProductKeyPoint[] = [
  {
    title: 'Mom-Focused',
    description:
      'Built by a dad for his wife, and for moms everywhere. Speaks in your voice and emphasizes bonding and memory-keeping.',
  },
  {
    title: 'Low Effort, High Impact',
    description: 'Snap a photo, dictate with voice, jot a feeling. Over time, build a rich memory archive effortlessly.',
  },
  {
    title: 'Your Data, Your Control',
    description:
      'Optional cloud backup and sync keeps your memories safe. Restore everything on a new device, free up local photo storage, and export a complete backup anytime.',
  },
];

export const PRODUCT_ROADMAP: ProductRoadmapSection[] = [
  {
    milestone: 'Milestone Tracker',
    items: ['Weekly milestones for first 3 months', 'Monthly milestones up to age 5', 'Achievement tracking (rolling, walking, first words)'],
  },
  {
    milestone: 'Child Information Hub',
    items: ["Doctor's office and doctor name", 'Insurance card information', 'Emergency contacts and allergies'],
  },
  {
    milestone: 'Memory Highlights',
    items: ['Monthly "look back" collages', 'Yearly memory books', 'Photo frequency tracking'],
  },
  {
    milestone: 'Family Sharing',
    items: ['Invite partner or grandparents', 'Shared timeline access', 'Selective entry sharing'],
  },
];

export const DADTRACK_PAGE_THEME: ProductPageTheme = {
  accentText: 'text-teal-400',
  accentBorder: 'border-teal-500/20',
  accentHoverBorder: 'hover:border-teal-500/30',
  gradientText: 'bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400',
  bulletText: 'text-teal-400',
  ambientPrimary: 'bg-teal-500/5',
  ambientSecondary: 'bg-blue-500/5',
  ambientTertiary: 'bg-purple-500/5',
  showcaseThemeClasses: {
    text: 'text-teal-400',
    indicatorActive: 'bg-gradient-to-r from-teal-400 to-blue-500',
    primaryGlow: 'bg-teal-500/20',
    secondaryGlow: 'bg-purple-500/20',
    backgroundPrimaryGlow: 'bg-teal-500/5',
    backgroundSecondaryGlow: 'bg-purple-500/5',
  },
};

export const MOMTRACK_PAGE_THEME: ProductPageTheme = {
  accentText: 'text-[#e8746e]',
  accentBorder: 'border-[#e8746e]/20',
  accentHoverBorder: 'hover:border-[#e8746e]/40',
  gradientText: 'bg-gradient-to-r from-[#e8746e] via-[#c4566a] to-[#9e2b3c]',
  bulletText: 'text-[#e8746e]',
  ambientPrimary: 'bg-rose-500/5',
  ambientSecondary: 'bg-red-700/5',
  ambientTertiary: 'bg-pink-500/5',
  showcaseThemeClasses: {
    text: 'text-[#e8746e]',
    indicatorActive: 'bg-gradient-to-r from-[#e8746e] to-[#9e2b3c]',
    primaryGlow: 'bg-rose-500/20',
    secondaryGlow: 'bg-red-700/20',
    backgroundPrimaryGlow: 'bg-rose-500/5',
    backgroundSecondaryGlow: 'bg-red-700/5',
  },
};

export function getOddFinalGridItemClass(index: number, total: number): string {
  return total % 2 === 1 && index === total - 1
    ? 'md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]'
    : '';
}

export const MOMTRACK_BETA_CTA = {
  label: 'Join the Beta on TestFlight',
  href: MOMTRACK_TESTFLIGHT_URL,
};
```

Update `src/components/Header.tsx`, `src/components/MobileMenu.tsx`, and `src/components/SiteFooter.tsx`:

```ts
import { navLinks } from '@/lib/navigation';
```

Remove the local `const navLinks = [...]` declarations from those three files.

- [ ] **Step 5: Run shared-content tests to verify they pass**

Run:

```bash
pnpm test src/lib/navigation.test.ts src/lib/productContent.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit shared content and assets**

Run:

```bash
git add src/lib/constants.ts src/lib/navigation.ts src/lib/navigation.test.ts src/lib/productContent.ts src/lib/productContent.test.ts src/components/Header.tsx src/components/MobileMenu.tsx src/components/SiteFooter.tsx public/images/dadtrack public/images/momtrack
git commit -m "feat: add momtrack shared content and screenshots"
```

---

### Task 2: MobileShowcase Theme Props

**Files:**
- Modify: `src/components/MobileShowcase.tsx`
- Create: `src/components/MobileShowcase.test.tsx`

- [ ] **Step 1: Write failing MobileShowcase tests**

Create `src/components/MobileShowcase.test.tsx`:

```tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

vi.mock('framer-motion', () => {
  const MotionDiv = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  );

  return {
    motion: { div: MotionDiv },
    useMotionValue: () => ({ set: vi.fn() }),
    useSpring: (value: unknown) => value,
    useTransform: () => 0,
  };
});

import MobileShowcase from './MobileShowcase';

const screenshots = [
  {
    src: '/images/dadtrack/01-home-feed.png',
    alt: 'DadTrack home feed',
    title: 'AI-Powered Daily Tips',
    description: 'Daily tips in the timeline.',
  },
];

describe('MobileShowcase', () => {
  it('keeps DadTrack heading and accent classes by default', () => {
    const markup = renderToStaticMarkup(<MobileShowcase screenshots={screenshots} />);

    expect(markup).toContain('DadTrack in Action');
    expect(markup).toContain('text-teal-400');
    expect(markup).toContain('from-teal-400 to-blue-500');
    expect(markup).toContain('bg-teal-500/20');
    expect(markup).toContain('bg-purple-500/20');
  });

  it('renders MomTrack heading and literal theme classes when provided', () => {
    const markup = renderToStaticMarkup(
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
      />,
    );

    expect(markup).toContain('MomTrack in Action');
    expect(markup).toContain('text-[#e8746e]');
    expect(markup).toContain('from-[#e8746e] to-[#9e2b3c]');
    expect(markup).toContain('bg-rose-500/20');
    expect(markup).toContain('bg-red-700/20');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
pnpm test src/components/MobileShowcase.test.tsx
```

Expected: FAIL because `heading` and `themeClasses` props are not defined.

- [ ] **Step 3: Add backward-compatible theme props**

In `src/components/MobileShowcase.tsx`, update props and defaults:

```tsx
export interface MobileShowcaseThemeClasses {
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

const DEFAULT_THEME_CLASSES: Required<MobileShowcaseThemeClasses> = {
    text: "text-teal-400",
    indicatorActive: "bg-gradient-to-r from-teal-400 to-blue-500",
    primaryGlow: "bg-teal-500/20",
    secondaryGlow: "bg-purple-500/20",
    backgroundPrimaryGlow: "bg-teal-500/5",
    backgroundSecondaryGlow: "bg-purple-500/5",
};

const MobileShowcase: React.FC<MobileShowcaseProps> = ({
    screenshots,
    deviceColor = "#0f172a",
    backgroundColor = "bg-slate-950",
    heading = "DadTrack in Action",
    themeClasses,
}) => {
    const resolvedThemeClasses = {
        ...DEFAULT_THEME_CLASSES,
        ...themeClasses,
    };
```

Replace the desktop heading with:

```tsx
<h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
    {heading}
</h2>
```

Replace both screenshot title class names with:

```tsx
className={`text-2xl font-semibold ${resolvedThemeClasses.text} mb-2`}
```

and:

```tsx
className={`text-lg font-semibold ${resolvedThemeClasses.text}`}
```

Replace both active indicator class branches with:

```tsx
? `w-10 ${resolvedThemeClasses.indicatorActive}`
: "w-2.5 bg-slate-700 hover:bg-slate-500"
```

and:

```tsx
? `w-8 ${resolvedThemeClasses.indicatorActive}`
: "w-2 bg-slate-700 hover:bg-slate-500"
```

Replace floating glow classes with:

```tsx
className={`absolute -top-10 -right-10 w-32 h-32 ${resolvedThemeClasses.primaryGlow} rounded-full blur-2xl`}
```

```tsx
className={`absolute -bottom-10 -left-10 w-40 h-40 ${resolvedThemeClasses.secondaryGlow} rounded-full blur-2xl`}
```

Replace background decoration classes with:

```tsx
<div className={`absolute top-1/4 left-0 w-96 h-96 ${resolvedThemeClasses.backgroundPrimaryGlow} rounded-full blur-3xl -z-10 pointer-events-none`} />
<div className={`absolute bottom-1/4 right-0 w-96 h-96 ${resolvedThemeClasses.backgroundSecondaryGlow} rounded-full blur-3xl -z-10 pointer-events-none`} />
```

- [ ] **Step 4: Run MobileShowcase tests**

Run:

```bash
pnpm test src/components/MobileShowcase.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit MobileShowcase theming**

Run:

```bash
git add src/components/MobileShowcase.tsx src/components/MobileShowcase.test.tsx
git commit -m "feat: theme mobile showcase"
```

---

### Task 3: DadTrack Page Screenshot and Cloud Backup Update

**Files:**
- Modify: `src/app/dadtrack/page.tsx`
- Create: `src/app/dadtrack/page.test.tsx`

- [ ] **Step 1: Write failing DadTrack page test**

Create `src/app/dadtrack/page.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('@/lib/storeLinks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/storeLinks')>('@/lib/storeLinks');

  return {
    ...actual,
    useDetectedStorePlatform: () => 'ios',
  };
});

import DadTrack from './page';

describe('DadTrack page', () => {
  it('uses the refreshed seven-card feature set and cloud backup copy', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain('Voice journaling, daily tips, monthly recaps, cloud backup, and streak celebrations');
    expect(markup).toContain('Cloud Backup &amp; Sync');
    expect(markup).toContain('Restore &amp; Sync');
    expect(markup).toContain('/images/dadtrack/06-cloud-pending.png');
    expect(markup).toContain('/images/dadtrack/07-cloud-all-synced.png');
    expect(markup).toContain('Optional cloud backup and sync keeps your memories safe');
    expect(markup).toContain('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
  });

  it('removes old screenshot-backed features that no longer exist', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).not.toContain('Magazine Mode');
    expect(markup).not.toContain('Flexible View Modes');
    expect(markup).not.toContain('Tip History &amp; Favorites');
    expect(markup).not.toContain('Custom Mood Tags');
    expect(markup).not.toContain('1_homescreen_with_tip.png');
    expect(markup).not.toContain('manage_mood_screen.png');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
pnpm test src/app/dadtrack/page.test.tsx
```

Expected: FAIL because the DadTrack page still uses old screenshots/features and does not include the centered odd-card class.

- [ ] **Step 3: Update DadTrack content and grid mapping**

In `src/app/dadtrack/page.tsx`, import shared content:

```ts
import {
  DADTRACK_FEATURES,
  DADTRACK_KEY_POINTS,
  PRODUCT_ROADMAP,
  getOddFinalGridItemClass,
} from '@/lib/productContent';
```

Remove the local `features`, `keyPoints`, and `roadmap` array literals. Add these constants inside `DadTrack` before state:

```ts
const features = DADTRACK_FEATURES;
const keyPoints = DADTRACK_KEY_POINTS;
const roadmap = PRODUCT_ROADMAP;
```

Update the hero body copy to:

```tsx
<p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
  The dad journaling app that helps you capture moments, moods, and memories with AI-powered insights.
  Voice journaling, daily tips, monthly recaps, cloud backup, and streak celebrations—all designed to make memory-keeping effortless.
</p>
```

Update feature image usage to preserve `basePath`:

```tsx
src={getAssetPath(feature.image)}
```

Update the feature grid item wrapper:

```tsx
<StaggerItem key={feature.title} className={getOddFinalGridItemClass(index, features.length)}>
```

Update the lightbox image mapping:

```tsx
images={features.map(f => ({
  src: getAssetPath(f.image),
  alt: f.title,
  title: f.title,
  description: f.description,
}))}
```

- [ ] **Step 4: Run DadTrack page test**

Run:

```bash
pnpm test src/app/dadtrack/page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit DadTrack page update**

Run:

```bash
git add src/app/dadtrack/page.tsx src/app/dadtrack/page.test.tsx
git commit -m "feat: refresh dadtrack product page"
```

---

### Task 4: MomTrack Product Route

**Files:**
- Create: `src/app/momtrack/layout.tsx`
- Create: `src/app/momtrack/page.tsx`
- Create: `src/app/momtrack/page.test.tsx`

- [ ] **Step 1: Write failing MomTrack route test**

Create `src/app/momtrack/page.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import MomTrackLayout, { metadata } from './layout';

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

import MomTrack from './page';

describe('MomTrack route contracts', () => {
  it('exports MomTrack metadata with canonical URL', () => {
    expect(metadata.title).toBe('MomTrack — Mom Journaling App');
    expect(metadata.description).toBe(
      'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
    );
    expect(metadata.alternates?.canonical).toBe('/momtrack');

    const layoutMarkup = renderToStaticMarkup(
      <MomTrackLayout>
        <div>child</div>
      </MomTrackLayout>,
    );

    expect(layoutMarkup).toContain('child');
  });

  it('renders MomTrack beta copy, screenshots, and TestFlight CTAs', () => {
    const markup = renderToStaticMarkup(<MomTrack />);

    expect(markup).toContain('The Mom Journaling App');
    expect(markup).toContain('Now in Beta');
    expect(markup).toContain('iOS TestFlight');
    expect(markup).toContain('Join the Beta on TestFlight');
    expect(markup).toContain('https://testflight.apple.com/join/nnmhT9Sw');
    expect(markup).toContain('/images/momtrack/01-home-feed.png');
    expect(markup).toContain('/images/momtrack/07-cloud-all-synced.png');
    expect(markup).toContain('Why MomTrack Is Different');
    expect(markup).toContain('Mom-Focused');
    expect(markup).toContain('/feedback?app=momtrack');
    expect(markup).toContain('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
pnpm test src/app/momtrack/page.test.tsx
```

Expected: FAIL because the `/momtrack` route does not exist.

- [ ] **Step 3: Create MomTrack layout metadata**

Create `src/app/momtrack/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MomTrack — Mom Journaling App',
  description:
    'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/momtrack',
  },
  openGraph: {
    title: 'MomTrack — Mom Journaling App',
    description:
      'A mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
    type: 'website',
    url: '/momtrack',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1024,
        height: 1024,
        alt: 'MomTrack app preview',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'MomTrack — Mom Journaling App',
    description: 'MomTrack is now in beta on iOS TestFlight.',
    images: ['/twitter-image.png'],
  },
};

export default function MomTrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 4: Create MomTrack page from the DadTrack structure with MomTrack data**

Create `src/app/momtrack/page.tsx` by copying the final DadTrack page structure from Task 3 and applying these exact top-level imports:

```ts
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { TiltCard } from '@/components/TiltCard';
import { Button } from '@/components/Button';
import { ImageLightbox } from '@/components/ImageLightbox';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';
import { ParallaxContent } from '@/components/animations/Parallax';
import { GlowDivider } from '@/components/GlowDivider';
import { getAssetPath } from '@/lib/basePath';
import { MOMTRACK_TESTFLIGHT_URL, SITE_CANONICAL_URL } from '@/lib/constants';
import {
  MOMTRACK_BETA_CTA,
  MOMTRACK_FEATURES,
  MOMTRACK_KEY_POINTS,
  MOMTRACK_PAGE_THEME,
  PRODUCT_ROADMAP,
  getOddFinalGridItemClass,
} from '@/lib/productContent';
```

Remove all DadTrack store-detection code from the copied page:

```ts
useDetectedStorePlatform
getTrackedStoreCtas
renderStoreCtas
storeCtas
platform
```

Use these MomTrack constants inside the component:

```ts
const features = MOMTRACK_FEATURES;
const keyPoints = MOMTRACK_KEY_POINTS;
const roadmap = PRODUCT_ROADMAP;
const theme = MOMTRACK_PAGE_THEME;

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MomTrack',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS',
  description:
    'A mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
  url: `${SITE_CANONICAL_URL}/momtrack`,
  image: `${SITE_CANONICAL_URL}/opengraph-image.png`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  sameAs: [MOMTRACK_TESTFLIGHT_URL],
  downloadUrl: MOMTRACK_TESTFLIGHT_URL,
};
```

Use these exact hero values:

```tsx
<div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8746e]/10 border ${theme.accentBorder} text-sm ${theme.accentText} font-medium mb-2`}>
  📱 The Mom Journaling App
</div>

<span className={`${theme.gradientText} bg-clip-text text-transparent`}>
  MomTrack
</span>

<div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/40 text-amber-300 rounded-full text-sm font-semibold">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
  </span>
  Now in Beta — iOS TestFlight
</div>

<p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
  The mom journaling app that helps you preserve precious moments through photos, mood tracking, and daily reflections.
  Built by a dad for his wife, and for moms everywhere.
</p>

<Button
  href={MOMTRACK_BETA_CTA.href}
  size="lg"
  mobileFullWidth
  target="_blank"
  rel="noopener noreferrer"
  className="border-[#9e2b3c] bg-[#c4566a] hover:bg-[#9e2b3c]"
>
  {MOMTRACK_BETA_CTA.label}
</Button>
```

Use the same TestFlight button in the bottom CTA section and do not render App Store or Google Play buttons on `/momtrack`.

Use the same odd-card class in the feature map:

```tsx
<StaggerItem key={feature.title} className={getOddFinalGridItemClass(index, features.length)}>
```

Use `getAssetPath(feature.image)` for every feature image and every lightbox image.

Use these exact section labels:

```tsx
Why MomTrack Is Different
Join the MomTrack Beta
MomTrack is currently in beta testing on iOS. Join via TestFlight and help shape the app.
Have feedback?
```

Use this feedback link:

```tsx
<a href="/feedback?app=momtrack" className={`${theme.accentText} hover:underline`}>
  Have feedback?
</a>
```

- [ ] **Step 5: Run MomTrack route test**

Run:

```bash
pnpm test src/app/momtrack/page.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit MomTrack route**

Run:

```bash
git add src/app/momtrack/layout.tsx src/app/momtrack/page.tsx src/app/momtrack/page.test.tsx
git commit -m "feat: add momtrack product page"
```

---

### Task 5: Home Page Current Projects and Showcase Refresh

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/page.test.tsx`

- [ ] **Step 1: Write failing home page test**

Create `src/app/page.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('@/components/HeroSection', () => ({
  default: () => <section>HeroSection</section>,
}));

vi.mock('@/components/AnimatedTimeline', () => ({
  default: () => <section>AnimatedTimeline</section>,
}));

vi.mock('@/components/MobileShowcase', () => ({
  default: ({ screenshots }: { screenshots: { src: string; title: string }[] }) => (
    <section>
      {screenshots.map((screenshot) => (
        <div key={screenshot.src}>
          {screenshot.src}
          {screenshot.title}
        </div>
      ))}
    </section>
  ),
}));

vi.mock('@/lib/storeLinks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/storeLinks')>('@/lib/storeLinks');

  return {
    ...actual,
    useDetectedStorePlatform: () => 'ios',
  };
});

import Home from './page';

describe('Home page', () => {
  it('renders two current project cards with DadTrack and MomTrack CTAs', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('Current Projects');
    expect(markup).toContain('Live on iOS &amp; Android');
    expect(markup).toContain('Now in Beta');
    expect(markup).toContain('Learn More');
    expect(markup).toContain('Join the Beta');
    expect(markup).toContain('https://testflight.apple.com/join/nnmhT9Sw');
    expect(markup).toContain('Download on the App Store');
  });

  it('uses the refreshed DadTrack showcase screenshots', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('/images/dadtrack/01-home-feed.png');
    expect(markup).toContain('/images/dadtrack/02-monthly-recap.png');
    expect(markup).toContain('/images/dadtrack/07-cloud-all-synced.png');
    expect(markup).not.toContain('3_magazine_mode.png');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
pnpm test src/app/page.test.tsx
```

Expected: FAIL because the home page still has the single DadTrack project section and old showcase screenshots.

- [ ] **Step 3: Update home page imports and screenshot mapping**

In `src/app/page.tsx`, update imports:

```ts
import {
  DADTRACK_HOME_SHOWCASE_SCREENSHOTS,
  MOMTRACK_BETA_CTA,
} from '@/lib/productContent';
import {
  getPrimaryTrackedStoreCta,
  getTrackedStoreCtas,
  useDetectedStorePlatform,
} from '@/lib/storeLinks';
```

Update CTA selection:

```ts
const platform = useDetectedStorePlatform();
const storePlatform = platform ?? 'other';
const primaryStoreCta = getPrimaryTrackedStoreCta(storePlatform);
const storeCtas = getTrackedStoreCtas(storePlatform);
const screenshots = DADTRACK_HOME_SHOWCASE_SCREENSHOTS.map((screenshot) => ({
  ...screenshot,
  src: getAssetPath(screenshot.src),
}));
```

- [ ] **Step 4: Replace single Current Project section with two cards**

Replace the existing DadTrack introduction section with:

```tsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div className="space-y-10">
    <div className="max-w-3xl mx-auto text-center space-y-4">
      <SlideUp>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Current Projects
        </h2>
      </SlideUp>
      <FadeIn delay={0.2}>
        <p className="text-lg text-slate-300 leading-relaxed">
          I build focused products that turn family moments into durable memories.
        </p>
      </FadeIn>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <FadeIn delay={0.3}>
        <div className="h-full rounded-2xl border border-teal-500/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(20,184,166,0.08)]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-900/50 px-3 py-1.5 text-sm font-semibold text-green-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live on iOS &amp; Android
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">DadTrack</h3>
              <p className="mt-3 text-slate-300 leading-relaxed">
                A dad-focused journaling app for capturing photos, moods, daily reflections, AI recaps, and backed-up family memories.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/dadtrack" size="lg" mobileFullWidth>
                Learn More
              </Button>
              <Button
                href={primaryStoreCta.href}
                variant="secondary"
                size="lg"
                mobileFullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                {primaryStoreCta.buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="h-full rounded-2xl border border-[#e8746e]/25 bg-[linear-gradient(145deg,rgba(232,116,110,0.12),rgba(196,86,106,0.08),rgba(15,23,42,0.7))] p-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(196,86,106,0.12)]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-900/40 px-3 py-1.5 text-sm font-semibold text-amber-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              Now in Beta
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">MomTrack</h3>
              <p className="mt-3 text-slate-300 leading-relaxed">
                A mom-focused journaling app for preserving photos, moods, milestones, and reflections. Now available through iOS TestFlight beta.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={MOMTRACK_BETA_CTA.href}
                size="lg"
                mobileFullWidth
                target="_blank"
                rel="noopener noreferrer"
                className="border-[#9e2b3c] bg-[#c4566a] hover:bg-[#9e2b3c]"
              >
                Join the Beta
              </Button>
              <Button href="/momtrack" variant="secondary" size="lg" mobileFullWidth>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Run home page test**

Run:

```bash
pnpm test src/app/page.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit home page update**

Run:

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: show dadtrack and momtrack on home page"
```

---

### Task 6: Feedback App Toggle with Suspense-Safe SSG

**Files:**
- Create: `src/app/feedback/feedbackApp.ts`
- Create: `src/app/feedback/feedbackApp.test.ts`
- Create: `src/app/feedback/FeedbackContent.tsx`
- Modify: `src/app/feedback/page.tsx`
- Create: `src/app/feedback/page.test.tsx`
- Modify: `src/lib/formSubmit.ts`

- [ ] **Step 1: Write failing feedback helper tests**

Create `src/app/feedback/feedbackApp.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import {
  buildFeedbackSubmissionPayload,
  feedbackCopyByApp,
  parseFeedbackAppParam,
} from './feedbackApp';

describe('feedback app helpers', () => {
  it('parses supported app query values and defaults to DadTrack', () => {
    expect(parseFeedbackAppParam(null)).toBe('dadtrack');
    expect(parseFeedbackAppParam('')).toBe('dadtrack');
    expect(parseFeedbackAppParam('dadtrack')).toBe('dadtrack');
    expect(parseFeedbackAppParam('momtrack')).toBe('momtrack');
    expect(parseFeedbackAppParam('unknown')).toBe('dadtrack');
  });

  it('defines dynamic copy for both apps', () => {
    expect(feedbackCopyByApp.dadtrack.subtitle).toBe('Help us build the best dad journaling app');
    expect(feedbackCopyByApp.momtrack.subtitle).toBe('Help us shape MomTrack');
    expect(feedbackCopyByApp.momtrack.submitButtonClass).toContain('from-[#e8746e]');
  });

  it('builds a feedback submission payload with the selected app', () => {
    expect(
      buildFeedbackSubmissionPayload({
        name: 'Ben',
        email: 'ben@example.com',
        comment: 'Beta feedback',
        app: 'momtrack',
      }),
    ).toEqual({
      name: 'Ben',
      email: 'ben@example.com',
      comment: 'Beta feedback',
      type: 'feedback',
      app: 'momtrack',
    });
  });
});
```

- [ ] **Step 2: Write failing feedback page Suspense test**

Create `src/app/feedback/page.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const pendingFeedbackContent = new Promise<never>(() => {});

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('./FeedbackContent', () => ({
  FeedbackContent() {
    throw pendingFeedbackContent;
  },
}));

import FeedbackPage from './page';

describe('Feedback page route shell', () => {
  it('renders a static Suspense fallback when client feedback content suspends', () => {
    const markup = renderToStaticMarkup(<FeedbackPage />);

    expect(markup).toContain('Header');
    expect(markup).toContain('Share Your Feedback');
    expect(markup).toContain('Loading the feedback form');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
pnpm test src/app/feedback/feedbackApp.test.ts src/app/feedback/page.test.tsx
```

Expected: FAIL because helper, client content, and Suspense route shell are not implemented.

- [ ] **Step 4: Add feedback helpers and typed form payload**

Create `src/app/feedback/feedbackApp.ts`:

```ts
export type FeedbackApp = 'dadtrack' | 'momtrack';

export type FeedbackFormData = {
  name: string;
  email: string;
  comment: string;
};

export type FeedbackSubmissionPayload = FeedbackFormData & {
  type: 'feedback';
  app: FeedbackApp;
};

export type FeedbackCopy = {
  subtitle: string;
  body: string;
  submitButtonClass: string;
  activePillClass: string;
  inactivePillClass: string;
};

export const feedbackCopyByApp: Record<FeedbackApp, FeedbackCopy> = {
  dadtrack: {
    subtitle: 'Help us build the best dad journaling app',
    body: 'Your thoughts and ideas shape DadTrack. Whether it is a feature request, bug report, or general feedback, we want to hear from you.',
    submitButtonClass:
      'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]',
    activePillClass: 'bg-teal-500/20 text-teal-200 border-teal-400/50',
    inactivePillClass: 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white',
  },
  momtrack: {
    subtitle: 'Help us shape MomTrack',
    body: 'MomTrack is in beta — your feedback directly shapes what we build.',
    submitButtonClass:
      'bg-gradient-to-r from-[#e8746e] via-[#c4566a] to-[#9e2b3c] hover:from-[#f0837c] hover:via-[#cf6074] hover:to-[#aa3144] shadow-[0_0_20px_rgba(196,86,106,0.3)] hover:shadow-[0_0_30px_rgba(196,86,106,0.5)]',
    activePillClass: 'bg-[#e8746e]/20 text-rose-100 border-[#e8746e]/60',
    inactivePillClass: 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white',
  },
};

export function parseFeedbackAppParam(value: string | null): FeedbackApp {
  return value === 'momtrack' || value === 'dadtrack' ? value : 'dadtrack';
}

export function buildFeedbackSubmissionPayload({
  name,
  email,
  comment,
  app,
}: FeedbackFormData & { app: FeedbackApp }): FeedbackSubmissionPayload {
  return {
    name,
    email,
    comment,
    type: 'feedback',
    app,
  };
}
```

Update `src/lib/formSubmit.ts`:

```ts
export type FormSubmissionPayload = {
  name: string;
  email: string;
  comment?: string;
  platform?: string;
  type?: string;
  app?: 'dadtrack' | 'momtrack';
  [key: string]: string | undefined;
};

export async function submitToGoogleSheet(
  data: FormSubmissionPayload,
): Promise<{ success: boolean; message: string }> {
```

Keep the existing function body unchanged.

- [ ] **Step 5: Split feedback route into Server Component shell and Client Component content**

Replace `src/app/feedback/page.tsx` with:

```tsx
import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { FeedbackContent } from './FeedbackContent';

function FeedbackFallback() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative">
        <section className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 font-medium">
              💬 Share Your Thoughts
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Share Your Feedback
            </h1>
            <p className="text-lg text-slate-400">
              Loading the feedback form
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<FeedbackFallback />}>
      <FeedbackContent />
    </Suspense>
  );
}
```

Create `src/app/feedback/FeedbackContent.tsx` by moving the existing client form UI from `src/app/feedback/page.tsx` and making these exact changes:

```tsx
'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { submitToGoogleSheet } from '@/lib/formSubmit';
import { motion } from 'framer-motion';
import {
  FeedbackApp,
  buildFeedbackSubmissionPayload,
  feedbackCopyByApp,
  parseFeedbackAppParam,
} from './feedbackApp';
```

Add app state and query-param handling:

```tsx
const searchParams = useSearchParams();
const [app, setApp] = useState<FeedbackApp>('dadtrack');
const copy = feedbackCopyByApp[app];

useEffect(() => {
  setApp(parseFeedbackAppParam(searchParams.get('app')));
}, [searchParams]);
```

Update form submission payload:

```tsx
const result = await submitToGoogleSheet(
  buildFeedbackSubmissionPayload({
    name: formData.name,
    email: formData.email,
    comment: formData.comment,
    app,
  }),
);
```

Add the app selector above the `<form>`:

```tsx
<div className="grid grid-cols-2 gap-3" role="tablist" aria-label="Choose app for feedback">
  {(['dadtrack', 'momtrack'] as FeedbackApp[]).map((option) => (
    <button
      key={option}
      type="button"
      onClick={() => setApp(option)}
      className={`rounded-full border px-4 py-3 text-sm font-semibold transition-all ${
        app === option
          ? feedbackCopyByApp[option].activePillClass
          : feedbackCopyByApp[option].inactivePillClass
      }`}
      aria-pressed={app === option}
    >
      {option === 'dadtrack' ? 'DadTrack' : 'MomTrack'}
    </button>
  ))}
</div>
```

Update dynamic copy:

```tsx
<p className="text-xl text-slate-300 font-medium">
  {copy.subtitle}
</p>
<p className="text-lg text-slate-400 leading-relaxed">
  {copy.body}
</p>
```

Update submit button classes:

```tsx
className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
  isSubmitting
    ? 'opacity-50 cursor-not-allowed bg-slate-700'
    : copy.submitButtonClass
}`}
```

- [ ] **Step 6: Run feedback tests**

Run:

```bash
pnpm test src/app/feedback/feedbackApp.test.ts src/app/feedback/page.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit feedback update**

Run:

```bash
git add src/app/feedback/page.tsx src/app/feedback/FeedbackContent.tsx src/app/feedback/feedbackApp.ts src/app/feedback/feedbackApp.test.ts src/app/feedback/page.test.tsx src/lib/formSubmit.ts
git commit -m "feat: support momtrack feedback"
```

---

### Task 7: Full Verification and Static Export Gate

**Files:**
- Verify all changed files.

- [ ] **Step 1: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS with no ESLint errors.

- [ ] **Step 2: Run test suite**

Run:

```bash
pnpm test
```

Expected: PASS for all Vitest files.

- [ ] **Step 3: Run static export build**

Run:

```bash
pnpm build
```

Expected: PASS and Next.js writes the static export to `out/`.

- [ ] **Step 4: Inspect changed files**

Run:

```bash
git status --short
git diff --stat
```

Expected: only the implementation files from this plan are modified or added. `.superpowers/` remains untracked and is not staged.

- [ ] **Step 5: Commit final verification fixes if any were needed**

If Step 1, Step 2, or Step 3 required code fixes, run:

```bash
git add src public docs/superpowers/specs/2026-04-24-site-update-design.md
git commit -m "chore: verify site update static export"
```

If no fixes were needed after Task 6, skip this commit.

---

## Self-Review

Spec coverage:
- Screenshot refresh: Task 1 copies all DadTrack and MomTrack iPhone screenshots and removes old DadTrack screenshot usage through Task 3 and Task 5 tests.
- DadTrack cloud backup copy: Task 1 shared content and Task 3 page update cover hero copy, key-point copy, and feature cards.
- MomTrack route: Task 4 covers page, metadata, schema, palette, beta CTA, feature structure, CTA section, and feedback link.
- Navigation: Task 1 covers `Header`, `MobileMenu`, and `SiteFooter`.
- Home page: Task 5 covers two-card Current Projects layout, primary DadTrack store CTA, MomTrack TestFlight CTA, and new showcase screenshots.
- Feedback page: Task 6 covers app toggle, query-param parsing, Suspense boundary, dynamic copy, and `app` payload.
- Static export: Task 6 avoids dynamic rendering APIs, and Task 7 requires `pnpm build`.

Placeholder scan:
- No prohibited placeholder phrases appear in implementation steps.
- Each code-changing task includes concrete code snippets, exact commands, expected outcomes, and a commit command.

Type consistency:
- `FeedbackApp` is defined in `src/app/feedback/feedbackApp.ts` and used consistently by feedback tests and content.
- `ProductShowcaseThemeClasses` matches the `MobileShowcaseThemeClasses` prop shape.
- `getOddFinalGridItemClass(index, total)` is defined once in `src/lib/productContent.ts` and used by DadTrack and MomTrack.
- `MOMTRACK_TESTFLIGHT_URL` is defined in `src/lib/constants.ts` and reused by MomTrack content/page/schema.
