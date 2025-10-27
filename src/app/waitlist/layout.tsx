import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the DadTrack Waitlist',
  description:
    'Sign up for early access to DadTrack and help shape the future of the dad life companion app.',
  openGraph: {
    title: 'Join the DadTrack Waitlist',
    description: 'Be among the first to get early access to DadTrack.',
    type: 'website',
  },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
