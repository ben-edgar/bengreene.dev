'use client';

import { Button } from '@/components/Button';
import { ProductPage, type ProductPageConfig } from '@/components/product/ProductPage';
import {
  DADTRACK_APP_STORE_URL,
  DADTRACK_GOOGLE_PLAY_URL,
  SITE_CANONICAL_URL,
} from '@/lib/constants';
import {
  DADTRACK_FEATURES,
  DADTRACK_KEY_POINTS,
  DADTRACK_PAGE_THEME,
  PRODUCT_EXTRAS,
  PRODUCT_ROADMAP,
} from '@/lib/productContent';
import { getTrackedStoreCtas, useDetectedStorePlatform } from '@/lib/storeLinks';
import { CONFETTI_NAVIGATION_DELAY_MS, fireConfetti } from '@/lib/confetti';

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
            className="h-14 w-64 rounded-xl bg-slate-800 animate-pulse"
            aria-hidden="true"
          />
          <div
            key={`${keyPrefix}loading-secondary`}
            className="h-14 w-64 rounded-xl bg-slate-800 animate-pulse"
            aria-hidden="true"
          />
        </>
      );
    }

    return storeCtas.map((cta, index) => (
      <Button
        key={`${keyPrefix}${cta.key}`}
        href={cta.href}
        variant={index === 0 ? undefined : 'secondary'}
        size="lg"
        mobileFullWidth
        target="_blank"
        rel="noopener noreferrer"
        externalNavigationDelayMs={CONFETTI_NAVIGATION_DELAY_MS}
        onClick={() => fireConfetti('dadtrack')}
      >
        {cta.buttonLabel}
      </Button>
    ));
  };

  const config: ProductPageConfig = {
    name: 'DadTrack',
    theme: DADTRACK_PAGE_THEME,
    eyebrow: '📱 The Dad Journaling App',
    availability: {
      label: 'Now Available on iOS and Android!',
      pillClass: 'bg-green-900/50 text-green-300',
      pingClass: 'bg-green-400',
      dotClass: 'bg-green-500',
    },
    tagline: 'A journal that remembers the moments, the moods, and who you spent them with.',
    lead:
      'DadTrack helps dads capture everyday moments with photos, voice-to-text, and mood tracking, then turns them into monthly recaps you’ll actually reread. Share a family timeline with your partner, tag the people who were there, and keep every memory private by default.',
    features: DADTRACK_FEATURES,
    extras: PRODUCT_EXTRAS,
    keyPoints: DADTRACK_KEY_POINTS,
    roadmap: PRODUCT_ROADMAP,
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
