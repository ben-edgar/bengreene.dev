import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'DadTrack – Dad Life Companion App',
  description:
    'DadTrack helps dads capture daily moments with their kids through journaling, photos, mood tracking, and memory streaks.',
  openGraph: {
    title: 'DadTrack – Dad Life Companion App',
    description: 'A dad-focused journaling app for capturing memories with your kids.',
    type: 'website',
  },
};

export default function DadTrack() {
  const features = [
    {
      title: 'Daily Dad Journal',
      description:
        'One entry per day to capture moments, moods, and memories. Support for multiple mood tags and up to 5 photos per entry.',
      image: '/images/dadtrack/add_journal_entry_screen.png',
      icon: '📝',
    },
    {
      title: 'Multi-Child Support',
      description:
        'Manage multiple children with individual profiles. Switch between child timelines or view "All kids" in one stream.',
      image: '/images/dadtrack/home_screen.png',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      title: 'Magazine Mode',
      description:
        'Immersive, full-screen experience with large photos, dramatic typography, and hero animations for reliving your memories.',
      image: '/images/dadtrack/magazine_mode_journal_entry.png',
      icon: '✨',
    },
    {
      title: 'Mood Tracking',
      description:
        'Create custom mood tags to personalize your journal entries. Track emotional patterns over time with advanced filtering.',
      image: '/images/dadtrack/manage_mood_screen.png',
      icon: '😊',
    },
    {
      title: 'Advanced Filtering',
      description:
        'Find entries by text, date range, mood tags, specific children, or photo presence. Powerful search to relive any moment.',
      image: '/images/dadtrack/filter_screen.png',
      icon: '🔍',
    },
    {
      title: 'Settings & Customization',
      description:
        'Configure journal reminders, dark mode, together-time windows, and more. Make the app work for your lifestyle.',
      image: '/images/dadtrack/settings_screen.png',
      icon: '⚙️',
    },
  ];

  const keyPoints = [
    {
      title: 'Dad-Focused',
      description: 'Built for dads, by a dad. Speaks in your voice and emphasizes bonding and memory-keeping.',
    },
    {
      title: 'Low Effort, High Impact',
      description: 'Just take a photo, read a tip, jot a feeling. Over time, build a rich memory archive.',
    },
    {
      title: 'Family-Inclusive',
      description: 'While dad-focused, includes features that benefit the whole family—sharing, data export, and more.',
    },
  ];

  const roadmap = [
    {
      milestone: 'Milestone 3: Smart Parenting Support',
      items: ['Dad Tips Feed', 'Milestone Tracker', 'Family Photo Reminders'],
    },
    {
      milestone: 'Milestone 4: Practical Parenting Tools',
      items: ['Child Information Hub', 'Shopping & Development Guide'],
    },
    {
      milestone: 'Milestone 5: Enhanced Experience',
      items: ['Memory Highlights', 'Shared Features', 'Advanced Analytics'],
    },
    {
      milestone: 'Milestone 6: Platform Expansion',
      items: ['Wear OS Watch App', 'Dad Community Feed'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
              DadTrack
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Track the journey, one memory at a time
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A daily dad life companion app designed to help you capture moments, moods, and milestones with your kids.
              One journal entry, some photos, a mood tag—and over time, you build a rich archive of memories.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Screenshot Image */}
                  <div className="relative bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-md" style={{ minHeight: '400px', maxHeight: '500px' }}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{feature.icon}</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Why It's Different */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Why DadTrack Is Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyPoints.map((point, index) => (
              <Card key={index} className="bg-primary-50 dark:bg-primary-950">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {point.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roadmap.map((section, index) => (
              <Card key={index}>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {section.milestone}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-primary-600 dark:text-primary-400 font-bold mt-1">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Join the Journey
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Help us build the best dad life companion. Early feedback shapes the future of DadTrack.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button href="/waitlist" size="lg">
                Join the Waitlist
              </Button>
              <Button href="/waitlist" variant="secondary" size="lg">
                Send Feedback
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
