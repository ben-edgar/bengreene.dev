'use client';

import { Header } from '@/components/Header';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';
import { motion } from 'framer-motion';
import { GlowDivider } from '@/components/GlowDivider';

export default function About() {
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
                I&apos;m an engineering leader passionate about building effective teams, shipping great software, and mentoring engineers at all levels.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Beyond work, I&apos;m a dad building DadTrack — an app to help other dads capture and reflect on the precious moments with their kids.
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
                  Becoming a dad fundamentally changed how I see the world. The moments — a laugh, a milestone, a quiet cuddle — they&apos;re precious but fleeting. I built DadTrack to help dads like me capture these moments, not just to remember them, but to reflect on the journey and share it with friends and family.
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
      </main>
    </div>
  );
}
