import { forwardRef, AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link content */
  children?: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'underline' | 'button';
  /** Color scheme */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'inherit';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Icon before text */
  startIcon?: ReactNode;
  /** Icon after text */
  endIcon?: ReactNode;
  /** External link indicator */
  external?: boolean;
}

/**
 * Link component for navigation to different pages or external URLs
 * Use for routing to different pages, external sites, or downloadable files
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      variant = 'default',
      color = 'primary',
      size = 'medium',
      startIcon,
      endIcon,
      external = false,
      className = '',
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const variantClass = {
      default: styles.variantDefault,
      underline: styles.variantUnderline,
      button: styles.variantButton,
    }[variant];

    const colorClass = {
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      success: styles.colorSuccess,
      warning: styles.colorWarning,
      danger: styles.colorDanger,
      inherit: styles.colorInherit,
    }[color];

    const sizeClass = {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
    }[size];

    const classNames = clsx(styles.link, variantClass, colorClass, sizeClass, className);

    // Automatically set target and rel for external links
    const linkTarget = external ? '_blank' : target;
    const linkRel = external
      ? Array.from(
          new Set(
            `${rel ?? ''} noopener noreferrer`
              .split(/\s+/)
              .map((value) => value.trim())
              .filter(Boolean)
          )
        ).join(' ')
      : rel;

    return (
      <a ref={ref} className={classNames} target={linkTarget} rel={linkRel} {...props}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
        {external && !endIcon && (
          <span className={styles.externalIcon} aria-label="(opens in new tab)">
            ↗
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';
