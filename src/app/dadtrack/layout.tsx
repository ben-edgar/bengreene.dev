import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DadTrack – Dad Life Companion App',
  description:
    'DadTrack helps dads capture daily moments with their kids through journaling, photos, mood tracking, and memory streaks.',
  openGraph: {
    title: 'DadTrack – Dad Life Companion App',
    description: 'A dad-focused journaling app for capturing memories with your kids.',
    type: 'website',
  },
};

export default function DadTrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
