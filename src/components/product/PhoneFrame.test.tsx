import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => (
    <img {...props} />
  ),
}));

import { PHONE_OUTLINE_RADIUS, PhoneFrame } from './PhoneFrame';

describe('PhoneFrame', () => {
  it('sizes the screen to the iPhone 16 Pro Max native resolution', () => {
    const markup = renderToStaticMarkup(<PhoneFrame />);

    expect(markup).toContain('aspect-[1320/2868]');
  });

  it('renders the screenshot with its alt text', () => {
    const markup = renderToStaticMarkup(<PhoneFrame src="/images/dadtrack/01-home-feed.webp" alt="DadTrack home" />);

    expect(markup).toContain('src="/images/dadtrack/01-home-feed.webp"');
    expect(markup).toContain('alt="DadTrack home"');
    expect(markup.match(/<img/g)).toHaveLength(1);
  });

  it('renders no image when only children are provided', () => {
    const markup = renderToStaticMarkup(<PhoneFrame />);

    expect(markup).not.toContain('<img');
  });

  it('does not draw a fake Dynamic Island, since the screenshots contain the real one', () => {
    const markup = renderToStaticMarkup(<PhoneFrame src="/a.webp" alt="a" />);

    expect(markup).not.toContain('h-5 w-20');
    expect(markup).not.toContain('rounded-full bg-black');
    // Nothing but the screenshot sits inside the screen: no overlay of any kind.
    expect(markup).toMatch(/aspect-\[1320\/2868\][^"]*"><img [^>]*\/?><\/div>/);
  });

  it('is its own size container, so cqw units resolve against the device width', () => {
    const markup = renderToStaticMarkup(<PhoneFrame className="w-[300px]" />);
    const rootClass = markup.match(/^<div class="([^"]*)"/)?.[1] ?? '';

    expect(rootClass.split(' ')).toContain('@container');
    // cqw on the container itself would resolve against an ancestor instead.
    expect(rootClass).not.toContain('cqw');
  });

  it('renders children inside the screen', () => {
    const markup = renderToStaticMarkup(
      <PhoneFrame>
        <div data-testid="custom-screen">Custom screen</div>
      </PhoneFrame>,
    );

    const screenStart = markup.indexOf('aspect-[1320/2868]');
    const childIndex = markup.indexOf('data-testid="custom-screen"');

    expect(screenStart).toBeGreaterThan(-1);
    expect(childIndex).toBeGreaterThan(screenStart);
  });

  it('exports an outline radius that matches the drawn device corners', () => {
    const markup = renderToStaticMarkup(<PhoneFrame />);
    const cqw = (pattern: RegExp) => Number(markup.match(pattern)?.[1]);

    const outerRadius = cqw(/rounded-\[([\d.]+)cqw\][^"]*p-\[[\d.]+cqw\]/);
    const band = cqw(/rounded-\[[\d.]+cqw\][^"]*p-\[([\d.]+)cqw\]/);
    const bezel = cqw(/bg-black p-\[([\d.]+)cqw\]/);
    // Frame height in units of its width: the 1320 x 2868 screen plus the
    // band and bezel above and below it.
    const inset = 2 * (band + bezel);
    const heightOverWidth = ((100 - inset) * (2868 / 1320) + inset) / 100;

    const [horizontal, vertical] = PHONE_OUTLINE_RADIUS.match(/rounded-\[([\d.]+)%_\/_([\d.]+)%\]/)!.slice(1).map(Number);

    expect(horizontal).toBeCloseTo(outerRadius, 1);
    expect(Math.abs(vertical - outerRadius / heightOverWidth)).toBeLessThan(0.1);
  });
});
