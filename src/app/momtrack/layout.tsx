import type { Metadata } from 'next';
import { MOMTRACK_SHARE_IMAGE, SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'MomTrack — Mom Journaling App',
  description:
    'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now available to download on the App Store.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/momtrack',
  },
  // Replaces the root layout's DadTrack icons outright. This only works because the site
  // favicon lives in public/: Next would prepend an app/favicon.ico to this list.
  icons: {
    icon: [
      { url: '/images/momtrack/icons/favicon.ico', sizes: 'any' },
      { url: '/images/momtrack/icons/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/images/momtrack/icons/apple-icon.png', type: 'image/png' }],
    shortcut: ['/images/momtrack/icons/favicon.ico'],
  },
  openGraph: {
    title: 'MomTrack — Mom Journaling App',
    description:
      'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now available to download on the App Store.',
    type: 'website',
    url: '/momtrack',
    images: [
      {
        url: MOMTRACK_SHARE_IMAGE,
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
      'MomTrack is the mom-focused journaling app for capturing memories, moods, and milestones. Now available to download on the App Store.',
    images: [MOMTRACK_SHARE_IMAGE],
  },
};

export default function MomTrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
