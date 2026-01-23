import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Layout.module.css';

type ContentElement = 'main' | 'div' | 'section' | 'article';

export type LayoutContentProps = {
  as?: ContentElement;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(
  ({ as = 'main', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.content, className)} {...props} />;
  }
);

LayoutContent.displayName = 'Layout.Content';
