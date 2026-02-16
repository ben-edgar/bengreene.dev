/**
 * DadTrack app constants
 */

export const DADTRACK_APP_STORE_URL =
  'https://apps.apple.com/us/app/dadtrack-parenting-journal/id6757777807';

export const DADTRACK_GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=dev.bengreene.dadtrack';

export const SITE_CANONICAL_URL = 'https://bengreene.dev';

const WEBSITE_UTM_QUERY =
  'utm_source=bengreene.dev&utm_medium=website&utm_campaign=dadtrack-launch';

export const DADTRACK_APP_STORE_URL_TRACKED =
  `${DADTRACK_APP_STORE_URL}?${WEBSITE_UTM_QUERY}`;

export const DADTRACK_GOOGLE_PLAY_URL_TRACKED =
  `${DADTRACK_GOOGLE_PLAY_URL}&referrer=${encodeURIComponent(WEBSITE_UTM_QUERY)}`;
