import type { ElementType, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { SPACE_DIRECTION, SPACE_SIZE } from './Space.constants';
import styles from './Space.module.css';

export type SpaceSize = keyof typeof SPACE_SIZE | number;
export type SpaceDirection = keyof typeof SPACE_DIRECTION;

type SpaceElement = 'div' | 'span';

export type SpaceProps = {
  /** The HTML element to render */
  as?: SpaceElement;
  /** Spacer direction */
  direction?: SpaceDirection;
  /** Spacer size (token key, px number, or CSS length string) */
  size?: SpaceSize;
} & HTMLAttributes<HTMLElement>;

const toCssLength = (value: SpaceSize | undefined) => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string' && value in SPACE_SIZE) return `var(--lufa-token-spacing-${value})`;
  return value;
};

/** Simple spacer element to add fixed horizontal/vertical space */
export const Space = forwardRef<HTMLElement, SpaceProps>(
  ({ as = 'div', direction = SPACE_DIRECTION.vertical, size = SPACE_SIZE.md, className, style, ...props }, ref) => {
    const Component = as as ElementType;
    const spaceSize = toCssLength(size);

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(
          styles.space,
          direction === SPACE_DIRECTION.horizontal ? styles.horizontal : styles.vertical,
          className
        )}
        style={{ ...style, ['--lufa-space-size' as string]: spaceSize }}
        aria-hidden={props['aria-hidden'] ?? true}
        {...props}
      />
    );
  }
);

Space.displayName = 'Space';
