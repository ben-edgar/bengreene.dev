import React, { forwardRef } from 'react';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => (
    <img {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.ComponentProps<'a'> & { href: string | { toString(): string } }) => (
    <a
      data-next-link="true"
      href={typeof href === 'string' ? href : String(href)}
      {...props}
    >
      {children}
    </a>
  ),
}));

vi.mock('framer-motion', () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        const MotionComponent = forwardRef<
          HTMLElement,
          React.HTMLAttributes<HTMLElement> & {
            animate?: unknown;
            exit?: unknown;
            initial?: unknown;
            layoutId?: string;
            style?: React.CSSProperties;
            transition?: unknown;
            variants?: unknown;
          }
        >(({ animate: _animate, exit: _exit, initial: _initial, layoutId: _layoutId, transition: _transition, variants: _variants, children, ...props }, ref) =>
          React.createElement(tag, { ...props, ref }, children),
        );
        MotionComponent.displayName = `MockMotion.${tag}`;

        return MotionComponent;
      },
    },
  );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion,
    useMotionValue: () => ({ set: vi.fn() }),
    useScroll: () => ({ scrollYProgress: 0 }),
    useSpring: (value: unknown) => value,
    useTransform: () => 0,
  };
});

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

import MomTrackLayout, { metadata } from './layout';
import MomTrack from './page';
import {
  MOMTRACK_APP_STORE_URL,
  MOMTRACK_SHARE_IMAGE,
  SITE_CANONICAL_URL,
} from '@/lib/constants';

const metadataDescription =
  'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now available to download on the App Store.';

