"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Mail, Plus, Github, Linkedin, Smartphone } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MenuItem {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    badge?: number;
}

interface GlassmorphicFooterMenuProps {
    items?: MenuItem[];
    className?: string;
    activePath?: string;
}

export const GlassmorphicFooterMenu: React.FC<GlassmorphicFooterMenuProps> = ({
    className = "",
    activePath = "/",
}) => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = React.useState(false);

    // Default items based on the actual navigation
    const items: MenuItem[] = [
        {
            icon: <Home className="w-5 h-5" />,
            label: "Home",
            href: "/",
        },
        {
            icon: <User className="w-5 h-5" />,
            label: "About",
            href: "/about",
        },
        {
            icon: <Smartphone className="w-5 h-5" />,
            label: "DadTrack",
            href: "/dadtrack",
        },
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Feedback",
            href: "/feedback",
        },
    ];

    return (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${className}`}>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
            >
                {/* Main Menu Bar */}
                <div className="relative flex items-center gap-2 px-6 py-4 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                    {items.map((item, index) => {
                        const isActive = item.href === activePath;
                        return (
                            <motion.button
                                key={index}
                                onClick={() => {
                                    if (item.href) {
                                        router.push(item.href);
                                    } else if (item.onClick) {
                                        item.onClick();
                                    }
                                }}
                                className="relative flex flex-col items-center justify-center group"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                aria-label={item.label}
                            >
                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute inset-0 -m-2 rounded-full bg-primary/20"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                {/* Icon Container */}
                                <div className="relative z-10 p-3 rounded-full transition-colors duration-200">
                                    <div className={`${isActive ? "text-primary-400" : "text-slate-400"} transition-colors duration-200 group-hover:text-primary-300`}>
                                        {item.icon}
                                    </div>

                                    {/* Badge */}
                                    {item.badge && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-slate-900"
                                        >
                                            {item.badge}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Label Tooltip */}
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        className="absolute -top-12 px-3 py-1.5 text-xs font-medium text-white bg-slate-800/90 backdrop-blur-sm rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    >
                                        {item.label}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-800/90 border-r border-b border-white/10 rotate-45" />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}

                    {/* Floating Action Button for Socials */}
                    <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="relative ml-2 p-3 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 text-white shadow-lg shadow-primary-500/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        aria-label="Social Links"
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Plus className="w-5 h-5" />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Expanded Quick Actions */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64"
                        >
                            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                                <Link
                                    href="https://github.com/bgreene12"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors duration-200"
                                    onClick={() => setIsExpanded(false)}
                                >
                                    <Github className="w-5 h-5 text-slate-300" />
                                    <span className="text-sm font-medium">GitHub Profile</span>
                                </Link>

                                <Link
                                    href="https://linkedin.com/in/bgreene12"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors duration-200"
                                    onClick={() => setIsExpanded(false)}
                                >
                                    <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                                    <span className="text-sm font-medium">LinkedIn Profile</span>
                                </Link>

                                <Link
                                    href="https://apps.apple.com/us/app/dadtrack"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors duration-200"
                                    onClick={() => setIsExpanded(false)}
                                >
                                    <Smartphone className="w-5 h-5 text-teal-400" />
                                    <span className="text-sm font-medium">DadTrack iOS App</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary-500/10 via-teal-500/10 to-blue-500/10 blur-xl pointer-events-none" />
            </motion.div>
        </div>
    );
};
