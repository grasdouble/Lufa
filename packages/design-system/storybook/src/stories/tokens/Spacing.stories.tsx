import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Spacing',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ padding: 'var(--lufa-token-spacing-md-lg)', maxWidth: 'var(--lufa-token-max-width-5xl)' }}>
      <h1
        style={{
          fontSize: 'var(--lufa-token-font-size-5xl)',
          fontWeight: 'var(--lufa-token-font-weight-bold)',
          marginBottom: 'var(--lufa-token-spacing-base)',
        }}
      >
        Spacing Tokens
      </h1>
      <p
        style={{
          marginBottom: 'var(--lufa-token-spacing-xl)',
          color: 'var(--lufa-token-color-text-tertiary)',
          fontSize: 'var(--lufa-token-font-size-base)',
        }}
      >
        Standardized spacing values based on a 4px/8px rhythm for consistent layouts and visual hierarchy.
      </p>

      <div style={{ marginBottom: 'var(--lufa-token-spacing-xl-2xl)' }}>
        <h2
          style={{
            fontSize: 'var(--lufa-token-font-size-2xl)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            marginBottom: 'var(--lufa-token-spacing-base)',
          }}
        >
          Usage
        </h2>
        <div
          style={{
            padding: 'var(--lufa-token-spacing-md-lg)',
            backgroundColor: 'var(--lufa-token-color-background-secondary)',
            borderRadius: 'var(--lufa-token-radius-base)',
            fontFamily: 'monospace',
            fontSize: 'var(--lufa-token-font-size-sm)',
          }}
        >
          <div
            style={{ color: 'var(--lufa-token-color-text-tertiary)', marginBottom: 'var(--lufa-token-spacing-md)' }}
          >{`import tokens from '@grasdouble/lufa_design-system-tokens';`}</div>
          <div style={{ marginBottom: 'var(--lufa-token-spacing-sm)' }}>
            <span style={{ color: 'var(--lufa-token-color-brand-secondary)' }}>const</span>{' '}
            <span style={{ color: 'var(--lufa-token-color-error-text)' }}>styles</span> ={' '}
            <span style={{ color: 'var(--lufa-token-color-success-text)' }}>{'{'}</span>
          </div>
          <div style={{ marginLeft: 'var(--lufa-token-spacing-md-lg)', marginBottom: 'var(--lufa-token-spacing-sm)' }}>
            <span style={{ color: 'var(--lufa-token-color-warning-text)' }}>padding</span>: tokens.spacing.base,{' '}
            <span style={{ color: 'var(--lufa-token-color-text-tertiary)' }}>// 16px</span>
          </div>
          <div style={{ marginLeft: 'var(--lufa-token-spacing-md-lg)', marginBottom: 'var(--lufa-token-spacing-sm)' }}>
            <span style={{ color: 'var(--lufa-token-color-warning-text)' }}>margin</span>: tokens.spacing.lg,{' '}
            <span style={{ color: 'var(--lufa-token-color-text-tertiary)' }}>// 24px</span>
          </div>
          <div>
            <span style={{ color: 'var(--lufa-token-color-success-text)' }}>{'}'}</span>;
          </div>
        </div>
      </div>

      <h2
        style={{
          fontSize: 'var(--lufa-token-font-size-2xl)',
          fontWeight: 'var(--lufa-token-font-weight-semibold)',
          marginBottom: 'var(--lufa-token-spacing-base)',
        }}
      >
        All Spacing Tokens
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-md)' }}>
        {Object.entries(tokens.spacing).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--lufa-token-spacing-md) var(--lufa-token-spacing-base)',
              backgroundColor: 'var(--lufa-token-color-surface-default)',
              border:
                'var(--lufa-token-border-width-hairline) var(--lufa-token-border-style-solid) var(--lufa-token-color-border-light)',
              borderRadius: 'var(--lufa-token-radius-base)',
            }}
          >
            <div
              style={{
                flex: '0 0 var(--lufa-token-size-2xl)',
                fontFamily: 'monospace',
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                flex: '0 0 var(--lufa-token-spacing-3xl-4xl)',
                color: 'var(--lufa-token-color-text-tertiary)',
                fontSize: 'var(--lufa-token-font-size-sm)',
              }}
            >
              {value}
            </div>
            <div
              style={{
                flex: '0 0 auto',
                height: 'var(--lufa-token-spacing-xl-2xl)',
                width: value === tokens.spacing.none ? 'var(--lufa-token-spacing-xxs)' : value,
                backgroundColor: 'var(--lufa-token-color-interactive-default)',
                border:
                  value === tokens.spacing.none
                    ? 'var(--lufa-token-border-width-hairline) var(--lufa-token-border-style-solid) var(--lufa-token-color-interactive-default)'
                    : 'var(--lufa-token-border-style-none)',
              }}
            />
            <div
              style={{
                marginLeft: 'var(--lufa-token-spacing-base)',
                color: 'var(--lufa-token-color-text-tertiary)',
                fontSize: 'var(--lufa-token-font-size-xs)',
              }}
            >
              {key === 'none' && 'No spacing'}
              {key === 'xxs' && 'Minimal spacing'}
              {key === 'xs' && 'Very tight spacing'}
              {key === '2xs' && 'Subtle spacing'}
              {key === 'sm' && 'Tight spacing'}
              {key === 'sm-md' && 'Small-medium spacing'}
              {key === 'md' && 'Compact spacing'}
              {key === 'base' && 'Base spacing unit'}
              {key === 'md-lg' && 'Medium-large spacing'}
              {key === 'lg' && 'Spacious'}
              {key === 'lg-xl' && 'Large-extra large spacing'}
              {key === 'xl' && 'Extra spacious'}
              {key === 'xl-2xl' && 'Very spacious'}
              {key === '2xl' && 'Primary touch target spacing'}
              {key === '2xl-3xl' && 'Huge spacing'}
              {key === '3xl' && 'Section separation'}
              {key === '3xl-4xl' && 'Large section separation'}
              {key === '4xl' && 'Very large section'}
              {key === '5xl' && 'Maximum spacing'}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SpacingGrid: Story = {
  render: () => (
    <div style={{ padding: 'var(--lufa-token-spacing-md-lg)' }}>
      <h2 style={{ marginBottom: 'var(--lufa-token-spacing-base)' }}>4px/8px Rhythm</h2>
      <p style={{ marginBottom: 'var(--lufa-token-spacing-lg)', color: 'var(--lufa-token-color-text-tertiary)' }}>
        Our spacing system uses a 4px/8px rhythm for consistent visual hierarchy and alignment
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 'var(--lufa-token-border-width-hairline)',
          backgroundColor: 'var(--lufa-token-color-border-light)',
          padding: 'var(--lufa-token-border-width-hairline)',
          maxWidth: 'var(--lufa-token-max-width-xs)',
        }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 'var(--lufa-token-spacing-sm)',
              height: 'var(--lufa-token-spacing-sm)',
              backgroundColor:
                i % 8 === 0 ? 'var(--lufa-token-color-interactive-default)' : 'var(--lufa-token-color-info-lighter)',
            }}
          />
        ))}
      </div>
      <p
        style={{
          marginTop: 'var(--lufa-token-spacing-base)',
          fontSize: 'var(--lufa-token-font-size-xs)',
          color: 'var(--lufa-token-color-text-tertiary)',
        }}
      >
        Each square = 8px × 8px
      </p>
    </div>
  ),
};

