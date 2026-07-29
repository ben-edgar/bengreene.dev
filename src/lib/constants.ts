/**
 * DadTrack app constants
 */

export const DADTRACK_APP_STORE_URL =
  'https://apps.apple.com/us/app/dadtrack-parenting-journal/id6757777807';

export const DADTRACK_GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=dev.bengreene.dadtrack';

export const MOMTRACK_APP_STORE_URL =
  'https://apps.apple.com/us/app/momtrack-parenting-journal/id6758920295';

export const SITE_CANONICAL_URL = 'https://bengreene.dev';

/**
 * Google Analytics 4 measurement id for the bengreene.dev web stream.
 *
 * Not a secret — GA measurement ids ship in the client bundle of every site that uses
 * them. Kept here rather than in an environment variable so a missing variable can't
 * silently disable analytics in production.
 *
 * Property configuration that matters (set in the GA admin, not in code):
 * - Google Signals: OFF — this disables GA4 data thresholding, which otherwise hides
 *   report rows with low user counts. At this site's volume, thresholding would hide
 *   exactly the rows worth reading.
 * - Data retention: 14 months (the default is 2).
 * - Timezone: America/New_York, to match the social posting schedule.
 */
export const GA_MEASUREMENT_ID = 'G-77M1EHX52R';

/**
 * Tracked store links live in `campaignLinks.ts`, which knows each store's campaign
 * parameter format. This file stays import-free so it can act as the shared leaf module.
 */
