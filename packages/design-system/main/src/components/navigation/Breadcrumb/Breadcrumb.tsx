import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
    /** Label to display */
    label: string;
    /** Link URL (optional for current/last item) */
    href?: string;
    /** Icon before label */
    icon?: ReactNode;
}

export interface BreadcrumbProps {
    /** Array of breadcrumb items */
    items: BreadcrumbItem[];
    /** Custom separator */
    separator?: ReactNode;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Additional CSS class */
    className?: string;
}

/**
 * Breadcrumb component for hierarchical navigation
 * Shows the current page's location within a navigational hierarchy
 */
export const Breadcrumb = ({ items, separator = '/', size = 'medium', className = '' }: BreadcrumbProps) => {
    const sizeClass = {
        small: styles.sizeSmall,
        medium: styles.sizeMedium,
        large: styles.sizeLarge,
    }[size];

    const classNames = clsx(styles.breadcrumb, sizeClass, className);

    return (
        <nav aria-label="Breadcrumb" className={classNames}>
            <ol className={styles.list}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className={styles.item}>
                            {item.href && !isLast ? (
                                <a href={item.href} className={styles.link}>
                                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                                    {item.label}
                                </a>
                            ) : (
                                <span className={clsx(styles.text, isLast && styles.current)} aria-current={isLast ? 'page' : undefined}>
                                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <span className={styles.separator} aria-hidden="true">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

Breadcrumb.displayName = 'Breadcrumb';
