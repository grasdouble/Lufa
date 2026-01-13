import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './DatePicker.module.css';

export type DatePickerProps = {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Input size */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'outlined' | 'filled';
  /** Full width */
  fullWidth?: boolean;
  /** Enable time selection */
  showTime?: boolean;
  /** Callback when date changes */
  onDateChange?: (date: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>;

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'medium',
      variant = 'outlined',
      fullWidth = false,
      showTime = false,
      onDateChange,
      className = '',
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onDateChange?.(e.target.value);
      onChange?.(e);
    };

    const sizeClass = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    }[size];

    const variantClass = {
      outlined: styles.variantOutlined,
      filled: styles.variantFilled,
    }[variant];

    const containerClassName = clsx(
      styles.container,
      fullWidth && styles.fullWidth
    );

    const inputClassName = clsx(
      styles.input,
      sizeClass,
      variantClass,
      error && styles.error,
      disabled && styles.disabled,
      className
    );

    return (
      <div className={containerClassName}>
        {label && (
          <label className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            type={showTime ? 'datetime-local' : 'date'}
            className={inputClassName}
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
          <div className={styles.icon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {(error ?? helperText) && (
          <p className={error ? styles.errorText : styles.helperText}>{error ?? helperText}</p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
