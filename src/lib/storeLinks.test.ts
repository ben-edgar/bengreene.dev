import { describe, expect, it } from 'vitest';

import {
  detectStorePlatform,
  getPrimaryTrackedStoreCta,
  getTrackedStoreCtas,
} from './storeLinks';

describe('store links', () => {
  it('detects Android devices from the user agent', () => {
    const platform = detectStorePlatform({
      userAgent:
        'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/122.0.0.0 Mobile Safari/537.36',
      platform: 'Linux armv8l',
      maxTouchPoints: 5,
    });

    expect(platform).toBe('android');
  });

  it('prioritizes Google Play for Android devices', () => {
    const [primary, secondary] = getTrackedStoreCtas('android');

    expect(primary.key).toBe('android');
    expect(primary.textLabel).toContain('Google Play');
    expect(secondary.key).toBe('ios');
  });

  it('returns the App Store as the primary fallback for non-Android devices', () => {
    const primary = getPrimaryTrackedStoreCta('other');

    expect(primary.key).toBe('ios');
    expect(primary.textLabel).toContain('App Store');
  });
});
