import React, { forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => (
    <img {...props} />
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
import { SITE_CANONICAL_URL } from '@/lib/constants';

const metadataDescription =
  'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.';

describe('MomTrack product route', () => {
  it('defines MomTrack metadata and renders layout children', () => {
    expect(metadata.title).toBe('MomTrack — Mom Journaling App');
    expect(metadata.description).toBe(metadataDescription);
    expect(metadata.metadataBase?.toString()).toBe('https://bengreene.dev/');
    expect(metadata.alternates?.canonical).toBe('/momtrack');
    expect(metadata.openGraph?.title).toBe('MomTrack — Mom Journaling App');
    expect(metadata.openGraph?.description).toBe(metadataDescription);
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.url).toBe('/momtrack');
    expect(metadata.openGraph?.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: '/opengraph-image.png',
        }),
      ]),
    );
    expect(metadata.twitter?.card).toBe('summary');
    expect(metadata.twitter?.title).toBe('MomTrack — Mom Journaling App');
    expect(metadata.twitter?.description).toBe(metadataDescription);
    expect(metadata.twitter?.images).toEqual(
      expect.arrayContaining(['/twitter-image.png']),
    );

    expect(
      renderToStaticMarkup(
        <MomTrackLayout>
          <div>MomTrack child content</div>
        </MomTrackLayout>,
      ),
    ).toContain('MomTrack child content');
  });

  it('renders the MomTrack beta product story and screenshots', () => {
    const markup = renderToStaticMarkup(<MomTrack />);

    expect(markup).toContain('The Mom Journaling App');
    expect(markup).toContain('Now in Beta');
    expect(markup).toContain('iOS TestFlight');
    expect(markup).toContain('bg-amber-900/40');
    expect(markup).toContain('text-amber-300');
    expect(markup).toContain('Join the Beta on TestFlight');
    expect(markup).toContain('https://testflight.apple.com/join/nnmhT9Sw');
    expect(markup).toContain('/images/momtrack/01-home-feed.png');
    expect(markup).toContain('/images/momtrack/07-cloud-all-synced.png');
    expect(markup).toContain('Why MomTrack Is Different');
    expect(markup).toContain('Mom-Focused');
    expect(markup).toContain('/feedback?app=momtrack');
    expect(markup).toContain('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
    expect(markup).toContain('SoftwareApplication');
    expect(markup).toContain('MomTrack');
    expect(markup).toContain('iOS');
    expect(markup).toSatisfy((renderedMarkup: string) =>
      renderedMarkup.includes(`${SITE_CANONICAL_URL}/momtrack`) ||
      renderedMarkup.includes(`${SITE_CANONICAL_URL}\\/momtrack`),
    );
    expect(markup).not.toContain('Download on the App Store');
    expect(markup).not.toContain('Get it on Google Play');
  });
});
