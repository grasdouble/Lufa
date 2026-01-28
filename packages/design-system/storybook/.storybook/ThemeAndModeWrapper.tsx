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

    // Apply theme attribute (Phase 6 - currently placeholder)
    if (theme === 'default') {
      root.removeAttribute('data-color-theme');
    } else {
      root.setAttribute('data-color-theme', theme);
    }

    // Apply mode attribute (Phase 2A - active)
    if (mode === '' || mode == null || mode === undefined) {
      root.setAttribute('data-mode', 'light'); // Default to light
    } else {
      root.setAttribute('data-mode', mode);
    }

    // Also update the docs iframe if it exists
    const docsRoot = window.parent?.document?.documentElement;
    if (docsRoot && docsRoot !== root) {
      if (theme === 'default') {
        docsRoot.removeAttribute('data-color-theme');
      } else {
        docsRoot.setAttribute('data-color-theme', theme);
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
      data-color-theme={theme !== 'default' ? theme : undefined}
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
