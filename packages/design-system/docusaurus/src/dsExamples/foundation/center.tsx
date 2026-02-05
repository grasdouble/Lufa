/**
 * Live examples for Center component documentation
 */

import React from 'react';

import { Center } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return <Center style={{ height: '120px' }}>Centered</Center>;
}

export function InlineCenter() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Center
        inline
        background="surface"
        borderWidth="thin"
        borderColor="default"
        style={{ height: '48px', width: '120px' }}
      >
        Inline
      </Center>
      <span style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>inline</span>
    </div>
  );
}
