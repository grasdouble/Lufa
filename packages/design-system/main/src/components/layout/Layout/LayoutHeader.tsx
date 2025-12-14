import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

type HeaderElement = 'header' | 'div';

export interface LayoutHeaderProps extends HTMLAttributes<HTMLElement> {
    as?: HeaderElement;
    children?: ReactNode;
}

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(({ as = 'header', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.header, className)} {...props} />;
});

LayoutHeader.displayName = 'Layout.Header';

