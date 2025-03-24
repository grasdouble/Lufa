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
            <>
                <Stack {...args}>
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </Stack>
            </>
        );
    },
};

export const Playground: Story = {
    argTypes,
    args,
    render: (args) => {
        return (
            <Stack {...args}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <Placeholder key={index}>{index}</Placeholder>
                ))}
            </Stack>
        );
    },
};
