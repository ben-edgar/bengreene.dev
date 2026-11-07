interface Role {
    company: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

const ROLES: Role[] = [
    {
        company: 'Arcadia',
        role: 'Senior Engineering Manager',
        period: '2022–Present',
        description: 'I lead teams building our core utility data platform while balancing delivery, technical quality, and long-term platform thinking. My role spans team leadership, product collaboration, design doc review, and helping engineers turn ambiguous problems into shippable work.',
        achievements: [
            'Help teams adopt AI-driven development thoughtfully, including documentation and workflows that make agent-driven work more effective',
            'Guide engineers from interns to senior staff through mentoring, feedback, and career growth',
            'Partner closely with product and domain experts to shape roadmap, review product specs, and refine high-impact platform work',
        ],
        technologies: ['AI-Driven Development', 'Cursor', 'Claude Code', 'dbt', 'Snowflake', 'Java', 'Spring Boot', 'AWS'],
    },
    {
        company: 'Shift',
        role: 'Engineering Manager',
        period: '2019–2022',
        description: 'At Shift, I operated as both an engineering manager and a technical leader, helping teams deliver customer-facing product improvements while improving team process, architectural direction, and cross-functional execution.',
        achievements: [
            'Worked closely with product, design, and leadership to scope and ship meaningful consumer experiences',
            'Led through ambiguity, contributing directly when needed while keeping teams aligned and unblocked',
            'Improved team practices across hiring, onboarding, delivery, and technical decision-making',
        ],
        technologies: ['React', 'Ruby on Rails', 'PostgreSQL', 'Go', 'Engineering Management'],
    },
    {
        company: 'Appian',
        role: 'Software Engineer to Senior Software Engineer',
        period: '2015–2019',
        description: 'At Appian, I built a strong foundation in product engineering across backend systems and mobile-adjacent work, taking on increasingly complex projects and mentorship responsibilities as my scope grew.',
        achievements: [
            'Built foundational platform capabilities, ranging from custom web API frameworks to a highly available file system',
            'Contributed across backend and mobile-focused initiatives, including features related to offline support and deep linking',
            'Managed engineering interns from project definition through execution, providing both technical guidance and career mentorship',
        ],
        technologies: ['Java', 'Kotlin', 'Hibernate', 'GlusterFS', 'Bash', 'Android'],
    },
];

export default function Experience() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-16">
                <header className="lg:sticky lg:top-24 lg:self-start">
                    <h2 className="font-display text-4xl md:text-5xl">Experience</h2>
                    <p className="mt-4 max-w-xs leading-relaxed text-on-cloth-muted">
                        Engineering leadership, product judgment, and AI-native building
                    </p>
                </header>

                <ol className="divide-y divide-on-cloth/15 border-y border-on-cloth/15">
                    {ROLES.map((role) => (
                        <li key={role.company} className="py-9 first:pt-8">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                <h3 className="font-display text-[1.75rem] leading-tight md:text-3xl">
                                    {role.role}
                                </h3>
                                <p className="shrink-0 tabular-nums text-on-cloth-muted">{role.period}</p>
                            </div>
                            <p className="mt-1 font-medium text-accent">{role.company}</p>
                            <p className="mt-4 max-w-[68ch] leading-relaxed text-on-cloth-muted">
                                {role.description}
                            </p>
                            <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 leading-relaxed text-on-cloth-muted marker:text-accent">
                                {role.achievements.map((achievement) => (
                                    <li key={achievement}>{achievement}</li>
                                ))}
                            </ul>
                            <p className="mt-5 max-w-[68ch] text-sm leading-relaxed text-on-cloth-faint">
                                {role.technologies.join(', ')}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
