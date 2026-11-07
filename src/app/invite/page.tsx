import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { InviteFallbackPage } from '@/components/invite/InviteFallbackPage';

function InviteFallbackSkeleton() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="page-sheet w-full p-8 md:p-12">
        <p className="font-medium text-ink-accent">Family Invite</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">
          Open this invite in DadTrack
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Checking your invite details and the best download option for this device.
        </p>
      </div>
    </section>
  );
}

export default function InvitePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Suspense fallback={<InviteFallbackSkeleton />}>
          <InviteFallbackPage />
        </Suspense>
      </main>
    </div>
  );
}
