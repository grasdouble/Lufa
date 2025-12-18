import type { ReactNode } from 'react';
import clsx from 'clsx';

import { STACK_ALIGN, STACK_DIRECTION, STACK_GAP, STACK_JUSTIFY, STACK_PADDING, STACK_WRAP } from './Stack.constants';
import styles from './Stack.module.css';

export type StackProps = {
  children?: ReactNode;
  gap?: keyof typeof STACK_GAP;
  direction?: keyof typeof STACK_DIRECTION;
  align?: keyof typeof STACK_ALIGN;
  wrap?: keyof typeof STACK_WRAP;
  justify?: keyof typeof STACK_JUSTIFY;
  padding?: keyof typeof STACK_PADDING;
};

export const Stack = ({
  gap = STACK_GAP.normal,
  direction = STACK_DIRECTION.vertical,
  align = STACK_ALIGN.stretch,
  wrap = STACK_WRAP.nowrap,
  justify = STACK_JUSTIFY.start,
  padding = STACK_PADDING.none,
  children,
}: StackProps) => {
  return (
    <div
      className={clsx(
        styles[`gap-${gap}` as keyof typeof styles],
        styles[`direction-${direction}` as keyof typeof styles],
        styles[`align-${align}` as keyof typeof styles],
        styles[`wrap-${wrap}` as keyof typeof styles],
        styles[`justify-${justify}` as keyof typeof styles],
        styles[`padding-${padding}` as keyof typeof styles]
      )}
    >
      {children}
    </div>
  );
};
