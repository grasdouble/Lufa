import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Stack,
    STACK_ALIGN,
    STACK_DIRECTION,
    STACK_GAP,
    STACK_JUSTIFY,
    STACK_PADDING,
    STACK_WRAP,
    Placeholder,
    primitives,
    semantic,
} from '@grasdouble/lufa_design-system';

const meta = {
    title: '2. Layout/Stack',
    component: Stack,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A flexible layout component for stacking elements vertically or horizontally with consistent spacing. Based on CSS Flexbox.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        gap: {
            control: 'select',
            options: Object.values(STACK_GAP),
            description: 'Spacing between items',
            table: {
                type: { summary: Object.values(STACK_GAP).join(' | ') },
                defaultValue: { summary: STACK_GAP.normal },
            },
        },
        direction: {
            control: 'select',
            options: Object.values(STACK_DIRECTION),
            description: 'Stack direction (row or column)',
            table: {
                type: { summary: Object.values(STACK_DIRECTION).join(' | ') },
                defaultValue: { summary: STACK_DIRECTION.vertical },
            },
        },
        align: {
            control: 'select',
            options: Object.values(STACK_ALIGN),
            description: 'Cross-axis alignment',
            table: {
                type: { summary: Object.values(STACK_ALIGN).join(' | ') },
                defaultValue: { summary: STACK_ALIGN.stretch },
            },
        },
        justify: {
            control: 'select',
            options: Object.values(STACK_JUSTIFY),
            description: 'Main-axis alignment',
            table: {
                type: { summary: Object.values(STACK_JUSTIFY).join(' | ') },
                defaultValue: { summary: STACK_JUSTIFY.start },
            },
        },
        wrap: {
            control: 'select',
            options: Object.values(STACK_WRAP),
            description: 'Whether items should wrap',
            table: {
                type: { summary: Object.values(STACK_WRAP).join(' | ') },
                defaultValue: { summary: STACK_WRAP.nowrap },
            },
        },
        padding: {
            control: 'select',
            options: Object.values(STACK_PADDING),
            description: 'Internal padding',
            table: {
                type: { summary: Object.values(STACK_PADDING).join(' | ') },
                defaultValue: { summary: STACK_PADDING.none },
            },
        },
    },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        gap: STACK_GAP.normal,
        direction: STACK_DIRECTION.vertical,
        align: STACK_ALIGN.stretch,
        justify: STACK_JUSTIFY.start,
        wrap: STACK_WRAP.nowrap,
        padding: STACK_PADDING.none,
        children: (
            <>
                <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
            </>
        ),
    },
};

export const VerticalStack: Story = {
    render: () => (
        <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
            <Placeholder color={primitives.blue[600]}>First Item</Placeholder>
            <Placeholder color={primitives.blue[600]}>Second Item</Placeholder>
            <Placeholder color={primitives.blue[600]}>Third Item</Placeholder>
        </Stack>
    ),
};

export const HorizontalStack: Story = {
    render: () => (
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
            <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
            <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
            <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
        </Stack>
    ),
};

export const GapVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Gap: None</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Gap: Condensed</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Gap: Normal</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Gap: Spacious</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.spacious}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
        </div>
    ),
};

