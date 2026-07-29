import { describe, expect, it } from 'vitest';

import { resolveGetDestination } from './getRedirect';

describe('resolveGetDestination', () => {
  it('sends iOS visitors to the App Store with a campaign token', () => {
    const destination = resolveGetDestination('ios', {
      source: 'threads',
      content: 'w32-mon-th-01',
    });

    expect(destination.isStore).toBe(true);
    expect(destination.href).toContain('apps.apple.com');
    expect(destination.href).toContain('ct=threads-w32-mon-th-01');
  });

  it('sends Android visitors to Google Play with a referrer', () => {
    const destination = resolveGetDestination('android', {
      source: 'threads',
      content: 'w32-mon-th-01',
    });

    expect(destination.isStore).toBe(true);
    expect(destination.href).toContain('play.google.com');
    expect(destination.href).toContain(encodeURIComponent('utm_content=w32-mon-th-01'));
  });

  it('sends desktop visitors to the product page, not a store', () => {
    // An App Store link opened on a laptop is a dead end; /dadtrack carries both CTAs.
    const destination = resolveGetDestination('other', { source: 'threads' });

    expect(destination.isStore).toBe(false);
    expect(destination.href).toBe('/dadtrack');
  });

  it('still resolves a destination when no campaign parameters are present', () => {
    expect(resolveGetDestination('ios').href).toContain('apps.apple.com');
    expect(resolveGetDestination('android').href).toContain('play.google.com');
  });
});
