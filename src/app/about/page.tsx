'use client';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';
import { motion } from 'framer-motion';
import { GlowDivider } from '@/components/GlowDivider';
import { getPrimaryTrackedStoreCta, useDetectedStorePlatform } from '@/lib/storeLinks';

export default function About() {
  const platform = useDetectedStorePlatform();
  const primaryStoreCta = getPrimaryTrackedStoreCta(platform ?? 'other');
  const skills = [
    'Flutter & Dart',
    'React & TypeScript',
    'Next.js',
    'Node.js',
    'Java & Spring Boot',
    'Go',
    'Ruby on Rails',
    'Python',
    'AWS',
    'Snowflake',
    'GraphQL',
    'SQL & Databases',
    'Team Leadership',
    'AI-Driven Development',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 relative bg-slate-950">
        {/* Page-wide subtle background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        {/* Introduction */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="space-y-6">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-sm text-teal-400 font-medium mb-2">
                About Me
              </div>
            </FadeIn>
            <FadeIn>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Engineering Leader.<br />
                <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Builder. Dad.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                I&apos;m an engineering leader who likes building strong teams, shipping useful software, and staying close to the work. I focus on helping engineers grow, guiding product and technical decisions, and creating the conditions for teams to move quickly without losing quality.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Beyond work, I&apos;m a dad building DadTrack — an app that lets me stay hands-on with product, UX, and AI-driven development while creating something meaningful for other dads.
              </p>
            </FadeIn>
          </div>
        </section>

        <GlowDivider className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" />

        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-6">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                How I Lead and Build
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-300 leading-relaxed">
                The work I enjoy most sits at the intersection of people, product, and engineering. I like helping teams clarify ambiguous problems, turn rough ideas into solid designs, and keep a high bar through thoughtful code reviews and design feedback.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-lg text-slate-300 leading-relaxed">
                I care a lot about mentorship and team health. I&apos;ve put this into practice through formal mentoring programs, day-to-day coaching, and creating spaces where engineers can learn from each other. Most recently, I&apos;ve focused heavily on helping teams use AI tools well: not as a shortcut around engineering judgment, but as a way to improve execution when paired with strong context, documentation, and review discipline.
              </p>
            </FadeIn>
          </div>
        </section>

        <GlowDivider className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* Personal Note */}
        <section className="relative py-20 border-y border-white/10 bg-slate-900/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <SlideUp>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Why DadTrack?
                </h2>
              </SlideUp>
              <FadeIn delay={0.2}>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Becoming a dad fundamentally changed how I see the world. The moments — a laugh, a milestone, a quiet cuddle — they&apos;re precious but fleeting. I built DadTrack to help dads like me capture those moments, not just to remember them, but to reflect on the journey and share it with the people who matter.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-lg text-slate-300 leading-relaxed">
                  It&apos;s a low-effort, high-impact app designed with the busy dad in mind. One daily journal entry, some photos, a mood tag, and over time you build a rich archive of memories. That&apos;s the magic.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <GlowDivider className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* Skills */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-10">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Technical Expertise
              </h2>
            </SlideUp>
            <StaggerContainer className="flex flex-wrap gap-3" staggerDelay={0.04}>
              {skills.map((skill, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-teal-500/30 hover:bg-white/10 transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-slate-200">{skill}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <GlowDivider className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* Education */}
        <section className="relative py-20 border-y border-white/10 bg-slate-900/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <SlideUp>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Education
                </h2>
              </SlideUp>
              <FadeIn delay={0.2}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-white/10 shrink-0">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-white">
                        University of Virginia
                      </h3>
                      <p className="text-slate-300">
                        Bachelor of Science in Computer Science
                      </p>
                      <p className="text-slate-500 text-sm">
                        Engineering Business Minor · Graduated May 2015
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </section>

        <GlowDivider className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" />

        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(15,118,110,0.18),rgba(30,41,59,0.92))] px-6 py-10 text-center shadow-[0_20px_80px_rgba(8,145,178,0.15)] backdrop-blur-xl md:px-12 md:py-14">
              <div className="absolute -top-20 right-0 h-44 w-44 rounded-full bg-teal-400/15 blur-3xl" />
              <div className="absolute -bottom-24 left-0 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />

              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300">
                  Build Something Meaningful
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white md:text-4xl">
                    Want to see what I&apos;m building?
                  </h2>
                  <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
                    Check out DadTrack to see the product side of my work, or reach out on LinkedIn if you want to talk engineering leadership, product thinking, or building with AI.
                  </p>
                </div>
                <div className="flex w-full max-w-md mx-auto flex-col gap-4 pt-2 sm:max-w-none sm:flex-row sm:justify-center">
                  <Button href="/dadtrack" size="lg" mobileFullWidth>
                    Check Out DadTrack
                  </Button>
                  <Button
                    href="https://www.linkedin.com/in/ben-greene-dev/"
                    variant="secondary"
                    size="lg"
                    mobileFullWidth
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reach Out on LinkedIn
                  </Button>
                </div>
                <p className="text-sm text-slate-400">
                  Prefer app-first?{' '}
                  <a
                    href={primaryStoreCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-300 transition-colors hover:text-teal-200"
                  >
                    {primaryStoreCta.textLabel}
                  </a>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
