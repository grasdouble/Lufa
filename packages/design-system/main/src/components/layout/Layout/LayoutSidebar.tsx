import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Layout.module.css';

type SidebarElement = 'aside' | 'div' | 'nav';

export type LayoutSidebarProps = {
  as?: SidebarElement;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const LayoutSidebar = forwardRef<HTMLElement, LayoutSidebarProps>(
  ({ as = 'aside', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.sidebar, className)} {...props} />;
  }
);

LayoutSidebar.displayName = 'Layout.Sidebar';
