import { afterEach, describe, expect, it, vi } from 'vitest';

import { ANALYTICS_SETTLE_TIMEOUT_MS, trackGetRedirect } from './analyticsEvents';

const detail = {
  campaign: { source: 'threads', content: 'w32-mon-th-01' },
  destination: 'https://apps.apple.com/us/app/x?ct=threads-w32-mon-th-01',
  platform: 'ios' as const,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('trackGetRedirect', () => {
  it('settles immediately when analytics is not present', () => {
    // Development builds and ad-blocked visitors must not be stranded on /get.
    vi.stubGlobal('window', {});
    const onSettled = vi.fn();

    trackGetRedirect(detail, onSettled);

    expect(onSettled).toHaveBeenCalledOnce();
  });

  it('sends a get_redirect event carrying the campaign and destination', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });

    trackGetRedirect(detail, vi.fn());

    expect(gtag).toHaveBeenCalledOnce();
    const [command, name, params] = gtag.mock.calls[0];

    expect(command).toBe('event');
    expect(name).toBe('get_redirect');
    expect(params).toMatchObject({
      destination_platform: 'ios',
      campaign_source: 'threads',
      campaign_content: 'w32-mon-th-01',
    });
  });

  it('defers settling to gtag’s event_callback rather than firing right away', () => {
    // The whole point: navigating before the hit is sent loses the click.
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
    const onSettled = vi.fn();

    trackGetRedirect(detail, onSettled);

    expect(onSettled).not.toHaveBeenCalled();

    const params = gtag.mock.calls[0][2] as {
      event_callback: () => void;
      event_timeout: number;
    };

    expect(params.event_timeout).toBe(ANALYTICS_SETTLE_TIMEOUT_MS);

    params.event_callback();
    expect(onSettled).toHaveBeenCalledOnce();
  });
});
