import { useEffect } from 'react';

import type { ThemeMode, ThemeName } from '@grasdouble/lufa_design-system';
import { Button, Typography, useTheme } from '@grasdouble/lufa_design-system';

import styles from './ThemeSwitcher.module.css';

export type ThemeSwitcherProps = {
  /**
   * Default theme to use
   * @default 'default'
   */
  defaultTheme?: ThemeName;
  /**
   * Default mode to use
   * @default 'auto'
   */
  defaultMode?: ThemeMode;
  /**
   * Callback when theme changes
   */
  onThemeChange?: (theme: ThemeName) => void;
  /**
   * Callback when mode changes
   */
  onModeChange?: (mode: ThemeMode) => void;
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
  /**
   * Show mode switcher (light/dark/auto)
   * @default true
   */
  showModeSwitcher?: boolean;
};

/**
 * ThemeSwitcher component allows users to switch between different color themes and modes.
 * Themes are applied by setting the data-theme attribute on the document root.
 * Modes (light/dark/auto) are applied by setting the data-mode attribute.
 */
export function ThemeSwitcher({
  defaultTheme = 'default',
  defaultMode = 'auto',
  onThemeChange,
  onModeChange,
  variant = 'button',
  showLabel = true,
  showModeSwitcher = true,
}: ThemeSwitcherProps) {
  const { theme, mode, effectiveMode, setTheme, setMode } = useTheme({
    defaultTheme,
    defaultMode,
    enableStorage: true,
  });

  // Notify parent components of changes
  useEffect(() => {
    onThemeChange?.(theme);
  }, [theme, onThemeChange]);

  useEffect(() => {
    onModeChange?.(mode);
  }, [mode, onModeChange]);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
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
          id="theme-select"
          aria-label="Select theme"
          className={styles.select}
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value as ThemeName)}
        >
          <option value="default">Default</option>
          <option value="ocean">Ocean</option>
          <option value="forest">Forest</option>
        </select>

        {showModeSwitcher && (
          <>
            {showLabel && (
              <Typography variant="bodySmall" color="secondary" weight="medium" style={{ marginLeft: '1rem' }}>
                Mode:
              </Typography>
            )}
            <select
              id="mode-select"
              aria-label="Select mode"
              className={styles.select}
              value={mode}
              onChange={(e) => handleModeChange(e.target.value as ThemeMode)}
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="auto">🔄 Auto</option>
            </select>
          </>
        )}
      </div>
    );
  }

  if (variant === 'tabs') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <div className={styles.tabs}>
          <Button
            variant={theme === 'default' ? 'solid' : 'ghost'}
            size="small"
            onClick={() => handleThemeChange('default')}
          >
            Default
          </Button>
          <Button
            variant={theme === 'ocean' ? 'solid' : 'ghost'}
            size="small"
            onClick={() => handleThemeChange('ocean')}
          >
            Ocean
          </Button>
          <Button
            variant={theme === 'forest' ? 'solid' : 'ghost'}
            size="small"
            onClick={() => handleThemeChange('forest')}
          >
            Forest
          </Button>
        </div>

        {showModeSwitcher && (
          <div className={styles.tabs}>
            <Button
              variant={mode === 'light' ? 'solid' : 'ghost'}
              size="small"
              onClick={() => handleModeChange('light')}
              title="Light mode"
            >
              ☀️ Light
            </Button>
            <Button
              variant={mode === 'dark' ? 'solid' : 'ghost'}
              size="small"
              onClick={() => handleModeChange('dark')}
              title="Dark mode"
            >
              🌙 Dark
            </Button>
            <Button
              variant={mode === 'auto' ? 'solid' : 'ghost'}
              size="small"
              onClick={() => handleModeChange('auto')}
              title={`Auto (currently ${effectiveMode})`}
            >
              🔄 Auto
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Default: button variant
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className={styles.buttonGroup}>
        {showLabel && (
          <Typography variant="bodySmall" color="secondary" weight="medium">
            Theme:
          </Typography>
        )}
        <Button
          variant={theme === 'default' ? 'solid' : 'outlined'}
          size="small"
          onClick={() => handleThemeChange('default')}
        >
          Default
        </Button>
        <Button
          variant={theme === 'ocean' ? 'solid' : 'outlined'}
          size="small"
          onClick={() => handleThemeChange('ocean')}
        >
          Ocean
        </Button>
        <Button
          variant={theme === 'forest' ? 'solid' : 'outlined'}
          size="small"
          onClick={() => handleThemeChange('forest')}
        >
          Forest
        </Button>
      </div>

      {showModeSwitcher && (
        <div className={styles.buttonGroup}>
          {showLabel && (
            <Typography variant="bodySmall" color="secondary" weight="medium">
              Mode:
            </Typography>
          )}
          <Button
            variant={mode === 'light' ? 'solid' : 'outlined'}
            size="small"
            onClick={() => handleModeChange('light')}
            title="Light mode"
          >
            ☀️ Light
          </Button>
          <Button
            variant={mode === 'dark' ? 'solid' : 'outlined'}
            size="small"
            onClick={() => handleModeChange('dark')}
            title="Dark mode"
          >
            🌙 Dark
          </Button>
          <Button
            variant={mode === 'auto' ? 'solid' : 'outlined'}
            size="small"
            onClick={() => handleModeChange('auto')}
            title={`Auto (currently ${effectiveMode})`}
          >
            🔄 Auto
          </Button>
        </div>
      )}
    </div>
  );
}
