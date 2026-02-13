/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';

import styles from './PlaygroundThemeSwitcher.module.css';

type ThemeName =
  | 'default'
  | 'ocean'
  | 'forest'
  | 'matrix'
  | 'cyberpunk'
  | 'sunset'
  | 'nordic'
  | 'volcano'
  | 'coffee'
  | 'volt'
  | 'steampunk';

type ColorMode = 'light' | 'dark' | 'high-contrast';

type Theme = {
  name: ThemeName;
  label: string;
  icon: string;
  description: string;
};

const THEMES: Theme[] = [
  { name: 'default', label: 'Default', icon: '📘', description: 'Docusaurus classic' },
  { name: 'ocean', label: 'Ocean', icon: '🌊', description: 'Marine-inspired' },
  { name: 'forest', label: 'Forest', icon: '🌲', description: 'Organic natural' },
  { name: 'matrix', label: 'Matrix', icon: '💾', description: 'Digital cyber' },
  { name: 'cyberpunk', label: 'Cyberpunk', icon: '🎆', description: 'Futuristic neon' },
  { name: 'sunset', label: 'Sunset', icon: '🌅', description: 'Warm elegant' },
  { name: 'nordic', label: 'Nordic', icon: '❄️', description: 'Minimalist arctic' },
  { name: 'volcano', label: 'Volcano', icon: '🌋', description: 'Powerful intense' },
  { name: 'coffee', label: 'Coffee', icon: '☕', description: 'Retro vintage' },
  { name: 'volt', label: 'Volt', icon: '⚡', description: 'Industrial high-vis' },
  { name: 'steampunk', label: 'Steampunk', icon: '⚙️', description: 'Victorian industrial' },
];

const COLOR_MODES: { mode: ColorMode; label: string; icon: string }[] = [
  { mode: 'light', label: 'Light', icon: '☀️' },
  { mode: 'dark', label: 'Dark', icon: '🌙' },
  { mode: 'high-contrast', label: 'High Contrast', icon: '🔲' },
];

type PlaygroundThemeSwitcherProps = {
  /**
   * Ref to the playground container element where theme will be applied
   */
  containerRef: React.RefObject<HTMLDivElement>;
};

/**
 * Isolated ThemeSwitcher for the playground
 * Applies themes only to the playground container, not to Docusaurus
 */
export default function PlaygroundThemeSwitcher({ containerRef }: PlaygroundThemeSwitcherProps): React.JSX.Element {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');
  const [currentMode, setCurrentMode] = useState<ColorMode>('light');
  const [isOpen, setIsOpen] = useState(false);

  const applyTheme = (theme: ThemeName) => {
    if (!containerRef.current) return;

    // For default theme or undefined: set data-theme attribute without value
    // For other themes: set data-theme="themeName"
    // Both cases match [data-theme] selector for CSS cascade
    if (theme === 'default' || !theme) {
      containerRef.current.setAttribute('data-theme', '');
    } else {
      containerRef.current.setAttribute('data-theme', theme);
    }
  };

  const applyColorMode = (mode: ColorMode) => {
    if (!containerRef.current) return;
    containerRef.current.setAttribute('data-mode', mode);
  };

  // Apply initial theme and mode
  useEffect(() => {
    applyTheme(currentTheme);
    applyColorMode(currentMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleThemeChange = (theme: ThemeName) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  const handleColorModeChange = (mode: ColorMode) => {
    setCurrentMode(mode);
    applyColorMode(mode);
  };

  const currentThemeData = THEMES.find((t) => t.name === currentTheme) || THEMES[0];

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch playground theme"
        title="Switch playground theme"
      >
        <span className={styles.icon}>{currentThemeData.icon}</span>
        <span className={styles.label}>{currentThemeData.label}</span>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Color Theme</h4>
            <div className={styles.themeGrid}>
              {THEMES.map((theme) => (
                <button
                  key={theme.name}
                  className={`${styles.themeOption} ${currentTheme === theme.name ? styles.active : ''}`}
                  onClick={() => handleThemeChange(theme.name)}
                  title={theme.description}
                >
                  <span className={styles.themeIcon}>{theme.icon}</span>
                  <span className={styles.themeName}>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Color Mode</h4>
            <div className={styles.modeButtons}>
              {COLOR_MODES.map((modeOption) => (
                <button
                  key={modeOption.mode}
                  className={`${styles.modeButton} ${currentMode === modeOption.mode ? styles.active : ''}`}
                  onClick={() => handleColorModeChange(modeOption.mode)}
                  title={modeOption.label}
                >
                  <span className={styles.modeIcon}>{modeOption.icon}</span>
                  <span className={styles.modeLabel}>{modeOption.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
