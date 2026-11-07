import { MOMTRACK_APP_STORE_URL } from './constants';

export type ProductFeature = {
  title: string;
  description: string;
  image: string;
  alt: string;
  iconKey: ProductFeatureIconKey;
  /** Shipped in the latest release; shown with a "New" tag. */
  isNew?: boolean;
};

export type ProductFeatureIconKey =
  | 'timeline'
  | 'milestone'
  | 'entry'
  | 'composer'
  | 'recap'
  | 'stickers'
  | 'streak'
  | 'search';

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

export type ProductPageTheme = {
  /** Which cloth and accents the page wears. See globals.css. */
  brand: 'dadtrack' | 'momtrack';
  /** Cloth color of the hardcover in the Coming soon illustration. */
  bookCloth: string;
};

type FeatureBlueprint = {
  title: string;
  description: (app: string) => string;
  file: string;
  alt: (app: string) => string;
  iconKey: ProductFeatureIconKey;
  isNew?: boolean;
};

const FEATURE_BLUEPRINTS: FeatureBlueprint[] = [
  {
    title: 'A scrapbook family timeline',
    description: () =>
      'Your days, gathered into monthly chapters on a paper scrapbook, with taped polaroids of your kids up top. Link with your partner to share one family timeline, keep any entry private, and pick Compact, Standard, or Large cards.',
    file: '01-home-feed',
    alt: (app) => `${app} home timeline with taped polaroids of two children, a yearly recap cover, and the December chapter`,
    iconKey: 'timeline',
  },
  {
    title: 'Milestone Tracker',
    description: () =>
      'Keep first steps, first snow, and whatever else matters to your family on a shelf of polaroids. It’s a keepsake, not a checklist: nothing expires or goes overdue. Add your own, or let AI find milestones you already wrote about.',
    file: '02-milestone-tracker',
    alt: (app) => `${app} Milestone Tracker showing a shelf of kept moments as captioned polaroids`,
    iconKey: 'milestone',
    isNew: true,
  },
  {
    title: 'Scrapbook entry pages',
    description: () =>
      'Every memory opens on its own page, with photos taped up as polaroids and your words on ruled paper. Then scroll down to look back at what you wrote a month, three months, or a year ago.',
    file: '03-journal-entry-detail-magazine',
    alt: (app) => `${app} journal entry shown as a taped polaroid above a ruled note card`,
    iconKey: 'entry',
  },
  {
    title: 'A composer built for busy hands',
    description: () =>
      'Write on lined paper, or tap the mic and dictate while you hold your kid. Add up to five taped photos, pick a mood, and choose who it’s for. Anyone you name gets tagged for you when you finish.',
    file: '04-journal-composer',
    alt: (app) => `${app} entry composer with lined paper, a microphone button, a child picker, and a taped photo`,
    iconKey: 'composer',
  },
  {
    title: 'Monthly recaps',
    description: (app) =>
      `Each month, ${app} writes a scrapbook recap of your journaling: a taped photo collage, stat stamps, the month’s moods, and the story told in order, plus a card you can share.`,
    file: '05-monthly-recap',
    alt: (app) => `${app} monthly recap with a taped photo collage, the month’s theme, and stat stamps`,
    iconKey: 'recap',
  },
  {
    title: 'Stickers & margin notes',
    description: () =>
      'React to your partner’s entries with illustrated stickers, or leave a note in the margin in one of four handwriting fonts.',
    file: '06-partner-entry',
    alt: (app) => `${app} partner’s entry with sticker reactions on the photo and a handwritten margin note`,
    iconKey: 'stickers',
    isNew: true,
  },
  {
    title: 'Streaks, freezes & celebrations',
    description: () =>
      'Every seven days you journal earns a streak freeze, so one missed day doesn’t undo your streak. Reach 7, 30, or 100 days and a taped keepsake card celebrates with paper confetti.',
    file: '07-streak',
    alt: (app) => `${app} streak celebration card for 30 days in a row, with paper confetti`,
    iconKey: 'streak',
    isNew: true,
  },
  {
    title: 'Find a memory',
    description: () =>
      'Type a few words to pull up every entry that mentions them, then narrow the book by child, mood, person, date, or which of you wrote it.',
    file: '08-search',
    alt: (app) => `${app} search results for a word chip, showing a matching entry from December`,
    iconKey: 'search',
  },
];

function buildFeatures(app: string, directory: string): ProductFeature[] {
  return FEATURE_BLUEPRINTS.map((blueprint) => ({
    title: blueprint.title,
    description: blueprint.description(app),
    image: `/images/${directory}/${blueprint.file}.webp`,
    alt: blueprint.alt(app),
    iconKey: blueprint.iconKey,
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

export const DADTRACK_KEY_POINTS: ProductKeyPoint[] = [
  {
    title: 'Dad-focused',
    description: 'Built for dads, by a dad. Speaks in your voice and emphasizes bonding and memory-keeping.',
  },
  {
    title: 'Low effort, high impact',
    description: 'Snap a photo, dictate with voice, jot a feeling. Over time, build a rich memory archive effortlessly.',
  },
  {
    title: 'Private by default',
    description:
      'Local-first with no ads and no tracking. AI stays off until you turn it on, and it only ever sees your text, never your photos. Cloud sync and partner sharing are there when you want them.',
  },
];

export const MOMTRACK_KEY_POINTS: ProductKeyPoint[] = [
  {
    title: 'Mom-focused',
    description:
      'Built by a dad for his wife, and for moms everywhere. Speaks in your voice and emphasizes bonding and memory-keeping.',
  },
  {
    title: 'Low effort, high impact',
    description: 'Snap a photo, dictate with voice, jot a feeling. Over time, build a rich memory archive effortlessly.',
  },
  {
    title: 'Private by default',
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
  brand: 'dadtrack',
  bookCloth: 'bg-[#1d3c4a]',
};

export const MOMTRACK_PAGE_THEME: ProductPageTheme = {
  brand: 'momtrack',
  bookCloth: 'bg-[#6e2a3a]',
};

export const MOMTRACK_STORE_CTA = {
  key: 'ios',
  href: MOMTRACK_APP_STORE_URL,
  // Leads with the visible text, so voice control users can say what they see.
  buttonLabel: 'Download on the App Store: MomTrack',
  badgeLead: 'Download on the',
  badgeName: 'App Store',
} as const;
