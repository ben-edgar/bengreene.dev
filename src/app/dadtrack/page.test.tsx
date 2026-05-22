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
    expect(markup).toContain('Restore &amp; Free Up Space');
    expect(markup).toContain('/images/dadtrack/04-journal-entry-detail-magazine.png');
    expect(markup).toContain('/images/dadtrack/07-cloud-pending.png');
    expect(markup).toContain('/images/dadtrack/08-cloud-all-synced.png');
    expect(markup).toContain('Local-first with no ads, no tracking');
    expect(markup).not.toContain('md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]');
    expect(markup).toContain('data-next-link="true"');
    expect(markup).toContain('href="/feedback"');

    expect(markup).not.toContain('Flexible View Modes');
    expect(markup).not.toContain('Tip History &amp; Favorites');
    expect(markup).not.toContain('Custom Mood Tags');
    expect(markup).not.toContain('1_homescreen_with_tip.png');
    expect(markup).not.toContain('manage_mood_screen.png');
  });

  it('renders accessible full-size screenshot feature cards', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain('type="button"');
    expect(markup).toContain('aria-label="Open Shared Family Timeline screenshot"');
    expect(markup).toContain(
      'class="group h-full w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 text-left backdrop-blur-sm transition-all duration-300',
    );
  });

  it('renders shrinkable truncated feature caption titles', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain(
      'class="min-w-0 truncate text-sm font-semibold italic text-slate-300"',
    );
  });

  it('uses Tailwind classes for the screenshot hover overlay offset', () => {
    const markup = renderToStaticMarkup(<DadTrack />);

    expect(markup).toContain(
      'class="absolute inset-x-0 top-0 bottom-11 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center pointer-events-none"',
    );
    expect(markup).not.toContain('style="bottom:44px"');
  });
});
