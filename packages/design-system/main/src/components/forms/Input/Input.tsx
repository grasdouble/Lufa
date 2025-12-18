import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  /** Left icon/element */
  startAdornment?: React.ReactNode;
  /** Right icon/element */
  endAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'medium',
      variant = 'outlined',
      fullWidth = false,
      startAdornment,
      endAdornment,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClass = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    }[size];

    const variantClass = {
      outlined: styles.variantOutlined,
      filled: styles.variantFilled,
    }[variant];

    const containerClassName = `
            ${styles.container}
            ${fullWidth ? styles.fullWidth : ''}
        `.trim();

    const inputClassName = `
            ${styles.input}
            ${sizeClass}
            ${variantClass}
            ${error ? styles.error : ''}
            ${disabled ? styles.disabled : ''}
            ${startAdornment ? styles.hasStartAdornment : ''}
            ${endAdornment ? styles.hasEndAdornment : ''}
            ${className}
        `.trim();

    return (
      <div className={containerClassName}>
        {label && (
          <label className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {startAdornment && <div className={styles.startAdornment}>{startAdornment}</div>}
          <input ref={ref} className={inputClassName} disabled={disabled} {...props} />
          {endAdornment && <div className={styles.endAdornment}>{endAdornment}</div>}
        </div>
        {(error || helperText) && <p className={error ? styles.errorText : styles.helperText}>{error || helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
