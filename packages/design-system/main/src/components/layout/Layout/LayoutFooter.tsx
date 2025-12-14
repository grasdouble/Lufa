import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

type FooterElement = 'footer' | 'div';

export interface LayoutFooterProps extends HTMLAttributes<HTMLElement> {
    as?: FooterElement;
    children?: ReactNode;
}

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(({ as = 'footer', className, ...props }, ref) => {
    const Component = as as ElementType;
    return <Component ref={ref as React.Ref<HTMLElement>} className={clsx(styles.footer, className)} {...props} />;
});

LayoutFooter.displayName = 'Layout.Footer';

