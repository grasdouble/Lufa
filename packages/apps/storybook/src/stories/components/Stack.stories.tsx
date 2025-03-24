import type { Meta, StoryObj } from '@storybook/react';

import { Placeholder, Stack } from '@grasdouble/lufa_design-system';

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

export const Primary: Story = {
    render: () => {
        return (
            <>
                <Stack>
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </Stack>
                <br />
                <hr />
                <br />
                <Stack direction="horizontal">
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </Stack>
            </>
        );
    },
};
