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
    <div style={{ padding: tokens.spacing['md-lg'], maxWidth: tokens.maxWidth['5xl'] }}>
      <h1
        style={{
          fontSize: tokens.fontSize['5xl'],
          fontWeight: tokens.fontWeight.bold,
          marginBottom: tokens.spacing.base,
        }}
      >
        Spacing Tokens
      </h1>
      <p
        style={{
          marginBottom: tokens.spacing.xl,
          color: 'var(--lufa-token-color-text-tertiary)',
          fontSize: tokens.fontSize.base,
        }}
      >
        Standardized spacing values based on a 4px/8px rhythm for consistent layouts and visual hierarchy.
      </p>

      <div style={{ marginBottom: tokens.spacing['xl-2xl'] }}>
        <h2
          style={{
            fontSize: tokens.fontSize['2xl'],
            fontWeight: tokens.fontWeight.semibold,
            marginBottom: tokens.spacing.base,
          }}
        >
          Usage
        </h2>
        <div
          style={{
            padding: tokens.spacing['md-lg'],
            backgroundColor: 'var(--lufa-token-color-background-secondary)',
            borderRadius: tokens.radius.base,
            fontFamily: 'monospace',
            fontSize: tokens.fontSize.sm,
          }}
        >
          <div
            style={{ color: 'var(--lufa-token-color-text-tertiary)', marginBottom: tokens.spacing.md }}
          >{`import tokens from '@grasdouble/lufa_design-system-tokens';`}</div>
          <div style={{ marginBottom: tokens.spacing.sm }}>
            <span style={{ color: 'var(--lufa-token-color-brand-secondary)' }}>const</span>{' '}
            <span style={{ color: 'var(--lufa-token-color-error-text)' }}>styles</span> ={' '}
            <span style={{ color: 'var(--lufa-token-color-success-text)' }}>{'{'}</span>
          </div>
          <div style={{ marginLeft: tokens.spacing['md-lg'], marginBottom: tokens.spacing.sm }}>
            <span style={{ color: 'var(--lufa-token-color-warning-text)' }}>padding</span>: tokens.spacing.base,{' '}
            <span style={{ color: 'var(--lufa-token-color-text-tertiary)' }}>// 16px</span>
          </div>
          <div style={{ marginLeft: tokens.spacing['md-lg'], marginBottom: tokens.spacing.sm }}>
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
          fontSize: tokens.fontSize['2xl'],
          fontWeight: tokens.fontWeight.semibold,
          marginBottom: tokens.spacing.base,
        }}
      >
        All Spacing Tokens
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
        {Object.entries(tokens.spacing).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: `${tokens.spacing.md} ${tokens.spacing.base}`,
              backgroundColor: 'var(--lufa-token-color-surface-default)',
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} var(--lufa-token-color-border-light)`,
              borderRadius: tokens.radius.base,
            }}
          >
            <div
              style={{
                flex: `0 0 ${tokens.size['2xl']}`,
                fontFamily: 'monospace',
                fontSize: tokens.fontSize.sm,
                fontWeight: tokens.fontWeight.semibold,
              }}
            >
              {key}
            </div>
            <div
              style={{
                flex: `0 0 ${tokens.spacing['3xl-4xl']}`,
                color: 'var(--lufa-token-color-text-tertiary)',
                fontSize: tokens.fontSize.sm,
              }}
            >
              {value}
            </div>
            <div
              style={{
                flex: '0 0 auto',
                height: tokens.spacing['xl-2xl'],
                width: value === tokens.spacing.none ? tokens.spacing.xxs : value,
                backgroundColor: 'var(--lufa-token-color-interactive-default)',
                border:
                  value === tokens.spacing.none
                    ? `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} var(--lufa-token-color-interactive-default)`
                    : tokens.borderStyle.none,
              }}
            />
            <div
              style={{
                marginLeft: tokens.spacing.base,
                color: 'var(--lufa-token-color-text-tertiary)',
                fontSize: tokens.fontSize.xs,
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
    <div style={{ padding: tokens.spacing['md-lg'] }}>
      <h2 style={{ marginBottom: tokens.spacing.base }}>4px/8px Rhythm</h2>
      <p style={{ marginBottom: tokens.spacing.lg, color: 'var(--lufa-token-color-text-tertiary)' }}>
        Our spacing system uses a 4px/8px rhythm for consistent visual hierarchy and alignment
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: tokens.borderWidth.hairline,
          backgroundColor: 'var(--lufa-token-color-border-light)',
          padding: tokens.borderWidth.hairline,
          maxWidth: tokens.maxWidth.xs,
        }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: tokens.spacing.sm,
              height: tokens.spacing.sm,
              backgroundColor:
                i % 8 === 0 ? 'var(--lufa-token-color-interactive-default)' : 'var(--lufa-token-color-info-lighter)',
            }}
          />
        ))}
      </div>
      <p
        style={{
          marginTop: tokens.spacing.base,
          fontSize: tokens.fontSize.xs,
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
    <div style={{ padding: tokens.spacing['md-lg'], maxWidth: tokens.maxWidth['3xl'] }}>
      <h2 style={{ marginBottom: tokens.spacing.lg }}>Practical Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
        <div>
          <h3 style={{ marginBottom: tokens.spacing.md, fontSize: tokens.fontSize.base }}>Card with Base Spacing</h3>
          <div
            style={{
              padding: tokens.spacing.base,
              backgroundColor: 'var(--lufa-token-color-surface-default)',
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} var(--lufa-token-color-border-light)`,
              borderRadius: tokens.radius.base,
            }}
          >
            <h4
              style={{
                margin: 0,
                marginBottom: tokens.spacing.sm,
                fontSize: tokens.fontSize.sm,
                fontWeight: tokens.fontWeight.semibold,
              }}
            >
              Card Title
            </h4>
            <p style={{ margin: 0, color: 'var(--lufa-token-color-text-tertiary)', fontSize: tokens.fontSize.sm }}>
              Content with consistent spacing
            </p>
          </div>
          <p
            style={{
              marginTop: tokens.spacing.sm,
              fontSize: tokens.fontSize.xs,
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            padding: spacing.base (16px)
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: tokens.spacing.md, fontSize: tokens.fontSize.base }}>
            Button Group with Small Gap
          </h3>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            <button
              style={{
                padding: `${tokens.spacing.sm} ${tokens.spacing.base}`,
                backgroundColor: 'var(--lufa-token-color-interactive-default)',
                color: 'var(--lufa-token-color-text-inverse)',
                border: tokens.borderStyle.none,
                borderRadius: tokens.radius.md,
                cursor: 'pointer',
              }}
            >
              Primary
            </button>
            <button
              style={{
                padding: `${tokens.spacing.sm} ${tokens.spacing.base}`,
                backgroundColor: 'var(--lufa-token-color-surface-default)',
                color: 'var(--lufa-token-color-interactive-default)',
                border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} var(--lufa-token-color-interactive-default)`,
                borderRadius: tokens.radius.md,
                cursor: 'pointer',
              }}
            >
              Secondary
            </button>
          </div>
          <p
            style={{
              marginTop: tokens.spacing.sm,
              fontSize: tokens.fontSize.xs,
              color: 'var(--lufa-token-color-text-tertiary)',
            }}
          >
            gap: spacing.sm (8px)
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: tokens.spacing.md, fontSize: tokens.fontSize.base }}>List with Medium Gap</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
            {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: tokens.spacing.md,
                  backgroundColor: 'var(--lufa-token-color-background-tertiary)',
                  borderRadius: tokens.radius.md,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: tokens.spacing.sm,
              fontSize: tokens.fontSize.xs,
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
