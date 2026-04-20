# Invite Deep Linking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the `/invite` fallback page plus the iOS and Android association files needed for DadTrack and MomTrack deep links on `bengreene.dev`.

**Architecture:** Keep the feature fully static-site compatible. Store the association files in `public/.well-known/`, add a dedicated `invite` route with route-level metadata, and isolate browser-only query parsing in a suspended client component backed by pure helper functions and file-shape tests.

**Tech Stack:** Next.js 16 App Router with static export, React 19, TypeScript, TailwindCSS v4, Vitest

---

## File Map

- Create: `src/app/invite/layout.tsx`
- Create: `src/app/invite/page.tsx`
- Create: `src/components/invite/InviteFallbackPage.tsx`
- Create: `src/lib/inviteLinks.ts`
- Create: `src/lib/inviteLinks.test.ts`
- Create: `src/lib/inviteAssociationFiles.test.ts`
- Create: `public/.well-known/apple-app-site-association`
- Create: `public/.well-known/assetlinks.json`
- Modify: `DEPLOYMENT.md`

### Responsibilities

- `src/app/invite/layout.tsx`
  Route metadata, canonical URL, and noindex rules following the repo’s existing route-layout pattern.
- `src/app/invite/page.tsx`
  Static shell, `Header`, and the required `Suspense` boundary for a statically rendered route that uses `useSearchParams()` in a child Client Component.
- `src/components/invite/InviteFallbackPage.tsx`
  Client-only view that reads query params, orders DadTrack CTAs by platform, and renders recovery copy for invalid links.
- `src/lib/inviteLinks.ts`
  Pure helper functions for parsing invite params and building the page model.
- `src/lib/inviteLinks.test.ts`
  Unit coverage for parsing, invalid-link behavior, and CTA ordering.
- `src/lib/inviteAssociationFiles.test.ts`
  File-shape tests that lock the exact AASA and `assetlinks.json` contents.
- `public/.well-known/*`
  Production deep-link association artifacts that must survive static export into `out/.well-known/*`.
- `DEPLOYMENT.md`
  Adds explicit local/export and production verification commands for invite deep links.

---

### Task 1: Lock the `.well-known` contract with tests and exact production files

**Files:**
- Create: `src/lib/inviteAssociationFiles.test.ts`
- Create: `public/.well-known/apple-app-site-association`
- Create: `public/.well-known/assetlinks.json`

- [ ] **Step 1: Write the failing file-shape tests**

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function readJsonFile(relativePath: string) {
  return JSON.parse(
    readFileSync(join(root, relativePath), 'utf8'),
  );
}

