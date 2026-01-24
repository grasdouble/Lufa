/**
 * Badge Component - Status and Label Indicator
 *
 * A compact indicator component for displaying status, labels, counts, or notifications.
 * Built using composition pattern with Box primitive for styling.
 *
 * Features:
 * - Five semantic variants (default, success, error, warning, info)
 * - Three sizes (sm, md, lg) with token-based dimensions
 * - Optional dot indicator for notifications
 * - Token-based design (component layer tokens)
 * - WCAG 2.1 AA compliant contrast ratios
 * - Polymorphic rendering (span by default, configurable)
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge variant="default" size="md">New</Badge>
 *
 * // Success badge
 * <Badge variant="success">Active</Badge>
 *
 * // Badge with dot
 * <Badge variant="error" dot>3 notifications</Badge>
 *
 * // Small badge for inline use
 * <Badge variant="info" size="sm">Beta</Badge>
 *
 * // As a different element
 * <Badge as="div" variant="warning">Warning</Badge>
 * ```
 */

import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
import { clsx } from 'clsx';

import styles from './Badge.module.css';

// ============================================
// TYPES
// ============================================

/**
 * Badge variant values - semantic color intention
 */
type VariantValue = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Badge size values
 */
type SizeValue = 'sm' | 'md' | 'lg';

/**
 * Valid HTML elements for polymorphic rendering
 */
type ValidBadgeElements = 'span' | 'div' | 'label';

/**
 * Badge component props
 *
 * Generic type T allows proper typing when using `as` prop
 */
export interface BadgeProps<T extends ElementType = 'span'> {
  /**
   * Semantic color variant
   * @default 'default'
   */
  variant?: VariantValue;

  /**
   * Size variant
   * @default 'md'
   */
  size?: SizeValue;

  /**
   * Show dot indicator (for notifications/status)
   * @default false
   */
  dot?: boolean;

  /**
   * Badge content (text, number, etc.)
   */
  children: React.ReactNode;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Element type to render as
   * @default 'span'
   */
  as?: T;
}

/**
 * Infer props from the element type
 */
type PolymorphicBadgeProps<T extends ElementType> = BadgeProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BadgeProps<T>>;

// ============================================
// COMPONENT
// ============================================

/**
 * Badge Component
 *
 * A versatile badge component for status, labels, and notifications.
 * Uses CSS utility classes generated from badge.utilities.config.cjs.
 */
export const Badge = forwardRef(
  <T extends ValidBadgeElements = 'span'>(
    { variant = 'default', size = 'md', dot = false, children, className, as, ...props }: PolymorphicBadgeProps<T>,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    // Determine the element to render
    const Component = (as || 'span') as ElementType;

    // Build className
    const badgeClassName = clsx(
      styles.badge,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      {
        [styles['badge-with-dot']]: dot,
      },
      className
    );

    return (
      <Component ref={ref} className={badgeClassName} {...props}>
        {dot && <span className={styles['badge-dot']} aria-hidden="true" />}
        <span className={styles['badge-content']}>{children}</span>
      </Component>
    );
  }
);

// Set displayName for React DevTools
Badge.displayName = 'Badge';
