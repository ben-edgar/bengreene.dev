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
    expect(MOMTRACK_FEATURES.map((feature) => feature.image)).toEqual([
      '/images/momtrack/01-home-feed.png',
      '/images/momtrack/02-monthly-recap.png',
      '/images/momtrack/03-journal-entry-detail.png',
      '/images/momtrack/04-search.png',
      '/images/momtrack/05-streak.png',
      '/images/momtrack/06-cloud-pending.png',
      '/images/momtrack/07-cloud-all-synced.png',
    ]);
    expect(MOMTRACK_FEATURES[6].title).toBe('Restore & Sync');
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
    expect(PRODUCT_ROADMAP.map((section) => section.milestone)).toEqual([
      'Milestone Tracker',
      'Child Information Hub',
      'Memory Highlights',
      'Family Sharing',
    ]);
    expect(PRODUCT_ROADMAP[3].items).toContain('Selective entry sharing');
  });

  it('defines DadTrack key points with the updated data-control copy', () => {
    expect(DADTRACK_KEY_POINTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Your Data, Your Control',
          description: expect.stringContaining('Optional cloud backup and sync keeps your memories safe'),
        }),
      ]),
    );
  });

  it('defines MomTrack key points with mom-focused and data-control positioning', () => {
    expect(MOMTRACK_KEY_POINTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Mom-Focused',
        }),
        expect.objectContaining({
          title: 'Your Data, Your Control',
          description: expect.stringContaining('Optional cloud backup and sync keeps your memories safe'),
        }),
      ]),
    );
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
