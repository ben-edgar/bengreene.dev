import { describe, expect, it } from 'vitest';

import {
  DADTRACK_FEATURES,
  DADTRACK_HOME_SHOWCASE_SCREENSHOTS,
  DADTRACK_KEY_POINTS,
  DADTRACK_PAGE_THEME,
  MOMTRACK_FEATURES,
  MOMTRACK_KEY_POINTS,
  MOMTRACK_PAGE_THEME,
  PRODUCT_ROADMAP,
  getOddFinalGridItemClass,
} from './productContent';
import * as constants from './constants';
import * as productContent from './productContent';

describe('product content', () => {
  it('defines the MomTrack App Store URL', () => {
    expect(constants.MOMTRACK_APP_STORE_URL).toBe(
      'https://apps.apple.com/us/app/momtrack-parenting-journal/id6758920295',
    );
  });

  it('uses eight DadTrack features with the refreshed v59 screenshots', () => {
    expect(DADTRACK_FEATURES.map((feature) => feature.title)).toEqual([
      'Shared Family Timeline',
      'Monthly AI Recaps',
      'Editorial Journal Entries',
      'Scrapbook Mode',
      'Advanced Search',
      'Streaks & Celebrations',
      'Cloud Backup & Sync',
      'Restore & Free Up Space',
    ]);
    expect(DADTRACK_FEATURES.map((feature) => feature.image)).toEqual([
      '/images/dadtrack/01-home-feed.png',
      '/images/dadtrack/02-monthly-recap.png',
      '/images/dadtrack/03-journal-entry-detail.png',
      '/images/dadtrack/04-journal-entry-detail-magazine.png',
      '/images/dadtrack/05-search.png',
      '/images/dadtrack/06-streak.png',
      '/images/dadtrack/07-cloud-pending.png',
      '/images/dadtrack/08-cloud-all-synced.png',
    ]);
  });

  it('uses eight MomTrack features with MomTrack asset paths', () => {
    expect(MOMTRACK_FEATURES).toHaveLength(8);
    expect(MOMTRACK_FEATURES.map((feature) => feature.image)).toEqual([
      '/images/momtrack/01-home-feed.png',
      '/images/momtrack/02-monthly-recap.png',
      '/images/momtrack/03-journal-entry-detail.png',
      '/images/momtrack/04-journal-entry-detail-magazine.png',
      '/images/momtrack/05-search.png',
      '/images/momtrack/06-streak.png',
      '/images/momtrack/07-cloud-pending.png',
      '/images/momtrack/08-cloud-all-synced.png',
    ]);
    expect(MOMTRACK_FEATURES[7].title).toBe('Restore & Free Up Space');
  });

  it('defines the three DadTrack home showcase screenshots', () => {
    expect(DADTRACK_HOME_SHOWCASE_SCREENSHOTS.map((screenshot) => screenshot.src)).toEqual([
      '/images/dadtrack/01-home-feed.png',
      '/images/dadtrack/04-journal-entry-detail-magazine.png',
      '/images/dadtrack/02-monthly-recap.png',
    ]);
  });

  it('keeps roadmap content shared for both product pages', () => {
    expect(PRODUCT_ROADMAP).toHaveLength(4);
    expect(PRODUCT_ROADMAP.map((section) => section.milestone)).toEqual([
      'Milestone Tracker',
      'Child Information Hub',
      'Memory Highlights',
      'Home-Screen Widget & Quick Capture',
    ]);
    expect(PRODUCT_ROADMAP[3].items).toContain('Quick entry mode for one-tap journaling');
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

  it('centers the final odd card only when a two-column feature grid has an odd item count', () => {
    expect(getOddFinalGridItemClass(6, 7)).toBe('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
    expect(getOddFinalGridItemClass(5, 7)).toBe('');
    expect(getOddFinalGridItemClass(7, 8)).toBe('');
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

  it('defines the MomTrack download CTA using the App Store URL', () => {
    expect(productContent.MOMTRACK_DOWNLOAD_CTA).toEqual({
      label: 'Download MomTrack on the App Store',
      href: constants.MOMTRACK_APP_STORE_URL,
    });
  });
});
