import type { Metadata } from 'next';
import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Submit DadTrack Feedback',
  description:
    'Share your thoughts, ideas, and feedback about DadTrack. Help us build the best dad life companion app.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/feedback',
  },
  openGraph: {
    title: 'Submit DadTrack Feedback',
    description: 'Share your thoughts and help us improve DadTrack.',
    type: 'website',
    url: '/feedback',
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
    title: 'Submit DadTrack Feedback',
    description: 'Share your thoughts and help us improve DadTrack.',
    images: ['/twitter-image.png'],
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
