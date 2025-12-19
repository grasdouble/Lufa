import type { InputHTMLAttributes } from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './Checkbox.module.css';

export type CheckboxProps = {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Checkbox size */
  size?: 'small' | 'medium' | 'large';
  /** Color scheme */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /** Indeterminate state */
  indeterminate?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'medium',
      color = 'primary',
      indeterminate = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, checkboxRef]);
    const sizeClass = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    }[size];

    const colorClass = {
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      success: styles.colorSuccess,
      warning: styles.colorWarning,
      danger: styles.colorDanger,
    }[color];

    const checkboxClassName = clsx(
      styles.checkbox,
      sizeClass,
      colorClass,
      error && styles.error,
      disabled && styles.disabled,
      indeterminate && styles.indeterminate,
      className
    );

    const containerClassName = clsx(styles.container);

    return (
      <div className={containerClassName}>
        <label className={clsx(styles.labelWrapper, disabled && styles.disabledLabel)}>
          <input
            ref={checkboxRef}
            type="checkbox"
            className={checkboxClassName}
            disabled={disabled}
            {...props}
          />
          {label && (
            <span className={styles.label}>
              {label}
              {props.required && <span className={styles.required}>*</span>}
            </span>
          )}
        </label>
        {(error ?? helperText) && (
          <p className={error ? styles.errorText : styles.helperText}>{error ?? helperText}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
