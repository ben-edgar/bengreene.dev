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
});
