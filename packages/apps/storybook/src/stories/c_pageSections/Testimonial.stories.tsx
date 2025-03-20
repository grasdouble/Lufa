import type { Meta, StoryObj } from "@storybook/react";

import { Testimonial } from "@grasdouble/lufa_design-system";

const meta = {
  title: "3. Page Sections/Testimonial",
  component: Testimonial,
  parameters: {
    layout: "centered",
  },
  tags: [""],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    style: {
      control: "select",
      description: "The style of the testimonial",
      options: [1, 2, 3],
    },
    imgUrl: {
      control: "select",
      options: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80",
      ],
      description: "The image url",
    },
    testimonial: {
      control: "text",
      description: "The testimonial",
    },
    from: {
      control: "text",
      description: "The name of the person",
    },
    position: {
      control: "text",
      description: "The position of the person",
    },
  },
} satisfies Meta<typeof Testimonial>;

const artTypesWithSpecificStype = (styleValue: number) => ({
  ...meta.argTypes,
  style: {
    control: "select",
    description: "The style of the testimonial",
    options: [styleValue],
  },
});

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    style: 1,
    imgUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    testimonial:
      "Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.",
    from: "Judith Black",
    position: "CEO of Workcation",
  },
};

export const Secondary: Story = {
  argTypes: artTypesWithSpecificStype(2),
  args: {
    style: 2,
    imgUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    testimonial:
      "Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.",
    from: "Judith Black",
    position: "CEO of Workcation",
  },
};

export const Tertiary: Story = {
  argTypes: artTypesWithSpecificStype(3),
  args: {
    style: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80",
    testimonial:
      "Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.",
    from: "Judith Black",
    position: "CEO of Workcation",
  },
};
