/**
 * Destination logic for the `/get` route.
 *
 * `/get` is the single link used in every social bio and post. It exists so there is one
 * chokepoint where campaign parameters are read, rather than scattering that logic across
 * every CTA on the site.
 *
 * Kept separate from the page component so it stays pure and testable — the page is a
 * thin client wrapper around this.
 */

import {
  buildDadTrackAppStoreUrl,
  buildDadTrackPlayUrl,
  type CampaignParams,
} from './campaignLinks';
import { type StorePlatform } from './storeCtas';

export type GetDestination = {
  /** Where to send the visitor. */
  href: string;
  /** True when we resolved an actual store; false means we fall back to the product page. */
  isStore: boolean;
  /** Human-readable label, used for the visible fallback link. */
  label: string;
};

/**
 * Desktop visitors get the product page rather than a store link — an App Store URL opened
 * on a laptop is a dead end, and `/dadtrack` carries both store CTAs anyway.
 */
export function resolveGetDestination(
  platform: StorePlatform,
  params: CampaignParams = {},
): GetDestination {
  if (platform === 'ios') {
    return {
      href: buildDadTrackAppStoreUrl(params),
      isStore: true,
      label: 'Download DadTrack on the App Store',
    };
  }

  if (platform === 'android') {
    return {
      href: buildDadTrackPlayUrl(params),
      isStore: true,
      label: 'Get DadTrack on Google Play',
    };
  }

  return {
    href: '/dadtrack',
    isStore: false,
    label: 'View DadTrack',
  };
}
