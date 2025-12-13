import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button content - can be text, icons, or any React elements */
    children?: ReactNode;
    /** Deprecated: Use children instead. Label text for the button */
    label?: string;
    /** Visual variant */
    variant?: 'solid' | 'outlined' | 'text' | 'ghost' | 'link';
    /** Color scheme */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    /** Button size */
    size?: 'small' | 'medium' | 'large';
    /** Full width button */
    fullWidth?: boolean;
    /** Loading state */
    loading?: boolean;
    /** Icon before text */
    startIcon?: ReactNode;
    /** Icon after text */
    endIcon?: ReactNode;
}

/** Modern Button component with flexible content and variants */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            label,
            variant = 'solid',
            color = 'primary',
            size = 'medium',
            fullWidth = false,
            loading = false,
            startIcon,
            endIcon,
            disabled,
            className = '',
            ...props
        },
        ref
    ) => {
        const variantClass = {
            solid: styles.variantSolid,
            outlined: styles.variantOutlined,
            text: styles.variantText,
            ghost: styles.variantGhost,
            link: styles.variantLink,
        }[variant];

        const colorClass = {
            primary: styles.colorPrimary,
            secondary: styles.colorSecondary,
            success: styles.colorSuccess,
            warning: styles.colorWarning,
            danger: styles.colorDanger,
        }[color];

        const sizeClass = {
            small: styles.sizeSmall,
            medium: styles.sizeMedium,
            large: styles.sizeLarge,
        }[size];

        const classNames = clsx(
            styles.button,
            variantClass,
            colorClass,
            sizeClass,
            fullWidth && styles.fullWidth,
            loading && styles.loading,
            disabled && styles.disabled,
            className
        );

        const content = children || label;

        return (
            <button ref={ref} className={classNames} disabled={disabled || loading} {...props}>
                {loading && (
                    <span className={styles.spinner}>
                        <svg className={styles.spinnerIcon} fill="none" viewBox="0 0 24 24">
                            <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                                className={styles.spinnerPath}
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </span>
                )}
                {!loading && startIcon && <span className={styles.startIcon}>{startIcon}</span>}
                <span className={styles.content}>{content}</span>
                {!loading && endIcon && <span className={styles.endIcon}>{endIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
