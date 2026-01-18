import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Radius',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllRadius: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Radius Primitives</h1>
      <p style={{ marginBottom: '32px', color: 'var(--lufa-token-color-text-secondary)', fontSize: '16px' }}>
        Primitive border-radius values for consistent corner rounding. Choose 1-2 values as your primary scale for brand
        consistency.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.radius).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 100px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'var(--lufa-token-color-surface-raised)',
              borderRadius: '8px',
              border: `1px solid var(--lufa-token-color-border-light)`,
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>radius[{key}]</div>
            <div style={{ fontFamily: 'monospace', color: 'var(--lufa-token-color-text-secondary)', fontSize: '12px' }}>
              {value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: primitives.color.chromatic.blue[500],
                  borderRadius: value,
                  boxShadow: primitives.shadow.xs,
                }}
              />
              <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>
                {key === '0' && 'Sharp corners (tables, technical UI)'}
                {key === '2' && 'Subtle rounding'}
                {key === '4' && 'Soft corners (inputs, small buttons)'}
                {key === '6' && 'Gentle rounding'}
                {key === '8' && 'Standard rounding (cards, buttons)'}
                {key === '12' && 'Moderate rounding'}
                {key === '16' && 'Prominent rounding (panels)'}
                {key === '24' && 'Bold rounding (features)'}
                {key === '32' && 'Very bold rounding'}
                {key === '9999' && 'Pills (tags, badges, rounded buttons)'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: 'var(--lufa-token-color-info-light)',
          borderRadius: '12px',
          border: `1px solid var(--lufa-token-color-info-border)`,
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Consistency Tip</h3>
        <p style={{ margin: 0, lineHeight: '1.6' }}>
          Choose 1-2 radius values as your primary scale for brand consistency. For example: radius[8] for all
          components and radius[9999] for pills/badges.
        </p>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Radius Usage Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Buttons</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: primitives.color.chromatic.blue[500],
                color: primitives.color.neutral.white,
                border: 'none',
                borderRadius: primitives.radius[4],
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Subtle (4px)
            </button>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: primitives.color.chromatic.blue[500],
                color: primitives.color.neutral.white,
                border: 'none',
                borderRadius: primitives.radius[8],
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Standard (8px)
            </button>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: primitives.color.chromatic.blue[500],
                color: primitives.color.neutral.white,
                border: 'none',
                borderRadius: primitives.radius[9999],
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Pill (9999px)
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Cards</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '20px',
                backgroundColor: 'var(--lufa-token-color-surface-default)',
                border: `1px solid var(--lufa-token-color-border-light)`,
                borderRadius: primitives.radius[8],
                boxShadow: primitives.shadow.xs,
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Standard Card</div>
              <div style={{ fontSize: '14px', color: 'var(--lufa-token-color-text-secondary)' }}>
                radius[8] - Most common for cards
              </div>
            </div>
            <div
              style={{
                padding: '20px',
                backgroundColor: 'var(--lufa-token-color-surface-default)',
                border: `1px solid var(--lufa-token-color-border-light)`,
                borderRadius: primitives.radius[16],
                boxShadow: primitives.shadow.xs,
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Prominent Card</div>
              <div style={{ fontSize: '14px', color: 'var(--lufa-token-color-text-secondary)' }}>
                radius[16] - Bold, modern look
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Badges & Tags</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: primitives.color.chromatic.blue[100],
                color: primitives.color.chromatic.blue[800],
                fontSize: '12px',
                fontWeight: '500',
                borderRadius: primitives.radius[4],
              }}
            >
              Subtle (4px)
            </span>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: primitives.color.chromatic.blue[100],
                color: primitives.color.chromatic.blue[800],
                fontSize: '12px',
                fontWeight: '500',
                borderRadius: primitives.radius[9999],
              }}
            >
              Pill (9999px)
            </span>
            <span
              style={{
                width: '32px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: primitives.color.chromatic.red[500],
                color: primitives.color.neutral.white,
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: primitives.radius[9999],
              }}
            >
              3
            </span>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Images & Avatars</h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: primitives.color.neutral.neutral[200],
                borderRadius: primitives.radius[8],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Image (8px)
            </div>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: primitives.color.chromatic.blue[500],
                borderRadius: primitives.radius[9999],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: primitives.color.neutral.white,
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              JD
            </div>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: primitives.color.chromatic.green[500],
                borderRadius: primitives.radius[9999],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: primitives.color.neutral.white,
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              AB
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Modals</h3>
          <div
            style={{
              maxWidth: '500px',
              padding: '32px',
              backgroundColor: 'var(--lufa-token-color-surface-default)',
              border: `1px solid var(--lufa-token-color-border-light)`,
              borderRadius: primitives.radius[12],
              boxShadow: primitives.shadow.xl,
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Modal Title</h4>
            <p style={{ margin: '0 0 24px 0', color: 'var(--lufa-token-color-text-secondary)', lineHeight: '1.5' }}>
              Modals typically use radius[12] or radius[16] for a prominent, modern look.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: 'var(--lufa-token-color-text-secondary)',
                  border: `1px solid var(--lufa-token-color-border-light)`,
                  borderRadius: primitives.radius[6],
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: primitives.color.chromatic.blue[500],
                  color: primitives.color.neutral.white,
                  border: 'none',
                  borderRadius: primitives.radius[6],
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
