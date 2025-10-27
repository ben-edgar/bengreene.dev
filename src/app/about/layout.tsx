import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Ben Greene',
  description:
    'Learn about Ben Greene, an engineering leader passionate about building effective teams, shipping software, and mentoring engineers.',
  openGraph: {
    title: 'About Ben Greene',
    description: 'Engineering leader and creator of DadTrack.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
