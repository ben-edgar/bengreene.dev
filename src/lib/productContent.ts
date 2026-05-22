import { MOMTRACK_APP_STORE_URL } from './constants';

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
    title: 'Shared Family Timeline',
    description:
      'Link with your partner to see each other\'s entries in one threaded family timeline, with per-entry privacy controls. Your AI tip of the day lives right at the top, and a Compact/Comfortable/Showcase density toggle lets you view it your way.',
    image: '/images/dadtrack/01-home-feed.png',
    icon: '🤝',
  },
  {
    title: 'Monthly AI Recaps',
    description:
      'Each month, DadTrack generates an editorial, photo-forward narrative summary of your journaling journey — with live stats, mood-of-the-month, a tappable calendar, and shareable recap cards. Synced across all your devices.',
    image: '/images/dadtrack/02-monthly-recap.png',
    icon: '📖',
  },
  {
    title: 'Editorial Journal Entries',
    description:
      'Open any memory in a clean editorial layout — photo carousel, mood chip, age, and a Time Travel panel that resurfaces entries from a month, three months, or a year ago right inside the detail view.',
    image: '/images/dadtrack/03-journal-entry-detail.png',
    icon: '📝',
  },
  {
    title: 'Magazine / Scrapbook Mode',
    description:
      'Flip any entry into a swipeable scrapbook-style polaroid layout made for reliving the moment. Full-screen, tap-to-navigate, and beautifully cinematic.',
    image: '/images/dadtrack/04-journal-entry-detail-magazine.png',
    icon: '🖼️',
  },
  {
    title: 'Advanced Search',
    description:
      'Find any memory instantly by searching text, date ranges, mood tags, children, or photo-backed entries.',
    image: '/images/dadtrack/05-search.png',
    icon: '🔍',
  },
  {
    title: 'Streaks & Celebrations',
    description:
      'Build a consistent memory-keeping habit with per-child and family streak tracking. Hit milestones at 1, 7, 30, 100+ days and watch the confetti fly.',
    image: '/images/dadtrack/06-streak.png',
    icon: '🔥',
  },
  {
    title: 'Cloud Backup & Sync',
    description:
      'Optional cloud backup protects your memories and gives you a clear view of pending sync progress — so you always know your moments are safe.',
    image: '/images/dadtrack/07-cloud-pending.png',
    icon: '☁️',
  },
  {
    title: 'Restore & Free Up Space',
    description:
      'Restore everything on a new device, sync across devices, save full-res photos to your library, and export a complete backup anytime.',
    image: '/images/dadtrack/08-cloud-all-synced.png',
    icon: '✅',
  },
];

export const MOMTRACK_FEATURES: ProductFeature[] = [
  {
    title: 'Shared Family Timeline',
    description:
      'Link with your partner to see each other\'s entries in one threaded family timeline, with per-entry privacy controls. Your AI tip of the day lives right at the top, and a Compact/Comfortable/Showcase density toggle lets you view it your way.',
    image: '/images/momtrack/01-home-feed.png',
    icon: '🤝',
  },
  {
    title: 'Monthly AI Recaps',
    description:
      'Each month, MomTrack generates an editorial, photo-forward narrative summary of your journaling journey — with live stats, mood-of-the-month, a tappable calendar, and shareable recap cards. Synced across all your devices.',
    image: '/images/momtrack/02-monthly-recap.png',
    icon: '📖',
  },
  {
    title: 'Editorial Journal Entries',
    description:
      'Open any memory in a clean editorial layout — photo carousel, mood chip, age, and a Time Travel panel that resurfaces entries from a month, three months, or a year ago right inside the detail view.',
    image: '/images/momtrack/03-journal-entry-detail.png',
    icon: '📝',
  },
  {
    title: 'Magazine / Scrapbook Mode',
    description:
      'Flip any entry into a swipeable scrapbook-style polaroid layout made for reliving the moment. Full-screen, tap-to-navigate, and beautifully cinematic.',
    image: '/images/momtrack/04-journal-entry-detail-magazine.png',
    icon: '🖼️',
  },
  {
    title: 'Advanced Search',
    description:
      'Find any memory instantly by searching text, date ranges, mood tags, children, or photo-backed entries.',
    image: '/images/momtrack/05-search.png',
    icon: '🔍',
  },
  {
    title: 'Streaks & Celebrations',
    description:
      'Build a consistent memory-keeping habit with per-child and family streak tracking. Hit milestones at 1, 7, 30, 100+ days and watch the confetti fly.',
    image: '/images/momtrack/06-streak.png',
    icon: '🔥',
  },
  {
    title: 'Cloud Backup & Sync',
    description:
      'Optional cloud backup protects your memories and gives you a clear view of pending sync progress — so you always know your moments are safe.',
    image: '/images/momtrack/07-cloud-pending.png',
    icon: '☁️',
  },
  {
    title: 'Restore & Free Up Space',
    description:
      'Restore everything on a new device, sync across devices, save full-res photos to your library, and export a complete backup anytime.',
    image: '/images/momtrack/08-cloud-all-synced.png',
    icon: '✅',
  },
];

export const DADTRACK_HOME_SHOWCASE_SCREENSHOTS: ShowcaseScreenshot[] = [
  {
    src: '/images/dadtrack/01-home-feed.png',
    alt: 'DadTrack shared family timeline',
    title: 'Shared Family Timeline',
    description: 'Journal together — link with your partner for a shared family view with per-entry privacy.',
  },
  {
    src: '/images/dadtrack/04-journal-entry-detail-magazine.png',
    alt: 'DadTrack magazine scrapbook mode',
    title: 'Magazine / Scrapbook Mode',
    description: 'Flip any entry into a cinematic polaroid layout made for reliving the moment.',
  },
  {
    src: '/images/dadtrack/02-monthly-recap.png',
    alt: 'DadTrack monthly AI recap',
    title: 'Monthly AI Recaps',
    description: 'Beautiful editorial summaries of your journaling journey, shareable and synced across devices.',
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
    title: 'Private by Default',
    description:
      'Local-first with no ads, no tracking, and AI that only ever sees your text — never your photos. Optional cloud sync and partner sharing when you want them.',
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
    title: 'Private by Default',
    description:
      'Local-first with no ads, no tracking, and AI that only ever sees your text — never your photos. Optional cloud sync and partner sharing when you want them.',
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
    items: ['"On This Day" daily memory resurfacing', 'Year-in-review collages', 'Memory-book PDF export'],
  },
  {
    milestone: 'Home-Screen Widget & Quick Capture',
    items: ['Home-screen widget for a daily memory peek', 'Quick entry mode for one-tap journaling', 'Smart journal prompts to spark reflection'],
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

export const MOMTRACK_DOWNLOAD_CTA = {
  label: 'Download MomTrack on the App Store',
  href: MOMTRACK_APP_STORE_URL,
};
