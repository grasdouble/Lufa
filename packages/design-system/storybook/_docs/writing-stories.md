# Writing Stories

## Basic Story Structure

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => {
    return (
      <StoryContainer>
        <PropCard label="Primary Button">
          <Button variant="primary">Click me</Button>
        </PropCard>

        <CodeBlock code='<Button variant="primary">Click me</Button>' language="jsx" title="JSX" />
      </StoryContainer>
    );
  },
};
```

**For complete patterns:** See [Story Template](./story-template.md)

## Story Examples

**Best reference:** [Box.stories.tsx](../src/stories/primitives/Box.stories.tsx) - Contains 13+ example stories demonstrating:

- Uniform spacing (padding/margin)
- Axis spacing (X/Y)
- Individual sides (top/right/bottom/left)
- Display modes
- Interactive playgrounds
- Hover states with dynamic code
