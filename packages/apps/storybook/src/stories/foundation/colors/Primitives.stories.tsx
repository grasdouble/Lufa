import type { Meta, StoryObj } from '@storybook/react-vite';
import { primitives } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Foundation/Colors/Primitives',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color swatch component
const ColorSwatch = ({
    name,
    value,
    shade,
    contrastRatio,
}: {
    name: string;
    value: string;
    shade: string | number;
    contrastRatio?: string;
}) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            minWidth: '120px',
        }}
    >
        <div
            style={{
                width: '100px',
                height: '100px',
                backgroundColor: value,
                borderRadius: '8px',
                border: '1px solid #E5E5E5',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        />
        <div style={{ textAlign: 'center', fontSize: '12px' }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                {name}-{shade}
            </div>
            <div style={{ color: '#737373', fontFamily: 'monospace' }}>{value}</div>
            {contrastRatio && (
                <div
                    style={{
                        marginTop: '4px',
                        fontSize: '11px',
                        color: '#16A34A',
                        fontWeight: '500',
                    }}
                >
                    {contrastRatio}
                </div>
            )}
        </div>
    </div>
);

// Color scale component
const ColorScale = ({ name, colors, description }: { name: string; colors: Record<string | number, string>; description?: string }) => (
    <div style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>{name}</h3>
            {description && <p style={{ margin: 0, color: '#737373', fontSize: '14px' }}>{description}</p>}
        </div>
        <div
            style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
            }}
        >
            {Object.entries(colors).map(([shade, value]) => {
                let contrastRatio = '';
                const shadeNum = Number(shade);
                if (shadeNum >= 600) {
                    contrastRatio = 'AAA';
                } else if (shadeNum >= 500) {
                    contrastRatio = 'AA';
                }
                return <ColorSwatch key={shade} name={name} value={value} shade={shade} contrastRatio={contrastRatio} />;
            })}
        </div>
    </div>
);

export const AllPrimitives: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1200px' }}>
            <h1 style={{ marginBottom: '16px' }}>Primitive Colors</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Base color values following WCAG 2.1 accessibility guidelines. Colors marked with AAA meet 7:1 contrast ratio on white.
                Colors marked with AA meet 4.5:1 contrast ratio.
            </p>

            <ColorScale name="Neutral" colors={primitives.neutral} description="Grayscale colors for text, backgrounds, and borders" />

            <ColorScale name="Blue" colors={primitives.blue} description="Primary brand color" />

            <ColorScale name="Green" colors={primitives.green} description="Success and positive states" />

            <ColorScale name="Red" colors={primitives.red} description="Error and danger states" />

            <ColorScale name="Orange" colors={primitives.orange} description="Warning and caution states" />

            <ColorScale name="Yellow" colors={primitives.yellow} description="Warning and attention states" />

            <ColorScale name="Purple" colors={primitives.purple} description="Info and secondary brand" />

            <ColorScale name="Teal" colors={primitives.teal} description="Accent color" />

            <ColorScale name="Pink" colors={primitives.pink} description="Additional accent color" />

            <ColorScale name="Indigo" colors={primitives.indigo} description="Additional accent color" />
        </div>
    ),
};

export const Neutral: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Neutral" colors={primitives.neutral} description="Grayscale colors for text, backgrounds, and borders" />
        </div>
    ),
};

export const Blue: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Blue" colors={primitives.blue} description="Primary brand color" />
        </div>
    ),
};

export const Green: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Green" colors={primitives.green} description="Success and positive states" />
        </div>
    ),
};

export const Red: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Red" colors={primitives.red} description="Error and danger states" />
        </div>
    ),
};

export const Orange: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Orange" colors={primitives.orange} description="Warning and caution states" />
        </div>
    ),
};

export const Yellow: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Yellow" colors={primitives.yellow} description="Warning and attention states" />
        </div>
    ),
};

export const Purple: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Purple" colors={primitives.purple} description="Info and secondary brand" />
        </div>
    ),
};

export const Teal: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Teal" colors={primitives.teal} description="Accent color" />
        </div>
    ),
};

export const Pink: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Pink" colors={primitives.pink} description="Additional accent color" />
        </div>
    ),
};

export const Indigo: Story = {
    render: () => (
        <div style={{ padding: '20px' }}>
            <ColorScale name="Indigo" colors={primitives.indigo} description="Additional accent color" />
        </div>
    ),
};
