import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "@gradouble/lufa_design-system";

const meta = {
  title: "2. Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: [""],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: {
      control: "text",
      description: "The text to display",
    },
    position: {
      control: "radio",
      description: "The position of the label",
      options: ["left", "center", "right"],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "This is a divider with label",
    position: "center",
  },
  render: ({ label, position }) => {
    return (
      <div className="w-[40rem]">
        <Divider label={label} position={position} />
      </div>
    );
  },
};
