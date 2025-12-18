import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge content - text or any React elements */
  children?: ReactNode;
  /** Deprecated: Use children instead */
  label?: string;
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Adds dot indicator */
  dot?: boolean;
  /** Makes badge rounded (pill shape) */
  rounded?: boolean;
}

/** Modern Badge component for labels, tags, and status indicators */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { children, label, size = 'md', variant = 'default', dot = false, rounded = false, className = '', ...props },
    ref
  ) => {
    const content = children || label;

    const badgeClasses = [
      styles.badge,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      rounded && styles.rounded,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {dot && <span className={styles.dot} />}
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
