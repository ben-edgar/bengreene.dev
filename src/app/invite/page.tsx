import { Suspense } from 'react';

import { Header } from '@/components/Header';
import { InviteFallbackPage } from '@/components/invite/InviteFallbackPage';

function InviteFallbackSkeleton() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_80px_rgba(20,184,166,0.12)] md:p-12">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300">
            Family Invite
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Open this invite in DadTrack
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
              Checking your invite details and the best download option for this
              device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function InvitePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <Suspense fallback={<InviteFallbackSkeleton />}>
          <InviteFallbackPage />
        </Suspense>
      </main>
    </div>
  );
}
