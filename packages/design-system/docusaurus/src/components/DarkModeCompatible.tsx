/**
 * DarkModeCompatible Badge Component
 *
 * Displays a badge indicating that the component supports dark mode.
 * Used in component documentation to show dark mode compatibility.
 */

import React from 'react';

export function DarkModeCompatible() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '12px',
        backgroundColor: 'var(--ifm-color-success-contrast-background)',
        color: 'var(--ifm-color-success-contrast-foreground)',
        fontSize: '12px',
        fontWeight: 600,
        marginBottom: '16px',
        border: '1px solid var(--ifm-color-success-dark)',
      }}
    >
      <span role="img" aria-label="Dark mode compatible">
        🌓
      </span>
      <span>Dark Mode Compatible</span>
    </div>
  );
}

export default DarkModeCompatible;
