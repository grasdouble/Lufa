import { forwardRef, HTMLAttributes, ReactNode, ElementType } from 'react';
import styles from './Typography.module.css';

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    /** The HTML element to render */
    as?: TypographyElement;
    /** Visual style variant */
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodyLarge' | 'bodySmall' | 'caption' | 'label';
    /** Font weight */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    /** Text alignment */
    align?: 'left' | 'center' | 'right' | 'justify';
    /** Text color variant */
    color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'error' | 'success' | 'warning';
    /** Children content */
    children: ReactNode;
}

/** Typography component for consistent text styling */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
    ({ as, variant = 'body', weight, align, color = 'primary', className = '', children, ...props }, ref) => {
        const Component = (as || getDefaultElement(variant)) as ElementType;

        const typographyClasses = [
            styles.typography,
            styles[`variant-${variant}`],
            weight && styles[`weight-${weight}`],
            align && styles[`align-${align}`],
            styles[`color-${color}`],
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <Component ref={ref as React.Ref<HTMLElement>} className={typographyClasses} {...props}>
                {children}
            </Component>
        );
    }
);

Typography.displayName = 'Typography';

function getDefaultElement(variant: TypographyProps['variant']): TypographyElement {
    switch (variant) {
        case 'h1':
            return 'h1';
        case 'h2':
            return 'h2';
        case 'h3':
            return 'h3';
        case 'h4':
            return 'h4';
        case 'h5':
            return 'h5';
        case 'h6':
            return 'h6';
        case 'caption':
        case 'label':
            return 'span';
        default:
            return 'p';
    }
}
