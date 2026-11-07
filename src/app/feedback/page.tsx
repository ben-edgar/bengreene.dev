import { Suspense } from 'react';

import { Header } from '@/components/Header';
import FeedbackContent from './FeedbackContent';

function FeedbackFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <h1 className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
            Share your feedback
          </h1>
          <p className="mt-6 text-lg text-on-cloth-muted">Loading the feedback form</p>
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
