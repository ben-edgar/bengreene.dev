import React, { forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import MobileShowcase from './MobileShowcase';

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => (
    <img {...props} />
  ),
}));

vi.mock('framer-motion', () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        forwardRef<
          HTMLElement,
          React.HTMLAttributes<HTMLElement> & {
            animate?: unknown;
            exit?: unknown;
            initial?: unknown;
            transition?: unknown;
            viewport?: unknown;
            whileInView?: unknown;
          }
        >(({ animate: _animate, exit: _exit, initial: _initial, transition: _transition, viewport: _viewport, whileInView: _whileInView, children, ...props }, ref) =>
          React.createElement(tag, { ...props, ref }, children),
        ),
    },
  );

  return {
    motion,
    useMotionValue: () => ({ set: vi.fn() }),
    useSpring: (value: unknown) => value,
    useTransform: () => 0,
  };
});

const screenshots = [
  {
    src: '/dadtrack-dashboard.png',
    alt: 'DadTrack dashboard',
    title: 'Daily Rhythm',
    description: 'Track meaningful moments quickly.',
  },
  {
    src: '/dadtrack-history.png',
    alt: 'DadTrack history',
    title: 'Memory Timeline',
    description: 'Review patterns over time.',
  },
];

describe('MobileShowcase', () => {
  it('keeps the DadTrack heading and default theme classes by default', () => {
    const markup = renderToStaticMarkup(<MobileShowcase screenshots={screenshots} />);

    expect(markup).toContain('DadTrack in Action');
    expect(markup).toContain('text-teal-400');
    expect(markup).toContain('bg-gradient-to-r from-teal-400 to-blue-500');
    expect(markup).toContain('bg-teal-500/20');
    expect(markup).toContain('bg-purple-500/20');
  });

  it('renders a custom heading and literal MomTrack theme classes', () => {
    const markup = renderToStaticMarkup(
      <MobileShowcase
        screenshots={screenshots}
        heading="MomTrack in Action"
        themeClasses={{
          text: 'text-rose-300',
          indicatorActive: 'bg-gradient-to-r from-rose-300 to-fuchsia-500',
          primaryGlow: 'bg-rose-500/20',
          secondaryGlow: 'bg-fuchsia-500/20',
          backgroundPrimaryGlow: 'bg-rose-500/5',
          backgroundSecondaryGlow: 'bg-fuchsia-500/5',
        }}
      />,
    );

    expect(markup).toContain('MomTrack in Action');
    expect(markup).toContain('text-rose-300');
    expect(markup).toContain('bg-gradient-to-r from-rose-300 to-fuchsia-500');
    expect(markup).toContain('bg-rose-500/20');
    expect(markup).toContain('bg-fuchsia-500/20');
    expect(markup).toContain('bg-rose-500/5');
    expect(markup).toContain('bg-fuchsia-500/5');
  });
});
