import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
}

export function Card({ children, className = '', border = true }: CardProps) {
  const borderClass = border ? 'border border-slate-200 dark:border-slate-800' : '';

  return (
    <div
      className={`rounded-xl bg-slate-50 dark:bg-slate-900 p-6 shadow-sm ${borderClass} ${className}`}
    >
      {children}
    </div>
  );
}
