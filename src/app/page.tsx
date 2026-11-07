'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button } from '@/components/Button';
import Experience from '@/components/Experience';
import { Header } from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { PhoneFrame } from '@/components/product/PhoneFrame';
import { StoreButton } from '@/components/StoreButton';
import { getAssetPath } from '@/lib/basePath';
import { MOMTRACK_STORE_CTA } from '@/lib/productContent';
import { getTrackedStoreCtas, useDetectedStorePlatform } from '@/lib/storeLinks';

interface ProjectProps {
  name: string;
  href: string;
  availability: string;
  description: string;
  screenshot: string;
  screenshotAlt: string;
  tone?: 'dadtrack' | 'momtrack';
  children: ReactNode;
}

/** One page of the open book: an app, its home screen, and where to get it. */
function Project({
  name,
  href,
  availability,
  description,
  screenshot,
  screenshotAlt,
  tone = 'dadtrack',
  children,
}: ProjectProps) {
  return (
    <article
      data-tone={tone === 'momtrack' ? tone : undefined}
      className="flex flex-col gap-7 p-6 sm:p-10 xl:p-12"
    >
      {/* The phone floats so the copy keeps a readable measure beside it on a narrow page. */}
      <div className="flow-root">
        <PhoneFrame
          src={getAssetPath(screenshot)}
          alt={screenshotAlt}
          sizes="160px"
          className="float-right mb-3 ml-5 w-28 sm:ml-8 sm:w-[9.5rem]"
        />
        <h3 className="font-display text-4xl text-ink md:text-5xl">{name}</h3>
        <p className="mt-2 font-medium text-ink-accent">{availability}</p>
        <p className="mt-4 leading-relaxed text-ink-muted">{description}</p>
        <Link
          href={href}
          className="mt-4 inline-block font-medium text-ink underline decoration-ink-accent decoration-2 underline-offset-4 hover:text-ink-accent"
        >
          Learn more about {name}
        </Link>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 sm:gap-3">{children}</div>
    </article>
  );
}

export default function Home() {
  const platform = useDetectedStorePlatform();
  const storeCtas = getTrackedStoreCtas(platform ?? 'other');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="page-sheet">
            <header className="max-w-2xl px-6 pt-10 sm:px-10 sm:pt-14 xl:px-12">
              <h2 className="font-display text-4xl text-ink md:text-5xl">Current projects</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                I&apos;m building focused journaling tools for parents who want to capture
                everyday memories without turning reflection into another chore.
              </p>
            </header>

            {/* Two facing pages, with the fold of the book between them. */}
            <div className="mt-2 grid divide-y divide-ink/10 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              <Project
                name="DadTrack"
                href="/dadtrack"
                availability="Live on iOS &amp; Android"
                description="A dad-focused parenting journal with a shared family timeline, partner sharing, voice journaling, AI tips, monthly recaps, and cloud-backed memories that are easy to revisit."
                screenshot="/images/dadtrack/01-home-feed.webp"
                screenshotAlt="DadTrack home timeline, with taped polaroids of two children"
              >
                {storeCtas.map((cta, index) => (
                  <StoreButton
                    key={cta.key}
                    cta={cta}
                    surface="paper"
                    variant={index === 0 ? 'primary' : 'secondary'}
                  />
                ))}
              </Project>

              <Project
                name="MomTrack"
                href="/momtrack"
                availability="Live on iOS"
                description="A mom-focused companion with the same shared family timeline, partner sharing, voice journaling, AI tips, and memory-keeping foundation."
                screenshot="/images/momtrack/01-home-feed.webp"
                screenshotAlt="MomTrack home timeline, with taped polaroids of two children"
                tone="momtrack"
              >
                <StoreButton cta={MOMTRACK_STORE_CTA} surface="paper" tone="momtrack" />
              </Project>
            </div>
          </div>
        </section>

        <Experience />

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-4xl md:text-5xl">Let’s connect</h2>
              <p className="mt-4 text-lg leading-relaxed text-on-cloth-muted">
                Interested in my apps or want to connect? I&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                href="https://www.linkedin.com/in/ben-greene-dev/"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </Button>
              <Button href="/feedback" variant="secondary" size="lg">
                Send feedback
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
