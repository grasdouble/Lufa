import type { ComponentPropsWithoutRef } from 'react';

import styles from './Skeleton.module.css';

export type SkeletonProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Skeleton variant
   * @default 'rectangular'
   */
  variant?: 'text' | 'circular' | 'rectangular';
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Animation type
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | false;
  /**
   * Additional CSS classes
   */
  className?: string;
};

/**
 * Skeleton component for loading states.
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width="100%" />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  className = '',
  style,
  ...props
}: SkeletonProps) => {
  const variantClass = {
    text: styles.variantText,
    circular: styles.variantCircular,
    rectangular: styles.variantRectangular,
  }[variant];

  const animationClass = animation ? styles[`animation${animation.charAt(0).toUpperCase()}${animation.slice(1)}`] : '';

  const skeletonClassName = `${styles.skeleton} ${variantClass} ${animationClass} ${className}`.trim();

  const inlineStyle = {
    ...style,
    ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  return <div className={skeletonClassName} style={inlineStyle} {...props} />;
};

Skeleton.displayName = 'Skeleton';
