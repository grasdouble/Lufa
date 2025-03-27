import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: [''],
} satisfies Meta<React.ComponentProps<typeof Spinner>>;

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Spinner>>;

const argTypes = {
    size: {
        control: {
            type: 'select',
            options: ['small', 'medium', 'large'],
        },
        type: {
            name: 'enum',
            value: ['small', 'medium', 'large'],
        },
        description: 'Size of the spinner',
        table: {
            type: {
                summary: 'small | medium | large',
            },
            category: 'Properties',
            defaultValue: {
                summary: 'medium',
            },
        },
    },
    mode: {
        control: {
            type: 'select',
            options: ['A', 'B'],
        },
        type: {
            name: 'enum',
            value: ['A', 'B'],
        },
        description:
            'Mode of the spinner. It will define which spinner will be used',
        table: {
            type: {
                summary: 'A | B',
            },
            category: 'Properties',
            defaultValue: {
                summary: 'A',
            },
        },
    },
};
const args = {
    size: 'medium',
    mode: 'A',
};

export const Primary: Story = {
    argTypes: argTypes,
    args: args,
    render: ({ size, mode }) => {
        return <Spinner size={size} mode={mode} />;
    },
};
