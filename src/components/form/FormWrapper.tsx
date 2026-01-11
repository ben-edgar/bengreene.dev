'use client';

import { ReactNode, FormEvent, useState } from 'react';

interface FormWrapperProps {
  children: ReactNode;
  onSubmit?: (formData: FormData) => Promise<void>;
  className?: string;
  loading?: boolean;
}

export function FormWrapper({
  children,
  onSubmit,
  className = '',
  loading: _loading = false,
}: FormWrapperProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !onSubmit) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
}
