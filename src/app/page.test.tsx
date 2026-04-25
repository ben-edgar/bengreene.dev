import React, { forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPlatform = vi.hoisted(() => ({
  current: 'ios' as 'ios' | 'android' | 'other' | null,
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
            style?: React.CSSProperties;
            transition?: unknown;
            variants?: unknown;
          }
        >(({ animate: _animate, exit: _exit, initial: _initial, transition: _transition, variants: _variants, children, ...props }, ref) =>
          React.createElement(tag, { ...props, ref }, children),
        );
        MotionComponent.displayName = `MockMotion.${tag}`;

        return MotionComponent;
      },
    },
  );

  return { motion };
});

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('@/components/HeroSection', () => ({
  default: () => <section>HeroSection</section>,
}));

vi.mock('@/components/AnimatedTimeline', () => ({
  default: () => <div>AnimatedTimeline</div>,
}));

vi.mock('@/components/MobileShowcase', () => ({
  default: ({
    screenshots,
  }: {
    screenshots: Array<{
      alt: string;
      description: string;
      src: string;
      title: string;
    }>;
  }) => (
    <section data-testid="mobile-showcase">
      {screenshots.map((screenshot) => (
        <article key={screenshot.src}>
          <img src={screenshot.src} alt={screenshot.alt} />
          <h3>{screenshot.title}</h3>
          <p>{screenshot.description}</p>
        </article>
      ))}
    </section>
  ),
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

import Home from './page';

describe('Home page', () => {
  beforeEach(() => {
    mockPlatform.current = 'ios';
  });

  it('renders both current projects and the refreshed DadTrack showcase', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('Current Projects');
    expect(markup).toContain('Live on iOS &amp; Android');
    expect(markup).toContain('Now in Beta');
    expect(markup).toContain('Learn More');
    expect(markup).toContain('Join the Beta');
    expect(markup).toContain('from-[#e8746e]');
    expect(markup).toContain('border-[#e8746e]/60');
    expect(markup).not.toContain('bg-rose-600');
    expect(markup).not.toContain('border-rose-300/60');
    expect(markup).toContain('https://testflight.apple.com/join/nnmhT9Sw');
    expect(markup).toContain('Download on the App Store');
    expect(markup).toContain('/images/dadtrack/01-home-feed.png');
    expect(markup).toContain('/images/dadtrack/02-monthly-recap.png');
    expect(markup).toContain('/images/dadtrack/07-cloud-all-synced.png');
    expect(markup).not.toContain('3_magazine_mode.png');
  });

  it('renders both DadTrack store CTAs before platform detection completes', () => {
    mockPlatform.current = null;

    const markup = renderToStaticMarkup(<Home />);

    expect(markup.match(/Download on the App Store/g)).toHaveLength(2);
    expect(markup.match(/Get it on Google Play/g)).toHaveLength(2);
  });
});
