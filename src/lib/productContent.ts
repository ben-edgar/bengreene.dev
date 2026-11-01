import { MOMTRACK_APP_STORE_URL } from './constants';

export type ProductFeature = {
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: string;
  /** Shipped in the latest release; shown with a "New" tag. */
  isNew?: boolean;
};

export type ProductExtraIconKey =
  | 'mic'
  | 'images'
  | 'users'
  | 'widgets'
  | 'sparkles'
  | 'smile'
  | 'baby'
  | 'bell'
  | 'tablet'
  | 'cloud'
  | 'imageDown'
  | 'fileArchive';

export type ProductExtra = {
  label: string;
  detail: string;
  iconKey: ProductExtraIconKey;
  /** Shipped in the latest release; shown with a "New" tag. */
  isNew?: boolean;
};

export type ProductKeyPoint = {
  title: string;
  description: string;
};

export type ProductComingSoon = {
  title: string;
  summary: string;
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
  /** Cloth color of the hardcover in the Coming soon illustration. */
  bookCloth: string;
  showcaseThemeClasses: ProductShowcaseThemeClasses;
};

type FeatureBlueprint = {
  title: string;
  description: (app: string) => string;
  file: string;
  alt: (app: string) => string;
  icon: string;
  isNew?: boolean;
};

const FEATURE_BLUEPRINTS: FeatureBlueprint[] = [
  {
    title: 'A scrapbook family timeline',
    description: () =>
      'Your days, gathered into monthly chapters on a paper scrapbook, with taped polaroids of your kids up top. Link with your partner to share one family timeline, keep any entry private, and pick Compact, Standard, or Large cards.',
    file: '01-home-feed',
    alt: (app) => `${app} home timeline with taped polaroids of two children, a yearly recap cover, and the December chapter`,
    icon: '\u{1F91D}',
  },
  {
    title: 'Milestone Tracker',
    description: () =>
      'Keep first steps, first snow, and whatever else matters to your family on a shelf of polaroids. It’s a keepsake, not a checklist: nothing expires or goes overdue. Add your own, or let AI find milestones you already wrote about.',
    file: '02-milestone-tracker',
    alt: (app) => `${app} Milestone Tracker showing a shelf of kept moments as captioned polaroids`,
    icon: '\u{1F31F}',
    isNew: true,
  },
  {
    title: 'Scrapbook entry pages',
    description: () =>
      'Every memory opens on its own page, with photos taped up as polaroids and your words on ruled paper. Then scroll down to look back at what you wrote a month, three months, or a year ago.',
    file: '03-journal-entry-detail-magazine',
    alt: (app) => `${app} journal entry shown as a taped polaroid above a ruled note card`,
    icon: '\u{1F5BC}️',
  },
  {
    title: 'A composer built for busy hands',
    description: () =>
      'Write on lined paper, or tap the mic and dictate while you hold your kid. Add up to five taped photos, pick a mood, and choose who it’s for. Anyone you name gets tagged for you when you finish.',
    file: '04-journal-composer',
    alt: (app) => `${app} entry composer with lined paper, a microphone button, a child picker, and a taped photo`,
    icon: '✍️',
  },
  {
    title: 'Monthly recaps',
    description: (app) =>
      `Each month, ${app} writes a scrapbook recap of your journaling: a taped photo collage, stat stamps, the month’s moods, and the story told in order, plus a card you can share.`,
    file: '05-monthly-recap',
    alt: (app) => `${app} monthly recap with a taped photo collage, the month’s theme, and stat stamps`,
    icon: '\u{1F4D6}',
  },
  {
    title: 'Stickers & margin notes',
    description: () =>
      'React to your partner’s entries with illustrated stickers, or leave a note in the margin in one of four handwriting fonts.',
    file: '06-partner-entry',
    alt: (app) => `${app} partner’s entry with sticker reactions on the photo and a handwritten margin note`,
    icon: '\u{1F48C}',
    isNew: true,
  },
  {
    title: 'Streaks, freezes & celebrations',
    description: () =>
      'Every seven days you journal earns a streak freeze, so one missed day doesn’t undo your streak. Reach 7, 30, or 100 days and a taped keepsake card celebrates with paper confetti.',
    file: '07-streak',
    alt: (app) => `${app} streak celebration card for 30 days in a row, with paper confetti`,
    icon: '\u{1F525}',
    isNew: true,
  },
  {
    title: 'Find a memory',
    description: () =>
      'Type a few words to pull up every entry that mentions them, then narrow the book by child, mood, person, date, or which of you wrote it.',
    file: '08-search',
    alt: (app) => `${app} search results for a word chip, showing a matching entry from December`,
    icon: '\u{1F50D}',
  },
];

