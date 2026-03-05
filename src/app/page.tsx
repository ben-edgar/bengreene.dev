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
  DADTRACK_APP_STORE_URL_TRACKED,
  DADTRACK_GOOGLE_PLAY_URL_TRACKED,
} from '@/lib/constants';

export default function Home() {
  const screenshots = [
    {
      src: getAssetPath('/images/dadtrack/1_homescreen_with_tip.png'),
      alt: 'DadTrack Home Timeline with AI Tip',
      title: 'AI-Powered Daily Tips',
      description: 'Get personalized parenting tips powered by AI, right in your timeline',
    },
    {
      src: getAssetPath('/images/dadtrack/2_monthly_recap.png'),
      alt: 'DadTrack Monthly Recap',
      title: 'Monthly AI Recaps',
      description: 'Beautiful narrative summaries of your journaling journey each month',
    },
    {
      src: getAssetPath('/images/dadtrack/3_magazine_mode.png'),
      alt: 'DadTrack Magazine Mode',
      title: 'Immersive Magazine Mode',
      description: 'Relive your moments with full-screen photos and dramatic typography',
    },
  ];

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

        {/* DadTrack Introduction */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Current Project: DadTrack
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-300 leading-relaxed">
                As an engineering leader and dad, I built DadTrack from a simple insight:
                parenting is one of the most meaningful journeys we take, yet the moments slip away too quickly.
                DadTrack helps dads capture the small, everyday moments—the moods, the memories, the milestones—
                so you can reflect on them, share them with family, and never lose sight of what matters most.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 text-green-300 rounded-full text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Now Available on iOS and Android!
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <Button href="/dadtrack" size="lg">
                  Learn More
                </Button>
                <Button
                  href={DADTRACK_APP_STORE_URL_TRACKED}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🍎 Download on the App Store
                </Button>
                <Button
                  href={DADTRACK_GOOGLE_PLAY_URL_TRACKED}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🤖 Get it on Google Play
                </Button>
              </div>
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
              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <Button
                  href={DADTRACK_APP_STORE_URL_TRACKED}
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🍎 Download on the App Store
                </Button>
                <Button
                  href={DADTRACK_GOOGLE_PLAY_URL_TRACKED}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🤖 Get it on Google Play
                </Button>
                <Button href="https://www.linkedin.com/in/ben-greene-dev/" variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
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
