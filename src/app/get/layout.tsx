import type { Metadata } from 'next';

/**
 * `/get` is a client component, so it cannot export metadata itself. This layout supplies
 * it.
 *
 * Worth getting right: every social bio and post links here, so this title and description
 * are what render in the link-preview card people actually see. Without it the page would
 * inherit the site-wide portfolio metadata, which says nothing about the app.
 *
 * Excluded from search indexes — it is a redirect, and there is nothing here to rank.
 */
export const metadata: Metadata = {
  title: 'Get DadTrack — the dad journal',
  description:
    'One line a day. Ten years from now you’ll be glad you wrote it. Free, private, no ads — on iOS and Android.',
  alternates: { canonical: '/get' },
  robots: { index: false, follow: true },
};

export default function GetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
