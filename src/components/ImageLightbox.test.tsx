import React, { forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => (
    <img {...props} />
  ),
}));

const MOTION_ONLY_PROPS = [
  'initial',
  'animate',
  'exit',
  'transition',
  'drag',
  'dragConstraints',
  'dragElastic',
  'onDragStart',
  'onDragEnd',
];

vi.mock('framer-motion', () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        const MotionComponent = forwardRef<HTMLElement, Record<string, unknown> & { children?: React.ReactNode }>(
          ({ children, ...props }, ref) => {
            const domProps = Object.fromEntries(
              Object.entries(props).filter(([key]) => !MOTION_ONLY_PROPS.includes(key)),
            );
            return React.createElement(tag, { ...domProps, ref }, children as React.ReactNode);
          },
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

import { ImageLightbox } from './ImageLightbox';

const LONG_DESCRIPTION =
  'Your days, gathered into monthly chapters on a paper scrapbook, with taped polaroids of your kids up top. Link with your partner to share one family timeline, keep any entry private, and pick Compact, Standard, or Large cards.';

const images = [
  { src: '/images/dadtrack/01-home-feed.webp', alt: 'Home', title: 'A scrapbook family timeline', description: LONG_DESCRIPTION },
  { src: '/images/dadtrack/02-milestone-tracker.webp', alt: 'Milestones', title: 'Milestone Tracker', description: 'Short.' },
];

function render(props: Partial<React.ComponentProps<typeof ImageLightbox>> = {}) {
  return renderToStaticMarkup(
    <ImageLightbox
      images={images}
      currentIndex={0}
      isOpen
      onClose={() => {}}
      onNext={() => {}}
      onPrevious={() => {}}
      {...props}
    />,
  );
}

/** Markup from the photo box up to the Next button, i.e. the photo area only. */
function photoSection(markup: string) {
  const start = markup.lastIndexOf('<div', markup.indexOf('cursor-grab'));
  const end = markup.indexOf('Next image');
  return markup.slice(start, end);
}

describe('ImageLightbox', () => {
  it('opens as a labelled modal dialog', () => {
    const markup = render();

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain('aria-label="A scrapbook family timeline"');
    expect(markup).toContain('1 / 2');
  });

  it('renders nothing when closed', () => {
    expect(render({ isOpen: false })).toBe('');
  });

  it('keeps the caption out of the photo, so it never covers the screenshot', () => {
    const markup = render();
    const photo = photoSection(markup);

    expect(photo).toContain('src="/images/dadtrack/01-home-feed.webp"');
    expect(photo).not.toContain(LONG_DESCRIPTION);
    expect(markup).toContain(LONG_DESCRIPTION);
    // The old caption was an absolutely positioned card laid over the photo.
    expect(markup).not.toContain('absolute bottom-4 left-4 right-4');
  });

  it('starts with the caption collapsed to a two-line preview with a More toggle', () => {
    const markup = render();
    const descriptionTag = markup.match(/<div id="[^"]+" data-expanded="false"[^>]*>/)?.[0] ?? '';

    expect(descriptionTag).toContain('line-clamp-2');
    expect(markup).toMatch(/aria-expanded="false"[^>]*>More/);
    // The toggle points at the caption it controls.
    const controls = markup.match(/aria-controls="([^"]+)"/)?.[1];
    expect(controls).toBeTruthy();
    expect(markup).toContain(`id="${controls}"`);
  });

  it('sizes the photo box to the image aspect on wide screens when one is given', () => {
    const withAspect = photoSection(render({ imageAspect: '1080 / 2347' }));
    const withoutAspect = photoSection(render());

    expect(withAspect).toMatch(/aspect-ratio:\s*1080 \/ 2347/);
    expect(withAspect).toContain('lg:w-auto');
    expect(withoutAspect).not.toContain('aspect-ratio');
  });

  it('hides the arrows and counter for a single image', () => {
    const markup = render({ images: [images[0]] });

    expect(markup).not.toContain('Previous image');
    expect(markup).not.toContain('Next image');
    expect(markup).not.toContain('1 / 1');
  });
});
