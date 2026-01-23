import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Layout.module.css';

type HeaderElement = 'header' | 'div';

export type LayoutHeaderProps = {
  as?: HeaderElement;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(
  ({ as = 'header', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.header, className)} {...props} />;
  }
);

LayoutHeader.displayName = 'Layout.Header';
