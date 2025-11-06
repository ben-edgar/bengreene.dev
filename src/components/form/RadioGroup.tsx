'use client';

interface RadioOption {
  value: string;
  label: string;
  icon?: string; // Optional emoji or icon
  description?: string; // Optional description text
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
    <fieldset className={`space-y-3 ${className}`} aria-invalid={!!error} aria-describedby={errorId}>
      <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label}
        {required && <span className="text-accent-500 ml-1" aria-label="required">*</span>}
      </legend>
      <div role="radiogroup" aria-required={required} className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={`
                relative flex items-center justify-center px-4 py-3 rounded-lg border-2 cursor-pointer
                transition-all duration-200
                ${
                  isSelected
                    ? 'border-primary-600 dark:border-primary-500 bg-primary-50/50 dark:bg-primary-950/50'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }
              `}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
                aria-checked={isSelected}
                className="sr-only"
              />

              {/* Selection indicator */}
              <div
                className={`
                  absolute left-3 w-4 h-4 rounded-full border-2 flex items-center justify-center
                  transition-all duration-200
                  ${
                    isSelected
                      ? 'border-primary-600 dark:border-primary-400'
                      : 'border-slate-300 dark:border-slate-600'
                  }
                `}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-sm font-medium text-center transition-colors ml-2
                  ${
                    isSelected
                      ? 'text-primary-700 dark:text-primary-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }
                `}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-accent-600 dark:text-accent-400">
          {error}
        </p>
      )}
    </fieldset>
  );
}
