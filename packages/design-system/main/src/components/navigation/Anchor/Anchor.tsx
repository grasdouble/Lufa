import { forwardRef, AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Anchor.module.css';

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Anchor content */
  children?: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'underline' | 'subtle';
  /** Color scheme */
  color?: 'primary' | 'secondary' | 'inherit';
  /** Icon before text */
  startIcon?: ReactNode;
  /** Icon after text */
  endIcon?: ReactNode;
}

/**
 * Anchor component for in-page navigation using anchor links
 */
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, variant = 'default', color = 'primary', startIcon, endIcon, className = '', ...props }, ref) => {
    const variantClass = {
      default: styles.variantDefault,
      underline: styles.variantUnderline,
      subtle: styles.variantSubtle,
    }[variant];

    const colorClass = {
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      inherit: styles.colorInherit,
    }[color];

    const classNames = clsx(styles.anchor, variantClass, colorClass, className);

    return (
      <a ref={ref} className={classNames} {...props}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </a>
    );
  }
);

Anchor.displayName = 'Anchor';
