import type { ReactNode } from 'react';

import styles from './Card.module.css';

export type CardProps = {
  /** Card content */
  children: ReactNode;
  /** Card title */
  title?: string;
  /** Card subtitle or description */
  subtitle?: string;
  /** Footer content */
  footer?: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  /** Padding size */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Make card interactive/hoverable */
  hoverable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
};

export const Card = ({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  padding = 'medium',
  hoverable = false,
  onClick,
  className = '',
}: CardProps) => {
  const variantClass = {
    default: styles.variantDefault,
    elevated: styles.variantElevated,
    outlined: styles.variantOutlined,
    filled: styles.variantFilled,
  }[variant];

  const paddingClass = {
    none: styles.paddingNone,
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge,
  }[padding];

  const cardClassName = `
        ${styles.card} 
        ${variantClass} 
        ${paddingClass}
        ${hoverable ? styles.hoverable : ''}
        ${onClick ? styles.clickable : ''}
        ${className}
    `.trim();

  return (
    <div className={cardClassName} onClick={onClick}>
      {(title ?? subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