export const Alignment: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div>
                <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>Horizontal Stack (cross-axis alignment)</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: Start (items aligned to top)</h3>
                        <div
                            style={{
                                height: '200px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.start}>
                                <Placeholder color={primitives.blue[600]} height="small">
                                    Small
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} height="medium">
                                    Medium
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} height="large">
                                    Large
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: Center (items centered vertically)</h3>
                        <div
                            style={{
                                height: '200px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
                                <Placeholder color={primitives.green[600]} height="small">
                                    Small
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} height="medium">
                                    Medium
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} height="large">
                                    Large
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: End (items aligned to bottom)</h3>
                        <div
                            style={{
                                height: '200px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.end}>
                                <Placeholder color={primitives.red[600]} height="small">
                                    Small
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} height="medium">
                                    Medium
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} height="large">
                                    Large
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: Stretch (items stretched to full height)</h3>
                        <div
                            style={{
                                height: '200px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                                <Placeholder color={primitives.purple[600]} height="full">
                                    Stretched 1
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} height="full">
                                    Stretched 2
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} height="full">
                                    Stretched 3
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>Vertical Stack (cross-axis alignment)</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: Start (items aligned to left)</h3>
                        <div
                            style={{
                                width: '600px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.start}>
                                <Placeholder color={primitives.blue[600]} width="small">
                                    Short
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} width="medium">
                                    Medium Width
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} width="large">
                                    Very Long Width
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: Center (items centered horizontally)</h3>
                        <div
                            style={{
                                width: '600px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
                                <Placeholder color={primitives.green[600]} width="small">
                                    Short
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} width="medium">
                                    Medium Width
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} width="large">
                                    Very Long Width
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: End (items aligned to right)</h3>
                        <div
                            style={{
                                width: '600px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.end}>
                                <Placeholder color={primitives.red[600]} width="small">
                                    Short
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} width="medium">
                                    Medium Width
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} width="large">
                                    Very Long Width
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Align: Stretch (items stretched to full width)</h3>
                        <div
                            style={{
                                width: '600px',
                                backgroundColor: semantic.background.secondary,
                                padding: '16px',
                                border: `2px dashed ${primitives.neutral[300]}`,
                            }}
                        >
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                                <Placeholder color={primitives.purple[600]} width="full">
                                    Stretched Item 1
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} width="full">
                                    Stretched Item 2
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} width="full">
                                    Stretched Item 3
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};

export const Justification: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Justify: Start</h3>
                <div style={{ width: '600px', backgroundColor: semantic.background.secondary, padding: '16px' }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.start}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Justify: Center</h3>
                <div style={{ width: '600px', backgroundColor: semantic.background.secondary, padding: '16px' }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.center}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Justify: End</h3>
                <div style={{ width: '600px', backgroundColor: semantic.background.secondary, padding: '16px' }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.end}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Justify: Space Between</h3>
                <div style={{ width: '600px', backgroundColor: semantic.background.secondary, padding: '16px' }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none} justify={STACK_JUSTIFY['space-between']}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Justify: Space Evenly</h3>
                <div style={{ width: '600px', backgroundColor: semantic.background.secondary, padding: '16px' }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none} justify={STACK_JUSTIFY['space-evenly']}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
        </div>
    ),
};

export const WithWrap: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h3 style={{ marginBottom: '16px' }}>No Wrap (items overflow the container)</h3>
                <div
                    style={{
                        width: '500px',
                        backgroundColor: semantic.background.secondary,
                        padding: '16px',
                        border: `2px dashed ${primitives.red[400]}`,
                        overflow: 'auto',
                    }}
                >
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.nowrap}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <Placeholder key={n} color={primitives.red[600]} width="small">
                                Item {n}
                            </Placeholder>
                        ))}
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>With Wrap (items wrap to next line)</h3>
                <div
                    style={{
                        width: '500px',
                        backgroundColor: semantic.background.secondary,
                        padding: '16px',
                        border: `2px dashed ${primitives.green[400]}`,
                    }}
                >
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.wrap}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <Placeholder key={n} color={primitives.green[600]} width="small">
                                Item {n}
                            </Placeholder>
                        ))}
                    </Stack>
                </div>
            </div>
        </div>
    ),
};

export const WithPadding: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h3 style={{ marginBottom: '16px' }}>No Padding</h3>
                <div style={{ backgroundColor: semantic.background.secondary }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.none}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Condensed Padding</h3>
                <div style={{ backgroundColor: semantic.background.secondary }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.condensed}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Normal Padding</h3>
                <div style={{ backgroundColor: semantic.background.secondary }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.normal}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Spacious Padding</h3>
                <div style={{ backgroundColor: semantic.background.secondary }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.spacious}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
        </div>
    ),
};

