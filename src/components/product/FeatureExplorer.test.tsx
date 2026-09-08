import React, { forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

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
        const MotionComponent = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
          ({ children, ...props }, ref) => React.createElement(tag, { ...props, ref }, children),
        );
        MotionComponent.displayName = `MockMotion.${tag}`;

        return MotionComponent;
      },
    },
  );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion,
  };
});

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

import { FeatureExplorer } from './FeatureExplorer';
import { DADTRACK_FEATURES, DADTRACK_PAGE_THEME, PRODUCT_EXTRAS } from '@/lib/productContent';

function render() {
  return renderToStaticMarkup(
    <FeatureExplorer
      features={DADTRACK_FEATURES}
      extras={PRODUCT_EXTRAS}
      theme={DADTRACK_PAGE_THEME}
      onOpenLightbox={() => {}}
    />,
  );
}

describe('FeatureExplorer', () => {
  it('renders the desktop list and the mobile rail so both layouts ship in the static markup', () => {
    const markup = render();

    expect(markup).toContain('hidden lg:grid');
    expect(markup).toContain('lg:hidden');

    // 8 list buttons + 1 desktop phone + 8 rail phones + 2 chevrons + 8 dots.
    expect(markup.match(/aria-label="Open [^"]+ screenshot"/g)).toHaveLength(9);
    expect(markup.match(/aria-label="Go to [^"]+"/g)).toHaveLength(8);
    expect(markup).toContain('aria-label="Previous screen"');
    expect(markup).toContain('aria-label="Next screen"');
  });

  it('renders every screenshot once per layout', () => {
    const markup = render();

    expect(markup.match(/<img/g)).toHaveLength(16);

    // Once in the desktop stack, once in the mobile rail. (React also hoists a
    // deduplicated <link rel="preload"> per image, which is why we match on src.)
    for (const feature of DADTRACK_FEATURES) {
      expect(markup.split(`src="${feature.image}"`)).toHaveLength(3);
    }
  });

  it('renders the paper sheet chrome, the enlarge hint and the extras', () => {
    const markup = render();

    expect(markup).toContain('bg-[#f4efe6]');
    expect(markup).toContain('What&#x27;s included');
    expect(markup).toContain('Tap to enlarge');
    expect(markup).toContain('Also in the box');
    expect(markup).toContain('Voice-to-text');
    expect(markup).toContain('Export anytime');
    expect(markup).toContain('focus-visible:ring-offset-[#f4efe6]');
  });
});
