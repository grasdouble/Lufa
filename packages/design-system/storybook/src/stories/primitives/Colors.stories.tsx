import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors as primitiveColors } from '@grasdouble/lufa_design-system-primitives';

const meta = {
    title: '0. Primitives/Colors',
    parameters: {
        layout: 'padded',
    },
    tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color scale card component
const ColorScaleCard = ({ name, shades }: { name: string; shades: Record<string, string> }) => (
    <div
        style={{
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: '#FAFAFA',
            borderRadius: '12px',
            border: '1px solid #E5E5E5',
        }}
    >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', textTransform: 'capitalize' }}>{name}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
            {Object.entries(shades).map(([shade, value]) => (
                <div key={shade} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div
                        style={{
                            width: '100%',
                            height: '80px',
                            backgroundColor: value,
                            borderRadius: '6px',
                            border: '1px solid #E5E5E5',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    />
                    <div style={{ fontSize: '12px' }}>
                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>{shade}</div>
                        <div style={{ color: '#737373', fontFamily: 'monospace', fontSize: '10px', wordBreak: 'break-all' }}>
                            {value}
                        </div>
                    </div>
                </div>
            ))}
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
            <ColorScaleCard name="slate" shades={primitiveColors.slate} />
            <ColorScaleCard name="gray" shades={primitiveColors.gray} />
            <ColorScaleCard name="zinc" shades={primitiveColors.zinc} />
            <ColorScaleCard name="neutral" shades={primitiveColors.neutral} />
            <ColorScaleCard name="stone" shades={primitiveColors.stone} />

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Chromatic Colors</h2>
            <ColorScaleCard name="red" shades={primitiveColors.red} />
            <ColorScaleCard name="orange" shades={primitiveColors.orange} />
            <ColorScaleCard name="amber" shades={primitiveColors.amber} />
            <ColorScaleCard name="yellow" shades={primitiveColors.yellow} />
            <ColorScaleCard name="lime" shades={primitiveColors.lime} />
            <ColorScaleCard name="green" shades={primitiveColors.green} />
            <ColorScaleCard name="emerald" shades={primitiveColors.emerald} />
            <ColorScaleCard name="teal" shades={primitiveColors.teal} />
            <ColorScaleCard name="cyan" shades={primitiveColors.cyan} />
            <ColorScaleCard name="sky" shades={primitiveColors.sky} />
            <ColorScaleCard name="blue" shades={primitiveColors.blue} />
            <ColorScaleCard name="indigo" shades={primitiveColors.indigo} />
            <ColorScaleCard name="violet" shades={primitiveColors.violet} />
            <ColorScaleCard name="purple" shades={primitiveColors.purple} />
            <ColorScaleCard name="fuchsia" shades={primitiveColors.fuchsia} />
            <ColorScaleCard name="pink" shades={primitiveColors.pink} />
            <ColorScaleCard name="rose" shades={primitiveColors.rose} />

            <div
                style={{
                    marginTop: '32px',
                    padding: '20px',
                    backgroundColor: '#FAFAFA',
                    borderRadius: '12px',
                    border: '1px solid #E5E5E5',
                }}
            >
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Pure Black & White</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                        <div
                            style={{
                                width: '140px',
                                height: '80px',
                                backgroundColor: primitiveColors.black,
                                borderRadius: '6px',
                                border: '1px solid #E5E5E5',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            }}
                        />
                        <div style={{ fontSize: '12px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '2px' }}>black</div>
                            <div style={{ color: '#737373', fontFamily: 'monospace', fontSize: '10px' }}>
                                {primitiveColors.black}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                        <div
                            style={{
                                width: '140px',
                                height: '80px',
                                backgroundColor: primitiveColors.white,
                                borderRadius: '6px',
                                border: '1px solid #E5E5E5',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            }}
                        />
                        <div style={{ fontSize: '12px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '2px' }}>white</div>
                            <div style={{ color: '#737373', fontFamily: 'monospace', fontSize: '10px' }}>
                                {primitiveColors.white}
                            </div>
                        </div>
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
                Achromatic color scales for text, backgrounds, and borders. Neutral includes extended range (0-1000) for pure white
                and black.
            </p>

            <ColorScaleCard name="slate" shades={primitiveColors.slate} />
            <ColorScaleCard name="gray" shades={primitiveColors.gray} />
            <ColorScaleCard name="zinc" shades={primitiveColors.zinc} />
            <ColorScaleCard name="neutral" shades={primitiveColors.neutral} />
            <ColorScaleCard name="stone" shades={primitiveColors.stone} />

            <div
                style={{
                    marginTop: '32px',
                    padding: '20px',
                    backgroundColor: '#FAFAFA',
                    borderRadius: '12px',
                    border: '1px solid #E5E5E5',
                }}
            >
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Pure Black & White</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                        <div
                            style={{
                                width: '140px',
                                height: '80px',
                                backgroundColor: primitiveColors.black,
                                borderRadius: '6px',
                                border: '1px solid #E5E5E5',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            }}
                        />
                        <div style={{ fontSize: '12px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '2px' }}>black</div>
                            <div style={{ color: '#737373', fontFamily: 'monospace', fontSize: '10px' }}>
                                {primitiveColors.black}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                        <div
                            style={{
                                width: '140px',
                                height: '80px',
                                backgroundColor: primitiveColors.white,
                                borderRadius: '6px',
                                border: '1px solid #E5E5E5',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            }}
                        />
                        <div style={{ fontSize: '12px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '2px' }}>white</div>
                            <div style={{ color: '#737373', fontFamily: 'monospace', fontSize: '10px' }}>
                                {primitiveColors.white}
                            </div>
                        </div>
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
                Vibrant color scales for brand, accents, and data visualization. All colors in OKLCH format for perceptual uniformity.
            </p>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Warm Colors</h2>
            <ColorScaleCard name="red" shades={primitiveColors.red} />
            <ColorScaleCard name="orange" shades={primitiveColors.orange} />
            <ColorScaleCard name="amber" shades={primitiveColors.amber} />
            <ColorScaleCard name="yellow" shades={primitiveColors.yellow} />

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Green Colors</h2>
            <ColorScaleCard name="lime" shades={primitiveColors.lime} />
            <ColorScaleCard name="green" shades={primitiveColors.green} />
            <ColorScaleCard name="emerald" shades={primitiveColors.emerald} />
            <ColorScaleCard name="teal" shades={primitiveColors.teal} />

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Blue Colors</h2>
            <ColorScaleCard name="cyan" shades={primitiveColors.cyan} />
            <ColorScaleCard name="sky" shades={primitiveColors.sky} />
            <ColorScaleCard name="blue" shades={primitiveColors.blue} />
            <ColorScaleCard name="indigo" shades={primitiveColors.indigo} />

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Purple & Pink Colors</h2>
            <ColorScaleCard name="violet" shades={primitiveColors.violet} />
            <ColorScaleCard name="purple" shades={primitiveColors.purple} />
            <ColorScaleCard name="fuchsia" shades={primitiveColors.fuchsia} />
            <ColorScaleCard name="pink" shades={primitiveColors.pink} />
            <ColorScaleCard name="rose" shades={primitiveColors.rose} />
        </div>
    ),
};

export const ContrastGuide: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Contrast Guidelines</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Understanding WCAG 2.1 contrast ratios for accessible color usage. Each shade is optimized for specific use cases.
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
                <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>Scale Guidelines (on white background)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
                        <strong>Shades 50-300:</strong> Low contrast (~1-2:1)
                        <br />
                        <span style={{ color: '#737373' }}>Use for backgrounds, subtle borders. AAA on dark backgrounds.</span>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
                        <strong>Shade 400:</strong> Medium contrast (~2.5-3:1)
                        <br />
                        <span style={{ color: '#737373' }}>Use for large text only. AA large text compliance.</span>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
                        <strong>Shade 500:</strong> Medium-high contrast (~2.5-4:1)
                        <br />
                        <span style={{ color: '#737373' }}>Use for large text or non-text elements. AA large text only.</span>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
                        <strong>Shade 600:</strong> High contrast (~4.5-6:1)
                        <br />
                        <span style={{ color: '#737373' }}>Use for normal text. AA normal text compliance.</span>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
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
                    <div style={{ padding: '16px', backgroundColor: primitiveColors.blue[100], borderRadius: '8px', minWidth: '200px' }}>
                        <div style={{ color: primitiveColors.blue[950], fontWeight: '600' }}>Blue 950 on Blue 100</div>
                        <div style={{ fontSize: '12px', color: primitiveColors.blue[800] }}>AAA Compliant</div>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: primitiveColors.blue[50], borderRadius: '8px', minWidth: '200px' }}>
                        <div style={{ color: primitiveColors.blue[900], fontWeight: '600' }}>Blue 900 on Blue 50</div>
                        <div style={{ fontSize: '12px', color: primitiveColors.blue[700] }}>AAA Compliant</div>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', minWidth: '200px' }}>
                        <div style={{ color: primitiveColors.blue[700], fontWeight: '600' }}>Blue 700 on White</div>
                        <div style={{ fontSize: '12px', color: primitiveColors.blue[600] }}>AAA Compliant</div>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', minWidth: '200px' }}>
                        <div style={{ color: primitiveColors.blue[600], fontWeight: '600' }}>Blue 600 on White</div>
                        <div style={{ fontSize: '12px', color: '#737373' }}>AA Compliant</div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
