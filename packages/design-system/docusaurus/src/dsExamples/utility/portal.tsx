/**
 * Live examples for Portal component documentation
 */

import React from 'react';

import { Portal } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  const [bodyContainer, setBodyContainer] = React.useState<HTMLDivElement | null>(null);

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--lufa-semantic-ui-text-secondary)',
    marginBottom: '6px',
  };

  const boxStyle: React.CSSProperties = {
    border: '1px dashed var(--lufa-semantic-ui-border-default)',
    borderRadius: 'var(--lufa-primitive-radius-scale-base)',
    padding: '12px 16px',
    fontSize: '13px',
    color: 'var(--lufa-semantic-ui-text-secondary)',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Source — where Portal is declared in the tree */}
      <div>
        <p style={labelStyle}>Source (component tree)</p>
        <div
          style={{
            ...boxStyle,
            borderColor: 'var(--lufa-semantic-interactive-border-focus)',
            background: 'var(--lufa-semantic-ui-background-surface)',
          }}
        >
          <code style={{ fontSize: '12px' }}>&lt;Portal&gt;…&lt;/Portal&gt;</code>
          <span style={{ marginLeft: '8px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>— declared here</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'var(--lufa-semantic-ui-text-secondary)', fontSize: '18px' }}>↓</div>

      {/* Simulated document.body target */}
      <div>
        <p style={labelStyle}>Target (document.body)</p>
        <div
          ref={(node) => {
            if (node && bodyContainer !== node) setBodyContainer(node);
          }}
          style={{ ...boxStyle, minHeight: '64px', position: 'relative' }}
        >
          {bodyContainer && (
            <Portal container={bodyContainer}>
              <div
                style={{
                  padding: '8px 14px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  color: 'var(--lufa-semantic-ui-text-primary)',
                  border: '1px solid var(--lufa-semantic-ui-border-default)',
                  borderRadius: 'var(--lufa-primitive-radius-scale-base)',
                  fontSize: '13px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                Portal content — rendered here
              </div>
            </Portal>
          )}
        </div>
      </div>
    </div>
  );
}

export function PortalWithContainer() {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '120px',
        border: '1px dashed var(--lufa-semantic-ui-border-default)',
        borderRadius: 'var(--lufa-primitive-radius-scale-base)',
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
              backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
              color: 'var(--lufa-semantic-ui-text-primary)',
              borderRadius: 'var(--lufa-primitive-radius-scale-base)',
              border: '1px solid var(--lufa-semantic-ui-border-default)',
            }}
          >
            Scoped portal
          </div>
        </Portal>
      ) : null}
      <div style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>Container host</div>
    </div>
  );
}
