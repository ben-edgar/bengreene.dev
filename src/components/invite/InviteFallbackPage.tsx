'use client';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/Button';
import {
  buildInvitePageModel,
  parseInviteSearchParams,
} from '@/lib/inviteLinks';
import { useDetectedStorePlatform } from '@/lib/storeLinks';

export function InviteFallbackPage() {
  const searchParams = useSearchParams();
  const platform = useDetectedStorePlatform();
  const inviteParams = parseInviteSearchParams(searchParams);
  const model = buildInvitePageModel(inviteParams, platform ?? 'other');
  const isResolvingPlatform = platform === null;

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.98),rgba(15,118,110,0.16),rgba(15,23,42,0.98))] p-8 shadow-[0_20px_80px_rgba(20,184,166,0.18)] backdrop-blur-xl md:p-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300">
            {model.eyebrow}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {model.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
              {model.description}
            </p>
          </div>

          {isResolvingPlatform ? (
            <div className="flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap">
              <div className="w-full rounded-xl border border-dashed border-white/15 bg-white/5 px-5 py-4 text-sm text-slate-300 sm:w-auto">
                Checking the best download option for this device...
              </div>
            </div>
          ) : (
            <div className="flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap">
              {model.ctas.map((cta) => (
                <Button
                  key={cta.key}
                  href={cta.href}
                  mobileFullWidth
                  rel="noopener noreferrer"
                  size="lg"
                  target="_blank"
                >
                  {cta.buttonLabel}
                </Button>
              ))}
            </div>
          )}

          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              What to do next
            </p>
            <p className="text-base leading-relaxed text-slate-300">
              {model.reopenInstructions}
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              {model.momTrackNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
