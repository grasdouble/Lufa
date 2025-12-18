import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

type SidebarElement = 'aside' | 'div' | 'nav';

export interface LayoutSidebarProps extends HTMLAttributes<HTMLElement> {
  as?: SidebarElement;
  children?: ReactNode;
}

export const LayoutSidebar = forwardRef<HTMLElement, LayoutSidebarProps>(
  ({ as = 'aside', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.sidebar, className)} {...props} />;
  }
);

LayoutSidebar.displayName = 'Layout.Sidebar';
