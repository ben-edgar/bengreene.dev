import React, { forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const mockPlatform = vi.hoisted(() => ({
  current: 'ios' as 'ios' | 'android' | 'other' | null,
}));

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => (
    <img {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: React.ComponentProps<'a'> & { href: string }) => (
    <a data-next-link="true" href={href} {...props}>
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

vi.mock('@/lib/storeLinks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/storeLinks')>(
    '@/lib/storeLinks',
  );

  return {
    ...actual,
    useDetectedStorePlatform: () => mockPlatform.current,
  };
});

import DadTrack from './page';

describe('DadTrack page', () => {
  it('renders the refreshed product story and every screenshot', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain('📱 The Dad Journaling App');
    expect(markup).toContain(
      'A journal that remembers the moments, the moods, and who you spent them with.',
    );
    expect(markup).toContain('DadTrack helps dads capture everyday moments');
    expect(markup).not.toContain(
      'Voice journaling, daily tips, monthly recaps, cloud backup, and streak celebrations',
    );

    for (const file of [
      '01-home-feed',
      '02-journal-composer',
      '03-monthly-recap',
      '04-journal-entry-detail',
      '05-journal-entry-detail-magazine',
      '06-search',
      '07-streak',
      '08-cloud-all-synced',
    ]) {
      expect(markup).toContain(`/images/dadtrack/${file}.webp`);
    }
    expect(markup).not.toContain('/images/dadtrack/07-cloud-pending.png');
    expect(markup).not.toContain('/images/dadtrack/05-search.png');

    expect(markup).toContain('Shared family timeline');
    expect(markup).toContain('Cloud backup &amp; sync');
    expect(markup).toContain('Local-first with no ads, no tracking');
    expect(markup).toContain('data-next-link="true"');
    expect(markup).toContain('href="/feedback"');
    expect(markup).toContain('Share your thoughts');
  });

  it('renders the paper sheet with an accessible screenshot lightbox trigger', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain('bg-[#f4efe6]');
    expect(markup).toContain('What&#x27;s included');
    expect(markup).toContain('Eight screens from the app, as they look on an iPhone today.');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-label="Open Shared family timeline screenshot"');
    expect(markup).toContain('Tap to enlarge');

    expect(markup).not.toContain('polaroid-even');
    expect(markup).not.toContain('min-w-0 truncate');
    expect(markup).not.toContain('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
  });

  it('renders the extras, the differentiators, the beta roadmap and the download CTA', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain('Also in the box');
    expect(markup).toContain('Save photos to your library');
    expect(markup).toContain('Export anytime');

    expect(markup).toContain('Why DadTrack Is Different');
    expect(markup).toContain('Coming soon');
    expect(markup).toContain('In beta now, rolling out to everyone next.');
    expect(markup).toContain('Milestone tracker');
    expect(markup).toContain('Streak freezes');
    expect(markup).not.toContain('Child Information Hub');

    expect(markup).toContain('id="download"');
    expect(markup).toContain('Get DadTrack today');
    expect(markup).toContain('Free on iOS and Android.');
    expect(markup).toContain('SoftwareApplication');
  });
});
