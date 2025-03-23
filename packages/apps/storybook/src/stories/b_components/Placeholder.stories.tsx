import type { Meta, StoryObj } from '@storybook/react';

import { Placeholder } from '@grasdouble/lufa_design-system';

const meta = {
    title: '1. Primer/Placeholder',
    component: Placeholder,
    parameters: {
        layout: 'centered',
    },
    tags: [''],
} satisfies Meta<React.ComponentProps<typeof Placeholder>>;

export default meta;
type Story = StoryObj<React.ComponentProps<typeof Placeholder>>;

export const Primary: Story = {
    render: () => {
        return <Placeholder />;
    },
};
