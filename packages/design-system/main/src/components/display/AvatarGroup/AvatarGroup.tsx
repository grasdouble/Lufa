import type { HTMLAttributes } from 'react';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';

import type { AvatarProps } from '../Avatar';
import { Avatar } from '../Avatar';
import styles from './AvatarGroup.module.css';

export type AvatarGroupProps = {
  /** Maximum number of avatars to display before showing count */
  max?: number;
  /** Children should be Avatar components */
  children: React.ReactNode;
  /** Avatar size (applies to all avatars) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & HTMLAttributes<HTMLDivElement>;

/** Container component for displaying multiple avatars with overlap and optional count */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, children, size = 'md', className = '', ...props }, ref) => {
    const childrenArray = Children.toArray(children);
    const totalAvatars = childrenArray.length;
    const visibleAvatars = max && max < totalAvatars ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max && max < totalAvatars ? totalAvatars - max : 0;

    const containerClasses = [styles.container, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {visibleAvatars.map((child, index) => {
          if (isValidElement<AvatarProps>(child)) {
            return cloneElement(child, {
              key: index,
              size: child.props.size ?? size,
              className: [child.props.className ?? '', styles.avatar].filter(Boolean).join(' '),
            });
          }
          return child;
        })}
        {remainingCount > 0 && (
          <Avatar variant="count" size={size} count={`+${remainingCount}`} className={styles.avatar} />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
