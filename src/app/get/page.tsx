'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ANALYTICS_SETTLE_TIMEOUT_MS, trackGetRedirect } from '@/lib/analyticsEvents';
import { basePath } from '@/lib/basePath';
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

    const campaign = parseCampaignParams(window.location.search);
    const resolved = resolveGetDestination(platform, campaign);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDestination(resolved);

    let navigated = false;

    // `replace` keeps /get out of history, so the back button returns to the referring
    // site rather than bouncing through here.
    const go = () => {
      if (navigated) {
        return;
      }

      navigated = true;

      // Store links are absolute. The desktop fallback is app-relative, so it needs the
      // basePath prefix that <Link> would have applied — otherwise a subdirectory
      // deployment (see DEPLOYMENT.md) 404s every desktop visitor arriving from a bio.
      window.location.replace(
        resolved.isStore ? resolved.href : `${basePath}${resolved.href}`,
      );
    };

    // Redirect as soon as the analytics hit has been sent. The outer timer is the
    // backstop for the case gtag's own event_timeout cannot cover: if gtag.js is blocked
    // or never loads, the queued event is never processed and no callback ever fires.
    const fallback = window.setTimeout(go, ANALYTICS_SETTLE_TIMEOUT_MS);

    trackGetRedirect(
      { campaign, destination: resolved.href, platform },
      go,
    );

    return () => {
      navigated = true;
      window.clearTimeout(fallback);
    };
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
