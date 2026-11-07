'use client';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { getPrimaryTrackedStoreCta, useDetectedStorePlatform } from '@/lib/storeLinks';

const SKILLS = [
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

export default function About() {
  const platform = useDetectedStorePlatform();
  const primaryStoreCta = getPrimaryTrackedStoreCta(platform ?? 'other');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Introduction */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
          <h1 className="max-w-4xl font-display text-[clamp(3.5rem,8.5vw,7rem)] leading-[0.98] tracking-[-0.02em]">
            Engineering leader. Builder. Dad.
          </h1>
          <div className="mt-8 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-12">
            <p className="text-lg leading-relaxed text-on-cloth-muted">
              I&apos;m an engineering leader who likes building strong teams, shipping useful software, and staying close to the work. I focus on helping engineers grow, guiding product and technical decisions, and creating the conditions for teams to move quickly without losing quality.
            </p>
            <p className="text-lg leading-relaxed text-on-cloth-muted">
              Beyond work, I&apos;m a dad building DadTrack — an app that lets me stay hands-on with product, UX, and AI-driven development while creating something meaningful for other dads.
            </p>
          </div>
        </section>

        {/* The two long reads share a sheet, one per facing page. */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="page-sheet grid divide-y divide-ink/10 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            <article className="p-6 sm:p-10 xl:p-14">
              <h2 className="font-display text-4xl text-ink md:text-5xl">How I lead and build</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
                <p>
                  The work I enjoy most sits at the intersection of people, product, and engineering. I like helping teams clarify ambiguous problems, turn rough ideas into solid designs, and keep a high bar through thoughtful code reviews and design feedback.
                </p>
                <p>
                  I care a lot about mentorship and team health. I&apos;ve put this into practice through formal mentoring programs, day-to-day coaching, and creating spaces where engineers can learn from each other. Most recently, I&apos;ve focused heavily on helping teams use AI tools well: not as a shortcut around engineering judgment, but as a way to improve execution when paired with strong context, documentation, and review discipline.
                </p>
              </div>
            </article>

            <article className="p-6 sm:p-10 xl:p-14">
              <h2 className="font-display text-4xl text-ink md:text-5xl">Why DadTrack?</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
                <p>
                  Becoming a dad fundamentally changed how I see the world. The moments — a laugh, a milestone, a quiet cuddle — they&apos;re precious but fleeting. I built DadTrack to help dads like me capture those moments, not just to remember them, but to reflect on the journey and share it with the people who matter.
                </p>
                <p>
                  It&apos;s a low-effort, high-impact app designed with the busy dad in mind. One daily journal entry, some photos, a mood tag, and over time you build a rich archive of memories. That&apos;s the magic.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Skills and education */}
        <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16 lg:px-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Technical expertise</h2>
            <ul className="mt-7 grid grid-cols-2 gap-x-8 gap-y-3 text-on-cloth-muted md:grid-cols-3">
              {SKILLS.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-4xl md:text-5xl">Education</h2>
            <h3 className="mt-7 font-display text-[1.75rem] leading-tight">University of Virginia</h3>
            <p className="mt-2 text-on-cloth-muted">Bachelor of Science in Computer Science</p>
            <p className="mt-1 text-on-cloth-muted">Engineering Business Minor</p>
            <p className="mt-1 text-on-cloth-faint">Graduated May 2015</p>
          </div>
        </section>

        <section className="bg-cloth-raised py-16 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl">Want to see what I&apos;m building?</h2>
              <p className="mt-4 text-lg leading-relaxed text-on-cloth-muted">
                Check out DadTrack to see the product side of my work, or reach out on LinkedIn if you want to talk engineering leadership, product thinking, or building with AI.
              </p>
              <p className="mt-3 text-on-cloth-muted">
                Prefer app-first?{' '}
                <a
                  href={primaryStoreCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 hover:text-on-cloth"
                >
                  {primaryStoreCta.textLabel}
                </a>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href="/dadtrack" size="lg" mobileFullWidth>
                Check out DadTrack
              </Button>
              <Button
                href="https://www.linkedin.com/in/ben-greene-dev/"
                variant="secondary"
                size="lg"
                mobileFullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                Reach out on LinkedIn
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
