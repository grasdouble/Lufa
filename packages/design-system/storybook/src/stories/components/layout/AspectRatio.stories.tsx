import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio, ASPECT_RATIO, Container, Placeholder, Stack, tokens } from '@grasdouble/lufa_design-system';

const { color, aspectRatio } = tokens;

const meta = {
    title: '2. Layout/AspectRatio',
    component: AspectRatio,
    tags: [],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Media container that preserves aspect ratio (token presets or custom ratios).',
            },
        },
    },
    argTypes: {
        as: { control: 'select', options: ['div', 'figure'], table: { defaultValue: { summary: 'div' } } },
        ratio: { control: 'select', options: Object.values(ASPECT_RATIO), table: { defaultValue: { summary: 'video' } } },
        children: { control: false },
    },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        ratio: ASPECT_RATIO.video,
        as: 'div',
    },
    render: (args) => (
        <Container size="md" paddingX="none">
            <div style={{ backgroundColor: color.background.secondary, borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>
                    ratio: {String(args.ratio)}
                </div>
                <AspectRatio
                    {...args}
                    style={{
                        ...args.style,
                        borderRadius: '12px',
                        outline: `1px solid ${color.border.light}`,
                        backgroundColor: color.background.primary,
                    }}
                >
                    <Placeholder color={color.interactive.default} height="full" width="full">
                        Media
                    </Placeholder>
                </AspectRatio>
            </div>
        </Container>
    ),
};

export const Ratio: Story = {
    render: () => (
        <Container size="xl" paddingX="none">
            <Stack direction="vertical" gap="spacious">
                <div>
                    <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>landscape & square</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
                        {(
                            [
                                ASPECT_RATIO.square,
                                ASPECT_RATIO.traditional,
                                ASPECT_RATIO.photo,
                                ASPECT_RATIO.video,
                                ASPECT_RATIO.ultrawide,
                            ] as const
                        ).map((ratio) => (
                            <div
                                key={ratio}
                                style={{
                                    backgroundColor: color.background.secondary,
                                    borderRadius: '12px',
                                    padding: '16px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <div style={{ fontFamily: 'monospace', color: color.text.secondary }}>ratio: {ratio}</div>
                                    <div style={{ fontFamily: 'monospace', color: color.text.tertiary, fontSize: '12px' }}>
                                        {aspectRatio[ratio]}
                                    </div>
                                </div>
                                <AspectRatio
                                    ratio={ratio}
                                    style={{
                                        borderRadius: '12px',
                                        outline: `1px solid ${color.border.light}`,
                                        backgroundColor: color.background.primary,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundImage: `linear-gradient(135deg, ${color.interactive.default} 0%, ${color.brand.secondary} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: color.text.inverse,
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {aspectRatio[ratio]}
                                    </div>
                                </AspectRatio>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>portrait</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
                        {([ASPECT_RATIO.vertical, ASPECT_RATIO.portrait, ASPECT_RATIO.portraitDisplay] as const).map((ratio) => (
                            <div
                                key={ratio}
                                style={{
                                    backgroundColor: color.background.secondary,
                                    borderRadius: '12px',
                                    padding: '16px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <div style={{ fontFamily: 'monospace', color: color.text.secondary }}>ratio: {ratio}</div>
                                    <div style={{ fontFamily: 'monospace', color: color.text.tertiary, fontSize: '12px' }}>
                                        {aspectRatio[ratio]}
                                    </div>
                                </div>
                                <AspectRatio
                                    ratio={ratio}
                                    style={{
                                        borderRadius: '12px',
                                        outline: `1px solid ${color.border.light}`,
                                        backgroundColor: color.background.primary,
                                        maxWidth: '260px',
                                        margin: '0 auto',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundImage: `linear-gradient(135deg, ${color.interactive.default} 0%, ${color.brand.secondary} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: color.text.inverse,
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {aspectRatio[ratio]}
                                    </div>
                                </AspectRatio>
                            </div>
                        ))}
                    </div>
                </div>
            </Stack>
        </Container>
    ),
};

export const CustomRatios: Story = {
    render: () => (
        <Container size="xl" paddingX="none">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
                {[
                    { label: 'ratio: 1', ratio: 1 },
                    { label: 'ratio: 2', ratio: 2 },
                    { label: 'ratio: "3 / 2"', ratio: '3 / 2' },
                ].map((item) => (
                    <div
                        key={item.label}
                        style={{
                            backgroundColor: color.background.secondary,
                            borderRadius: '12px',
                            padding: '16px',
                        }}
                    >
                        <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>{item.label}</div>
                        <AspectRatio
                            ratio={item.ratio}
                            style={{
                                borderRadius: '12px',
                                outline: `1px solid ${color.border.light}`,
                                backgroundColor: color.background.primary,
                            }}
                        >
                            <Placeholder color={color.interactive.default} height="full" width="full">
                                Media
                            </Placeholder>
                        </AspectRatio>
                    </div>
                ))}
            </div>
        </Container>
    ),
};
