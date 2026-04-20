'use client';

import { useEffect, useState } from 'react';

import { type StorePlatform } from './storeCtas';
export { getPrimaryTrackedStoreCta, getTrackedStoreCtas } from './storeCtas';
export type { StorePlatform } from './storeCtas';

type DeviceInfo = {
  maxTouchPoints?: number;
  platform?: string;
  userAgent?: string;
  vendor?: string;
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
