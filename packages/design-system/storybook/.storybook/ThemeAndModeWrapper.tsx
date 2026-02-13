import React, { useEffect } from 'react';

type ThemeAndModeWrapperProps = {
  theme: string;
  mode: string;
  children: React.ReactNode;
};

/**
 * Component wrapper for theme and mode handling
 */
export const ThemeAndModeWrapper: React.FC<ThemeAndModeWrapperProps> = ({ theme, mode, children }) => {
  useEffect(() => {
    const root = document.documentElement;

    // Apply theme attribute
    // IMPORTANT: Always set data-theme (empty string for default, value for others)
    // This is required for CSS cascade with [data-theme] selector
    if (theme === 'default' || !theme) {
      root.setAttribute('data-theme', '');
    } else {
      root.setAttribute('data-theme', theme);
    }

    // Apply mode attribute
    if (mode === '' || mode == null || mode === undefined) {
      root.setAttribute('data-mode', 'light'); // Default to light
    } else {
      root.setAttribute('data-mode', mode);
    }

    // Also update the docs iframe if it exists
    const docsRoot = window.parent?.document?.documentElement;
    if (docsRoot && docsRoot !== root) {
      if (theme === 'default' || !theme) {
        docsRoot.setAttribute('data-theme', '');
      } else {
        docsRoot.setAttribute('data-theme', theme);
      }

      if (mode === '' || mode == null || mode === undefined) {
        docsRoot.setAttribute('data-mode', 'light');
      } else {
        docsRoot.setAttribute('data-mode', mode);
      }
    }
  }, [theme, mode]);

  return (
    <div
      data-theme={theme !== 'default' ? theme : undefined}
      data-mode={mode || 'light'}
      style={{
        backgroundColor: 'var(--lufa-semantic-ui-background-page)',
        color: 'var(--lufa-semantic-ui-text-primary)',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};
