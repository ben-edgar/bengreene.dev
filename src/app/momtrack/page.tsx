'use client';

import { Button } from '@/components/Button';
import { ProductPage, type ProductPageConfig } from '@/components/product/ProductPage';
import { CONFETTI_NAVIGATION_DELAY_MS, fireConfetti } from '@/lib/confetti';
import { MOMTRACK_APP_STORE_URL, SITE_CANONICAL_URL } from '@/lib/constants';
import {
  MOMTRACK_DOWNLOAD_CTA,
  MOMTRACK_FEATURES,
  MOMTRACK_KEY_POINTS,
  MOMTRACK_PAGE_THEME,
  PRODUCT_EXTRAS,
  PRODUCT_ROADMAP,
} from '@/lib/productContent';

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MomTrack',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS',
  description:
    'A mom-focused journaling app for capturing memories, moods, and milestones. Now available to download on the App Store.',
  url: `${SITE_CANONICAL_URL}/momtrack`,
  image: `${SITE_CANONICAL_URL}/opengraph-image.png`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  sameAs: [MOMTRACK_APP_STORE_URL],
  downloadUrl: MOMTRACK_APP_STORE_URL,
};

export default function MomTrack() {
  const renderStoreCtas = (keyPrefix = '') => (
    <Button
      key={`${keyPrefix}app-store`}
      href={MOMTRACK_DOWNLOAD_CTA.href}
      size="lg"
      tone="momtrack"
      mobileFullWidth
      target="_blank"
      rel="noopener noreferrer"
      externalNavigationDelayMs={CONFETTI_NAVIGATION_DELAY_MS}
      onClick={() => fireConfetti('momtrack')}
    >
      {MOMTRACK_DOWNLOAD_CTA.label}
    </Button>
  );

  const config: ProductPageConfig = {
    name: 'MomTrack',
    theme: MOMTRACK_PAGE_THEME,
    eyebrow: '📱 The Mom Journaling App',
    availability: {
      label: 'Now Available on the App Store',
      pillClass: 'border border-rose-300/25 bg-rose-400/10 text-rose-200',
      pingClass: 'bg-rose-300',
      dotClass: 'bg-rose-300',
    },
    tagline: 'A journal that remembers the moments, the moods, and who you spent them with.',
    lead:
      'MomTrack helps moms capture everyday moments with photos, voice-to-text, and mood tracking, then turns them into monthly recaps you’ll actually reread. Share a family timeline with your partner, tag the people who were there, and keep every memory private by default.',
    features: MOMTRACK_FEATURES,
    extras: PRODUCT_EXTRAS,
    keyPoints: MOMTRACK_KEY_POINTS,
    roadmap: PRODUCT_ROADMAP,
    feedbackHref: '/feedback?app=momtrack',
    feedbackLinkLabel: 'Have feedback?',
    downloadHeading: 'Get MomTrack today',
    downloadLine: 'Free on the App Store.',
    renderStoreCtas,
    schema: softwareApplicationSchema,
  };

  return <ProductPage config={config} />;
}
