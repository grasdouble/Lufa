import React, { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.css';

export type Theme = 'default' | 'ocean' | 'forest';

export interface ThemeSwitcherProps {
    /**
     * Default theme to use
     * @default 'default'
     */
    defaultTheme?: Theme;
    /**
     * Callback when theme changes
     */
    onThemeChange?: (theme: Theme) => void;
    /**
     * Button variant style
     * @default 'button'
     */
    variant?: 'button' | 'select' | 'tabs';
    /**
     * Show theme name label
     * @default true
     */
    showLabel?: boolean;
}

/**
 * ThemeSwitcher component allows users to switch between different color themes.
 * Themes are applied by setting the data-theme attribute on the document root.
 */
export function ThemeSwitcher({ defaultTheme = 'default', onThemeChange, variant = 'button', showLabel = true }: ThemeSwitcherProps) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        // Apply theme on mount and when it changes
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    const handleThemeChange = (theme: Theme) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
        onThemeChange?.(theme);
    };

    if (variant === 'select') {
        return (
            <div className={styles.container}>
                {showLabel && <label className={styles.label}>Theme:</label>}
                <select className={styles.select} value={currentTheme} onChange={(e) => handleThemeChange(e.target.value as Theme)}>
                    <option value="default">Default</option>
                    <option value="ocean">Ocean</option>
                    <option value="forest">Forest</option>
                </select>
            </div>
        );
    }

    if (variant === 'tabs') {
        return (
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${currentTheme === 'default' ? styles.active : ''}`}
                    onClick={() => handleThemeChange('default')}
                >
                    Default
                </button>
                <button
                    className={`${styles.tab} ${currentTheme === 'ocean' ? styles.active : ''}`}
                    onClick={() => handleThemeChange('ocean')}
                >
                    Ocean
                </button>
                <button
                    className={`${styles.tab} ${currentTheme === 'forest' ? styles.active : ''}`}
                    onClick={() => handleThemeChange('forest')}
                >
                    Forest
                </button>
            </div>
        );
    }

    // Default: button variant
    return (
        <div className={styles.buttonGroup}>
            {showLabel && <span className={styles.label}>Theme:</span>}
            <button
                className={`${styles.button} ${currentTheme === 'default' ? styles.active : ''}`}
                onClick={() => handleThemeChange('default')}
            >
                Default
            </button>
            <button
                className={`${styles.button} ${currentTheme === 'ocean' ? styles.active : ''}`}
                onClick={() => handleThemeChange('ocean')}
            >
                Ocean
            </button>
            <button
                className={`${styles.button} ${currentTheme === 'forest' ? styles.active : ''}`}
                onClick={() => handleThemeChange('forest')}
            >
                Forest
            </button>
        </div>
    );
}
