import { describe, expect, it } from 'vitest';

import {
  DADTRACK_FEATURES,
  DADTRACK_KEY_POINTS,
  DADTRACK_PAGE_THEME,
  MOMTRACK_FEATURES,
  MOMTRACK_KEY_POINTS,
  MOMTRACK_PAGE_THEME,
  PRODUCT_EXTRAS,
  PRODUCT_COMING_SOON,
} from './productContent';
import * as constants from './constants';
import * as productContent from './productContent';

const FEATURE_TITLES = [
  'A scrapbook family timeline',
  'Milestone Tracker',
  'Scrapbook entry pages',
  'A composer built for busy hands',
  'Monthly recaps',
  'Stickers & margin notes',
  'Streaks, freezes & celebrations',
  'Find a memory',
];

const SCREENSHOT_FILES = [
  '01-home-feed',
  '02-milestone-tracker',
  '03-journal-entry-detail-magazine',
  '04-journal-composer',
  '05-monthly-recap',
  '06-partner-entry',
  '07-streak',
  '08-search',
];

const RETIRED_SCREENSHOT_FILES = [
  '02-journal-composer',
  '03-monthly-recap',
  '04-journal-entry-detail',
  '05-journal-entry-detail-magazine',
  '06-search',
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
    expect(DADTRACK_FEATURES[4].description).toContain('DadTrack writes a scrapbook recap');
  });

  it('only claims what every user of the public 1.4 build can see', () => {
    for (const features of [DADTRACK_FEATURES, MOMTRACK_FEATURES]) {
      const recap = features.find((feature) => feature.image.endsWith('05-monthly-recap.webp'));
      const stickers = features.find((feature) => feature.image.endsWith('06-partner-entry.webp'));
      // The yearly recap's automatic trigger is off in release builds.
      expect(`${recap?.title} ${recap?.description}`).not.toMatch(/yearly/i);
      // Partner notifications are not yet delivered on iOS.
      expect(stickers?.description).not.toMatch(/notif/i);
    }
  });

  it('flags the headline 1.4 features as new', () => {
    const newTitles = (features: typeof DADTRACK_FEATURES) =>
      features.filter((feature) => feature.isNew).map((feature) => feature.title);
    const expected = ['Milestone Tracker', 'Stickers & margin notes', 'Streaks, freezes & celebrations'];

    expect(newTitles(DADTRACK_FEATURES)).toEqual(expected);
    expect(newTitles(MOMTRACK_FEATURES)).toEqual(expected);
    // Non-new features omit the key entirely.
    expect('isNew' in DADTRACK_FEATURES[7]).toBe(false);
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
    expect(MOMTRACK_FEATURES.map((feature) => feature.title)).toEqual(FEATURE_TITLES);
    expect(MOMTRACK_FEATURES[4].description).toContain('MomTrack writes a scrapbook recap');
  });

  it('no longer references the retired PNG screenshots', () => {
    const allImages = [...DADTRACK_FEATURES, ...MOMTRACK_FEATURES].map((feature) => feature.image);

    expect(allImages.some((image) => image.endsWith('.png'))).toBe(false);
    expect(allImages.some((image) => image.includes('cloud-pending'))).toBe(false);
  });

  it('does not reference the retired 1.3 screenshot files', () => {
    const allImages = [
      ...DADTRACK_FEATURES,
      ...MOMTRACK_FEATURES,
    ].map((entry) => entry.image);

    for (const file of RETIRED_SCREENSHOT_FILES) {
      expect(allImages.some((image) => image.endsWith(`/${file}.webp`))).toBe(false);
    }
  });

  it('lists twelve extras, flagging only widgets and iPad support as new', () => {
    expect(PRODUCT_EXTRAS).toHaveLength(12);
    expect(PRODUCT_EXTRAS.map((extra) => extra.label)).toEqual([
      'Voice-to-text',
      'Up to 5 photos an entry',
      'People & groups',
      'Home screen widgets',
      'Daily tips',
      'Custom moods',
      'Multiple kids',
      'Smart reminders',
      'Made for iPad, too',
      'Cloud backup & sync',
      'Save photos to your library',
      'Export anytime',
    ]);
    expect(PRODUCT_EXTRAS.every((extra) => extra.detail.length > 0)).toBe(true);
    expect(new Set(PRODUCT_EXTRAS.map((extra) => extra.iconKey)).size).toBe(12);
    expect(PRODUCT_EXTRAS.filter((extra) => extra.isNew).map((extra) => extra.iconKey)).toEqual([
      'widgets',
      'tablet',
    ]);
  });

  it('replaces the beta roadmap with a Yearbooks coming-soon entry', () => {
    expect('PRODUCT_ROADMAP' in productContent).toBe(false);
    expect(PRODUCT_COMING_SOON.title).toBe('Yearbooks');
    expect(PRODUCT_COMING_SOON.summary.length).toBeGreaterThan(0);
    expect(PRODUCT_COMING_SOON.items).toHaveLength(4);
    expect(PRODUCT_COMING_SOON.items.every((item) => item.length > 0)).toBe(true);
    expect(PRODUCT_COMING_SOON.items.join(' ')).not.toMatch(/Smarter recaps|A refreshed look|freeze/);
  });

  it('defines DadTrack key points with the private-by-default copy', () => {
    expect(DADTRACK_KEY_POINTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Private by default',
          description: expect.stringContaining('Local-first with no ads and no tracking'),
        }),
      ]),
    );
  });

  it('defines MomTrack key points with mom-focused and private-by-default positioning', () => {
    expect(MOMTRACK_KEY_POINTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Mom-focused',
        }),
        expect.objectContaining({
          title: 'Private by default',
          description: expect.stringContaining('it only ever sees your text, never your photos'),
        }),
      ]),
    );
  });

  it('gives each brand its own cloth', () => {
    expect(DADTRACK_PAGE_THEME.brand).toBe('dadtrack');
    expect(MOMTRACK_PAGE_THEME.brand).toBe('momtrack');
    expect(DADTRACK_PAGE_THEME.bookCloth).not.toBe(MOMTRACK_PAGE_THEME.bookCloth);
  });

  it('no longer exports the retired odd-grid helper', () => {
    expect('getOddFinalGridItemClass' in productContent).toBe(false);
  });

  it('defines the MomTrack store CTA using the App Store URL', () => {
    expect(productContent.MOMTRACK_STORE_CTA).toMatchObject({
      key: 'ios',
      buttonLabel: 'Download on the App Store: MomTrack',
      href: constants.MOMTRACK_APP_STORE_URL,
    });
  });

  it('gives every feature its own icon', () => {
    for (const features of [DADTRACK_FEATURES, MOMTRACK_FEATURES]) {
      expect(new Set(features.map((feature) => feature.iconKey)).size).toBe(features.length);
    }
  });

});
