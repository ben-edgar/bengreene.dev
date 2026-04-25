import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('uses a dark translucent hover treatment for the secondary variant', () => {
    const element = Button({
      children: 'Secondary CTA',
      variant: 'secondary',
      href: 'https://example.com',
    });

    expect(element.props.className).toContain('bg-white/5');
    expect(element.props.className).toContain('hover:bg-white/10');
    expect(element.props.className).not.toContain('hover:bg-primary-50');
  });

  it('can expand to full width on mobile and shrink back on larger screens', () => {
    const element = Button({
      children: 'Responsive CTA',
      href: 'https://example.com',
      mobileFullWidth: true,
    });

    expect(element.props.className).toContain('w-full sm:w-auto');
  });

  it('uses MomTrack colors when the button tone is momtrack', () => {
    const element = Button({
      children: 'MomTrack CTA',
      href: 'https://example.com',
      tone: 'momtrack',
    });

    expect(element.props.className).toContain('from-[#e8746e]');
    expect(element.props.className).toContain('to-[#9e2b3c]');
    expect(element.props.className).not.toContain('bg-primary-600');
  });
});
