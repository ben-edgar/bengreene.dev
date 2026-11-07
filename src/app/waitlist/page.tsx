'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WaitlistRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dadtrack');
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="font-display text-4xl md:text-5xl">DadTrack is live on iOS and Android</h1>
        <p className="text-on-cloth-muted">
          Redirecting you to the DadTrack page. If you are not redirected, use the link below.
        </p>
        <Link
          href="/dadtrack"
          className="inline-flex items-center justify-center rounded-lg bg-on-cloth px-5 py-3 font-medium text-cloth-deep transition-colors hover:bg-white"
        >
          Go to DadTrack
        </Link>
      </div>
    </main>
  );
}
