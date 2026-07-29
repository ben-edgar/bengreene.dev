import Script from 'next/script';

import { GA_MEASUREMENT_ID } from '@/lib/constants';

/**
 * Google Analytics 4, loaded via gtag.js.
 *
 * Deliberately not using `@next/third-parties` — this is a dozen lines and avoids adding
 * a dependency that would need version-tracking alongside Next.
 *
 * Only rendered in production builds so `pnpm dev` traffic never reaches the property.
 * A local `pnpm build && pnpm start` will send events; that is rare enough to accept
 * rather than adding a runtime hostname check that could silently disable analytics on
 * the real site.
 *
 * Google Signals and ad personalization are disabled here rather than only in the GA
 * admin, so the promise made on /privacy is enforced by code that ships with the site
 * instead of by a console setting nobody re-reads. Signals-off also disables GA4 data
 * thresholding, which hides report rows with low user counts.
 *
 * Rendered BEFORE page content in the layout: effects fire in tree order, and `/get`
 * depends on `window.gtag` existing when its own effect runs.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
