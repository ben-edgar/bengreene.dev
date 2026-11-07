import {
  DADTRACK_APP_STORE_URL_TRACKED,
  DADTRACK_GOOGLE_PLAY_URL_TRACKED,
} from './campaignLinks';

export type StorePlatform = 'ios' | 'android' | 'other';

export type StoreCta = {
  /** The whole label, for screen readers and plain text links. */
  buttonLabel: string;
  /** The two lines of the store button. */
  badgeLead: string;
  badgeName: string;
  href: string;
  key: 'ios' | 'android';
  textLabel: string;
};

const IOS_CTA: StoreCta = {
  key: 'ios',
  href: DADTRACK_APP_STORE_URL_TRACKED,
  buttonLabel: 'Download on the App Store',
  badgeLead: 'Download on the',
  badgeName: 'App Store',
  textLabel: 'Download DadTrack on the App Store',
};

const ANDROID_CTA: StoreCta = {
  key: 'android',
  href: DADTRACK_GOOGLE_PLAY_URL_TRACKED,
  buttonLabel: 'Get it on Google Play',
  badgeLead: 'Get it on',
  badgeName: 'Google Play',
  textLabel: 'Download DadTrack on Google Play',
};

export function getTrackedStoreCtas(platform: StorePlatform): StoreCta[] {
  return platform === 'android'
    ? [ANDROID_CTA, IOS_CTA]
    : [IOS_CTA, ANDROID_CTA];
}

export function getPrimaryTrackedStoreCta(platform: StorePlatform): StoreCta {
  return getTrackedStoreCtas(platform)[0];
}
