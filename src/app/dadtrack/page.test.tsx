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
  it('renders the refreshed cloud backup product story and screenshots', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain(
      'Voice journaling, daily tips, monthly recaps, cloud backup, and streak celebrations',
    );
    expect(markup).toContain('Cloud Backup &amp; Sync');
    expect(markup).toContain('Restore &amp; Sync');
    expect(markup).toContain('/images/dadtrack/06-cloud-pending.png');
    expect(markup).toContain('/images/dadtrack/07-cloud-all-synced.png');
    expect(markup).toContain('Optional cloud backup and sync keeps your memories safe');
    expect(markup).toContain('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
    expect(markup).toContain('data-next-link="true"');
    expect(markup).toContain('href="/feedback"');

    expect(markup).not.toContain('Magazine Mode');
    expect(markup).not.toContain('Flexible View Modes');
    expect(markup).not.toContain('Tip History &amp; Favorites');
    expect(markup).not.toContain('Custom Mood Tags');
    expect(markup).not.toContain('1_homescreen_with_tip.png');
    expect(markup).not.toContain('manage_mood_screen.png');
  });
});
