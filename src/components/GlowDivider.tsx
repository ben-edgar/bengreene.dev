import React from 'react';

interface GlowDividerProps {
    className?: string;
    color?: 'teal' | 'purple' | 'blue' | 'multi';
}

export function GlowDivider({ className = '', color = 'multi' }: GlowDividerProps) {
    const gradients = {
        teal: 'from-transparent via-teal-500/40 to-transparent',
        purple: 'from-transparent via-purple-500/40 to-transparent',
        blue: 'from-transparent via-blue-500/40 to-transparent',
        multi: 'from-transparent via-teal-500/30 to-transparent',
    };

    return (
        <div className={`w-full flex items-center gap-4 ${className}`}>
            <div className={`flex-1 h-px bg-gradient-to-r ${gradients[color]}`} />
        </div>
    );
}
