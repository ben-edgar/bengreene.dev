import { describe, expect, it } from 'vitest';

import {
  buildAppStoreUrl,
  buildDadTrackAppStoreUrl,
  buildPlayUrl,
  buildUtmQuery,
  DADTRACK_APP_STORE_URL_TRACKED,
  DADTRACK_GOOGLE_PLAY_URL_TRACKED,
  parseCampaignParams,
} from './campaignLinks';

describe('buildUtmQuery', () => {
  it('falls back to the website defaults when nothing is supplied', () => {
    expect(buildUtmQuery()).toBe(
      'utm_source=bengreene.dev&utm_medium=website&utm_campaign=dadtrack-launch',
    );
  });

  it('includes utm_content only when a post id is present', () => {
    expect(buildUtmQuery({ source: 'threads' })).not.toContain('utm_content');
    expect(buildUtmQuery({ source: 'threads', content: 'w32-mon-th-01' })).toContain(
      'utm_content=w32-mon-th-01',
    );
  });

  it('ignores blank values rather than emitting empty parameters', () => {
    expect(buildUtmQuery({ source: '   ', content: '' })).toBe(
      'utm_source=bengreene.dev&utm_medium=website&utm_campaign=dadtrack-launch',
    );
  });
});

describe('buildPlayUrl', () => {
  it('url-encodes the whole utm string into a single referrer parameter', () => {
    const url = buildPlayUrl('https://play.google.com/store/apps/details?id=x', {
      source: 'threads',
      content: 'w32-mon-th-01',
    });

    expect(url).toContain('&referrer=');
    expect(url).toContain(encodeURIComponent('utm_source=threads'));
    expect(url).toContain(encodeURIComponent('utm_content=w32-mon-th-01'));
  });

  it('uses ? when the base url has no query string', () => {
    expect(buildPlayUrl('https://example.com/app')).toContain('/app?referrer=');
  });

  it('encodes values so a crafted utm_content cannot inject extra referrer keys', () => {
    // ?utm_content=a%26utm_medium%3Dcpc decodes to "a&utm_medium=cpc". Without per-value
    // encoding that becomes a second utm_medium once Play decodes the referrer — the URL
    // still looks fine, so the corruption only shows up as a wrong Play report.
    const url = buildPlayUrl('https://play.google.com/store/apps/details?id=x', {
      source: 'threads',
      content: 'a&utm_medium=cpc',
    });
    const referrer = new URL(url).searchParams.get('referrer') ?? '';
    const parsed = new URLSearchParams(referrer);

    expect(parsed.getAll('utm_medium')).toEqual(['website']);
    expect(parsed.get('utm_content')).toBe('a&utm_medium=cpc');
  });
});

describe('buildAppStoreUrl', () => {
  // Apple ignores utm_* parameters entirely; campaign attribution runs on `ct`.
  it('emits a ct campaign token rather than utm parameters', () => {
    const url = buildDadTrackAppStoreUrl({ source: 'threads', content: 'w32-mon-th-01' });

    expect(url).toContain('ct=threads-w32-mon-th-01');
    expect(url).toContain('mt=8');
    expect(url).not.toContain('utm_');
  });

  it('falls back to the source alone when there is no post id', () => {
    expect(buildDadTrackAppStoreUrl({ source: 'threads' })).toContain('ct=threads');
  });

  it('sanitizes tokens to characters Apple handles predictably', () => {
    const url = buildAppStoreUrl('https://apps.apple.com/app', {
      source: 'Threads Bio!',
      content: 'w32 mon/th 01',
    });

    expect(url).toContain('ct=threads-bio-w32-mon-th-01');
  });

  it('falls back to the default source when sanitizing empties the token', () => {
    // An empty ct is worse than a generic one: the install lands with no campaign at all,
    // indistinguishable from organic, and it cannot be backfilled.
    for (const source of ['!!!', '日本語', '---']) {
      const token = new URL(buildDadTrackAppStoreUrl({ source })).searchParams.get('ct');

      expect(token).toBe('bengreene-dev');
    }
  });

  it('caps the campaign token length', () => {
    const url = buildAppStoreUrl('https://apps.apple.com/app', {
      source: 'a'.repeat(80),
    });
    const token = new URL(url).searchParams.get('ct') ?? '';

    expect(token.length).toBeLessThanOrEqual(40);
  });
});

describe('default tracked links', () => {
  it('tags the site’s own CTAs as website traffic', () => {
    expect(DADTRACK_APP_STORE_URL_TRACKED).toContain('ct=bengreene.dev'.replace('.', '-'));
    expect(DADTRACK_GOOGLE_PLAY_URL_TRACKED).toContain(
      encodeURIComponent('utm_source=bengreene.dev'),
    );
  });
});

describe('parseCampaignParams', () => {
  it('reads utm parameters from a search string', () => {
    expect(parseCampaignParams('?utm_source=bluesky&utm_content=w32-tue-bs-01')).toEqual({
      source: 'bluesky',
      medium: undefined,
      campaign: undefined,
      content: 'w32-tue-bs-01',
    });
  });

  it('returns undefined for every field when there is no query string', () => {
    expect(parseCampaignParams('')).toEqual({
      source: undefined,
      medium: undefined,
      campaign: undefined,
      content: undefined,
    });
  });
});
