import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
}

export function Card({ children, className = '', border = true }: CardProps) {
  const borderClass = border ? 'border border-white/10' : '';

  return (
    <div
      className={`rounded-xl bg-white/5 p-6 shadow-sm backdrop-blur-sm ${borderClass} ${className}`}
    >
      {children}
    </div>
  );
}
