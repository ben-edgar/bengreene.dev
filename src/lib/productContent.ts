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
