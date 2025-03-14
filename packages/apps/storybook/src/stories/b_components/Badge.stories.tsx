import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@lufa/design-system";

const meta = {
  title: "2. Components/Badge",
  component: Badge,
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
    color: {
      control: "select",
      description: "The color used in the badge",
      value: "gray",
      options: ["gray", "red", "yellow", "green", "blue", "indigo", "purple"],
    },
    size: {
      control: "select",
      description: "The size of the badge",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Marketing",
    color: "gray",
    size: "small",
  },
};

export const AllColors = {
  decorators: [
    () => (
      <>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} color="red" label="Backend" />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} color="yellow" label="QA" />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} color="green" label="Design" />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} color="blue" label="DevOps" />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} color="indigo" label="UX" />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} color="purple" label="Product" />
        </span>
      </>
    ),
  ],
};

export const AllSize = {
  decorators: [
    () => (
      <>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} label="small" />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} size="medium" label="medium" />
        </span>
        <span style={{ margin: "0.5em" }}>
          <Badge {...Primary.args} size="large" label="large" />
        </span>
      </>
    ),
  ],
};
