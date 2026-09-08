import { describe, expect, it } from 'vitest';

import {
  DADTRACK_FEATURES,
  DADTRACK_HOME_SHOWCASE_SCREENSHOTS,
  DADTRACK_KEY_POINTS,
  DADTRACK_PAGE_THEME,
  MOMTRACK_FEATURES,
  MOMTRACK_KEY_POINTS,
  MOMTRACK_PAGE_THEME,
  PRODUCT_EXTRAS,
  PRODUCT_ROADMAP,
} from './productContent';
import * as constants from './constants';
import * as productContent from './productContent';

const FEATURE_TITLES = [
  'Shared family timeline',
  'A composer built for busy hands',
  'Monthly AI recaps',
  'Editorial journal entries',
  'Scrapbook mode',
  'Advanced search',
  'Streaks & celebrations',
  'Cloud backup & sync',
];

const SCREENSHOT_FILES = [
  '01-home-feed',
  '02-journal-composer',
  '03-monthly-recap',
  '04-journal-entry-detail',
  '05-journal-entry-detail-magazine',
  '06-search',
  '07-streak',
  '08-cloud-all-synced',
];

describe('product content', () => {
  it('defines the MomTrack App Store URL', () => {
    expect(constants.MOMTRACK_APP_STORE_URL).toBe(
      'https://apps.apple.com/us/app/momtrack-parenting-journal/id6758920295',
    );
  });

  it('uses eight DadTrack features with the refreshed webp screenshots', () => {
    expect(DADTRACK_FEATURES.map((feature) => feature.title)).toEqual(FEATURE_TITLES);
    expect(DADTRACK_FEATURES.map((feature) => feature.image)).toEqual(
      SCREENSHOT_FILES.map((file) => `/images/dadtrack/${file}.webp`),
    );
    expect(DADTRACK_FEATURES[2].description).toContain('DadTrack writes an editorial');
  });

  it('gives every feature descriptive alt text', () => {
    for (const feature of DADTRACK_FEATURES) {
      expect(feature.alt).toContain('DadTrack');
      expect(feature.alt.length).toBeGreaterThan(20);
    }
    for (const feature of MOMTRACK_FEATURES) {
      expect(feature.alt).toContain('MomTrack');
    }
  });

  it('uses eight MomTrack features with MomTrack asset paths', () => {
    expect(MOMTRACK_FEATURES).toHaveLength(8);
    expect(MOMTRACK_FEATURES.map((feature) => feature.image)).toEqual(
      SCREENSHOT_FILES.map((file) => `/images/momtrack/${file}.webp`),
    );
    expect(MOMTRACK_FEATURES[2].description).toContain('MomTrack writes an editorial');
    expect(MOMTRACK_FEATURES[7].title).toBe('Cloud backup & sync');
  });

  it('no longer references the retired PNG screenshots', () => {
    const allImages = [...DADTRACK_FEATURES, ...MOMTRACK_FEATURES].map((feature) => feature.image);

    expect(allImages.some((image) => image.endsWith('.png'))).toBe(false);
    expect(allImages.some((image) => image.includes('cloud-pending'))).toBe(false);
  });

  it('defines the three DadTrack home showcase screenshots', () => {
    expect(DADTRACK_HOME_SHOWCASE_SCREENSHOTS.map((screenshot) => screenshot.src)).toEqual([
      '/images/dadtrack/01-home-feed.webp',
      '/images/dadtrack/05-journal-entry-detail-magazine.webp',
      '/images/dadtrack/03-monthly-recap.webp',
    ]);
  });

  it('lists nine shipped extras without any beta-only features', () => {
    expect(PRODUCT_EXTRAS).toHaveLength(9);
    expect(PRODUCT_EXTRAS.map((extra) => extra.label)).toEqual([
      'Voice-to-text',
      'Up to 5 photos a day',
      'People & groups',
      'Save photos to your library',
      'Daily tips',
      'Custom moods',
      'Multiple kids',
      'Smart reminders',
      'Export anytime',
    ]);
    expect(PRODUCT_EXTRAS.every((extra) => extra.detail.length > 0)).toBe(true);
    expect(new Set(PRODUCT_EXTRAS.map((extra) => extra.iconKey)).size).toBe(9);
  });

  it('keeps the beta roadmap shared for both product pages', () => {
    expect(PRODUCT_ROADMAP).toHaveLength(4);
    expect(PRODUCT_ROADMAP.map((section) => section.milestone)).toEqual([
      'Milestone tracker',
      'Streak freezes',
      'Smarter recaps',
      'A refreshed look',
    ]);
    expect(PRODUCT_ROADMAP[1].items).toContain(
      'Earn a shared freeze every 7 journaled days, up to 3 saved',
    );
  });

  it('defines DadTrack key points with the private-by-default copy', () => {
    expect(DADTRACK_KEY_POINTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Private by Default',
          description: expect.stringContaining('Local-first with no ads, no tracking'),
        }),
      ]),
    );
  });

  it('defines MomTrack key points with mom-focused and private-by-default positioning', () => {
    expect(MOMTRACK_KEY_POINTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Mom-Focused',
        }),
        expect.objectContaining({
          title: 'Private by Default',
          description: expect.stringContaining('AI that only ever sees your text'),
        }),
      ]),
    );
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

  it('defines literal Tailwind classes for the DadTrack showcase theme', () => {
    expect(DADTRACK_PAGE_THEME.showcaseThemeClasses).toEqual({
      text: 'text-teal-400',
      indicatorActive: 'bg-gradient-to-r from-teal-400 to-blue-500',
      primaryGlow: 'bg-teal-500/20',
      secondaryGlow: 'bg-purple-500/20',
      backgroundPrimaryGlow: 'bg-teal-500/5',
      backgroundSecondaryGlow: 'bg-purple-500/5',
    });
  });

  it('defines literal paper-sheet accent classes for both themes', () => {
    expect(DADTRACK_PAGE_THEME.paperAccentText).toBe('text-teal-700');
    expect(DADTRACK_PAGE_THEME.phoneGlow).toBe('bg-teal-400/25');
    expect(MOMTRACK_PAGE_THEME.paperAccentText).toBe('text-[#9e2b3c]');
    expect(MOMTRACK_PAGE_THEME.phoneGlow).toBe('bg-[#e8746e]/25');
  });

  it('no longer exports the retired odd-grid helper', () => {
    expect('getOddFinalGridItemClass' in productContent).toBe(false);
  });

  it('defines the MomTrack download CTA using the App Store URL', () => {
    expect(productContent.MOMTRACK_DOWNLOAD_CTA).toEqual({
      label: 'Download MomTrack on the App Store',
      href: constants.MOMTRACK_APP_STORE_URL,
    });
  });
});
