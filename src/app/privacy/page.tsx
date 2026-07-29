import type { Metadata } from 'next';
import Link from 'next/link';

import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Privacy — bengreene.dev',
  description:
    'What bengreene.dev collects, why, and how to opt out. Covers this website only; the DadTrack and MomTrack apps have their own privacy policy.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'July 28, 2026';

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-950">
        <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Privacy</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated {LAST_UPDATED}</p>

          <div className="mt-10 space-y-10 text-slate-300">
            <section className="space-y-3">
              <p className="text-slate-400">
                This page covers <strong className="text-slate-200">this website</strong> only.
                The DadTrack and MomTrack apps store your journal entries and photos on your
                device and are covered by their own privacy policy, available on their App
                Store and Google Play listings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Analytics</h2>
              <p>
                This site uses Google Analytics to count visits and understand which pages
                and links people find useful. It records things like which page you viewed,
                roughly where in the world you are, and what kind of device and browser you
                used. Google Analytics sets cookies to tell repeat visits apart.
              </p>
              <p>
                Google Signals is turned off, so your activity here is not joined to your
                Google account, used to build an advertising profile, or tracked across
                devices. This site runs no advertising and shares no data with ad networks.
              </p>
              <p className="text-slate-400">
                To opt out entirely, use{' '}
                <a
                  className="text-teal-400 underline underline-offset-4 hover:text-teal-300"
                  href="https://tools.google.com/dlpage/gaoptout"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google&rsquo;s opt-out browser add-on
                </a>
                , or any content blocker — both work, and neither breaks this site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Links to the app stores</h2>
              <p>
                Links to the App Store and Google Play carry a campaign tag identifying which
                page or social post you came from. This tells me that a post led to an
                install. It does not identify you, and the stores report it back to me only
                as totals.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Forms</h2>
              <p>
                If you submit the waitlist or feedback form, the name, email address, and
                message you enter are saved to a private Google Sheet that only I can read. I
                use them to reply to you and to send occasional updates about the apps. They
                are not sold, shared, or added to any marketing list beyond that.
              </p>
              <p className="text-slate-400">
                Want your submission deleted? Email me and it&rsquo;s gone.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Hosting</h2>
              <p>
                This site is static and hosted on GitHub Pages. GitHub may log requests as
                part of serving it; see GitHub&rsquo;s own privacy statement for details.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p>
                Questions, or want data removed? Get in touch through the{' '}
                <Link
                  className="text-teal-400 underline underline-offset-4 hover:text-teal-300"
                  href="/feedback"
                >
                  feedback page
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