describe('invite association files', () => {
  it('scopes iOS universal links to /invite for DadTrack and MomTrack', () => {
    const aasa = readJsonFile('public/.well-known/apple-app-site-association');

    expect(aasa).toEqual({
      applinks: {
        apps: [],
        details: [
          {
            appID: '994YRHN9Q4.dev.bengreene.dadtrack',
            paths: ['/invite', '/invite/*'],
          },
          {
            appID: '994YRHN9Q4.dev.bengreene.momtrack',
            paths: ['/invite', '/invite/*'],
          },
        ],
      },
    });
  });

  it('declares all Android release and debug packages with exact signing fingerprints', () => {
    const assetlinks = readJsonFile('public/.well-known/assetlinks.json');

    expect(assetlinks).toEqual([
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: 'dev.bengreene.dadtrack',
          sha256_cert_fingerprints: [
            'C3:31:6D:3B:41:73:C9:B9:62:07:A0:A1:81:14:F1:21:CF:2B:C6:82:57:0F:79:20:CE:05:AE:F5:80:0F:50:83',
          ],
        },
      },
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: 'dev.bengreene.dadtrack.debug',
          sha256_cert_fingerprints: [
            '3C:4F:D9:63:CF:26:54:38:BE:59:26:5E:8D:81:51:4D:7F:1E:80:AB:C4:EE:F9:A5:BE:19:F9:31:86:CE:34:1A',
          ],
        },
      },
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: 'dev.bengreene.momtrack',
          sha256_cert_fingerprints: [
            'B6:A8:84:E3:C7:0C:BF:A6:02:66:44:B1:5E:4A:7A:F6:75:19:5D:D3:58:17:DB:AF:A8:84:8C:36:B2:37:8E:C4',
          ],
        },
      },
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: 'dev.bengreene.momtrack.debug',
          sha256_cert_fingerprints: [
            '3C:4F:D9:63:CF:26:54:38:BE:59:26:5E:8D:81:51:4D:7F:1E:80:AB:C4:EE:F9:A5:BE:19:F9:31:86:CE:34:1A',
          ],
        },
      },
    ]);
  });
});
```

- [ ] **Step 2: Run the test to confirm the files do not exist yet**

Run:

```bash
pnpm exec vitest run src/lib/inviteAssociationFiles.test.ts
```

Expected: FAIL with file read or parse errors because `public/.well-known/*` has not been created yet.

- [ ] **Step 3: Add the exact AASA and Android Asset Links files**

```json
// public/.well-known/apple-app-site-association
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "994YRHN9Q4.dev.bengreene.dadtrack",
        "paths": ["/invite", "/invite/*"]
      },
      {
        "appID": "994YRHN9Q4.dev.bengreene.momtrack",
        "paths": ["/invite", "/invite/*"]
      }
    ]
  }
}
```

```json
// public/.well-known/assetlinks.json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "dev.bengreene.dadtrack",
      "sha256_cert_fingerprints": [
        "C3:31:6D:3B:41:73:C9:B9:62:07:A0:A1:81:14:F1:21:CF:2B:C6:82:57:0F:79:20:CE:05:AE:F5:80:0F:50:83"
      ]
    }
  },
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "dev.bengreene.dadtrack.debug",
      "sha256_cert_fingerprints": [
        "3C:4F:D9:63:CF:26:54:38:BE:59:26:5E:8D:81:51:4D:7F:1E:80:AB:C4:EE:F9:A5:BE:19:F9:31:86:CE:34:1A"
      ]
    }
  },
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "dev.bengreene.momtrack",
      "sha256_cert_fingerprints": [
        "B6:A8:84:E3:C7:0C:BF:A6:02:66:44:B1:5E:4A:7A:F6:75:19:5D:D3:58:17:DB:AF:A8:84:8C:36:B2:37:8E:C4"
      ]
    }
  },
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "dev.bengreene.momtrack.debug",
      "sha256_cert_fingerprints": [
        "3C:4F:D9:63:CF:26:54:38:BE:59:26:5E:8D:81:51:4D:7F:1E:80:AB:C4:EE:F9:A5:BE:19:F9:31:86:CE:34:1A"
      ]
    }
  }
]
```

- [ ] **Step 4: Re-run the file-shape test**

Run:

```bash
pnpm exec vitest run src/lib/inviteAssociationFiles.test.ts
```

Expected: PASS with 2 passing tests.

- [ ] **Step 5: Commit the association file contract**

```bash
git add src/lib/inviteAssociationFiles.test.ts public/.well-known/apple-app-site-association public/.well-known/assetlinks.json
git commit -m "feat: add invite deep link association files"
```

---

### Task 2: Add the pure invite helper module and unit coverage

**Files:**
- Create: `src/lib/inviteLinks.ts`
- Create: `src/lib/inviteLinks.test.ts`

- [ ] **Step 1: Write the failing helper tests**

```ts
import { describe, expect, it } from 'vitest';
import {
  buildInvitePageModel,
  hasRequiredInviteParams,
  parseInviteSearchParams,
} from './inviteLinks';

describe('invite links', () => {
  it('parses the invite params and trims senderName', () => {
    const params = new URLSearchParams({
      familyId: 'fam_123',
      inviteToken: 'abc123',
      senderName: ' Ben ',
    });

    expect(parseInviteSearchParams(params)).toEqual({
      familyId: 'fam_123',
      inviteToken: 'abc123',
      senderName: 'Ben',
    });
  });

  it('treats empty strings as missing values', () => {
    const params = new URLSearchParams({
      familyId: '',
      inviteToken: '   ',
      senderName: '  ',
    });

    expect(parseInviteSearchParams(params)).toEqual({
      familyId: null,
      inviteToken: null,
      senderName: null,
    });
  });

  it('requires both familyId and inviteToken for a valid invite', () => {
    expect(
      hasRequiredInviteParams({
        familyId: 'fam_123',
        inviteToken: 'abc123',
        senderName: 'Ben',
      }),
    ).toBe(true);

    expect(
      hasRequiredInviteParams({
        familyId: 'fam_123',
        inviteToken: null,
        senderName: 'Ben',
      }),
    ).toBe(false);
  });

  it('orders Google Play first for Android while preserving the recovery instructions', () => {
    const model = buildInvitePageModel(
      {
        familyId: 'fam_123',
        inviteToken: 'abc123',
        senderName: 'Ben',
      },
      'android',
    );

    expect(model.variant).toBe('ready');
    expect(model.title).toContain('Ben');
    expect(model.ctas[0].key).toBe('android');
    expect(model.reopenInstructions).toContain('reopen the original invite link');
    expect(model.momTrackNote).toContain('MomTrack support is coming soon');
  });

  it('falls back to an invalid-link state when required params are missing', () => {
    const model = buildInvitePageModel(
      {
        familyId: null,
        inviteToken: null,
        senderName: null,
      },
      'other',
    );

    expect(model.variant).toBe('invalid');
    expect(model.title).toContain('invite link looks incomplete');
    expect(model.ctas[0].key).toBe('ios');
  });
});
```

- [ ] **Step 2: Run the helper tests to confirm they fail**

Run:

```bash
pnpm exec vitest run src/lib/inviteLinks.test.ts
```

Expected: FAIL because `src/lib/inviteLinks.ts` does not exist yet.

- [ ] **Step 3: Implement the pure helper module**

```ts
import { getTrackedStoreCtas, type StorePlatform } from './storeLinks';

export type InviteLinkParams = {
  familyId: string | null;
  inviteToken: string | null;
  senderName: string | null;
};

export type InvitePageModel = {
  variant: 'ready' | 'invalid';
  eyebrow: string;
  title: string;
  description: string;
  reopenInstructions: string;
  momTrackNote: string;
  ctas: ReturnType<typeof getTrackedStoreCtas>;
};

function normalizeParam(value: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function parseInviteSearchParams(
  params: URLSearchParams | ReadonlyURLSearchParams,
): InviteLinkParams {
  return {
    familyId: normalizeParam(params.get('familyId')),
    inviteToken: normalizeParam(params.get('inviteToken')),
    senderName: normalizeParam(params.get('senderName')),
  };
}

export function hasRequiredInviteParams(params: InviteLinkParams): boolean {
  return Boolean(params.familyId && params.inviteToken);
}

export function buildInvitePageModel(
  params: InviteLinkParams,
  platform: StorePlatform,
): InvitePageModel {
  const ctas = getTrackedStoreCtas(platform);
  const validInvite = hasRequiredInviteParams(params);

  if (!validInvite) {
    return {
      variant: 'invalid',
      eyebrow: 'Invite Link',
      title: 'This invite link looks incomplete',
      description:
        'The invite may have been copied without all of its details. Install DadTrack, then go back to the original message and open the full invite link again.',
      reopenInstructions:
        'After installing DadTrack, reopen the original invite link from the message or email where it was shared.',
      momTrackNote:
        'MomTrack support is coming soon. Invite links already reserve compatibility for MomTrack builds.',
      ctas,
    };
  }

  const inviter = params.senderName ? `${params.senderName} invited you` : 'You were invited';

  return {
    variant: 'ready',
    eyebrow: 'Family Invite',
    title: `${inviter} to join a family group`,
    description:
      'DadTrack is available now on iOS and Android. Install the app on this device to continue with the invite flow.',
    reopenInstructions:
      'After installing DadTrack, reopen the original invite link from the message or email where it was shared to continue inside the app.',
    momTrackNote:
      'MomTrack support is coming soon. The deep-link association files already support MomTrack installs when that app is ready.',
    ctas,
  };
}
```

- [ ] **Step 4: Re-run the helper tests**

Run:

```bash
pnpm exec vitest run src/lib/inviteLinks.test.ts
```

Expected: PASS with 5 passing tests.

- [ ] **Step 5: Commit the helper module**

```bash
git add src/lib/inviteLinks.ts src/lib/inviteLinks.test.ts
git commit -m "feat: add invite fallback helpers"
```

---

### Task 3: Build the `/invite` route shell, metadata, and client fallback page

**Files:**
- Create: `src/app/invite/layout.tsx`
- Create: `src/app/invite/page.tsx`
- Create: `src/components/invite/InviteFallbackPage.tsx`

- [ ] **Step 1: Add route metadata using the repo’s existing layout pattern**

```ts
import type { Metadata } from 'next';
import { SITE_CANONICAL_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Family Invite – DadTrack',
  description:
    'Install DadTrack to continue a family invite from DadTrack or MomTrack.',
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: '/invite',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Family Invite – DadTrack',
    description:
      'Install DadTrack to continue a family invite from DadTrack or MomTrack.',
    type: 'website',
    url: '/invite',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1024,
        height: 1024,
        alt: 'DadTrack app icon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Family Invite – DadTrack',
    description:
      'Install DadTrack to continue a family invite from DadTrack or MomTrack.',
    images: ['/twitter-image.png'],
  },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Add the client fallback page that uses the helper model and existing `Button` component**

```tsx
'use client';

import { Button } from '@/components/Button';
import { buildInvitePageModel, parseInviteSearchParams } from '@/lib/inviteLinks';
import { useDetectedStorePlatform } from '@/lib/storeLinks';
import { useSearchParams } from 'next/navigation';

export function InviteFallbackPage() {
  const searchParams = useSearchParams();
  const platform = useDetectedStorePlatform() ?? 'other';
  const inviteParams = parseInviteSearchParams(searchParams);
  const model = buildInvitePageModel(inviteParams, platform);

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

          <div className="flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap">
            {model.ctas.map((cta) => (
              <Button
                key={cta.key}
                href={cta.href}
                size="lg"
                mobileFullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                {cta.buttonLabel}
              </Button>
            ))}
          </div>

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
```

- [ ] **Step 3: Add the statically exported invite page shell with the required `Suspense` boundary**

```tsx
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
              Checking your invite details and the best download option for this device.
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
```

- [ ] **Step 4: Run the unit tests and build to verify the route is static and exported**

Run:

```bash
pnpm exec vitest run src/lib/inviteLinks.test.ts src/lib/inviteAssociationFiles.test.ts
pnpm build
find out/.well-known -maxdepth 2 -type f | sort
```

Expected:

- Vitest passes for both new test files.
- `pnpm build` succeeds.
- build output includes `/invite` in the route list.
- `find` output includes:

```text
out/.well-known/apple-app-site-association
out/.well-known/assetlinks.json
```

- [ ] **Step 5: Commit the invite route**

```bash
git add src/app/invite/layout.tsx src/app/invite/page.tsx src/components/invite/InviteFallbackPage.tsx
git commit -m "feat: add invite fallback page"
```

---

### Task 4: Document deployment verification and run final repo checks

**Files:**
- Modify: `DEPLOYMENT.md`

- [ ] **Step 1: Add a dedicated invite deep-link verification section to `DEPLOYMENT.md`**

````md
## Invite Deep Link Verification

Whenever you change `src/app/invite/*` or `public/.well-known/*`, run:

```bash
pnpm exec vitest run src/lib/inviteLinks.test.ts src/lib/inviteAssociationFiles.test.ts
pnpm build
find out/.well-known -maxdepth 2 -type f | sort
```

Before shipping to production, verify the deployed responses:

```bash
curl -I https://bengreene.dev/.well-known/apple-app-site-association
curl -I https://bengreene.dev/.well-known/assetlinks.json
```

Required production result:

- `200 OK`
- no redirect
- JSON content type

If the AASA file is not returned with a JSON-compatible content type from GitHub Pages, keep `/invite` on Pages and move only the association files to a host that allows header control.
````

- [ ] **Step 2: Run the final local verification suite**

Run:

```bash
pnpm exec vitest run src/components/Button.test.tsx src/app/about/page.test.tsx src/lib/storeLinks.test.ts src/lib/inviteLinks.test.ts src/lib/inviteAssociationFiles.test.ts
pnpm lint
pnpm build
```

Expected:

- all targeted Vitest files pass
- `pnpm lint` exits cleanly
- `pnpm build` exits cleanly and prints the static route table including `/invite`

- [ ] **Step 3: Inspect the exported artifact paths one more time**

Run:

```bash
find out -maxdepth 3 \( -path 'out/.well-known/*' -o -path 'out/invite*' \) | sort
```

Expected output includes:

```text
out/.well-known/apple-app-site-association
out/.well-known/assetlinks.json
out/invite
out/invite.html
```

- [ ] **Step 4: Commit the deployment verification notes**

```bash
git add DEPLOYMENT.md
git commit -m "docs: add invite deep link verification steps"
```

- [ ] **Step 5: Record the production-only checks for handoff**

```text
1. Deploy the branch to GitHub Pages.
2. Run:
   curl -I https://bengreene.dev/.well-known/apple-app-site-association
   curl -I https://bengreene.dev/.well-known/assetlinks.json
3. Verify iOS DadTrack and MomTrack open from an /invite link when installed.
4. Verify Android DadTrack and MomTrack release + debug builds open from an /invite link when installed.
5. Verify the browser fallback page appears when the app is not installed.
```

---

## Self-Review Checklist

- Spec coverage:
  - `/invite` fallback page: covered by Tasks 2 and 3
  - AASA and `assetlinks.json`: covered by Task 1
  - GitHub Pages validation gate: covered by Task 4
  - MomTrack coming-soon copy and Android debug support: covered by Tasks 1, 2, and 3
- Placeholder scan:
  - no TBD/TODO placeholders remain
  - exact Android fingerprints are included
  - exact file paths are included
- Type consistency:
  - helper names and file names match across tasks
  - metadata lives in `src/app/invite/layout.tsx` to match repo conventions
  - `Suspense` is explicitly included because the route remains statically rendered while the child client component uses `useSearchParams()`
