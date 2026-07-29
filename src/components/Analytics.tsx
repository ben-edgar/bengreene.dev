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
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
