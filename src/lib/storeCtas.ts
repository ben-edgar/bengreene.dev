import {
  DADTRACK_APP_STORE_URL_TRACKED,
  DADTRACK_GOOGLE_PLAY_URL_TRACKED,
} from './constants';

export type StorePlatform = 'ios' | 'android' | 'other';

export type StoreCta = {
  buttonLabel: string;
  href: string;
  key: 'ios' | 'android';
  textLabel: string;
};

const IOS_CTA: StoreCta = {
  key: 'ios',
  href: DADTRACK_APP_STORE_URL_TRACKED,
  buttonLabel: '🍎 Download on the App Store',
  textLabel: 'Download DadTrack on the App Store',
};

const ANDROID_CTA: StoreCta = {
  key: 'android',
  href: DADTRACK_GOOGLE_PLAY_URL_TRACKED,
  buttonLabel: '🤖 Get it on Google Play',
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
