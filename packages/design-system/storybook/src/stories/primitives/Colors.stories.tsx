import type { Meta, StoryObj } from '@storybook/react-vite';

import primitives from '@grasdouble/lufa_design-system-primitives';

const meta = {
  title: '0. Primitives/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color scale table component
const ColorScaleTable = ({ name, shades }: { name: string; shades: Record<string, string> }) => (
  <div
    style={{
      marginBottom: '24px',
    }}
  >
    <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', textTransform: 'capitalize' }}>{name}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
      {Object.entries(shades).map(([shade, value]) => {
        const textColor = ['50', '100', '200', '300'].includes(shade) ? '#000000' : '#ffffff';
        return (
          <div
            key={shade}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '16px',
              padding: '12px 16px',
              backgroundColor: value,
              color: textColor,
              borderRadius: '4px',
              alignItems: 'center',
            }}
          >
            <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              --lufa-primitive-{name}-{shade}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>{value}</div>
          </div>
        );
      })}
    </div>
  </div>
);

export const AllColors: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>All Primitive Colors</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Complete set of primitive color scales in OKLCH format. Includes 22 chromatic colors and 5 neutral scales, all
        optimized for WCAG 2.1 contrast ratios.
      </p>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Neutrals</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
        <ColorScaleTable name="slate" shades={primitives.color.neutral.slate} />
        <ColorScaleTable name="gray" shades={primitives.color.neutral.gray} />
        <ColorScaleTable name="zinc" shades={primitives.color.neutral.zinc} />
        <ColorScaleTable name="neutral" shades={primitives.color.neutral.neutral} />
        <ColorScaleTable name="stone" shades={primitives.color.neutral.stone} />
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Chromatic Colors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <ColorScaleTable name="red" shades={primitives.color.chromatic.red} />
        <ColorScaleTable name="orange" shades={primitives.color.chromatic.orange} />
        <ColorScaleTable name="amber" shades={primitives.color.chromatic.amber} />
        <ColorScaleTable name="yellow" shades={primitives.color.chromatic.yellow} />
        <ColorScaleTable name="lime" shades={primitives.color.chromatic.lime} />
        <ColorScaleTable name="green" shades={primitives.color.chromatic.green} />
        <ColorScaleTable name="emerald" shades={primitives.color.chromatic.emerald} />
        <ColorScaleTable name="teal" shades={primitives.color.chromatic.teal} />
        <ColorScaleTable name="cyan" shades={primitives.color.chromatic.cyan} />
        <ColorScaleTable name="sky" shades={primitives.color.chromatic.sky} />
        <ColorScaleTable name="blue" shades={primitives.color.chromatic.blue} />
        <ColorScaleTable name="indigo" shades={primitives.color.chromatic.indigo} />
        <ColorScaleTable name="violet" shades={primitives.color.chromatic.violet} />
        <ColorScaleTable name="purple" shades={primitives.color.chromatic.purple} />
        <ColorScaleTable name="fuchsia" shades={primitives.color.chromatic.fuchsia} />
        <ColorScaleTable name="pink" shades={primitives.color.chromatic.pink} />
        <ColorScaleTable name="rose" shades={primitives.color.chromatic.rose} />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>
        Pure Black & White
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxWidth: '600px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '16px',
            padding: '12px 16px',
            backgroundColor: primitives.color.neutral.black,
            color: '#ffffff',
            borderRadius: '4px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>base-display-color-black</div>
          <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>
            {primitives.color.neutral.black}
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '16px',
            padding: '12px 16px',
            backgroundColor: primitives.color.neutral.white,
            color: '#000000',
            borderRadius: '4px',
            alignItems: 'center',
            border: '1px solid #E5E5E5',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>base-display-color-white</div>
          <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>
            {primitives.color.neutral.white}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Neutrals: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Neutral Colors</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Achromatic color scales for text, backgrounds, and borders. Neutral includes extended range (0-1000) for pure
        white and black.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <ColorScaleTable name="slate" shades={primitives.color.neutral.slate} />
        <ColorScaleTable name="gray" shades={primitives.color.neutral.gray} />
        <ColorScaleTable name="zinc" shades={primitives.color.neutral.zinc} />
        <ColorScaleTable name="neutral" shades={primitives.color.neutral.neutral} />
        <ColorScaleTable name="stone" shades={primitives.color.neutral.stone} />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>
        Pure Black & White
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxWidth: '600px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '16px',
            padding: '12px 16px',
            backgroundColor: primitives.color.neutral.black,
            color: '#ffffff',
            borderRadius: '4px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>base-display-color-black</div>
          <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>
            {primitives.color.neutral.black}
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '16px',
            padding: '12px 16px',
            backgroundColor: primitives.color.neutral.white,
            color: '#000000',
            borderRadius: '4px',
            alignItems: 'center',
            border: '1px solid #E5E5E5',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>base-display-color-white</div>
          <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>
            {primitives.color.neutral.white}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Chromatic: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Chromatic Colors</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Vibrant color scales for brand, accents, and data visualization. All colors in OKLCH format for perceptual
        uniformity.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Warm Colors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <ColorScaleTable name="red" shades={primitives.color.chromatic.red} />
        <ColorScaleTable name="orange" shades={primitives.color.chromatic.orange} />
        <ColorScaleTable name="amber" shades={primitives.color.chromatic.amber} />
        <ColorScaleTable name="yellow" shades={primitives.color.chromatic.yellow} />
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Green Colors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <ColorScaleTable name="lime" shades={primitives.color.chromatic.lime} />
        <ColorScaleTable name="green" shades={primitives.color.chromatic.green} />
        <ColorScaleTable name="emerald" shades={primitives.color.chromatic.emerald} />
        <ColorScaleTable name="teal" shades={primitives.color.chromatic.teal} />
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Blue Colors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <ColorScaleTable name="cyan" shades={primitives.color.chromatic.cyan} />
        <ColorScaleTable name="sky" shades={primitives.color.chromatic.sky} />
        <ColorScaleTable name="blue" shades={primitives.color.chromatic.blue} />
        <ColorScaleTable name="indigo" shades={primitives.color.chromatic.indigo} />
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>
        Purple & Pink Colors
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <ColorScaleTable name="violet" shades={primitives.color.chromatic.violet} />
        <ColorScaleTable name="purple" shades={primitives.color.chromatic.purple} />
        <ColorScaleTable name="fuchsia" shades={primitives.color.chromatic.fuchsia} />
        <ColorScaleTable name="pink" shades={primitives.color.chromatic.pink} />
        <ColorScaleTable name="rose" shades={primitives.color.chromatic.rose} />
      </div>
    </div>
  ),
};

