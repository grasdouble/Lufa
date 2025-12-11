import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider, Placeholder, Stack, colors } from '@grasdouble/lufa_design-system';

const meta = {
    title: '2. Layout/Divider',
    component: Divider,
    tags: [],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A simple separator to group content. Supports labels, horizontal or vertical orientation, and solid or dashed styles.',
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
                    <Placeholder color={colors.interactive.default}>Left</Placeholder>
                    <Divider {...args} length="100%" />
                    <Placeholder color={colors.interactive.default}>Right</Placeholder>
                </div>
            );
        }

        return (
            <div style={{ width: '100%' }}>
                <Placeholder color={colors.interactive.default}>Add content here to see spacing in context.</Placeholder>
                <Divider {...args} />
                <Placeholder color={colors.interactive.default}>Add content here to see spacing in context.</Placeholder>
            </div>
        );
    },
};

export const WithLabel: Story = {
    render: () => (
        <div style={{ width: '100%' }}>
            <Divider label="Upcoming" />
            <Stack direction="vertical" gap="normal" padding="none">
                <Placeholder color={colors.interactive.default}>Item A</Placeholder>
                <Placeholder color={colors.interactive.default}>Item B</Placeholder>
            </Stack>
        </div>
    ),
};

export const Orientation: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '120px' }}>
            <Placeholder color={colors.interactive.default}>Left</Placeholder>
            <Divider orientation="vertical" length="80%" />
            <Placeholder color={colors.interactive.default}>Right</Placeholder>
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
    render: () => (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Divider label="No margin" spacing="none" />
            <Placeholder color={colors.interactive.default}>Add content here to see spacing in context.</Placeholder>
            <Divider label="Small" spacing="sm" />
            <Placeholder color={colors.interactive.default}>Add content here to see spacing in context.</Placeholder>
            <Divider label="Medium" spacing="md" />
            <Placeholder color={colors.interactive.default}>Add content here to see spacing in context.</Placeholder>
            <Divider label="Large" spacing="lg" />
            <Placeholder color={colors.interactive.default}>Add content here to see spacing in context.</Placeholder>
        </div>
    ),
};

export const CustomLength: Story = {
    render: () => (
        <div style={{ width: '100%' }}>
            <Divider label="400px wide" length="400px" />
            <div style={{ marginTop: '16px', color: colors.text.secondary }}>The divider above is constrained to 400px.</div>
        </div>
    ),
};
