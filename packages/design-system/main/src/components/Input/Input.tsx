import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

import styles from './Input.module.css';

/**
 * Input Component - Text Input Field
 *
 * A versatile text input component with support for different states (focus, error, disabled).
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter your name" />
 *
 * // Input with error
 * <Input error placeholder="Invalid email" />
 *
 * // Disabled input
 * <Input disabled value="Cannot change this" />
 * ```
 */

export type InputProps = {
  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Full width input
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>; // Omit size to avoid conflict with potential size prop

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, fullWidth, disabled, ...props }, ref) => {
  return (
    <input
      ref={ref}
      disabled={disabled}
      className={clsx(
        styles.input,
        error && styles.error,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
