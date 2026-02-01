/**
 * Live examples for Portal component documentation
 */

import React from 'react';

import { Portal } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Portal>
      <div>Portal content</div>
    </Portal>
  );
}

export function PortalWithContainer() {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '120px',
        border: '1px dashed var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
        padding: '12px',
      }}
    >
      <div
        ref={(node) => {
          if (node && container !== node) {
            setContainer(node);
          }
        }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />
      {container ? (
        <Portal container={container}>
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              padding: '8px 12px',
              backgroundColor: 'var(--lufa-token-color-background-secondary)',
              color: 'var(--lufa-token-color-text-primary)',
              borderRadius: 'var(--lufa-token-radius-base)',
              border: '1px solid var(--lufa-token-color-border-base)',
            }}
          >
            Scoped portal
          </div>
        </Portal>
      ) : null}
      <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>Container host</div>
    </div>
  );
}
