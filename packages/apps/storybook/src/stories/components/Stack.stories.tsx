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

const argsTypes = {
    gap: {
        control: {
            type: 'inline-radio',
        },
        type: {
            name: 'enum',
            value: STACK_GAP,
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
            type: 'radio',
        },
        type: {
            name: 'enum',
            value: STACK_DIRECTION,
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_DIRECTION.horizontal,
            },
        },
    },
    padding: {
        control: {
            type: 'radio',
        },
        type: {
            name: 'enum',
            value: STACK_PADDING,
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
            type: 'radio',
        },
        type: {
            name: 'enum',
            value: STACK_ALIGN,
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
            type: 'radio',
        },
        type: {
            name: 'enum',
            value: STACK_JUSTIFY,
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
            type: 'radio',
        },
        type: {
            name: 'enum',
            value: STACK_WRAP,
        },
        table: {
            category: 'Properties',
            defaultValue: {
                summary: STACK_WRAP.nowrap,
            },
        },
    },
};

export const Default: Story = {
    argTypes: argsTypes,
    render: (args) => {
        return (
            <>
                <Stack>
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </Stack>
            </>
        );
    },
};

export const Playground: Story = {
    argTypes: argsTypes,
    render: (args) => {
        return (
            <Stack {...args}>
                {Array.from({ length: 50 }).map((_, index) => (
                    <Placeholder key={index}>{index}</Placeholder>
                ))}
            </Stack>
        );
    },
};
