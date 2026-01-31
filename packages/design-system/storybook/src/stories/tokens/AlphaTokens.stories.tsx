import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryContainer } from '../../components/helpers';

/**
 * Alpha Tokens
 *
 * Visual guide for alpha/opacity tokens defined in ADR-004.
 */
const meta = {
  title: '3. Tokens/Alpha',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const AlphaSwatch = ({ token, label, base }: { token: string; label: string; base: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
    <div
      style={{
        width: '100%',
        height: '80px',
        borderRadius: '8px',
        background: base,
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `var(${token})` }} />
    </div>
    <div style={{ fontSize: '11px', fontFamily: 'monospace' }}>
      <div style={{ fontWeight: 600, marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '10px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>{token}</div>
    </div>
  </div>
);

const OverlayTile = ({ token, label }: { token: string; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <div
      style={{
        position: 'relative',
        borderRadius: '10px',
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        background: 'var(--lufa-semantic-ui-background-surface)',
        overflow: 'hidden',
        height: '120px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, var(--lufa-semantic-ui-background-surface) 0%, var(--lufa-semantic-ui-background-page) 100%)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: `var(${token})` }} />
    </div>
    <div style={{ fontSize: '11px', fontFamily: 'monospace' }}>
      <div style={{ fontWeight: 600, marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '10px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>{token}</div>
    </div>
  </div>
);

export const Overview: Story = {
  render: () => (
    <StoryContainer title="Alpha Tokens">
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--lufa-semantic-ui-text-primary)' }}>
          Primitive Alpha - Black
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {[4, 5, 8, 12, 15, 16, 38, 50, 60, 80, 90, 100].map((value) => (
            <AlphaSwatch
              key={`black-${value}`}
              token={`--lufa-primitive-color-alpha-black-${value}`}
              label={`black.${value}`}
              base="var(--lufa-semantic-ui-background-surface)"
            />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--lufa-semantic-ui-text-primary)' }}>
          Primitive Alpha - White
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {[4, 5, 8, 12, 15, 16, 38, 50, 60, 80, 90, 100].map((value) => (
            <AlphaSwatch
              key={`white-${value}`}
              token={`--lufa-primitive-color-alpha-white-${value}`}
              label={`white.${value}`}
              base="var(--lufa-semantic-ui-background-inverse)"
            />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--lufa-semantic-ui-text-primary)' }}>
          Semantic Overlays
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <OverlayTile token="--lufa-semantic-ui-overlay-backdrop" label="overlay-backdrop" />
          <OverlayTile token="--lufa-semantic-ui-overlay-hover" label="overlay-hover" />
          <OverlayTile token="--lufa-semantic-ui-overlay-pressed" label="overlay-pressed" />
          <OverlayTile token="--lufa-semantic-ui-overlay-selected" label="overlay-selected" />
          <OverlayTile token="--lufa-semantic-ui-scrim" label="scrim" />
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--lufa-semantic-ui-text-primary)' }}>
          Interactive Opacity
        </h2>
        <div
          style={{
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
            background: 'var(--lufa-semantic-ui-background-surface)',
          }}
        >
          <div
            style={{
              marginBottom: '8px',
              fontSize: '12px',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Disabled opacity (semantic.interactive.disabled-opacity)
          </div>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'var(--lufa-semantic-ui-background-surface)',
              border: '1px solid var(--lufa-semantic-ui-border-default)',
              opacity: 'var(--lufa-semantic-interactive-disabled-opacity)',
            }}
          >
            Disabled example
          </div>
        </div>
      </section>
    </StoryContainer>
  ),
};
