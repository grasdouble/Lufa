import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Kbd.module.css';

export type KbdProps = {
  /** Keyboard key content */
  children: ReactNode;
  /** Visual size variant */
  size?: 'small' | 'medium' | 'large';
  /** Visual variant */
  variant?: 'default' | 'outlined' | 'solid';
} & ComponentPropsWithoutRef<'kbd'>;

/**
 * Kbd component for displaying keyboard shortcuts and keys
 *
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd>
 * <Kbd>K</Kbd>
 * <Kbd size="large">Enter</Kbd>
 * <Kbd variant="solid">Ctrl</Kbd>
 * ```
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, size = 'medium', variant = 'default', className, ...props }, ref) => {
    const sizeClass = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    }[size];

    const variantClass = {
      default: styles.variantDefault,
      outlined: styles.variantOutlined,
      solid: styles.variantSolid,
    }[variant];

    const classNames = clsx(styles.kbd, sizeClass, variantClass, className);

    return (
      <kbd ref={ref} className={classNames} {...props}>
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';
