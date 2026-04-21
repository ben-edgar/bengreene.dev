import type { Metadata } from 'next';

import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Family Invite – DadTrack',
  description:
    'Install DadTrack to continue a family invite from DadTrack or MomTrack.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/invite',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Family Invite – DadTrack',
    description:
      'Install DadTrack to continue a family invite from DadTrack or MomTrack.',
    type: 'website',
    url: '/invite',
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
    title: 'Family Invite – DadTrack',
    description:
      'Install DadTrack to continue a family invite from DadTrack or MomTrack.',
    images: ['/twitter-image.png'],
  },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