export const StackItem: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Without grow</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Stack.Item>
                        <Placeholder color={primitives.red[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item>
                        <Placeholder color={primitives.blue[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item>
                        <Placeholder color={primitives.green[600]}>Fixed</Placeholder>
                    </Stack.Item>
                </Stack>
            </div>

            <div>
                <h3 style={{ marginBottom: '16px' }}>With grow on middle item</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Stack.Item>
                        <Placeholder color={primitives.red[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Placeholder color={primitives.blue[600]}>Growing</Placeholder>
                    </Stack.Item>
                    <Stack.Item>
                        <Placeholder color={primitives.green[600]}>Fixed</Placeholder>
                    </Stack.Item>
                </Stack>
            </div>

            <div>
                <h3 style={{ marginBottom: '16px' }}>Multiple growing items</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Stack.Item>
                        <Placeholder color={primitives.red[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Placeholder color={primitives.blue[600]}>Growing</Placeholder>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Placeholder color={primitives.green[600]}>Growing</Placeholder>
                    </Stack.Item>
                </Stack>
            </div>
        </div>
    ),
};

export const RealWorldExamples: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px' }}>
            <div>
                <h3 style={{ marginBottom: '16px' }}>Form Layout</h3>
                <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                        <Stack.Item grow>
                            <Placeholder color={primitives.indigo[600]}>First Name</Placeholder>
                        </Stack.Item>
                        <Stack.Item grow>
                            <Placeholder color={primitives.indigo[600]}>Last Name</Placeholder>
                        </Stack.Item>
                    </Stack>
                    <Placeholder color={primitives.indigo[600]}>Email</Placeholder>
                    <Placeholder color={primitives.indigo[600]}>Message</Placeholder>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.end}>
                        <Placeholder color={primitives.neutral[400]}>Cancel</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Submit</Placeholder>
                    </Stack>
                </Stack>
            </div>

            <div>
                <h3 style={{ marginBottom: '16px' }}>Navigation Bar</h3>
                <div style={{ backgroundColor: primitives.neutral[800], borderRadius: '8px' }}>
                    <Stack
                        direction={STACK_DIRECTION.horizontal}
                        gap={STACK_GAP.spacious}
                        align={STACK_ALIGN.center}
                        justify={STACK_JUSTIFY['space-between']}
                        padding={STACK_PADDING.normal}
                    >
                        <Placeholder color={primitives.blue[500]}>Logo</Placeholder>
                        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                            <Placeholder color={primitives.neutral[500]}>Home</Placeholder>
                            <Placeholder color={primitives.neutral[500]}>About</Placeholder>
                            <Placeholder color={primitives.neutral[500]}>Contact</Placeholder>
                        </Stack>
                        <Placeholder color={primitives.green[500]}>Sign In</Placeholder>
                    </Stack>
                </div>
            </div>

            <div>
                <h3 style={{ marginBottom: '16px' }}>Card Grid</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.wrap}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} style={{ flex: '1 1 200px' }}>
                            <Placeholder color={primitives.purple[600]}>Card {n}</Placeholder>
                        </div>
                    ))}
                </Stack>
            </div>

            <div>
                <h3 style={{ marginBottom: '16px' }}>Dashboard Layout</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                    <Stack.Item>
                        <div style={{ height: '200px' }}>
                            <Placeholder color={primitives.neutral[600]} height="full">
                                Sidebar
                            </Placeholder>
                        </div>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
                            <Placeholder color={primitives.blue[600]}>Header</Placeholder>
                            <div style={{ height: '140px' }}>
                                <Placeholder color={primitives.indigo[600]} height="full">
                                    Main Content
                                </Placeholder>
                            </div>
                        </Stack>
                    </Stack.Item>
                </Stack>
            </div>
        </div>
    ),
};
