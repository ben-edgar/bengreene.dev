import type { Metadata } from 'next';
import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MomTrack — Mom Journaling App',
  description:
    'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/momtrack',
  },
  openGraph: {
    title: 'MomTrack — Mom Journaling App',
    description:
      'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
    type: 'website',
    url: '/momtrack',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1024,
        height: 1024,
        alt: 'MomTrack app icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'MomTrack — Mom Journaling App',
    description:
      'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
    images: ['/twitter-image.png'],
  },
};

export default function MomTrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
