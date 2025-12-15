import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider, Placeholder, Stack, tokens } from '@grasdouble/lufa_design-system';
import { Fragment } from 'react';

const { color } = tokens;

const meta = {
    title: '2. Layout/Divider',
    component: Divider,
    tags: [],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A simple separator to group content. Supports labels, horizontal or vertical orientation, and solid or dashed styles.',
            },
        },
    },
    argTypes: {
        orientation: {
            control: 'inline-radio',
            options: ['horizontal', 'vertical'],
            description: 'Direction of the divider line',
            table: { defaultValue: { summary: 'horizontal' } },
        },
        variant: {
            control: 'radio',
            options: ['solid', 'dashed'],
            description: 'Line style',
            table: { defaultValue: { summary: 'solid' } },
        },
        align: {
            control: 'inline-radio',
            options: ['start', 'center', 'end'],
            description: 'Label alignment (horizontal only)',
            table: { defaultValue: { summary: 'center' } },
        },
        spacing: {
            control: 'radio',
            options: ['none', 'sm', 'md', 'lg'],
            description: 'Outer spacing',
            table: { defaultValue: { summary: 'md' } },
        },
        label: {
            control: 'text',
            description: 'Optional label between lines',
        },
        length: {
            control: 'text',
            description: 'Limit width/height (e.g. "300px" or 200)',
        },
    },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: 'Section',
        orientation: 'horizontal',
        variant: 'solid',
        align: 'center',
        spacing: 'md',
    },
    render: (args) => {
        const isVertical = args.orientation === 'vertical';

        if (isVertical) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '140px' }}>
                    <Placeholder color={color.interactive.default}>Left</Placeholder>
                    <Divider {...args} length="100%" />
                    <Placeholder color={color.interactive.default}>Right</Placeholder>
                </div>
            );
        }

        return (
            <div style={{ width: '100%' }}>
                <Placeholder color={color.interactive.default}>Add content here to see spacing in context.</Placeholder>
                <Divider {...args} />
                <Placeholder color={color.interactive.default}>Add content here to see spacing in context.</Placeholder>
            </div>
        );
    },
};

export const Label: Story = {
    render: () => (
        <div style={{ width: '100%' }}>
            <Divider label="Upcoming" />
            <Stack direction="vertical" gap="normal" padding="none">
                <Placeholder color={color.interactive.default}>Item A</Placeholder>
                <Placeholder color={color.interactive.default}>Item B</Placeholder>
            </Stack>
        </div>
    ),
};

export const Orientation: Story = {
    render: () => (
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
            <div
                style={{
                    backgroundColor: color.background.primary,
                    border: `1px solid ${color.border.light}`,
                    borderRadius: '12px',
                    padding: '16px',
                }}
            >
                <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>orientation: horizontal</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Divider label="Solid / start" variant="solid" align="start" />
                    <Divider label="Solid / center" variant="solid" align="center" />
                    <Divider label="Solid / end" variant="solid" align="end" />
                    <Divider label="Dashed / center" variant="dashed" align="center" />
                </div>
            </div>

            <div
                style={{
                    backgroundColor: color.background.primary,
                    border: `1px solid ${color.border.light}`,
                    borderRadius: '12px',
                    padding: '16px',
                }}
            >
                <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>orientation: vertical</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '220px' }}>
                    <Placeholder color={color.interactive.default}>Left</Placeholder>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', height: '100%' }}>
                        <Divider orientation="vertical" variant="solid" length="70%" />
                        <Divider orientation="vertical" variant="dashed" length="70%" />
                    </div>
                    <Placeholder color={color.interactive.default}>Right</Placeholder>
                </div>
            </div>
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Divider label="Solid" variant="solid" />
            <Divider label="Dashed" variant="dashed" />
        </div>
    ),
};

export const Spacing: Story = {
    render: () => {
        const spacings = ['none', 'sm', 'md', 'lg'] as const;
        const variants = ['solid', 'dashed'] as const;

        return (
            <div
                style={{
                    width: '100%',
                    overflowX: 'auto',
                    backgroundColor: color.background.secondary,
                    padding: '24px',
                    borderRadius: '16px',
                }}
            >
                <div
                    style={{
                        minWidth: '860px',
                        display: 'grid',
                        gridTemplateColumns: `140px repeat(${spacings.length}, minmax(0, 1fr))`,
                        gap: '12px',
                        alignItems: 'stretch',
                    }}
                >
                    <div />
                    {spacings.map((spacing) => (
                        <div
                            key={`header-${spacing}`}
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '12px',
                                color: color.text.secondary,
                                textAlign: 'center',
                                padding: '6px 8px',
                                backgroundColor: color.background.primary,
                                border: `1px solid ${color.border.light}`,
                                borderRadius: '10px',
                            }}
                        >
                            spacing: {spacing}
                        </div>
                    ))}

                    {variants.map((variant) => (
                        <Fragment key={`row-${variant}`}>
                            <div
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '12px',
                                    color: color.text.secondary,
                                    padding: '6px 8px',
                                    backgroundColor: color.background.primary,
                                    border: `1px solid ${color.border.light}`,
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                variant: {variant}
                            </div>
                            {spacings.map((spacing) => (
                                <div
                                    key={`${variant}-${spacing}`}
                                    style={{
                                        backgroundColor: color.background.primary,
                                        border: `1px solid ${color.border.light}`,
                                        borderRadius: '12px',
                                        padding: '16px',
                                    }}
                                >
                                    <Placeholder color={color.interactive.default}>Context</Placeholder>
                                    <Divider label="Section" variant={variant} spacing={spacing} />
                                    <Placeholder color={color.interactive.default}>Context</Placeholder>
                                </div>
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    },
};

export const Length: Story = {
    render: () => (
        <div style={{ width: '100%' }}>
            <div
                style={{
                    backgroundColor: color.background.primary,
                    border: `1px solid ${color.border.light}`,
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '16px',
                }}
            >
                <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>horizontal lengths</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Divider label="length: 200" length={200} />
                    <Divider label='length: "400px"' length="400px" />
                    <Divider label='length: "100%"' length="100%" />
                </div>
            </div>

            <div
                style={{
                    backgroundColor: color.background.primary,
                    border: `1px solid ${color.border.light}`,
                    borderRadius: '12px',
                    padding: '16px',
                }}
            >
                <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>vertical lengths</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '200px' }}>
                    <Placeholder color={color.interactive.default}>Left</Placeholder>
                    <Divider orientation="vertical" length={80} />
                    <Divider orientation="vertical" length={140} />
                    <Divider orientation="vertical" length="100%" />
                    <Placeholder color={color.interactive.default}>Right</Placeholder>
                </div>
                <div style={{ marginTop: '12px', color: color.text.secondary, fontSize: '12px' }}>
                    For vertical dividers, <code style={{ fontFamily: 'monospace' }}>length</code> controls height.
                </div>
            </div>
        </div>
    ),
};
