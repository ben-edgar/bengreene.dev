import { MOMTRACK_APP_STORE_URL } from './constants';

export type ProductFeature = {
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: string;
};

export type ProductExtraIconKey =
  | 'mic'
  | 'images'
  | 'users'
  | 'imageDown'
  | 'sparkles'
  | 'smile'
  | 'baby'
  | 'bell'
  | 'fileArchive';

export type ProductExtra = {
  label: string;
  detail: string;
  iconKey: ProductExtraIconKey;
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
  /** Accent rule / dot fill on the dark shell. */
  accentRule: string;
  /** Accent ring for the download panel on the dark shell. */
  accentRing: string;
  /** Focus ring class for controls on the dark shell. */
  darkFocusRing: string;
  /** Accent text that passes contrast on the cream paper sheet. */
  paperAccentText: string;
  /** Soft accent chip fill on the cream paper sheet. */
  paperAccentBg: string;
  /** Solid accent fill (dots, rules) on the cream paper sheet. */
  paperAccentSolid: string;
  /** Focus ring class for controls on the cream paper sheet. */
  paperFocusRing: string;
  /** Soft accent glow behind the hero phones. */
  phoneGlow: string;
  showcaseThemeClasses: ProductShowcaseThemeClasses;
};

type FeatureBlueprint = {
  title: string;
  description: (app: string) => string;
  file: string;
  alt: (app: string) => string;
  icon: string;
};

const FEATURE_BLUEPRINTS: FeatureBlueprint[] = [
  {
    title: 'Shared family timeline',
    description: () =>
      'Link with your partner and see each other’s entries in one threaded family timeline, with per-entry privacy. Your AI tip of the day sits at the top, and a compact, comfortable, or showcase density toggle lets you read it your way.',
    file: '01-home-feed',
    alt: (app) => `${app} home feed showing the shared family timeline with the tip of the day at the top`,
    icon: '\u{1F91D}',
  },
  {
    title: 'A composer built for busy hands',
    description: () =>
      'Photos, moods, people, and sharing each fold into their own card, with quick picks for the moods and people you tag most. Dictate hands-free, and anyone you name while writing gets tagged for you when you finish.',
    file: '02-journal-composer',
    alt: (app) => `${app} journal composer with photo, mood, people, and sharing cards`,
    icon: '✍️',
  },
  {
    title: 'Monthly AI recaps',
    description: (app) =>
      `Each month, ${app} writes an editorial, photo-forward recap of your journaling, with live stats, mood of the month, a tappable calendar, and shareable recap cards. Synced across all your devices.`,
    file: '03-monthly-recap',
    alt: (app) => `${app} monthly recap with live stats, mood of the month, and a tappable calendar`,
    icon: '\u{1F4D6}',
  },
  {
    title: 'Editorial journal entries',
    description: () =>
      'Open any memory in a clean editorial layout: photo carousel, mood chip, age, and a Time Travel panel that resurfaces entries from a month, three months, or a year ago right inside the detail view.',
    file: '04-journal-entry-detail',
    alt: (app) => `${app} journal entry detail with a photo carousel, mood chip, and Time Travel panel`,
    icon: '\u{1F4DD}',
  },
  {
    title: 'Scrapbook mode',
    description: () =>
      'Flip any entry into a swipeable, polaroid-style scrapbook layout made for reliving the moment. Full screen, tap to navigate, and beautifully cinematic.',
    file: '05-journal-entry-detail-magazine',
    alt: (app) => `${app} scrapbook mode showing an entry as a full-screen polaroid spread`,
    icon: '\u{1F5BC}️',
  },
  {
    title: 'Advanced search',
    description: () =>
      'Find any memory instantly by text, date range, mood, child, or photo, and now by person or group to pull up every memory someone was part of.',
    file: '06-search',
    alt: (app) => `${app} advanced search filtering memories by text, mood, child, and person`,
    icon: '\u{1F50D}',
  },
  {
    title: 'Streaks & celebrations',
    description: () =>
      'Build a consistent memory-keeping habit with per-child and family streak tracking. Hit milestones at 1, 7, 30, 100+ days and true monthly anniversaries, and watch the confetti fly.',
    file: '07-streak',
    alt: (app) => `${app} streak screen celebrating a memory-keeping milestone`,
    icon: '\u{1F525}',
  },
  {
    title: 'Cloud backup & sync',
    description: () =>
      'Optional cloud backup protects your memories and restores everything on a new phone. Save full-resolution photos to your library, free up space locally, and export a complete backup anytime.',
    file: '08-cloud-all-synced',
    alt: (app) => `${app} cloud backup screen showing every memory synced`,
    icon: '☁️',
  },
];

function buildFeatures(app: string, directory: string): ProductFeature[] {
  return FEATURE_BLUEPRINTS.map((blueprint) => ({
    title: blueprint.title,
    description: blueprint.description(app),
    image: `/images/${directory}/${blueprint.file}.webp`,
    alt: blueprint.alt(app),
    icon: blueprint.icon,
  }));
}