export const ContrastGuide: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Contrast Guidelines</h1>
      <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
        Understanding WCAG 2.1 contrast ratios for accessible color usage. Each shade is optimized for specific use
        cases.
      </p>

      <div
        style={{
          padding: '24px',
          backgroundColor: '#FAFAFA',
          borderRadius: '12px',
          border: '1px solid #E5E5E5',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>
          Scale Guidelines (on white background)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <strong>Shades 50-300:</strong> Low contrast (~1-2:1)
            <br />
            <span style={{ color: '#737373' }}>Use for backgrounds, subtle borders. AAA on dark backgrounds.</span>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <strong>Shade 400:</strong> Medium contrast (~2.5-3:1)
            <br />
            <span style={{ color: '#737373' }}>Use for large text only. AA large text compliance.</span>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <strong>Shade 500:</strong> Medium-high contrast (~2.5-4:1)
            <br />
            <span style={{ color: '#737373' }}>Use for large text or non-text elements. AA large text only.</span>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <strong>Shade 600:</strong> High contrast (~4.5-6:1)
            <br />
            <span style={{ color: '#737373' }}>Use for normal text. AA normal text compliance.</span>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
            }}
          >
            <strong>Shades 700+:</strong> Very high contrast (≥7:1)
            <br />
            <span style={{ color: '#737373' }}>Use for emphasis text. AAA normal text compliance.</span>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '24px',
          backgroundColor: '#FAFAFA',
          borderRadius: '12px',
          border: '1px solid #E5E5E5',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Example: Blue Scale</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: primitives.color.chromatic.blue[100],
              borderRadius: '8px',
              minWidth: '200px',
            }}
          >
            <div style={{ color: primitives.color.chromatic.blue[950], fontWeight: '600' }}>Blue 950 on Blue 100</div>
            <div style={{ fontSize: '12px', color: primitives.color.chromatic.blue[800] }}>AAA Compliant</div>
          </div>
          <div
            style={{
              padding: '16px',
              backgroundColor: primitives.color.chromatic.blue[50],
              borderRadius: '8px',
              minWidth: '200px',
            }}
          >
            <div style={{ color: primitives.color.chromatic.blue[900], fontWeight: '600' }}>Blue 900 on Blue 50</div>
            <div style={{ fontSize: '12px', color: primitives.color.chromatic.blue[700] }}>AAA Compliant</div>
          </div>
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', minWidth: '200px' }}>
            <div style={{ color: primitives.color.chromatic.blue[700], fontWeight: '600' }}>Blue 700 on White</div>
            <div style={{ fontSize: '12px', color: primitives.color.chromatic.blue[600] }}>AAA Compliant</div>
          </div>
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', minWidth: '200px' }}>
            <div style={{ color: primitives.color.chromatic.blue[600], fontWeight: '600' }}>Blue 600 on White</div>
            <div style={{ fontSize: '12px', color: '#737373' }}>AA Compliant</div>
          </div>
        </div>
      </div>
    </div>
  ),
};
