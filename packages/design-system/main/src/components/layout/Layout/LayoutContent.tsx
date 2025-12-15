import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

type ContentElement = 'main' | 'div' | 'section' | 'article';

export interface LayoutContentProps extends HTMLAttributes<HTMLElement> {
    as?: ContentElement;
    children?: ReactNode;
}

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(({ as = 'main', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.content, className)} {...props} />;
});

LayoutContent.displayName = 'Layout.Content';

