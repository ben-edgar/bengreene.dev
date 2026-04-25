export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/dadtrack', label: 'DadTrack' },
  { href: '/momtrack', label: 'MomTrack' },
  { href: '/feedback', label: 'Feedback' },
];
