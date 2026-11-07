'use client';

import { useSearchParams } from 'next/navigation';

import { StoreButton } from '@/components/StoreButton';
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
      <div className="page-sheet w-full p-8 md:p-12">
        <p className="font-medium text-ink-accent">{model.eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">{model.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{model.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {isResolvingPlatform ? (
            <p className="text-ink-muted">Checking the best download option for this device...</p>
          ) : (
            model.ctas.map((cta, index) => (
              <StoreButton
                key={cta.key}
                cta={cta}
                surface="paper"
                variant={index === 0 ? 'primary' : 'secondary'}
                confetti={false}
              />
            ))
          )}
        </div>

        <div className="mt-8 border-t border-ink/10 pt-6">
          <h2 className="font-display text-2xl text-ink">What to do next</h2>
          <p className="mt-2 leading-relaxed text-ink-muted">{model.reopenInstructions}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{model.momTrackNote}</p>
        </div>
      </div>
    </section>
  );
}
