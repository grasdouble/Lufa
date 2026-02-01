/**
 * Live examples for VisuallyHidden component documentation
 */

import React from 'react';

import { VisuallyHidden } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: 'var(--lufa-token-color-background-secondary)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
        color: 'var(--lufa-token-color-text-primary)',
        cursor: 'pointer',
      }}
    >
      <span aria-hidden="true">🔍</span>
      <VisuallyHidden>Search</VisuallyHidden>
      <span>Search</span>
    </button>
  );
}