describe('MomTrack product route', () => {
  it('defines MomTrack metadata and renders layout children', () => {
    expect(metadata.title).toBe('MomTrack — Mom Journaling App');
    expect(metadata.description).toBe(metadataDescription);
    expect(metadata.metadataBase?.toString()).toBe('https://bengreene.dev/');
    expect(metadata.alternates?.canonical).toBe('/momtrack');
    expect(metadata.openGraph?.title).toBe('MomTrack — Mom Journaling App');
    expect(metadata.openGraph?.description).toBe(metadataDescription);
    expect((metadata.openGraph as { type?: string } | null | undefined)?.type).toBe('website');
    expect(metadata.openGraph?.url).toBe('/momtrack');
    expect(metadata.openGraph?.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: MOMTRACK_SHARE_IMAGE,
        }),
      ]),
    );
    expect((metadata.twitter as { card?: string } | null | undefined)?.card).toBe('summary');
    expect(metadata.twitter?.title).toBe('MomTrack — Mom Journaling App');
    expect(metadata.twitter?.description).toBe(metadataDescription);
    expect(metadata.twitter?.images).toEqual(
      expect.arrayContaining([MOMTRACK_SHARE_IMAGE]),
    );

    expect(
      renderToStaticMarkup(
        <MomTrackLayout>
          <div>MomTrack child content</div>
        </MomTrackLayout>,
      ),
    ).toContain('MomTrack child content');
  });

  it('uses MomTrack art for every icon and link preview, never the DadTrack defaults', () => {
    const icons = metadata.icons as {
      apple: Array<{ url: string }>;
      icon: Array<{ url: string }>;
      shortcut: string[];
    };
    const urls = [
      ...icons.icon.map((icon) => icon.url),
      ...icons.apple.map((icon) => icon.url),
      ...icons.shortcut,
    ];

    expect(icons.icon.length).toBeGreaterThan(0);
    expect(icons.apple.length).toBeGreaterThan(0);
    expect(icons.shortcut.length).toBeGreaterThan(0);

    for (const url of urls) {
      expect(url).toMatch(/^\/images\/momtrack\/icons\//);
      expect(existsSync(join(process.cwd(), 'public', url))).toBe(true);
    }

    expect(existsSync(join(process.cwd(), 'public', MOMTRACK_SHARE_IMAGE))).toBe(true);
    expect(renderToStaticMarkup(<MomTrack />)).toContain(
      `${SITE_CANONICAL_URL}${MOMTRACK_SHARE_IMAGE}`,
    );
  });

  it('keeps the site favicon out of the app directory', () => {
    // Next prepends app/favicon.ico to every route's icons, even when a route sets its
    // own, so leaving it there would put the DadTrack icon ahead of MomTrack's.
    expect(existsSync(join(process.cwd(), 'src/app/favicon.ico'))).toBe(false);
    expect(existsSync(join(process.cwd(), 'public/favicon.ico'))).toBe(true);
  });

  it('renders the MomTrack live product story and screenshots', () => {
    const markup = renderToStaticMarkup(<MomTrack />);

    expect(markup).toContain('The mom journaling app');
    expect(markup).toContain('Available now on the App Store.');
    expect(markup).toContain('aria-label="Download on the App Store: MomTrack"');
    expect(markup).toContain('data-brand="momtrack"');
    expect(markup).toContain('data-tone="momtrack"');
    expect(markup).toContain(MOMTRACK_APP_STORE_URL);
    expect(markup).not.toContain('TestFlight');
    expect(markup).not.toContain('beta testing');
    expect(markup).not.toContain('Get it on Google Play');

    for (const file of [
      '01-home-feed',
      '02-milestone-tracker',
      '03-journal-entry-detail-magazine',
      '04-journal-composer',
      '05-monthly-recap',
      '06-partner-entry',
      '07-streak',
      '08-search',
    ]) {
      expect(markup).toContain(`/images/momtrack/${file}.webp`);
    }
    expect(markup).not.toContain('/images/momtrack/07-cloud-pending.png');
    for (const file of [
      '02-journal-composer',
      '03-monthly-recap',
      '04-journal-entry-detail',
      '05-journal-entry-detail-magazine',
      '06-search',
      '08-cloud-all-synced',
    ]) {
      expect(markup).not.toContain(`/images/momtrack/${file}.webp`);
    }

    expect(markup).toContain(
      'A journal that remembers the moments, the moods, and who you spent them with.',
    );
    expect(markup).toContain('MomTrack helps moms capture everyday moments');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-label="Open A scrapbook family timeline screenshot"');
    expect(markup).toContain('Why MomTrack is different');
    expect(markup).toContain('Mom-focused');
    expect(markup).toContain('/feedback?app=momtrack');
    expect(markup).toContain('Have feedback?');
    expect(markup).toContain('data-next-link="true"');
    expect(markup).not.toContain('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
    expect(markup).toContain('SoftwareApplication');
    expect(markup).toContain('MomTrack');
    expect(markup).toContain('iOS');
    expect(markup).toSatisfy((renderedMarkup: string) =>
      renderedMarkup.includes(`${SITE_CANONICAL_URL}/momtrack`) ||
      renderedMarkup.includes(`${SITE_CANONICAL_URL}\\/momtrack`),
    );
  });

  it('renders the paper sheet, the extras and the Yearbooks coming-soon card', () => {
    const markup = renderToStaticMarkup(<MomTrack />);

    expect(markup).toContain('page-sheet');
    expect(markup).toContain('What’s included');
    expect(markup).toContain('Tap to enlarge');
    expect(markup).toContain('Also in the box');
    expect(markup).toContain('Save photos to your library');
    expect(markup).toContain('Coming soon');
    expect(markup).toContain('What I’m building next.');
    expect(markup).toContain('Yearbooks');
    expect(markup).toContain('/images/shared/yearbook-cover-photo.webp');
    expect(markup).not.toContain('Smarter recaps');
    expect(markup).not.toContain('A refreshed look');
    expect(markup).not.toContain('In beta now, rolling out to everyone next.');
    expect(markup).toContain('Get MomTrack today');
    expect(markup).toContain('Free on the App Store.');

    expect(markup).not.toContain('polaroid-even');
    expect(markup).not.toContain('min-w-0 truncate');
  });
});
