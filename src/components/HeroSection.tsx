import { Button } from '@/components/Button';
import { Polaroid } from '@/components/Polaroid';

const POLAROID_SIZES = '(min-width: 1024px) 320px, 46vw';

export default function HeroSection() {
    return (
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:px-8">
            <div>
                <h1 className="font-display text-[clamp(4.25rem,11vw,9rem)] leading-[0.92] tracking-[-0.02em]">
                    Ben Greene
                </h1>
                <p className="mt-5 font-display text-2xl italic text-on-cloth md:text-[2rem] md:leading-tight">
                    Engineering leader, builder, dad.
                </p>
                <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-on-cloth-muted">
                    I build effective teams, ship software, and mentor engineers. Outside of work,
                    I make DadTrack and MomTrack, journaling apps for parents.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                    <Button href="/about" size="lg">
                        About me
                    </Button>
                    <Button
                        href="https://github.com/ben-edgar"
                        variant="secondary"
                        size="lg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Button>
                </div>
            </div>

            <div className="relative mx-auto aspect-[10/8] w-full max-w-[36rem]">
                <Polaroid
                    src="/images/shared/polaroid-dadtrack.webp"
                    caption="DadTrack"
                    href="/dadtrack"
                    tilt={-6}
                    sizes={POLAROID_SIZES}
                    className="absolute left-[2%] top-[2%] z-10 w-[51%] lg:left-0 lg:w-[53%]"
                />
                <Polaroid
                    src="/images/shared/polaroid-momtrack.webp"
                    caption="MomTrack"
                    href="/momtrack"
                    tilt={5}
                    tone="momtrack"
                    landingDelayMs={140}
                    sizes={POLAROID_SIZES}
                    className="absolute bottom-[2%] right-[2%] z-20 w-[51%] lg:right-0 lg:w-[53%]"
                />
            </div>
        </section>
    );
}
