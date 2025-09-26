'use client';

import { ReactNode } from 'react';

interface InputWithLabelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'textarea';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: ReactNode;
}

export function InputWithLabel({
  label,
  value,
  onChange,
  variant = 'default',
  placeholder,
  required = false,
  disabled = false,
  error,
  helper
}: InputWithLabelProps) {
  const baseClasses = `
    w-full px-3 py-2 glass-card border border-border rounded-lg
    bg-surface text-fg placeholder-text-secondary
    focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
  `;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-fg">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      
      {variant === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
        />
      )}
      
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      
      {helper && !error && (
        <div className="text-sm text-text-secondary">{helper}</div>
      )}
    </div>
  );
}
