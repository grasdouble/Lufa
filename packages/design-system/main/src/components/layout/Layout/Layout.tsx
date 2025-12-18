import clsx from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';
import styles from './Layout.module.css';
import { LAYOUT_GAP, LAYOUT_SIDEBAR_POSITION, LAYOUT_SIDEBAR_WIDTH } from './Layout.constants';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Enables the sidebar column and area */
  sidebar?: boolean;
  /** Sidebar placement (when sidebar is enabled) */
  sidebarPosition?: keyof typeof LAYOUT_SIDEBAR_POSITION;
  /** Sidebar width (when sidebar is enabled) */
  sidebarWidth?: keyof typeof LAYOUT_SIDEBAR_WIDTH;
  /** Gap between areas */
  gap?: keyof typeof LAYOUT_GAP;
}

/** Page-level layout scaffold using CSS grid areas (Header/Sidebar/Content/Footer) */
export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      sidebar = false,
      sidebarPosition = LAYOUT_SIDEBAR_POSITION.left,
      sidebarWidth = LAYOUT_SIDEBAR_WIDTH.default,
      gap = LAYOUT_GAP.md,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.layout,
          sidebar ? styles.withSidebar : styles.noSidebar,
          sidebar && (sidebarPosition === LAYOUT_SIDEBAR_POSITION.right ? styles.sidebarRight : styles.sidebarLeft),
          sidebar && styles[`sidebarWidth-${sidebarWidth}`],
          styles[`gap-${gap}`],
          className
        )}
        {...props}
      />
    );
  }
);

Layout.displayName = 'Layout';
