import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { ArrowRight, Sparkles, Github, Linkedin } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8">
            {/* Animated background gradients */}
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto text-center mt-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm mb-8 animate-[fade-in_0.8s_ease-out_forwards]">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span className="text-sm font-medium text-slate-200">Engineering Leader & Builder</span>
                </div>

                {/* Title with gradient */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-[fade-in-up_0.8s_ease-out_forwards]">
                    <span className="text-slate-50">
                        Ben Greene
                    </span>
                    <br className="my-2 block" />
                    <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-[gradient_8s_ease_infinite] bg-[length:200%_200%] pb-2">
                        Portfolio
                    </span>
                </h1>

                {/* Bio */}
                <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-[fade-in-up_0.8s_ease-out_forwards] [animation-delay:0.3s] opacity-0 fill-mode-forwards">
                    Professional engineering leader passionate about building effective teams, shipping software, and mentoring engineers.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-[fade-in-up_0.8s_ease-out_forwards] [animation-delay:0.4s] opacity-0 fill-mode-forwards">
                    <Button
                        size="lg"
                        href="/about"
                        className="group relative overflow-hidden bg-teal-600 text-white hover:bg-teal-500 px-8 py-6 text-lg"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            About Me
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>

                    <Button
                        size="lg"
                        variant="secondary"
                        href="https://github.com/ben-edgar"
                        className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-white px-8 py-6 text-lg backdrop-blur-sm"
                    >
                        GitHub
                    </Button>
                </div>

            </div>

            {/* Floating elements */}
            <div className="absolute top-32 left-10 w-20 h-20 border border-teal-500/20 rounded-lg rotate-12 animate-[float_6s_ease-in-out_infinite]" />
            <div className="absolute bottom-32 right-10 w-16 h-16 border border-purple-500/20 rounded-full animate-[float_6s_ease-in-out_infinite] [animation-delay:0.5s]" />
            <div className="absolute top-1/2 right-20 w-12 h-12 border border-blue-500/20 rounded-lg -rotate-12 animate-[float_6s_ease-in-out_infinite] [animation-delay:1s]" />

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
        </div>
    );
};

export default HeroSection;
