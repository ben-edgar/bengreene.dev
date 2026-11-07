import { Button } from '@/components/Button';
import { Header } from '@/components/Header';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h1 className="font-display text-[clamp(3.5rem,8.5vw,7rem)] leading-[0.98] tracking-[-0.02em]">
          This page doesn’t exist
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-on-cloth-muted">
          The link may be out of date. Head back to the home page to find what you’re looking
          for.
        </p>
        <div className="mt-8">
          <Button href="/" size="lg">
            Go to the home page
          </Button>
        </div>
      </main>
    </div>
  );
}
