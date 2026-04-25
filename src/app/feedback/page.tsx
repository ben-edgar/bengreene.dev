import { Suspense } from 'react';

import { Header } from '@/components/Header';
import FeedbackContent from './FeedbackContent';

function FeedbackFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="relative flex-1">
        <section className="relative mx-auto max-w-2xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              Share Your Feedback
            </h1>
            <p className="text-lg text-slate-400">
              Loading the feedback form
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<FeedbackFallback />}>
      <FeedbackContent />
    </Suspense>
  );
}
