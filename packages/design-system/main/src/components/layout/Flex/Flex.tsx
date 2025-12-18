import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { SPACE_SIZE } from '../Space/Space.constants';
import { FLEX_ALIGN, FLEX_DIRECTION, FLEX_JUSTIFY, FLEX_WRAP } from './Flex.constants';
import styles from './Flex.module.css';

export type FlexGap = keyof typeof SPACE_SIZE | number;

type FlexElement = 'div' | 'span' | 'section' | 'nav' | 'header' | 'footer' | 'main' | 'article';

export type FlexProps = {
  /** The HTML element to render */
  as?: FlexElement;
  /** Use `inline-flex` instead of `flex` */
  inline?: boolean;
  direction?: keyof typeof FLEX_DIRECTION;
  align?: keyof typeof FLEX_ALIGN;
  justify?: keyof typeof FLEX_JUSTIFY;
  wrap?: keyof typeof FLEX_WRAP;
  /** Gap between items (token key, px number, or CSS length string) */
  gap?: FlexGap;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const toGapValue = (value: FlexGap | undefined) => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string' && value in SPACE_SIZE) return `var(--lufa-spacing-${value})`;
  return value;
};

/** Generic flex container with token-friendly gap */
export const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as = 'div',
      inline = false,
      direction = FLEX_DIRECTION.row,
      align = FLEX_ALIGN.stretch,
      justify = FLEX_JUSTIFY.start,
      wrap = FLEX_WRAP.nowrap,
      gap = 'md',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as as ElementType;
    const gapValue = toGapValue(gap);

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(
          styles.flex,
          inline ? styles.inline : styles.block,
          styles[`direction-${direction}`],
          styles[`align-${align}`],
          styles[`justify-${justify}`],
          styles[`wrap-${wrap}`],
          className
        )}
        style={{ ...style, ['--lufa-flex-gap' as string]: gapValue }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Flex.displayName = 'Flex';
