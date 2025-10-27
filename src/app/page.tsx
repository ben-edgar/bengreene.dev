import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export const metadata: Metadata = {
  title: 'Ben Greene – Engineering Leader & Builder',
  description: 'Professional engineering leader passionate about building effective teams, shipping software, and mentoring engineers. Currently building DadTrack.',
  openGraph: {
    title: 'Ben Greene – Engineering Leader & Builder',
    description: 'Professional engineering leader passionate about building effective teams, shipping software, and mentoring engineers.',
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
                Ben Greene
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                Engineering Leader & Builder
              </p>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Professional engineering leader passionate about building effective teams, shipping software, and mentoring engineers.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button href="/about" size="lg">
                About Me
              </Button>
              <Button href="https://github.com/ben-edgar" variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* Professional Highlights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
              Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Senior Engineering Manager
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    Arcadia • 2021 – Present
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Leading global teams building utility data platforms. Managing engineers from interns to senior staff,
                    driving platform initiatives, and co-founding mentorship programs.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Engineering Manager
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    Shift • 2020 – 2022
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Managed consumer fulfillment teams, advised CTO on technical direction, and led transition
                    from monolith to service-oriented architecture.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* DadTrack Introduction */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Current Project: DadTrack
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              As an engineering leader and dad, I built DadTrack from a simple insight:
              parenting is one of the most meaningful journeys we take, yet the moments slip away too quickly.
              DadTrack helps dads capture the small, everyday moments—the moods, the memories, the milestones—
              so you can reflect on them, share them with family, and never lose sight of what matters most.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button href="/dadtrack" size="lg">
                Learn More
              </Button>
              <Button href="/waitlist" variant="secondary" size="lg">
                Join Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* Screenshot Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-slate-900/50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            DadTrack in Action
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Let's Connect
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Interested in DadTrack or want to connect? I'd love to hear from you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button href="/waitlist" size="lg">
                Join DadTrack Waitlist
              </Button>
              <Button href="https://www.linkedin.com/in/ben-greene-dev/" variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
