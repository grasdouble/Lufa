import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './Center.module.css';

export type CenterAxis = 'both' | 'horizontal' | 'vertical';

type CenterElement = 'div' | 'span' | 'section' | 'main' | 'article';

export interface CenterProps extends HTMLAttributes<HTMLElement> {
    /** The HTML element to render */
    as?: CenterElement;
    /** Which axis to center on */
    axis?: CenterAxis;
    /** Use `inline-flex` instead of `flex` */
    inline?: boolean;
    /** Optional min-height for the container (CSS length) */
    minHeight?: number | string;
    children?: ReactNode;
}

const toCssLength = (value?: string | number) => {
    if (value === undefined) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
};

/** Centers children horizontally/vertically using flex */
export const Center = forwardRef<HTMLElement, CenterProps>(
    ({ as = 'div', axis = 'both', inline = false, minHeight, className, style, children, ...props }, ref) => {
        const Component = as as ElementType;

        return (
            <Component
                ref={ref as React.Ref<HTMLElement>}
                className={clsx(
                    styles.center,
                    inline ? styles.inline : styles.block,
                    axis === 'horizontal' && styles.axisHorizontal,
                    axis === 'vertical' && styles.axisVertical,
                    axis === 'both' && styles.axisBoth,
                    className
                )}
                style={{ ...style, minHeight: toCssLength(minHeight) }}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Center.displayName = 'Center';

