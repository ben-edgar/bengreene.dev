'use client';

import { ProductPage, type ProductPageConfig } from '@/components/product/ProductPage';
import { StoreButton } from '@/components/StoreButton';
import {
  DADTRACK_APP_STORE_URL,
  DADTRACK_GOOGLE_PLAY_URL,
  SITE_CANONICAL_URL,
} from '@/lib/constants';
import {
  DADTRACK_FEATURES,
  DADTRACK_KEY_POINTS,
  DADTRACK_PAGE_THEME,
  PRODUCT_COMING_SOON,
  PRODUCT_EXTRAS,
} from '@/lib/productContent';
import { getTrackedStoreCtas, useDetectedStorePlatform } from '@/lib/storeLinks';

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DadTrack',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS, Android',
  description:
    'A dad-focused journaling app for capturing memories, moods, and milestones with AI-powered insights.',
  url: `${SITE_CANONICAL_URL}/dadtrack`,
  image: `${SITE_CANONICAL_URL}/opengraph-image.png`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  sameAs: [DADTRACK_APP_STORE_URL, DADTRACK_GOOGLE_PLAY_URL],
  downloadUrl: [DADTRACK_APP_STORE_URL, DADTRACK_GOOGLE_PLAY_URL],
};

export default function DadTrack() {
  const platform = useDetectedStorePlatform();
  const storeCtas = platform === null ? null : getTrackedStoreCtas(platform);

  const renderStoreCtas = (keyPrefix = '') => {
    if (!storeCtas) {
      return (
        <>
          <div
            key={`${keyPrefix}loading-primary`}
            className="h-[3.25rem] w-40 animate-pulse rounded-lg bg-on-cloth/10"
            aria-hidden="true"
          />
          <div
            key={`${keyPrefix}loading-secondary`}
            className="h-[3.25rem] w-40 animate-pulse rounded-lg bg-on-cloth/10"
            aria-hidden="true"
          />
        </>
      );
    }

    return storeCtas.map((cta, index) => (
      <StoreButton
        key={`${keyPrefix}${cta.key}`}
        cta={cta}
        variant={index === 0 ? 'primary' : 'secondary'}
      />
    ));
  };

  const config: ProductPageConfig = {
    name: 'DadTrack',
    theme: DADTRACK_PAGE_THEME,
    eyebrow: 'The dad journaling app',
    availability: 'Available now on iOS and Android.',
    tagline: 'A journal that remembers the moments, the moods, and who you spent them with.',
    lead:
      'DadTrack helps dads capture everyday moments with photos, voice-to-text, and moods, then turns them into scrapbook recaps you’ll actually reread. Keep a shelf of milestones, share a family timeline with your partner, and keep every memory private by default.',
    features: DADTRACK_FEATURES,
    extras: PRODUCT_EXTRAS,
    keyPoints: DADTRACK_KEY_POINTS,
    comingSoon: PRODUCT_COMING_SOON,
    feedbackHref: '/feedback',
    feedbackPrefix: 'Have feedback or ideas?',
    feedbackLinkLabel: 'Share your thoughts',
    downloadHeading: 'Get DadTrack today',
    downloadLine: 'Free on iOS and Android.',
    renderStoreCtas,
    schema: softwareApplicationSchema,
  };

  return <ProductPage config={config} />;
}
