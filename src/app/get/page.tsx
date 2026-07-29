'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { parseCampaignParams } from '@/lib/campaignLinks';
import { resolveGetDestination, type GetDestination } from '@/lib/getRedirect';
import { useDetectedStorePlatform } from '@/lib/storeLinks';

/**
 * `/get` — the single link used in every social bio and post.
 *
 * Detects the visitor's platform and forwards to the right store, carrying any inbound
 * campaign parameters through so an install can be traced back to the post that caused it.
 *
 * The pageview on this route IS the click-tracking event: anyone landing here is on their
 * way to a store, so no outbound-click instrumentation is needed. Analytics fires from the
 * root layout before the redirect runs.
 *
 * Platform detection needs browser globals, so this is client-only. Under `output: export`
 * the page ships as static HTML and resolves the destination after hydration.
 */
export default function Get() {
  const platform = useDetectedStorePlatform();
  const [destination, setDestination] = useState<GetDestination | null>(null);

  useEffect(() => {
    if (!platform) {
      return;
    }

    const resolved = resolveGetDestination(
      platform,
      parseCampaignParams(window.location.search),
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDestination(resolved);

    // Give the analytics beacon a moment to fire before navigating away. `replace` keeps
    // /get out of history so the back button returns to the referring site, not here.
    const timer = window.setTimeout(() => {
      window.location.replace(resolved.href);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [platform]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 px-6 text-center">
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-teal-400"
      />

      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-slate-100">Opening DadTrack…</h1>
        <p className="text-sm text-slate-400" role="status">
          Taking you to the right store for your device.
        </p>
      </div>

      {/* Fallback for anyone the redirect misses: no JavaScript, a blocked redirect,
          or a slow connection. Also the accessible path for screen readers. */}
      {destination ? (
        destination.isStore ? (
          <a
            className="text-sm font-medium text-teal-400 underline underline-offset-4 hover:text-teal-300"
            href={destination.href}
          >
            {destination.label}
          </a>
        ) : (
          <Link
            className="text-sm font-medium text-teal-400 underline underline-offset-4 hover:text-teal-300"
            href={destination.href}
          >
            {destination.label}
          </Link>
        )
      ) : (
        <Link
          className="text-sm font-medium text-teal-400 underline underline-offset-4 hover:text-teal-300"
          href="/dadtrack"
        >
          View DadTrack
        </Link>
      )}
    </main>
  );
}
