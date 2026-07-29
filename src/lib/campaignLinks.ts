/**
 * Campaign-aware store links.
 *
 * Social posts link to `/get?utm_source=threads&utm_content=<post-id>`. This module
 * translates those inbound UTM parameters into each store's own campaign format so an
 * install can be traced back to the individual post that caused it.
 *
 * The two stores do NOT share a convention:
 * - Google Play reads a single URL-encoded `referrer` string, and UTM keys inside it are
 *   the documented format.
 * - Apple ignores `utm_*` entirely. App Analytics campaigns are keyed off `ct` (campaign
 *   token) and, optionally, `pt` (provider token).
 */

import {
  DADTRACK_APP_STORE_URL,
  DADTRACK_GOOGLE_PLAY_URL,
  MOMTRACK_APP_STORE_URL,
} from './constants';

/** Inbound campaign parameters, as they arrive on `/get`. */
export type CampaignParams = {
  campaign?: string;
  content?: string;
  medium?: string;
  source?: string;
};

export const DEFAULT_CAMPAIGN: Required<Pick<CampaignParams, 'campaign' | 'medium' | 'source'>> = {
  source: 'bengreene.dev',
  medium: 'website',
  campaign: 'dadtrack-launch',
};

/**
 * Apple truncates and mangles campaign tokens containing unusual characters, so keep
 * `ct` conservative: lowercase alphanumerics, dashes and underscores, capped at 40 chars.
 */
function sanitizeCampaignToken(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    // Collapse runs of dashes, which appear when a value already ends in punctuation and
    // is then joined to the next segment.
    .replace(/-{2,}/g, '-')
    .slice(0, 40)
    // Trim after slicing, so a truncated token never ends on a dash.
    .replace(/^-+|-+$/g, '');
}

/**
 * Sanitizing can empty a token entirely — `'!!!'` and any non-Latin script both reduce to
 * `''`. An empty `ct` is worse than a generic one: the install still lands in App
 * Analytics but with no campaign at all, indistinguishable from organic, and attribution
 * cannot be backfilled. Fall back to the default source rather than emitting nothing.
 */
function campaignTokenOrDefault(value: string): string {
  return sanitizeCampaignToken(value) || sanitizeCampaignToken(DEFAULT_CAMPAIGN.source);
}

function withDefaults(params: CampaignParams): Required<Omit<CampaignParams, 'content'>> & Pick<CampaignParams, 'content'> {
  return {
    source: params.source?.trim() || DEFAULT_CAMPAIGN.source,
    medium: params.medium?.trim() || DEFAULT_CAMPAIGN.medium,
    campaign: params.campaign?.trim() || DEFAULT_CAMPAIGN.campaign,
    content: params.content?.trim() || undefined,
  };
}

/** Build the `utm_*` query string Play expects inside its `referrer` parameter. */
export function buildUtmQuery(params: CampaignParams = {}): string {
  const { campaign, content, medium, source } = withDefaults(params);

  const pairs: [string, string][] = [
    ['utm_source', source],
    ['utm_medium', medium],
    ['utm_campaign', campaign],
  ];

  if (content) {
    pairs.push(['utm_content', content]);
  }

  // Encode each value, not just the joined result. An inbound `utm_content` containing an
  // encoded `&` would otherwise inject extra keys into the referrer once Play decodes it —
  // the outer URL stays well-formed, so the corruption is invisible until the Play report
  // is wrong.
  return pairs
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

/**
 * Google Play: append a URL-encoded `referrer`. The Play Install Referrer API surfaces
 * this string, and Play Console acquisition reports parse the `utm_*` keys out of it.
 */
export function buildPlayUrl(baseUrl: string, params: CampaignParams = {}): string {
  const separator = baseUrl.includes('?') ? '&' : '?';

  return `${baseUrl}${separator}referrer=${encodeURIComponent(buildUtmQuery(params))}`;
}

/**
 * Apple App Store: `ct` is the campaign token shown in App Analytics. We encode the
 * post id when we have one, falling back to the source, so the report is still readable
 * for bio-link traffic that carries no `utm_content`.
 *
 * `pt` (provider token) is intentionally omitted — it requires Ben's Apple provider id,
 * and `ct` alone is enough for campaign attribution.
 */
export function buildAppStoreUrl(baseUrl: string, params: CampaignParams = {}): string {
  const { content, source } = withDefaults(params);
  const token = campaignTokenOrDefault(content ? `${source}-${content}` : source);
  const separator = baseUrl.includes('?') ? '&' : '?';

  return `${baseUrl}${separator}ct=${encodeURIComponent(token)}&mt=8`;
}

export function buildDadTrackAppStoreUrl(params: CampaignParams = {}): string {
  return buildAppStoreUrl(DADTRACK_APP_STORE_URL, params);
}

export function buildDadTrackPlayUrl(params: CampaignParams = {}): string {
  return buildPlayUrl(DADTRACK_GOOGLE_PLAY_URL, params);
}

export function buildMomTrackAppStoreUrl(params: CampaignParams = {}): string {
  return buildAppStoreUrl(MOMTRACK_APP_STORE_URL, params);
}

/**
 * Default tracked links for the site's own CTAs (footer, product pages). These carry the
 * `bengreene.dev` source rather than a social source, so on-site clicks stay
 * distinguishable from social traffic in the store reports.
 */
export const DADTRACK_APP_STORE_URL_TRACKED = buildDadTrackAppStoreUrl();
export const DADTRACK_GOOGLE_PLAY_URL_TRACKED = buildDadTrackPlayUrl();

/** Read campaign parameters out of a `location.search` string. */
export function parseCampaignParams(search: string): CampaignParams {
  const query = new URLSearchParams(search);

  return {
    source: query.get('utm_source') ?? undefined,
    medium: query.get('utm_medium') ?? undefined,
    campaign: query.get('utm_campaign') ?? undefined,
    content: query.get('utm_content') ?? undefined,
  };
}
