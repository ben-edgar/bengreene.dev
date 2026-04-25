'use client';

import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import AnimatedTimeline from '@/components/AnimatedTimeline';
import HeroSection from '@/components/HeroSection';
import MobileShowcase from '@/components/MobileShowcase';
import { GlowDivider } from '@/components/GlowDivider';
import { getAssetPath } from '@/lib/basePath';
import {
  DADTRACK_HOME_SHOWCASE_SCREENSHOTS,
  MOMTRACK_BETA_CTA,
} from '@/lib/productContent';
import {
  getTrackedStoreCtas,
  useDetectedStorePlatform,
} from '@/lib/storeLinks';

export default function Home() {
  const platform = useDetectedStorePlatform();
  const storePlatform = platform ?? 'other';
  const storeCtas = getTrackedStoreCtas(storePlatform);
  const screenshots = DADTRACK_HOME_SHOWCASE_SCREENSHOTS.map((screenshot) => ({
    ...screenshot,
    src: getAssetPath(screenshot.src),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-slate-950">
        <HeroSection />

        {/* Professional Highlights */}
        <section className="border-y border-white/10 bg-slate-900/40">
          <AnimatedTimeline />
        </section>

        <GlowDivider className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" />

        {/* Current Projects */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Current Projects
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                I&apos;m building focused journaling tools for parents who want to capture
                everyday memories without turning reflection into another chore.
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <FadeIn delay={0.3}>
              <article className="h-full rounded-2xl border border-teal-400/25 bg-gradient-to-br from-teal-950/70 via-slate-900 to-blue-950/50 p-6 shadow-2xl shadow-teal-950/20 sm:p-8">
                <div className="flex h-full flex-col gap-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-200">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300"></span>
                      </span>
                      Live on iOS &amp; Android
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white sm:text-3xl">
                        DadTrack
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-slate-300">
                        A dad-focused parenting journal for capturing moods, memories,
                        milestones, photos, daily tips, monthly recaps, and cloud-backed
                        moments that are easy to revisit.
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex w-full flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                    <Button href="/dadtrack" size="lg" mobileFullWidth>
                      Learn More
                    </Button>
                    {storeCtas.map((storeCta) => (
                      <Button
                        key={storeCta.key}
                        href={storeCta.href}
                        variant="secondary"
                        size="lg"
                        mobileFullWidth
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {storeCta.buttonLabel}
                      </Button>
                    ))}
                  </div>
                </div>
              </article>
            </FadeIn>

            <FadeIn delay={0.4}>
              <article className="h-full rounded-2xl border border-rose-300/25 bg-gradient-to-br from-rose-950/70 via-slate-900 to-red-950/50 p-6 shadow-2xl shadow-rose-950/20 sm:p-8">
                <div className="flex h-full flex-col gap-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/25 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300"></span>
                      </span>
                      Now in Beta
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white sm:text-3xl">
                        MomTrack
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-slate-300">
                        A mom-focused companion app with the same memory-keeping
                        foundation, tuned for mothers and currently available through
                        TestFlight while the beta expands.
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex w-full flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                    <Button
                      href={MOMTRACK_BETA_CTA.href}
                      size="lg"
                      tone="momtrack"
                      mobileFullWidth
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join the Beta
                    </Button>
                    <Button
                      href="/momtrack"
                      variant="secondary"
                      size="lg"
                      tone="momtrack"
                      mobileFullWidth
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </article>
            </FadeIn>
          </div>
        </section>

        {/* Screenshot Grid Section */}
        <section className="border-y border-white/10 bg-slate-900/40">
          <MobileShowcase screenshots={screenshots} backgroundColor="bg-transparent" />
        </section>

        <GlowDivider className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" />

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Let&apos;s Connect
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-300 leading-relaxed">
                Interested in DadTrack or want to connect? I&apos;d love to hear from you.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex w-full max-w-md mx-auto flex-col gap-4 pt-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
                <Button
                  href={storeCtas[0].href}
                  size="lg"
                  mobileFullWidth
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {storeCtas[0].buttonLabel}
                </Button>
                <Button
                  href={storeCtas[1].href}
                  variant="secondary"
                  size="lg"
                  mobileFullWidth
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {storeCtas[1].buttonLabel}
                </Button>
                <Button href="https://www.linkedin.com/in/ben-greene-dev/" variant="secondary" size="lg" mobileFullWidth target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
}
