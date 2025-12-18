import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Container.module.css';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid';
export type ContainerAlign = 'start' | 'center' | 'end';
export type ContainerSpacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

type ContainerElement = 'div' | 'main' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'nav';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** The HTML element to render */
  as?: ContainerElement;
  /** Max-width constraint */
  size?: ContainerSize;
  /** Horizontal alignment (relevant when constrained) */
  align?: ContainerAlign;
  /** Horizontal padding */
  paddingX?: ContainerSpacing;
  /** Vertical padding */
  paddingY?: ContainerSpacing;
  /** Content */
  children?: ReactNode;
}

/** Layout container with token-based max widths and optional padding */
export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    { as = 'div', size = 'xl', align = 'center', paddingX = 'base', paddingY = 'none', className, children, ...props },
    ref
  ) => {
    const Component = as as ElementType;

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(
          styles.container,
          styles[`size-${size}`],
          styles[`align-${align}`],
          styles[`paddingX-${paddingX}`],
          styles[`paddingY-${paddingY}`],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
