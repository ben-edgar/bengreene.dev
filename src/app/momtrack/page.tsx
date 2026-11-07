'use client';

import { ProductPage, type ProductPageConfig } from '@/components/product/ProductPage';
import { StoreButton } from '@/components/StoreButton';
import {
  MOMTRACK_APP_STORE_URL,
  MOMTRACK_SHARE_IMAGE,
  SITE_CANONICAL_URL,
} from '@/lib/constants';
import {
  MOMTRACK_FEATURES,
  MOMTRACK_KEY_POINTS,
  MOMTRACK_PAGE_THEME,
  MOMTRACK_STORE_CTA,
  PRODUCT_COMING_SOON,
  PRODUCT_EXTRAS,
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
  image: `${SITE_CANONICAL_URL}${MOMTRACK_SHARE_IMAGE}`,
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
    <StoreButton key={`${keyPrefix}app-store`} cta={MOMTRACK_STORE_CTA} tone="momtrack" />
  );

  const config: ProductPageConfig = {
    name: 'MomTrack',
    theme: MOMTRACK_PAGE_THEME,
    eyebrow: 'The mom journaling app',
    availability: 'Available now on the App Store.',
    tagline: 'A journal that remembers the moments, the moods, and who you spent them with.',
    lead:
      'MomTrack helps moms capture everyday moments with photos, voice-to-text, and moods, then turns them into scrapbook recaps you’ll actually reread. Keep a shelf of milestones, share a family timeline with your partner, and keep every memory private by default.',
    features: MOMTRACK_FEATURES,
    extras: PRODUCT_EXTRAS,
    keyPoints: MOMTRACK_KEY_POINTS,
    comingSoon: PRODUCT_COMING_SOON,
    feedbackHref: '/feedback?app=momtrack',
    feedbackLinkLabel: 'Have feedback?',
    downloadHeading: 'Get MomTrack today',
    downloadLine: 'Free on the App Store.',
    renderStoreCtas,
    schema: softwareApplicationSchema,
  };

  return <ProductPage config={config} />;
}
