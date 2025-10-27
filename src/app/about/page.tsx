import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';

export const metadata: Metadata = {
  title: 'About Ben Greene',
  description: 'Learn about Ben Greene, an engineering leader passionate about building effective teams, shipping software, and mentoring engineers.',
  openGraph: {
    title: 'About Ben Greene',
    description: 'Engineering leader and creator of DadTrack.',
    type: 'website',
  },
};

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

      <main className="flex-1">
        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
              About Me
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm an engineering leader passionate about building effective teams, shipping great software, and mentoring engineers at all levels.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Beyond work, I'm a dad building DadTrack—an app to help other dads capture and reflect on the precious moments with their kids.
            </p>
          </div>
        </section>

        {/* Personal Note */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Why DadTrack?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Becoming a dad fundamentally changed how I see the world. The moments—a laugh, a milestone, a quiet cuddle—they're precious but fleeting. I built DadTrack to help dads like me capture these moments, not just to remember them, but to reflect on the journey and share it with family.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              It's a low-effort, high-impact app designed with the busy dad in mind. One daily journal entry, some photos, a mood tag, and over time you build a rich archive of memories. That's the magic.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Technical Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <Card
                  key={index}
                  border={false}
                  className="bg-primary-50 dark:bg-primary-950 text-center py-4 hover:shadow-md transition-all hover:scale-105"
                >
                  <p className="font-medium text-slate-900 dark:text-white text-sm">
                    {skill}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Education
            </h2>
            <Card className="shadow-md">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  University of Virginia
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Bachelor of Science in Computer Science
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Engineering Business Minor • Graduated May 2015 with High Distinction
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
