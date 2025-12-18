import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Layout.module.css';

type FooterElement = 'footer' | 'div';

export type LayoutFooterProps = {
  as?: FooterElement;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(
  ({ as = 'footer', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.footer, className)} {...props} />;
  }
);

LayoutFooter.displayName = 'Layout.Footer';
