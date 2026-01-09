import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontFamilies: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Typography Primitives</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Token typography values. WCAG requires minimum 16px for body text, 1.5 line-height for paragraphs, and 0.12em
        letter spacing.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Font Families</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.fontFamily).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '24px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#737373',
                marginBottom: '12px',
              }}
            >
              fontFamily.{key}
            </div>
            <div style={{ fontFamily: value, fontSize: '32px', fontWeight: '600', marginBottom: '8px' }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div style={{ fontFamily: value, fontSize: '16px', lineHeight: '1.5', color: '#737373' }}>
              {key === 'sans' && 'Body text, UI elements, buttons - Most versatile'}
              {key === 'serif' && 'Editorial content, headings, quotes - Elegant and traditional'}
              {key === 'mono' && 'Code snippets, technical data - Fixed width characters'}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontSizes: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Font Sizes</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Minimum 16px for body text (WCAG 1.4.4). Smaller sizes should be used only for secondary content.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.fontSize).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 80px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>fontSize[{key}]</div>
            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
            <div style={{ fontSize: value }}>
              The quick brown fox jumps over the lazy dog{' '}
              <span style={{ fontSize: '12px', color: '#737373', marginLeft: '8px' }}>
                {Number(key) < 16 && '⚠️ Secondary only'}
                {Number(key) === 16 && '✓ WCAG minimum'}
                {Number(key) >= 20 && '✓ Headings, emphasis'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#FEF3C7',
          borderRadius: '12px',
          border: '1px solid #FCD34D',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>WCAG Guidelines</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>16px minimum</strong> for body text (WCAG 1.4.4 Resize Text)
          </li>
          <li>
            <strong>12-14px only</strong> for secondary labels, captions, metadata
          </li>
          <li>
            <strong>20px+</strong> qualifies as "large text" for WCAG contrast calculations
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Line Heights</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        WCAG requires minimum 1.5 line-height for paragraph text (WCAG 1.4.12).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(primitives.lineHeight).map(([key, value]) => (
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
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>lineHeight.{key}</div>
              <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>
                {value}
                {Number(value) < 1.5 && ' ⚠️ Headings only'}
                {Number(value) >= 1.5 && ' ✓ WCAG compliant'}
              </div>
            </div>
            <div style={{ fontSize: '16px', lineHeight: value }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </div>
            <div style={{ fontSize: '12px', color: '#737373', marginTop: '8px' }}>
              {key === 'tight' && 'Very tight - special cases only'}
              {key === 'heading' && 'Headings only - below WCAG minimum'}
              {key === 'display' && 'Large display text only'}
              {key === 'body' && 'WCAG minimum for paragraphs'}
              {key === 'reading' && 'Enhanced readability for long content'}
              {key === 'dyslexia' && 'Maximum spacing for dyslexia-friendly reading'}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LetterSpacing: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Letter Spacing</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        WCAG recommends minimum 0.12em letter spacing for improved readability (WCAG 1.4.12).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(primitives.letterSpacing).map(([key, value]) => (
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
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>letterSpacing.{key}</div>
              <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
            </div>
            <div style={{ fontSize: '24px', letterSpacing: value, marginBottom: '8px' }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div style={{ fontSize: '12px', color: '#737373' }}>
              {key === 'tight' && 'Tight spacing - use cautiously'}
              {key === 'heading' && 'Headings only - avoid for body text'}
              {key === 'normal' && 'Default spacing'}
              {key === 'relaxed' && 'Slightly relaxed'}
              {key === 'readable' && 'Improved readability'}
              {key === 'dyslexia' && 'Dyslexia-friendly spacing'}
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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Font Weights</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        WCAG recommends minimum 400 weight for body text. Thin weights may reduce legibility at small sizes.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(primitives.fontWeight).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 80px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '14px' }}>fontWeight[{key}]</div>
            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
            <div style={{ fontSize: '20px', fontWeight: value }}>
              The quick brown fox jumps over the lazy dog{' '}
              <span style={{ fontSize: '12px', color: '#737373', fontWeight: 400, marginLeft: '8px' }}>
                {Number(value) < 300 && '⚠️ Avoid for small text'}
                {Number(value) === 300 && '⚠️ Use cautiously'}
                {Number(value) === 400 && '✓ Body text minimum'}
                {Number(value) > 400 && '✓ Headings, emphasis'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Typography Usage Examples</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div>
          <h3
            style={{
              fontFamily: primitives.fontFamily.sans,
              fontSize: primitives.fontSize[30],
              fontWeight: primitives.fontWeight[700],
              lineHeight: primitives.lineHeight.heading,
              letterSpacing: primitives.letterSpacing.heading,
              marginBottom: '16px',
            }}
          >
            Article Heading
          </h3>
          <p
            style={{
              fontFamily: primitives.fontFamily.sans,
              fontSize: primitives.fontSize[16],
              fontWeight: primitives.fontWeight[400],
              lineHeight: primitives.lineHeight.body,
              letterSpacing: primitives.letterSpacing.normal,
              color: '#737373',
              marginBottom: '16px',
            }}
          >
            This is a paragraph using WCAG-compliant Font size is 16px (minimum), line-height is 1.5 (WCAG minimum), and
            weight is 400 (recommended minimum). This ensures maximum readability and accessibility for all users.
          </p>
          <p
            style={{
              fontFamily: primitives.fontFamily.sans,
              fontSize: primitives.fontSize[16],
              fontWeight: primitives.fontWeight[400],
              lineHeight: primitives.lineHeight.reading,
              letterSpacing: primitives.letterSpacing.readable,
              color: '#737373',
            }}
          >
            This paragraph uses enhanced readability settings with 1.65 line-height and 0.04em letter spacing. This is
            ideal for long-form content and improves readability for users with dyslexia.
          </p>
        </div>

        <div>
          <h4
            style={{
              fontFamily: primitives.fontFamily.serif,
              fontSize: primitives.fontSize[24],
              fontWeight: primitives.fontWeight[600],
              lineHeight: primitives.lineHeight.heading,
              marginBottom: '12px',
            }}
          >
            Serif Editorial Heading
          </h4>
          <p
            style={{
              fontFamily: primitives.fontFamily.serif,
              fontSize: primitives.fontSize[16],
              fontWeight: primitives.fontWeight[400],
              lineHeight: primitives.lineHeight.body,
              color: '#737373',
            }}
          >
            Serif fonts bring elegance and tradition to editorial content. They're perfect for quotes, long-form
            articles, and content that requires a more refined aesthetic.
          </p>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: '#1F2937',
            borderRadius: '8px',
            fontFamily: primitives.fontFamily.mono,
            fontSize: primitives.fontSize[14],
            lineHeight: primitives.lineHeight.body,
            color: '#D1D5DB',
          }}
        >
          <div style={{ marginBottom: '8px', color: '#9CA3AF' }}>// Code example</div>
          <div>
            <span style={{ color: '#F472B6' }}>const</span> message <span style={{ color: '#F472B6' }}>=</span>{' '}
            <span style={{ color: '#A78BFA' }}>"Hello World"</span>;
          </div>
          <div>
            <span style={{ color: '#F472B6' }}>console</span>.<span style={{ color: '#60A5FA' }}>log</span>
            (message);
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              fontSize: primitives.fontSize[12],
              color: '#9CA3AF',
            }}
          >
            Caption text (12px) - Use only for metadata, labels
          </div>
          <div
            style={{
              fontSize: primitives.fontSize[14],
              color: '#6B7280',
            }}
          >
            Secondary text (14px) - Use sparingly
          </div>
          <div
            style={{
              fontSize: primitives.fontSize[16],
              fontWeight: primitives.fontWeight[400],
            }}
          >
            Body text (16px) - WCAG minimum
          </div>
          <div
            style={{
              fontSize: primitives.fontSize[20],
              fontWeight: primitives.fontWeight[500],
            }}
          >
            Large text (20px) - Qualifies for relaxed contrast ratios
          </div>
        </div>
      </div>
    </div>
  ),
};
