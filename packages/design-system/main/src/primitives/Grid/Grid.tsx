import type { ElementType } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

import type { BoxComponentProps } from '../Box/Box';
import { Box } from '../Box/Box';
import styles from './Grid.module.css';

export type GridProps<T extends ElementType = 'div'> = BoxComponentProps<T> & {
  /**
   * Number of columns
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /**
   * Gap between items (shorthand for row-gap and column-gap)
   */
  gap?: 'tight' | 'compact' | 'default' | 'comfortable' | 'spacious';
  /**
   * Column gap
   */
  gapX?: 'tight' | 'compact' | 'default' | 'comfortable' | 'spacious';
  /**
   * Row gap
   */
  gapY?: 'tight' | 'compact' | 'default' | 'comfortable' | 'spacious';
  /**
   * Align items (align-items)
   */
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  /**
   * Justify items (justify-items)
   */
  justify?: 'start' | 'end' | 'center' | 'stretch';
  /**
   * If true, sets display to inline-grid
   */
  inline?: boolean;
};

/**
 * Grid Component
 *
 * A layout primitive for CSS Grid layouts.
 *
 * @example
 * ```tsx
 * <Grid columns={2} gap="default">
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 * </Grid>
 * ```
 */
const GridImpl = <T extends ElementType = 'div'>(
  { columns, gap, gapX, gapY, align, justify, inline, className, ...props }: GridProps<T>,
  ref: React.ForwardedRef<Element>
) => {
  const gridClassName = clsx(
    styles.grid, // Base grid class
    columns && styles[`columns-${columns}`],
    gap && styles[`gap-${gap}`],
    gapX && styles[`gapX-${gapX}`],
    gapY && styles[`gapY-${gapY}`],
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    inline && styles[`inline-true`],
    className
  );

  return (
    <Box<T> ref={ref as React.Ref<never>} className={gridClassName} {...(props as BoxComponentProps<T>)} />
  );
};

export const Grid = Object.assign(
  forwardRef(GridImpl) as <T extends ElementType = 'div'>(
    props: GridProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
  ) => React.ReactElement,
  { displayName: 'Grid' }
);
