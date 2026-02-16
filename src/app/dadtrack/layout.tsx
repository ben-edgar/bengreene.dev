import type { Metadata } from 'next';
import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'DadTrack – Dad Life Companion App',
  description:
    'DadTrack helps dads capture daily moments with their kids through journaling, photos, mood tracking, and memory streaks. Available on iOS and Android.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/dadtrack',
  },
  openGraph: {
    title: 'DadTrack – Dad Life Companion App',
    description: 'A dad-focused journaling app for capturing memories with your kids. Available on iOS and Android.',
    type: 'website',
    url: '/dadtrack',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1024,
        height: 1024,
        alt: 'DadTrack app icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'DadTrack – Dad Life Companion App',
    description: 'A dad-focused journaling app now available on iOS and Android.',
    images: ['/twitter-image.png'],
  },
};

export default function DadTrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
