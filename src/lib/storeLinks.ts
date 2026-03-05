'use client';

import { useEffect, useState } from 'react';

import {
  DADTRACK_APP_STORE_URL_TRACKED,
  DADTRACK_GOOGLE_PLAY_URL_TRACKED,
} from './constants';

export type StorePlatform = 'ios' | 'android' | 'other';

type DeviceInfo = {
  maxTouchPoints?: number;
  platform?: string;
  userAgent?: string;
  vendor?: string;
};

type StoreCta = {
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

export function detectStorePlatform({
  maxTouchPoints = 0,
  platform = '',
  userAgent = '',
  vendor = '',
}: DeviceInfo): StorePlatform {
  const agent = userAgent || vendor;
  const isAndroid = /android/i.test(agent);
  const isIOS = /iPad|iPhone|iPod/.test(agent)
    || (platform === 'MacIntel' && maxTouchPoints > 1);

  if (isAndroid) {
    return 'android';
  }

  if (isIOS) {
    return 'ios';
  }

  return 'other';
}

export function getTrackedStoreCtas(platform: StorePlatform): StoreCta[] {
  return platform === 'android'
    ? [ANDROID_CTA, IOS_CTA]
    : [IOS_CTA, ANDROID_CTA];
}

export function getPrimaryTrackedStoreCta(platform: StorePlatform): StoreCta {
  return getTrackedStoreCtas(platform)[0];
}

export function useDetectedStorePlatform() {
  const [platform, setPlatform] = useState<StorePlatform | null>(null);

  useEffect(() => {
    // This only runs after mount because platform detection depends on browser-only globals.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlatform(detectStorePlatform({
      userAgent: navigator.userAgent,
      vendor: navigator.vendor,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints,
    }));
  }, []);

  return platform;
}
