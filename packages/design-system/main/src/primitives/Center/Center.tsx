import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

import type { BoxComponentProps, BoxProps } from '../Box/Box';
import { Box } from '../Box/Box';
import styles from './Center.module.css';

export type CenterProps<T extends ElementType = 'div'> = BoxProps<T> & {
  /**
   * If true, sets display to inline-flex
   */
  inline?: boolean;
};

type CenterComponentProps<T extends ElementType> = CenterProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CenterProps<T>>;

/**
 * Center Component
 *
 * A layout primitive that centers its content horizontally and vertically.
 * It is a shorthand for <Flex align="center" justify="center">.
 *
 * @example
 * ```tsx
 * <Center>
 *   <Icon name="check" />
 * </Center>
 * ```
 */
const CenterImpl = <T extends ElementType = 'div'>(
  { inline, className, ...props }: CenterComponentProps<T>,
  ref: React.ForwardedRef<Element>
) => {
  return (
    <Box<T>
      ref={ref as React.Ref<never>}
      className={clsx(styles.center, inline && styles['inline-true'], className)}
      {...(props as BoxComponentProps<T>)}
    />
  );
};

export const Center = Object.assign(
  forwardRef(CenterImpl) as <T extends ElementType = 'div'>(
    props: CenterComponentProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
  ) => React.ReactElement,
  { displayName: 'Center' }
);
