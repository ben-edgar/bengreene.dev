'use client';

import React from 'react';

interface OrbitColor {
    bgColor: string; // Full Tailwind class e.g. 'bg-teal-500'
    position: string; // Tailwind position classes e.g. 'top-1/4 left-1/4'
    size?: string; // Tailwind size class e.g. 'w-96 h-96'
    delay?: string; // animation delay e.g. 'delay-700'
    opacity?: string; // e.g. 'opacity-10'
}

interface AnimatedBackgroundProps {
    orbs?: OrbitColor[];
    grid?: boolean;
    topGlow?: boolean;
}

const defaultOrbs: OrbitColor[] = [
    { bgColor: 'bg-teal-500', position: 'top-1/4 left-1/4', size: 'w-96 h-96', opacity: 'opacity-10' },
    { bgColor: 'bg-blue-500', position: 'bottom-1/4 right-1/4', size: 'w-96 h-96', delay: 'delay-700', opacity: 'opacity-10' },
    { bgColor: 'bg-purple-500', position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', size: 'w-[600px] h-[600px]', delay: 'delay-1000', opacity: 'opacity-5' },
];

export function AnimatedBackground({ orbs = defaultOrbs, grid = true, topGlow = true }: AnimatedBackgroundProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {orbs.map((orb, i) => (
                <div
                    key={i}
                    className={`absolute ${orb.position} ${orb.size ?? 'w-96 h-96'} ${orb.bgColor} rounded-full blur-3xl animate-pulse ${orb.delay ?? ''} ${orb.opacity ?? 'opacity-10'}`}
                />
            ))}
            {grid && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px]" />
            )}
            {topGlow && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
            )}
        </div>
    );
}
