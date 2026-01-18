import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

export type ButtonProps = {
  /**
   * Button content
   */
  children?: ReactNode;

  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: 'solid' | 'outlined' | 'text' | 'ghost' | 'link';

  /**
   * Color scheme
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Loading state - shows spinner and disables interaction
   * @default false
   */
  loading?: boolean;

  /**
   * Icon before text
   */
  startIcon?: ReactNode;

  /**
   * Icon after text
   */
  endIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button component with multiple variants, colors, and sizes.
 * Supports loading states, icons, and full accessibility.
 *
 * @example
 * ```tsx
 * <Button variant="solid" color="primary" size="medium">
 *   Click me
 * </Button>
 *
 * <Button variant="outlined" color="danger" startIcon={<TrashIcon />}>
 *   Delete
 * </Button>
 *
 * <Button variant="solid" loading>
 *   Saving...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'primary',
      size = 'medium',
      fullWidth = false,
      loading = false,
      startIcon,
      endIcon,
      disabled,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const variantClass = styles[`variant${capitalize(variant)}` as keyof typeof styles];
    const colorClass = styles[`color${capitalize(color)}` as keyof typeof styles];
    const sizeClass = styles[`size${capitalize(size)}` as keyof typeof styles];

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.button,
          variantClass,
          colorClass,
          sizeClass,
          fullWidth && styles.fullWidth,
          loading && styles.loading,
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className={styles.spinner} aria-label="Loading">
            <svg className={styles.spinnerIcon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className={styles.spinnerPath}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {!loading && startIcon && (
          <span className={styles.startIcon} aria-hidden="true">
            {startIcon}
          </span>
        )}
        <span className={styles.content}>{children}</span>
        {!loading && endIcon && (
          <span className={styles.endIcon} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
