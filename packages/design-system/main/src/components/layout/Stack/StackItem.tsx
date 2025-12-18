import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Stack.module.css';

export type StackItemProps = {
  grow?: boolean;
  children?: ReactNode;
};

export const StackItem = ({ grow, children }: StackItemProps) => {
  return <div className={clsx(grow && styles.grow)}>{children}</div>;
};
