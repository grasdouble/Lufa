import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './Paper.module.css';

// Safe fallback for styles to prevent property access on undefined
const safeStyles = styles ?? ({} as typeof styles);

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
    default: safeStyles.variantDefault,
    elevated: safeStyles.variantElevated,
    outlined: safeStyles.variantOutlined,
    filled: safeStyles.variantFilled,
  }[variant];

  const paddingClass = {
    none: safeStyles.paddingNone,
    small: safeStyles.paddingSmall,
    medium: safeStyles.paddingMedium,
    large: safeStyles.paddingLarge,
  }[padding];

  const radiusClass = {
    none: safeStyles.radiusNone,
    small: safeStyles.radiusSmall,
    medium: safeStyles.radiusMedium,
    large: safeStyles.radiusLarge,
    full: safeStyles.radiusFull,
  }[radius];

  const elevationClass =
    variant === 'elevated'
      ? {
          none: safeStyles.elevationNone,
          small: safeStyles.elevationSmall,
          medium: safeStyles.elevationMedium,
          large: safeStyles.elevationLarge,
          xlarge: safeStyles.elevationXlarge,
        }[elevation]
      : '';

  const paperClassName = `
    ${safeStyles.paper}
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
