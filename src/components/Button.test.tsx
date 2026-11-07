import type { MouseEvent } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('outlines the secondary variant in the cloth text color', () => {
    const element = Button({
      children: 'Secondary CTA',
      variant: 'secondary',
      href: 'https://example.com',
    });

    expect(element.props.className).toContain('border-on-cloth/40');
    expect(element.props.className).toContain('hover:bg-on-cloth/10');
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

    expect(element.props['data-tone']).toBe('momtrack');
  });

  it('delays opening external links after running the click handler', () => {
    vi.useFakeTimers();

    const open = vi.fn();
    vi.stubGlobal('window', {
      open,
      setTimeout,
    });

    const onClick = vi.fn();
    const element = Button({
      children: 'Download',
      href: 'https://apps.example.com/dadtrack',
      target: '_blank',
      rel: 'noopener noreferrer',
      onClick,
      externalNavigationDelayMs: 700,
    });
    const event = {
      altKey: false,
      button: 0,
      ctrlKey: false,
      defaultPrevented: false,
      metaKey: false,
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as MouseEvent<HTMLAnchorElement>;

    element.props.onClick(event);

    expect(onClick).toHaveBeenCalledWith(event);
    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(open).not.toHaveBeenCalled();

    vi.advanceTimersByTime(699);
    expect(open).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(open).toHaveBeenCalledWith(
      'https://apps.example.com/dadtrack',
      '_blank',
      'noopener,noreferrer',
    );
  });
});
