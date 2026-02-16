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
    <main className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">DadTrack Is Live on iOS and Android</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Redirecting you to the DadTrack page. If you are not redirected, use the link below.
        </p>
        <Link
          href="/dadtrack"
          className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          Go to DadTrack
        </Link>
      </div>
    </main>
  );
}
