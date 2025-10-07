import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@grasdouble/lufa_design-system';

const meta = {
    title: '2. OLD/Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: [''],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: {
            control: 'text',
            description: 'The text to display',
        },
        variant: {
            control: 'select',
            description: 'The variant used of button',
            value: 'solid',
            options: ['solid', 'text', 'dashed', 'link'],
        },
        danger: {
            control: 'boolean',
            description: 'The danger state of button',
        },
        disabled: {
            control: 'boolean',
            description: 'The disabled state of button',
        },
        size: {
            control: 'select',
            description: 'The size of the badge',
            options: ['xsmall', 'small', 'medium', 'large'],
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Button',
        variant: 'solid',
        size: 'medium',
        danger: false,
        disabled: false,
    },
};

export const AllType = {
    decorators: [
        () => (
            <div className="grid grid-flow-col grid-rows-5 gap-4">
                <span>Default</span>
                <span>
                    <Button {...Primary.args} variant="solid" label="Solid" />
                </span>
                <span>
                    <Button {...Primary.args} variant="text" label="Text" />
                </span>
                <span>
                    <Button {...Primary.args} variant="dashed" label="dashed" />
                </span>
                <span>
                    <Button {...Primary.args} variant="link" label="Link" />
                </span>
                <span>Danger</span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="solid"
                        label="Solid"
                        danger
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="text"
                        label="Text"
                        danger
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="dashed"
                        label="dashed"
                        danger
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="link"
                        label="Link"
                        danger
                    />
                </span>
                <span>Disabled</span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="solid"
                        label="Solid"
                        disabled
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="text"
                        label="Text"
                        disabled
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="dashed"
                        label="dashed"
                        disabled
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        variant="link"
                        label="Link"
                        disabled
                    />
                </span>
            </div>
        ),
    ],
};

export const AllSize = {
    decorators: [
        () => (
            <div className="grid grid-flow-col grid-rows-5 gap-4">
                <span>x-small</span>
                <span>
                    <Button
                        {...Primary.args}
                        label="xsmall"
                        size="xsmall"
                        variant="solid"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="xsmall"
                        size="xsmall"
                        variant="text"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="xsmall"
                        size="xsmall"
                        variant="dashed"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="xsmall"
                        size="xsmall"
                        variant="link"
                    />
                </span>
                <span>small</span>
                <span>
                    <Button
                        {...Primary.args}
                        label="small"
                        size="small"
                        variant="solid"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="small"
                        size="small"
                        variant="text"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="small"
                        size="small"
                        variant="dashed"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="small"
                        size="small"
                        variant="link"
                    />
                </span>

                <span>medium</span>
                <span>
                    <Button
                        {...Primary.args}
                        label="medium"
                        size="medium"
                        variant="solid"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="medium"
                        size="medium"
                        variant="text"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="medium"
                        size="medium"
                        variant="dashed"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        label="medium"
                        size="medium"
                        variant="link"
                    />
                </span>

                <span>large</span>
                <span>
                    <Button
                        {...Primary.args}
                        size="large"
                        label="large"
                        variant="solid"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        size="large"
                        label="large"
                        variant="text"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        size="large"
                        label="large"
                        variant="dashed"
                    />
                </span>
                <span>
                    <Button
                        {...Primary.args}
                        size="large"
                        label="large"
                        variant="link"
                    />
                </span>
            </div>
        ),
    ],
};
