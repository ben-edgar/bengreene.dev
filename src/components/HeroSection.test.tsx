import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => (
    <img {...props} />
  ),
}));

import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('links a polaroid of each app to its page', () => {
    const markup = renderToStaticMarkup(<HeroSection />);

    expect(markup).toMatch(/href="\/dadtrack"[\s\S]*polaroid-dadtrack\.webp[\s\S]*DadTrack/);
    expect(markup).toMatch(/href="\/momtrack"[\s\S]*polaroid-momtrack\.webp[\s\S]*MomTrack/);
  });

  it('tapes the MomTrack polaroid in the MomTrack tone', () => {
    expect(renderToStaticMarkup(<HeroSection />).match(/data-tone="momtrack"/g)).toHaveLength(1);
  });
});
