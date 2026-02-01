/**
 * Live examples for Center component documentation
 */

import React from 'react';

import { Center } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Center
      background="surface"
      borderWidth="thin"
      borderColor="default"
      style={{ height: '120px' }}
    >
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: 'var(--lufa-token-color-background-primary)',
          color: 'var(--lufa-token-color-text-inverse)',
          borderRadius: 'var(--lufa-token-radius-base)',
          fontWeight: 600,
        }}
      >
        Centered
      </div>
    </Center>
  );
}
