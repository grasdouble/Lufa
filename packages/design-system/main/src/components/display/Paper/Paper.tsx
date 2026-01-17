import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './Paper.module.css';

export type PaperProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Content to be rendered inside the Paper
   */
  children: ReactNode;

  /**
   * Visual variant of the Paper
   * @default 'default'
   */
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';

  /**
   * Padding size
   * @default 'medium'
   */
  padding?: 'none' | 'small' | 'medium' | 'large';

  /**
   * Border radius size
   * @default 'medium'
   */
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full';

  /**
   * Elevation level (only applies to 'elevated' variant)
   * @default 'medium'
   */
  elevation?: 'none' | 'small' | 'medium' | 'large' | 'xlarge';

  /**
   * Additional CSS class name
   */
  className?: string;
};

/**
 * Paper component - A foundational surface component that displays content with elevation and styling.
 *
 * @example
 * ```tsx
 * <Paper variant="elevated" padding="medium">
 *   <p>Content goes here</p>
 * </Paper>
 * ```
 */
export const Paper = ({
  children,
  variant = 'default',
  padding = 'medium',
  radius = 'medium',
  elevation = 'medium',
  className = '',
  ...props
}: PaperProps) => {
  const variantClass = {
    default: styles.variantDefault,
    elevated: styles.variantElevated,
    outlined: styles.variantOutlined,
    filled: styles.variantFilled,
  }[variant];

  const paddingClass = {
    none: styles.paddingNone,
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge,
  }[padding];

  const radiusClass = {
    none: styles.radiusNone,
    small: styles.radiusSmall,
    medium: styles.radiusMedium,
    large: styles.radiusLarge,
    full: styles.radiusFull,
  }[radius];

  const elevationClass =
    variant === 'elevated'
      ? {
          none: styles.elevationNone,
          small: styles.elevationSmall,
          medium: styles.elevationMedium,
          large: styles.elevationLarge,
          xlarge: styles.elevationXlarge,
        }[elevation]
      : '';

  const paperClassName = `
    ${styles.paper}
    ${variantClass}
    ${paddingClass}
    ${radiusClass}
    ${elevationClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <div className={paperClassName} {...props}>
      {children}
    </div>
  );
};

Paper.displayName = 'Paper';
