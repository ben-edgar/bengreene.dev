import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit DadTrack Feedback',
  description:
    'Share your thoughts, ideas, and feedback about DadTrack. Help us build the best dad life companion app.',
  openGraph: {
    title: 'Submit DadTrack Feedback',
    description: 'Share your thoughts and help us improve DadTrack.',
    type: 'website',
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
