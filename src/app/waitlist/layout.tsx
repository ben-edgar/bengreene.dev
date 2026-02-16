import type { Metadata } from 'next';
import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'DadTrack Redirect',
  description: 'DadTrack is now available on iOS and Android. Redirecting to the DadTrack page.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/dadtrack',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'DadTrack Is Live on iOS and Android',
    description: 'DadTrack is now available on iOS and Android.',
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
    title: 'DadTrack Is Live on iOS and Android',
    description: 'DadTrack is now available on iOS and Android.',
    images: ['/twitter-image.png'],
  },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
