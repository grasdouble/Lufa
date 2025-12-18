import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { GRID_COLUMNS, GRID_GUTTER } from './Grid.constants';
import styles from './Grid.module.css';

export type GridProps = {
  /** Grid content */
  children?: ReactNode;
  /** Number of columns (semantic tokens) */
  columns?: keyof typeof GRID_COLUMNS;
  /** Spacing between grid items */
  gutter?: keyof typeof GRID_GUTTER;
} & HTMLAttributes<HTMLDivElement>;

/** Token-driven grid layout (CSS grid) */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = GRID_COLUMNS.twelve, gutter = GRID_GUTTER.md, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.grid, styles[`columns-${columns}`], styles[`gutter-${gutter}`], className)}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';