export const DADTRACK_FEATURES: ProductFeature[] = buildFeatures('DadTrack', 'dadtrack');

export const MOMTRACK_FEATURES: ProductFeature[] = buildFeatures('MomTrack', 'momtrack');

export const PRODUCT_EXTRAS: ProductExtra[] = [
  {
    label: 'Voice-to-text',
    detail: 'Journal hands-free while holding your kid.',
    iconKey: 'mic',
  },
  {
    label: 'Up to 5 photos a day',
    detail: 'Drag-and-drop reordering, high quality by default.',
    iconKey: 'images',
  },
  {
    label: 'People & groups',
    detail: 'Tag who was there. Anyone you name gets tagged automatically.',
    iconKey: 'users',
  },
  {
    label: 'Save photos to your library',
    detail: 'Full-resolution journal and recap photos, straight to your camera roll.',
    iconKey: 'imageDown',
  },
  {
    label: 'Daily tips',
    detail: 'Personalized to your own entries, with history and favorites.',
    iconKey: 'sparkles',
  },
  {
    label: 'Custom moods',
    detail: 'Track how you’re feeling with tags you define.',
    iconKey: 'smile',
  },
  {
    label: 'Multiple kids',
    detail: 'Per-child and family streaks and timelines.',
    iconKey: 'baby',
  },
  {
    label: 'Smart reminders',
    detail: 'Photo prompts during your together-time windows.',
    iconKey: 'bell',
  },
  {
    label: 'Export anytime',
    detail: 'Complete backups to portable .dtb files.',
    iconKey: 'fileArchive',
  },
];

export const DADTRACK_HOME_SHOWCASE_SCREENSHOTS: ShowcaseScreenshot[] = [
  {
    src: '/images/dadtrack/01-home-feed.webp',
    alt: 'DadTrack shared family timeline',
    title: 'Shared Family Timeline',
    description: 'Journal together — link with your partner for a shared family view with per-entry privacy.',
  },
  {
    src: '/images/dadtrack/05-journal-entry-detail-magazine.webp',
    alt: 'DadTrack magazine scrapbook mode',
    title: 'Scrapbook Mode',
    description: 'Flip any entry into a cinematic scrapbook polaroid layout made for reliving the moment.',
  },
  {
    src: '/images/dadtrack/03-monthly-recap.webp',
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
    milestone: 'Milestone tracker',
    items: [
      'Capture first steps, first snow, whatever matters to your family',
      'A keepsake, not a checklist: nothing expires or goes overdue',
      'Shareable keepsake cards and milestone badges on entries',
    ],
  },
  {
    milestone: 'Streak freezes',
    items: [
      'Earn a shared freeze every 7 journaled days, up to 3 saved',
      'A missed day spends a freeze instead of resetting your streak',
      "Journaling about one child protects every sibling's streak",
    ],
  },
  {
    milestone: 'Smarter recaps',
    items: [
      'Recaps read your custom moods by name',
      'Upgraded recap model for more grounded storytelling',
      "Milestones you captured feed that month's recap",
    ],
  },
  {
    milestone: 'A refreshed look',
    items: [
      'Settings, Profile, People, Moods, and Tip history redesigned',
      'Serif mastheads and paper cards to match the journal',
      'Partners are prompted to add a child the other partner added',
    ],
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
  accentRule: 'bg-teal-400',
  accentRing: 'ring-teal-400/20',
  darkFocusRing: 'focus-visible:ring-teal-400/70',
  paperAccentText: 'text-teal-700',
  paperAccentBg: 'bg-teal-600/10',
  paperAccentSolid: 'bg-teal-700',
  paperFocusRing: 'focus-visible:ring-teal-700',
  phoneGlow: 'bg-teal-400/25',
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
  accentRule: 'bg-[#e8746e]',
  accentRing: 'ring-[#e8746e]/20',
  darkFocusRing: 'focus-visible:ring-[#e8746e]/70',
  paperAccentText: 'text-[#9e2b3c]',
  paperAccentBg: 'bg-[#e8746e]/15',
  paperAccentSolid: 'bg-[#9e2b3c]',
  paperFocusRing: 'focus-visible:ring-[#9e2b3c]',
  phoneGlow: 'bg-[#e8746e]/25',
  showcaseThemeClasses: {
    text: 'text-[#e8746e]',
    indicatorActive: 'bg-gradient-to-r from-[#e8746e] to-[#9e2b3c]',
    primaryGlow: 'bg-rose-500/20',
    secondaryGlow: 'bg-red-700/20',
    backgroundPrimaryGlow: 'bg-rose-500/5',
    backgroundSecondaryGlow: 'bg-red-700/5',
  },
};

export const MOMTRACK_DOWNLOAD_CTA = {
  label: 'Download MomTrack on the App Store',
  href: MOMTRACK_APP_STORE_URL,
};
