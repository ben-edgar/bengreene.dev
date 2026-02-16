import type { Metadata } from 'next';
import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Ben Greene',
  description:
    'Learn about Ben Greene, an engineering leader passionate about building effective teams, shipping software, and mentoring engineers.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Ben Greene',
    description: 'Engineering leader and creator of DadTrack.',
    type: 'website',
    url: '/about',
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
    title: 'About Ben Greene',
    description: 'Engineering leader and creator of DadTrack.',
    images: ['/twitter-image.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
