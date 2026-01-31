/**
 * Live examples for Portal component documentation
 */

import React from 'react';

import { Portal } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          padding: '12px 16px',
          backgroundColor: 'var(--lufa-token-color-background-primary)',
          color: 'var(--lufa-token-color-text-inverse)',
          borderRadius: 'var(--lufa-token-radius-base)',
          border: '1px solid var(--lufa-token-color-border-base)',
        }}
      >
        Portal content
      </div>
    </Portal>
  );
}
