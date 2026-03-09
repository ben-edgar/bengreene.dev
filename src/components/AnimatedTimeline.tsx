import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Code2, Users } from 'lucide-react';
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
            description: 'I lead teams building our core utility data platform while balancing delivery, technical quality, and long-term platform thinking. My role spans team leadership, product collaboration, design doc review, and helping engineers turn ambiguous problems into shippable work.',
            achievements: [
                'Help teams adopt AI-driven development thoughtfully, including documentation and workflows that make agent-driven work more effective',
                'Guide engineers from interns to senior staff through mentoring, feedback, and career growth',
                'Partner closely with product and domain experts to shape roadmap, review product specs, and refine high-impact platform work'
            ],
            technologies: ['AI-Driven Development', 'Cursor', 'Claude Code', 'dbt', 'Snowflake', 'Java', 'Spring Boot', 'AWS'],
            icon: <Users className="w-5 h-5" />,
            color: 'from-blue-500 to-cyan-500',
            dotFrom: '#3080ff',
            dotTo: '#00b7d7',
        },
        {
            id: 2,
            company: 'Shift',
            role: 'Engineering Manager',
            period: '2019 - 2022',
            location: 'San Francisco, CA',
            description: 'At Shift, I operated as both an engineering manager and a technical leader, helping teams deliver customer-facing product improvements while improving team process, architectural direction, and cross-functional execution.',
            achievements: [
                'Worked closely with product, design, and leadership to scope and ship meaningful consumer experiences',
                'Led through ambiguity, contributing directly when needed while keeping teams aligned and unblocked',
                'Improved team practices across hiring, onboarding, delivery, and technical decision-making'
            ],
            technologies: ['React', 'Ruby on Rails', 'PostgreSQL', 'Go', 'Engineering Management'],
            icon: <Briefcase className="w-5 h-5" />,
            color: 'from-purple-500 to-pink-500',
            dotFrom: '#ac4bff',
            dotTo: '#f6339a',
        },
        {
            id: 3,
            company: 'Appian',
            role: 'Software Engineer to Senior Software Engineer',
            period: '2015 - 2019',
            location: 'Reston, VA',
            description: 'At Appian, I built a strong foundation in product engineering across backend systems and mobile-adjacent work, taking on increasingly complex projects and mentorship responsibilities as my scope grew.',
            achievements: [
                'Built foundational platform capabilities, ranging from custom web API frameworks to a highly available file system',
                'Contributed across backend and mobile-focused initiatives, including features related to offline support and deep linking',
                'Managed engineering interns from project definition through execution, providing both technical guidance and career mentorship'
            ],
            technologies: ['Java', 'Kotlin', 'Hibernate', 'GlusterFS', 'Bash', 'Android'],
            icon: <Code2 className="w-5 h-5" />,
            color: 'from-emerald-500 to-teal-500',
            dotFrom: '#22c55e',
            dotTo: '#14b8a6',
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
                        Engineering leadership, product judgment, and AI-native building
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

                                            <ul className="mb-6 space-y-3">
                                                {exp.achievements.map((achievement) => (
                                                    <li
                                                        key={achievement}
                                                        className="flex items-start gap-3 text-slate-300"
                                                    >
                                                        <span
                                                            className="mt-2 h-2 w-2 shrink-0 rounded-full"
                                                            style={{ backgroundColor: exp.dotFrom }}
                                                        />
                                                        <span className="leading-relaxed">{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>

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