export const PracticalExamples: Story = {
  render: () => (
    <div style={{ padding: 'var(--lufa-token-spacing-md-lg)', maxWidth: 'var(--lufa-token-max-width-3xl)' }}>
      <h2 style={{ marginBottom: 'var(--lufa-token-spacing-lg)' }}>Practical Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-xl)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--lufa-token-spacing-md)', fontSize: 'var(--lufa-token-font-size-base)' }}>
            Card with Base Spacing
          </h3>
          <div
            style={{
              padding: 'var(--lufa-token-spacing-base)',
              backgroundColor: 'var(--lufa-token-color-surface-default)',
              border:
                'var(--lufa-token-border-width-hairline) var(--lufa-token-border-style-solid) var(--lufa-token-color-border-light)',
              borderRadius: 'var(--lufa-token-radius-base)',
            }}
          >
            <h4
              style={{
                margin: 0,
                marginBottom: 'var(--lufa-token-spacing-sm)',
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
              }}
            >
              Card Title
            </h4>
            <p
              style={{
                margin: 0,
                color: 'var(--lufa-token-color-text-tertiary)',
                fontSize: 'var(--lufa-token-font-size-sm)',
              }}
            >
              Content with consistent spacing
            </p>
          </div>
          <p
            style={{
              marginTop: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            padding: spacing.base (16px)
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: 'var(--lufa-token-spacing-md)', fontSize: 'var(--lufa-token-font-size-base)' }}>
            Button Group with Small Gap
          </h3>
          <div style={{ display: 'flex', gap: 'var(--lufa-token-spacing-sm)' }}>
            <button
              style={{
                padding: 'var(--lufa-token-spacing-sm) var(--lufa-token-spacing-base)',
                backgroundColor: 'var(--lufa-token-color-interactive-default)',
                color: 'var(--lufa-token-color-text-inverse)',
                border: 'var(--lufa-token-border-style-none)',
                borderRadius: 'var(--lufa-token-radius-md)',
                cursor: 'pointer',
              }}
            >
              Primary
            </button>
            <button
              style={{
                padding: 'var(--lufa-token-spacing-sm) var(--lufa-token-spacing-base)',
                backgroundColor: 'var(--lufa-token-color-surface-default)',
                color: 'var(--lufa-token-color-interactive-default)',
                border:
                  'var(--lufa-token-border-width-hairline) var(--lufa-token-border-style-solid) var(--lufa-token-color-interactive-default)',
                borderRadius: 'var(--lufa-token-radius-md)',
                cursor: 'pointer',
              }}
            >
              Secondary
            </button>
          </div>
          <p
            style={{
              marginTop: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            gap: spacing.sm (8px)
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: 'var(--lufa-token-spacing-md)', fontSize: 'var(--lufa-token-font-size-base)' }}>
            List with Medium Gap
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lufa-token-spacing-md)' }}>
            {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: 'var(--lufa-token-spacing-md)',
                  backgroundColor: 'var(--lufa-token-color-background-tertiary)',
                  borderRadius: 'var(--lufa-token-radius-md)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: 'var(--lufa-token-spacing-sm)',
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            gap: spacing.md (12px)
          </p>
        </div>
      </div>
    </div>
  ),
};
