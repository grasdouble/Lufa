import type { Meta, StoryObj } from '@storybook/react';

import {
    Placeholder,
    Stack,
    STACK_ALIGN,
    STACK_DIRECTION,
    STACK_GAP,
    STACK_JUSTIFY,
    STACK_PADDING,
    STACK_WRAP,
} from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Components/Stack',
    component: Stack,
    parameters: {
        layout: 'centered',
    },
    tags: [''],
} satisfies Meta<React.ComponentProps<typeof Placeholder>>;

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Placeholder>>;

const argTypes = {
    nbPlaceholders: {
        control: {
            type: 'number',
        },
        table: {
            category: 'Customize Story content',
            defaultValue: {
                summary: 3,
            },
        },
    },
    gap: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: Object.values(STACK_GAP),
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_GAP.normal,
            },
        },
    },
    direction: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: Object.values(STACK_DIRECTION),
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_DIRECTION.vertical,
            },
        },
    },
    padding: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: Object.values(STACK_PADDING),
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_PADDING.none,
            },
        },
    },
    align: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: Object.values(STACK_ALIGN),
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_ALIGN.stretch,
            },
        },
    },
    justify: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: Object.values(STACK_JUSTIFY),
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_JUSTIFY.start,
            },
        },
    },
    wrap: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: Object.values(STACK_WRAP),
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_WRAP.nowrap,
            },
        },
    },
};
const args = {
    nbPlaceholders: 3,
    gap: STACK_GAP.normal,
    direction: STACK_DIRECTION.vertical,
    padding: STACK_PADDING.none,
    align: STACK_ALIGN.stretch,
    justify: STACK_JUSTIFY.start,
    wrap: STACK_WRAP.nowrap,
};

export const Default: Story = {
    argTypes,
    args,
    render: (args) => {
        return (
            <Stack {...args}>
                {Array.from({ length: args.nbPlaceholders }).map((_, index) => (
                    <Placeholder key={index}>{index}</Placeholder>
                ))}
            </Stack>
        );
    },
};

const argStackItem = {
    grow: true,
    example: 'mode 1',
};
const argTypesStackItem = {
    grow: {
        control: {
            type: 'boolean',
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: 'true',
            },
        },
    },
    example: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: ['mode 1', 'mode 2', 'mode 3', 'mode 4', 'mode 5', 'mode 6'],
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: 'false',
            },
        },
    },
};

export const StackItem: Story = {
    args: argStackItem,
    argTypes: argTypesStackItem,
    render: ({ grow, example }) => {
        return (
            <>
                <Stack
                    gap="normal"
                    direction="horizontal"
                    align="center"
                    justify="space-between"
                    wrap="nowrap"
                >
                    <Stack.Item
                        grow={
                            grow &&
                            ['mode 1', 'mode 4', 'mode 6'].includes(example)
                        }
                    >
                        <Placeholder>
                            {['mode 1', 'mode 4', 'mode 6'].includes(example)
                                ? 'Adjust this item'
                                : 'Fixed width'}
                        </Placeholder>
                    </Stack.Item>
                    <Stack.Item
                        grow={
                            grow &&
                            ['mode 2', 'mode 4', 'mode 5'].includes(example)
                        }
                    >
                        <Placeholder>
                            {['mode 2', 'mode 4', 'mode 5'].includes(example)
                                ? 'Adjust this item'
                                : 'Fixed width'}
                        </Placeholder>
                    </Stack.Item>
                    <Stack.Item
                        grow={
                            grow &&
                            ['mode 3', 'mode 5', 'mode 6'].includes(example)
                        }
                    >
                        <Placeholder>
                            {['mode 3', 'mode 5', 'mode 6'].includes(example)
                                ? 'Adjust this item'
                                : 'Fixed width'}
                        </Placeholder>
                    </Stack.Item>
                </Stack>
            </>
        );
    },
};