function buildFeatures(app: string, directory: string): ProductFeature[] {
  return FEATURE_BLUEPRINTS.map((blueprint) => ({
    title: blueprint.title,
    description: blueprint.description(app),
    image: `/images/${directory}/${blueprint.file}.webp`,
    alt: blueprint.alt(app),
    icon: blueprint.icon,
    ...(blueprint.isNew ? { isNew: true } : {}),
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
    label: 'Up to 5 photos an entry',
    detail: 'Drag to reorder, high quality by default.',
    iconKey: 'images',
  },
  {
    label: 'People & groups',
    detail: 'Tag who was there. Anyone you name gets tagged automatically.',
    iconKey: 'users',
  },
  {
    label: 'Home screen widgets',
    detail: 'A photo from this day in an earlier year, and your streak at a glance.',
    iconKey: 'widgets',
    isNew: true,
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
    label: 'Made for iPad, too',
    detail: 'Roomier two-column layouts on iPad and tablets.',
    iconKey: 'tablet',
    isNew: true,
  },
  {
    label: 'Cloud backup & sync',
    detail: 'Optional, and restores everything on a new phone.',
    iconKey: 'cloud',
  },
  {
    label: 'Save photos to your library',
    detail: 'Full-resolution journal and recap photos, straight to your camera roll.',
    iconKey: 'imageDown',
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
    alt: 'DadTrack scrapbook family timeline',
    title: 'Scrapbook Family Timeline',
    description: 'Monthly chapters on a paper scrapbook, shared with your partner, with per-entry privacy.',
  },
  {
    src: '/images/dadtrack/02-milestone-tracker.webp',
    alt: 'DadTrack Milestone Tracker shelf of kept moments',
    title: 'Milestone Tracker',
    description: 'A shelf of polaroids for the firsts that matter to your family. A keepsake, not a checklist.',
  },
  {
    src: '/images/dadtrack/05-monthly-recap.webp',
    alt: 'DadTrack monthly AI recap',
    title: 'Monthly AI Recaps',
    description: 'A scrapbook recap of every month, with a photo collage, stat stamps, and shareable cards.',
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
      'Local-first with no ads and no tracking. AI stays off until you turn it on, and it only ever sees your text, never your photos. Cloud sync and partner sharing are there when you want them.',
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
      'Local-first with no ads and no tracking. AI stays off until you turn it on, and it only ever sees your text, never your photos. Cloud sync and partner sharing are there when you want them.',
  },
];

export const PRODUCT_COMING_SOON: ProductComingSoon = {
  title: 'Yearbooks',
  summary: 'Turn a year of your journal into a printed hardcover book.',
  items: [
    'One child’s year or the whole family’s, laid out by AI from your own entries, photos, and milestones. AI looks at your photos only if you say yes.',
    'A short intro for each month and captions on your photos, with a choice of more words or mostly photos.',
    'Preview every page, swap a photo, adjust a crop, or edit a caption before it’s final.',
    'Download print-ready files and order an 8.5 × 11 inch hardcover from Lulu. Making the book is free.',
  ],
};

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
  bookCloth: 'bg-[#1d3c4a]',
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
  bookCloth: 'bg-[#6e2a3a]',
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
