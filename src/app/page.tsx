import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export const metadata: Metadata = {
  title: 'Ben Greene – DadTrack App & Portfolio',
  description: 'DadTrack – Track the journey, one memory at a time. A daily dad life companion app to capture moments, moods, and milestones.',
  openGraph: {
    title: 'Ben Greene – DadTrack App & Portfolio',
    description: 'DadTrack – Track the journey, one memory at a time.',
    type: 'website',
  },
};

export default function Home() {
  const screenshots = [
    {
      src: '/images/dadtrack/home_screen.png',
      alt: 'DadTrack Home Timeline',
      title: 'Your Daily Timeline',
      description: 'See all your memories in one beautiful scrollable view',
    },
    {
      src: '/images/dadtrack/magazine_mode_journal_entry.png',
      alt: 'DadTrack Magazine Mode',
      title: 'Immersive Magazine View',
      description: 'Relive your moments with a full-screen reading experience',
    },
    {
      src: '/images/dadtrack/add_journal_entry_screen.png',
      alt: 'Add Journal Entry',
      title: 'Quick Daily Journaling',
      description: 'Capture moments with photos, moods, and notes in seconds',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white bg-clip-text">
                DadTrack
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                Track the journey, one memory at a time
              </p>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A daily dad life companion app to capture moments, moods, and milestones.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button href="/waitlist" size="lg">
                Join the Waitlist
              </Button>
              <Button href="/dadtrack" variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose dark:prose-invert max-w-3xl mx-auto">
            <p className="text-center text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              I'm Ben Greene, an engineering leader and dad. DadTrack is born from a simple insight:
              parenting is one of the most meaningful journeys we take, yet the moments slip away too quickly.
              This app helps you capture the small, everyday moments—the moods, the memories, the milestones—
              so you can reflect on them, share them with family, and never lose sight of what matters most.
            </p>
          </div>
        </section>

        {/* Screenshot Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            See It In Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="space-y-4">
                  {/* Screenshot Image */}
                  <div className="relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden" style={{ minHeight: '400px', maxHeight: '500px' }}>
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Title and Description */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {screenshot.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {screenshot.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Ready to start capturing your story?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Join other dads in shaping the future of DadTrack.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button href="/waitlist" size="lg">
                Sign Up for Updates
              </Button>
              <Button href="/dadtrack" variant="secondary" size="lg">
                Give Feedback
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
