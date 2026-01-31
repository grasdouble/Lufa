import type { ElementType } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

import type { BoxProps } from '../Box/Box';
import { Box } from '../Box/Box';
import styles from './Center.module.css';

export type CenterProps<T extends ElementType = 'div'> = BoxProps<T> & {
  /**
   * If true, sets display to inline-flex
   */
  inline?: boolean;
};

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
  { inline, className, ...props }: CenterProps<T>,
  ref: React.ForwardedRef<Element>
) => {
  return (
    <Box
      ref={ref}
      className={clsx(styles.center, inline && styles['inline-true'], className)}
      {...(props as BoxProps<T>)}
    />
  );
};

export const Center = Object.assign(
  forwardRef(CenterImpl) as <T extends ElementType = 'div'>(
    props: CenterProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
  ) => React.ReactElement,
  { displayName: 'Center' }
);
