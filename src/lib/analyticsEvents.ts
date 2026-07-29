import { type CampaignParams } from './campaignLinks';
import { type StorePlatform } from './storeCtas';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * How long to wait for the analytics hit before redirecting anyway.
 *
 * Bounded on purpose: a visitor must never be stranded on `/get` because a script was
 * blocked or slow. Anyone who hits the cap simply goes uncounted, which is already true
 * of every ad-blocked visitor.
 */
export const ANALYTICS_SETTLE_TIMEOUT_MS = 1500;

type RedirectDetail = {
  campaign: CampaignParams;
  destination: string;
  platform: StorePlatform;
};

/**
 * Record the `/get` redirect, then call `onSettled` once the hit has actually been sent.
 *
 * Why an explicit event rather than relying on the automatic pageview: `gtag.js` loads
 * asynchronously from googletagmanager.com, and the inline bootstrap defines `window.gtag`
 * immediately — so the presence of `window.gtag` says nothing about whether anything has
 * been transmitted. Queued events only go out once the real script loads, which on a slow
 * connection can lose the race against the redirect.
 *
 * `event_callback` is gtag's documented signal that a hit has been sent, so it is the only
 * reliable point at which navigating away is safe. It fires for queued events too, once
 * gtag.js initializes and replays the dataLayer.
 *
 * The caller still needs its own timeout: if gtag.js never loads at all, the event is never
 * processed and neither `event_callback` nor `event_timeout` will ever fire.
 */
export function trackGetRedirect(detail: RedirectDetail, onSettled: () => void): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    // Analytics is absent — development builds, or the script was removed entirely.
    onSettled();
    return;
  }

  window.gtag('event', 'get_redirect', {
    destination_platform: detail.platform,
    destination_url: detail.destination,
    campaign_source: detail.campaign.source,
    campaign_content: detail.campaign.content,
    event_callback: onSettled,
    event_timeout: ANALYTICS_SETTLE_TIMEOUT_MS,
  });
}
