'use client';

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Screenshot {
    src: string;
    alt: string;
    title: string;
    description: string;
}

interface MobileShowcaseProps {
    screenshots: Screenshot[];
    deviceColor?: string;
    backgroundColor?: string;
}

const MobileShowcase: React.FC<MobileShowcaseProps> = ({
    screenshots,
    deviceColor = "#0f172a",
    backgroundColor = "bg-slate-950",
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    if (!screenshots || screenshots.length === 0) return null;

    const currentScreenshot = screenshots[currentIndex];

    return (
        <div className={`${backgroundColor} py-16 px-4 sm:px-6 lg:px-8 overflow-hidden`}>
            <div className="relative w-full max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content — hidden on mobile, shown on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 z-10 hidden lg:block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                                DadTrack in Action
                            </h2>
                        </motion.div>

                        <div className="mb-8">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-teal-400 mb-2">
                                    {currentScreenshot.title}
                                </h3>
                                <p className="text-lg text-slate-400 max-w-md">
                                    {currentScreenshot.description}
                                </p>
                            </motion.div>
                        </div>

                        {/* Screenshot Navigation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-4 pt-4"
                        >
                            <button
                                onClick={prevSlide}
                                className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
                                aria-label="Previous screenshot"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex gap-3">
                                {screenshots.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? "w-10 bg-gradient-to-r from-teal-400 to-blue-500"
                                            : "w-2.5 bg-slate-700 hover:bg-slate-500"
                                            }`}
                                        aria-label={`Go to screenshot ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextSlide}
                                className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
                                aria-label="Next screenshot"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right - 3D Phone Mockup */}
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative flex flex-col items-center justify-center gap-6"
                        style={{ perspective: "1000px" }}
                    >
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            className="relative"
                        >
                            {/* Phone Device */}
                            <div
                                className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] rounded-[3rem] p-3 shadow-2xl border border-white/10"
                                style={{
                                    backgroundColor: deviceColor,
                                    boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.7), 0 30px 60px -30px rgba(0, 0, 0, 0.7)",
                                }}
                            >
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20" />

                                {/* Screen */}
                                <div className="relative w-full h-full bg-slate-900 rounded-[2.5rem] overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/60 to-transparent z-10 flex items-center justify-between px-6 pt-2">
                                        <span className="text-white text-[10px] font-semibold">9:41</span>
                                        <div className="flex gap-1 items-center">
                                            <div className="w-4 h-2.5 border border-white rounded-[2px]" />
                                        </div>
                                    </div>

                                    {/* Screenshot Content */}
                                    <div className="w-full h-full relative">
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={currentScreenshot.src}
                                                alt={currentScreenshot.alt}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 320px"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Side Buttons */}
                                <div
                                    className="absolute -right-[3px] top-24 w-[3px] h-12 rounded-r-md"
                                    style={{ backgroundColor: deviceColor }}
                                />
                                <div
                                    className="absolute -right-[3px] top-40 w-[3px] h-16 rounded-r-md"
                                    style={{ backgroundColor: deviceColor }}
                                />
                                <div
                                    className="absolute -left-[3px] top-32 w-[3px] h-8 rounded-l-md"
                                    style={{ backgroundColor: deviceColor }}
                                />
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl"
                                style={{ transform: "translateZ(50px)" }}
                            />
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"
                                style={{ transform: "translateZ(50px)" }}
                            />
                        </motion.div>

                        {/* Mobile-only caption card — shown below phone on small screens */}
                        <motion.div
                            key={`caption-${currentIndex}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="lg:hidden w-full max-w-sm px-4"
                        >
                            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center space-y-2">
                                <h3 className="text-lg font-semibold text-teal-400">
                                    {currentScreenshot.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {currentScreenshot.description}
                                </p>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <button
                                    onClick={prevSlide}
                                    className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
                                    aria-label="Previous screenshot"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex gap-2">
                                    {screenshots.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? "w-8 bg-gradient-to-r from-teal-400 to-blue-500"
                                                : "w-2 bg-slate-700 hover:bg-slate-500"
                                                }`}
                                            aria-label={`Go to screenshot ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={nextSlide}
                                    className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
                                    aria-label="Next screenshot"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            </div>
        </div>
    );
};

export default MobileShowcase;
