import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

import styles from './Container.module.css';

// Breakpoint keys matching the tokens
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ContainerProps<T extends ElementType = 'div'> = {
  /**
   * The HTML element to render.
   * @default 'div'
   */
  as?: T;
  /**
   * If true, the container will take 100% width (no max-width).
   * @default false
   */
  fluid?: boolean;
  /**
   * The maximum size of the container, matching a breakpoint.
   * Useful to constrain the container to a smaller size than the viewport.
   */
  size?: Breakpoint;
  /**
   * The content to render.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'fluid' | 'size' | 'className'>;

/**
 * Container Component
 *
 * A layout primitive that centers content horizontally and constrains its max-width.
 * It uses the responsive breakpoints defined in the Design Tokens.
 *
 * @example
 * ```tsx
 * // Standard responsive container
 * <Container>Content</Container>
 *
 * // Fluid container (100% width)
 * <Container fluid>Full width content</Container>
 *
 * // Constrained container
 * <Container size="md">Narrow content</Container>
 * ```
 */
export const Container = forwardRef(
  <T extends ElementType = 'div'>(
    { as, fluid = false, size, children, className, ...props }: ContainerProps<T>,
    ref: React.ForwardedRef<Element>
  ) => {
    const Component = as ?? 'div';

    return (
      <Component
        ref={ref as React.Ref<never>}
        className={clsx(styles.container, fluid && styles['fluid-true'], size && styles[`size-${size}`], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
