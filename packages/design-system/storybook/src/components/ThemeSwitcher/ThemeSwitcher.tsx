import { useEffect, useState } from 'react';

import { Button, Typography } from '@grasdouble/lufa_design-system';

import styles from './ThemeSwitcher.module.css';

export type Theme = 'default' | 'ocean' | 'forest';

export type ThemeSwitcherProps = {
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
};

/**
 * ThemeSwitcher component allows users to switch between different color themes.
 * Themes are applied by setting the data-theme attribute on the document root.
 */
export function ThemeSwitcher({
  defaultTheme = 'default',
  onThemeChange,
  variant = 'button',
  showLabel = true,
}: ThemeSwitcherProps) {
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
        {showLabel && (
          <Typography variant="bodySmall" color="secondary" weight="medium">
            Theme:
          </Typography>
        )}
        <select
          className={styles.select}
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value as Theme)}
        >
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
        <Button
          variant={currentTheme === 'default' ? 'solid' : 'ghost'}
          size="small"
          onClick={() => handleThemeChange('default')}
        >
          Default
        </Button>
        <Button
          variant={currentTheme === 'ocean' ? 'solid' : 'ghost'}
          size="small"
          onClick={() => handleThemeChange('ocean')}
        >
          Ocean
        </Button>
        <Button
          variant={currentTheme === 'forest' ? 'solid' : 'ghost'}
          size="small"
          onClick={() => handleThemeChange('forest')}
        >
          Forest
        </Button>
      </div>
    );
  }

  // Default: button variant
  return (
    <div className={styles.buttonGroup}>
      {showLabel && (
        <Typography variant="bodySmall" color="secondary" weight="medium">
          Theme:
        </Typography>
      )}
      <Button
        variant={currentTheme === 'default' ? 'solid' : 'outlined'}
        size="small"
        onClick={() => handleThemeChange('default')}
      >
        Default
      </Button>
      <Button
        variant={currentTheme === 'ocean' ? 'solid' : 'outlined'}
        size="small"
        onClick={() => handleThemeChange('ocean')}
      >
        Ocean
      </Button>
      <Button
        variant={currentTheme === 'forest' ? 'solid' : 'outlined'}
        size="small"
        onClick={() => handleThemeChange('forest')}
      >
        Forest
      </Button>
    </div>
  );
}
