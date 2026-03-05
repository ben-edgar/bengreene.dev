import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
    icon: React.ReactNode;
    color: string;
    dotFrom: string;
    dotTo: string;
}

interface TimelineProps {
    experiences?: Experience[];
    className?: string;
}

const AnimatedTimeline: React.FC<TimelineProps> = ({
    className = '',
    experiences = [
        {
            id: 1,
            company: 'Arcadia',
            role: 'Senior Engineering Manager',
            period: '2022 - Present',
            location: 'Remote',
            description: 'Leading global teams building utility data platforms. Managing engineers from interns to senior staff, driving platform initiatives, and championing responsible AI driven development.',
            achievements: [
                'Directed global engineering teams',
                'Drove platform-wide initiatives',
                'Championed responsible AI driven development'
            ],
            technologies: ['AI-Driven Development', 'Cursor', 'dbt', 'Snowflake', 'Java', 'Spring Boot', 'AWS', 'Team Leader'],
            icon: <Users className="w-5 h-5" />,
            color: 'from-blue-500 to-cyan-500',
            dotFrom: '#3080ff',
            dotTo: '#00b7d7',
        },
        {
            id: 2,
            company: 'Shift',
            role: 'Engineering Manager',
            period: '2020 - 2022',
            location: 'San Francisco, CA',
            description: 'Managed consumer fulfillment teams, advised CTO on technical direction, and built a team culture of learning and growth.',
            achievements: [
                'Managed consumer fulfillment engineering teams',
                'Advised CTO on technical direction',
                'Built a strong team culture of learning and growth'
            ],
            technologies: ['React', 'Ruby on Rails', 'PostgreSQL', 'Go', 'Engineering Management'],
            icon: <Briefcase className="w-5 h-5" />,
            color: 'from-purple-500 to-pink-500',
            dotFrom: '#ac4bff',
            dotTo: '#f6339a',
        }
    ]
}) => {
    return (
        <div className={`w-full text-slate-50 py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Experience
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Engineering Leadership & Team Building
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500 opacity-20 hidden md:block" />

                    {/* Experience Cards */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline Dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                                    className="absolute left-8 top-8 w-4 h-4 rounded-full bg-gradient-to-br hidden md:block z-10 -translate-x-1.5"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom right, ${exp.dotFrom}, ${exp.dotTo})`
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br animate-pulse opacity-50 blur-sm"
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom right, ${exp.dotFrom}, ${exp.dotTo})`
                                        }}
                                    />
                                </motion.div>

                                {/* Card */}
                                <div className="md:ml-20">
                                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group">
                                        <div className={`h-1 w-full bg-gradient-to-r ${exp.color}`} />

                                        <div className="p-6">
                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                                                <div className="flex items-start gap-4">
                                                    <motion.div
                                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                                        transition={{ duration: 0.2 }}
                                                        className={`p-3 rounded-xl bg-gradient-to-br ${exp.color} text-white shrink-0 shadow-[0_0_20px_rgba(45,212,191,0.2)]`}
                                                    >
                                                        {exp.icon}
                                                    </motion.div>

                                                    <div>
                                                        <h3 className="text-2xl font-bold text-white mb-1">
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-xl text-teal-400 font-semibold mb-2">
                                                            {exp.company}
                                                        </p>
                                                        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-4 h-4" />
                                                                {exp.period}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-300 mb-6 leading-relaxed">
                                                {exp.description}
                                            </p>

                                            {/* Technologies */}
                                            <div>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.technologies.map((tech, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: i * 0.05 }}
                                                            whileHover={{ scale: 1.05 }}
                                                        >
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 transition-colors"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Effect Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTimeline;
