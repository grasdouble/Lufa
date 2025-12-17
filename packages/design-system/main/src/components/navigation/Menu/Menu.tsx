import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import styles from './Menu.module.css';

export interface MenuItem {
    /** Unique key for the menu item */
    key: string;
    /** Label to display */
    label: string;
    /** Icon before label */
    icon?: ReactNode;
    /** Click handler */
    onClick?: () => void;
    /** Link URL (alternative to onClick) */
    href?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Submenu items */
    children?: MenuItem[];
}

export interface MenuProps {
    /** Array of menu items */
    items: MenuItem[];
    /** Selected menu item key */
    selectedKey?: string;
    /** Menu mode */
    mode?: 'vertical' | 'horizontal' | 'inline';
    /** Theme variant */
    theme?: 'light' | 'dark';
    /** Additional CSS class */
    className?: string;
    /** Selection change handler */
    onSelect?: (key: string) => void;
}

/**
 * Menu component for navigation and action lists
 * Supports vertical, horizontal, and inline modes with optional submenu
 */
export const Menu = ({ items, selectedKey, mode = 'vertical', theme = 'light', className = '', onSelect }: MenuProps) => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const handleItemClick = (item: MenuItem) => {
        if (item.disabled) return;

        if (item.onClick) {
            item.onClick();
        }

        if (item.key && onSelect) {
            onSelect(item.key);
        }

        // Toggle submenu
        if (item.children && item.children.length > 0) {
            setOpenKeys((prev) => (prev.includes(item.key) ? prev.filter((k) => k !== item.key) : [...prev, item.key]));
        }
    };

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openKeys.includes(item.key);
        const isSelected = selectedKey === item.key;

        const itemClassNames = clsx(styles.item, isSelected && styles.selected, item.disabled && styles.disabled);

        const content = (
            <>
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                <span className={styles.label}>{item.label}</span>
                {hasChildren && <span className={clsx(styles.arrow, isOpen && styles.arrowOpen)}>▸</span>}
            </>
        );

        return (
            <li key={item.key} className={styles.listItem}>
                {item.href && !item.disabled ? (
                    <a href={item.href} className={itemClassNames} onClick={() => handleItemClick(item)}>
                        {content}
                    </a>
                ) : (
                    <div
                        className={itemClassNames}
                        onClick={() => handleItemClick(item)}
                        role="button"
                        tabIndex={item.disabled ? -1 : 0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleItemClick(item);
                            }
                        }}
                    >
                        {content}
                    </div>
                )}

                {hasChildren && isOpen && (
                    <ul className={clsx(styles.submenu, styles[`level${level + 1}` as keyof typeof styles])}>
                        {item.children!.map((child) => renderMenuItem(child, level + 1))}
                    </ul>
                )}
            </li>
        );
    };

    const modeClass = {
        vertical: styles.modeVertical,
        horizontal: styles.modeHorizontal,
        inline: styles.modeInline,
    }[mode];

    const themeClass = {
        light: styles.themeLight,
        dark: styles.themeDark,
    }[theme];

    const classNames = clsx(styles.menu, modeClass, themeClass, className);

    return (
        <nav className={classNames}>
            <ul className={styles.list}>{items.map((item) => renderMenuItem(item))}</ul>
        </nav>
    );
};

Menu.displayName = 'Menu';
