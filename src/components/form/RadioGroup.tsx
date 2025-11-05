'use client';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required = false,
  className = '',
}: RadioGroupProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset className={`space-y-2 ${className}`} aria-invalid={!!error} aria-describedby={errorId}>
      <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-accent-500 ml-1" aria-label="required">*</span>}
      </legend>
      <div role="radiogroup" aria-required={required} className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              aria-checked={value === option.value}
              className="w-4 h-4 text-primary-600 border-slate-300 dark:border-slate-600 focus:ring-primary-500 focus:ring-2 cursor-pointer"
            />
            <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-accent-600 dark:text-accent-400">
          {error}
        </p>
      )}
    </fieldset>
  );
}
