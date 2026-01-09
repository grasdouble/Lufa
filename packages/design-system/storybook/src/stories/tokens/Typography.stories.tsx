import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Typography Tokens',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontSizes: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Font Size Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Semantic font size tokens with t-shirt sizing. WCAG requires minimum 16px for body text.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(tokens.fontSize).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '20px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>fontSize.{key}</div>
              <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{String(value)}</div>
            </div>
            <div style={{ fontSize: value as string }}>The quick brown fox jumps over the lazy dog</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Line Height Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Semantic line height tokens. WCAG requires minimum 1.5 for body text.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(tokens.lineHeight).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '20px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>lineHeight.{key}</div>
              <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{String(value)}</div>
            </div>
            <div style={{ fontSize: '16px', lineHeight: value as number }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Font Weight Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Semantic font weight tokens from thin to black. WCAG recommends minimum 400 for body text.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {Object.entries(tokens.fontWeight).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '20px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontWeight: '600',
                fontSize: '12px',
                marginBottom: '8px',
                color: '#737373',
              }}
            >
              fontWeight.{key} ({String(value)})
            </div>
            <div style={{ fontSize: '24px', fontWeight: value as number }}>The quick brown fox</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LetterSpacing: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Letter Spacing Tokens</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Semantic letter spacing tokens. Wider spacing improves readability for users with dyslexia.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(tokens.letterSpacing).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '20px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>letterSpacing.{key}</div>
              <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{String(value)}</div>
            </div>
            <div style={{ fontSize: '20px', letterSpacing: value as string }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// export const TypographyScale: Story = {
//     render: () => (
//         <div style={{ padding: '20px', maxWidth: '1400px' }}>
//             <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Typography Scale Presets</h1>
//             <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
//                 Pre-configured typography styles combining font size, line height, weight, and letter spacing.
//             </p>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
//                 {Object.entries(typography.typographyScale).map(([key, value]) => {
//                     const scale = value as { fontSize: string; lineHeight: number; fontWeight: number; letterSpacing: string };
//                     return (
//                     <div
//                         key={key}
//                         style={{
//                             padding: '24px',
//                             backgroundColor: '#FAFAFA',
//                             borderRadius: '8px',
//                             border: '1px solid #E5E5E5',
//                         }}
//                     >
//                         <div style={{ marginBottom: '16px' }}>
//                             <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>
//                                 typographyScale.{key}
//                             </div>
//                             <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#737373' }}>
//                                 fontSize: {String(scale.fontSize)} | lineHeight: {String(scale.lineHeight)} | fontWeight: {String(scale.fontWeight)} |
//                                 letterSpacing: {String(scale.letterSpacing)}
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 fontSize: scale.fontSize,
//                                 lineHeight: scale.lineHeight,
//                                 fontWeight: scale.fontWeight,
//                                 letterSpacing: scale.letterSpacing,
//                             }}
//                         >
//                             {key.startsWith('h') ? `${key.toUpperCase()}: Heading Example` : `${key}: Body text example with proper spacing`}
//                         </div>
//                     </div>
//                     );
//                 })}
//             </div>
//         </div>
//     ),
// };
