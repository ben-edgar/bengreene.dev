import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('@/components/HeroSection', () => ({
  default: () => <section>HeroSection</section>,
}));

vi.mock('@/components/Experience', () => ({
  default: () => <div>Experience</div>,
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
import { MOMTRACK_APP_STORE_URL } from '@/lib/constants';

describe('Home page', () => {
  beforeEach(() => {
    mockPlatform.current = 'ios';
  });

  it('renders both current projects with their live status', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('Current projects');
    expect(markup).toContain('Live on iOS &amp; Android');
    expect(markup).toContain('Live on iOS');
    expect(markup).toContain('Learn more about DadTrack');
    expect(markup).toContain('Learn more about MomTrack');
    expect(markup).toContain(MOMTRACK_APP_STORE_URL);
    expect(markup).toContain('/images/dadtrack/01-home-feed.webp');
    expect(markup).toContain('/images/momtrack/01-home-feed.webp');
    expect(markup).not.toContain('TestFlight');
    expect(markup).not.toContain('Now in Beta');
    expect(markup).not.toContain('Join the Beta');
  });

  it('gives the MomTrack project its own tone on the spruce page', () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('data-tone="momtrack"');
    expect(markup).not.toContain('data-brand');
  });

  it('shows each store once, leaving Learn more as a text link so buttons stay in pairs', () => {
    const markup = renderToStaticMarkup(<Home />);
    const storeButtons = markup.match(/aria-label="[^"]*(App Store|Google Play)"/g);

    expect(storeButtons).toEqual([
      'aria-label="Download on the App Store"',
      'aria-label="Get it on Google Play"',
      'aria-label="Download MomTrack on the App Store"',
    ]);
    expect(markup).toMatch(/<a [^>]*class="[^"]*underline[^"]*"[^>]*>Learn more about DadTrack/);
  });

  it('renders both DadTrack store CTAs before platform detection completes', () => {
    mockPlatform.current = null;

    const markup = renderToStaticMarkup(<Home />);

    expect(markup.match(/aria-label="Download on the App Store"/g)).toHaveLength(1);
    expect(markup.match(/aria-label="Get it on Google Play"/g)).toHaveLength(1);
  });

  it('leads with the store the visitor can actually use', () => {
    mockPlatform.current = 'android';

    const markup = renderToStaticMarkup(<Home />);

    expect(markup.indexOf('Get it on Google Play')).toBeLessThan(
      markup.indexOf('Download on the App Store'),
    );
  });
});
